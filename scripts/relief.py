# Carves the H mark into plaster tiles for the wall shader (src/components/canvas/wall.ts).
# From public/logo-dark.png (a disc with the H cut out) it builds three height maps, lights them from the upper left and
# writes, per tile: tile-x.webp = carved detail in grey, signed around .5 (1024x1536, -half at 512x768);
# tile-x-mask.webp = where relief exists, for the drop shadow; tile-x-static.webp = a pre-lit cream tile for browsers
# without WebGL2. Same layout as the Lussano tiles the shader was written for.
#   a: the H alone, raised      b: the H engraved into a raised disc, like a seal      c: the H's sweeping strokes, close up
# Usage: python3 -I scripts/relief.py public/logo-dark.png public/relief
import os
import sys

import cv2
import numpy as np
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
W, H = 1024, 1536
CREAM = np.array([250, 245, 237], np.float32) / 255  # the site's --background, oklch(0.972 0.012 80)

alpha = np.asarray(Image.open(src).convert("RGBA"), np.float32)[..., 3] / 255
n = alpha.shape[0]
yy, xx = np.mgrid[0:n, 0:n]
disc = (((xx - n / 2 + 0.5) ** 2 + (yy - n / 2 + 0.5) ** 2) <= (n / 2 - 1) ** 2).astype(np.float32)
strokes = np.clip(disc - alpha, 0, 1)  # the H: inside the disc, not painted


def place(mask, scale, cx, cy, angle=0.0):
    """The logo-sized mask scaled, rotated and centred at (cx, cy) on a W x H tile."""
    m = cv2.getRotationMatrix2D((n / 2, n / 2), angle, scale)
    m[:, 2] += (cx - n / 2, cy - n / 2)
    # Blur with the scale, or the logo's pixel steps show up as ridges on the larger strokes.
    return cv2.GaussianBlur(cv2.warpAffine(mask, m, (W, H), flags=cv2.INTER_LINEAR, borderValue=0), (0, 0), 0.7 * scale)


def dome(mask, radius):
    """A rounded ribbon about `radius` px high at the shoulder. Built from a blur, not a distance transform: thresholding
    the mask first turned its pixel steps into ridges once lit."""
    soft = cv2.GaussianBlur(mask, (0, 0), radius * 0.45)
    t = np.clip((soft - 0.2) / 0.6, 0, 1)
    return t * t * (3 - 2 * t)


def thicken(mask, px):
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * px + 1, 2 * px + 1))
    return cv2.dilate(mask, k)


tiles = {}
# The H's own centre (its strokes lean left of the disc's centre), so tile a can sit it in the middle.
ys, xs = np.nonzero(strokes > 0.5)
hx, hy = (xs.min() + xs.max()) / 2 - n / 2, (ys.min() + ys.max()) / 2 - n / 2
# a: the H on its own, a little thicker than the logo so it reads as carving.
sa = place(thicken(strokes, 3), 1.32, W / 2 - hx * 1.32, H * 0.5 - hy * 1.32)
tiles["tile-a"] = dome(sa, 14) * 1.0
# b: a raised disc with the H engraved into it.
sb_disc = place(disc, 0.86, W / 2, H * 0.46)
sb_h = place(thicken(strokes, 2), 0.86, W / 2, H * 0.46)
tiles["tile-b"] = dome(sb_disc, 26) * 0.55 - dome(sb_h * (sb_disc > 0.5), 7) * 0.5
# c: the H's upper sweep, close up and turned, so the wall isn't only logos.
sc = place(thicken(strokes, 3), 2.3, W * 0.62, H * 0.6, angle=-24)
tiles["tile-c"] = dome(sc, 18) * 1.0

for name, h in tiles.items():
    h = cv2.GaussianBlur(h.astype(np.float32), (0, 0), 1.8)
    # Light from the upper left (image y points down).
    gy, gx = np.gradient(h * 22)
    nz = 1 / np.sqrt(gx * gx + gy * gy + 1)
    light = np.array([-0.55, -0.55, 0.63])
    light /= np.linalg.norm(light)
    shade = (-gx * nz) * light[0] + (-gy * nz) * light[1] + nz * light[2] - light[2]
    # Contact shadow where the relief meets the wall, and a soft fill on its top.
    foot = cv2.GaussianBlur((np.abs(h) > 0.02).astype(np.float32), (0, 0), 5)
    detail = shade * 0.42 - foot * (np.abs(h) < 0.02) * 0.05 + np.clip(h, 0, None) * 0.03
    # Fade the outer 4% so neighbouring tiles always meet on plain wall.
    ty, tx = np.mgrid[0:H, 0:W]
    edge = np.minimum.reduce([tx, W - 1 - tx, ty, H - 1 - ty]).astype(np.float32) / (0.04 * W)
    detail *= np.clip(edge, 0, 1)
    mask = cv2.GaussianBlur((np.abs(h) > 0.02).astype(np.float32) * np.clip(edge, 0, 1), (0, 0), W / 120)

    grey = np.clip(detail + 0.5, 0, 1)
    for width, suffix in ((W, ""), (W // 2, "-half")):
        im = Image.fromarray((grey * 255).astype(np.uint8), "L").resize((width, H * width // W), Image.LANCZOS)
        im.save(os.path.join(out, f"{name}{suffix}.webp"), quality=82, method=6)
    Image.fromarray((mask * 255).astype(np.uint8), "L").resize((W // 4, H // 4), Image.LANCZOS).save(
        os.path.join(out, f"{name}-mask.webp"), quality=90, method=6
    )
    lit = np.clip(CREAM[None, None, :] * (1 + detail[..., None] * 0.35), 0, 1)  # about the live wall's reduced-motion lift
    Image.fromarray((lit * 255).astype(np.uint8)).resize((W // 2, H // 2), Image.LANCZOS).save(
        os.path.join(out, f"{name}-static.webp"), quality=80, method=6
    )
    print(name, "detail", round(float(detail.min()), 3), round(float(detail.max()), 3), "relief share", round(float((mask > 0.2).mean()), 3))

# Self-check: a flat height map has no detail, and the stroke mask is a real H (not empty, not the whole disc).
flat = np.zeros((32, 32), np.float32)
assert np.abs(np.gradient(flat)[0]).max() == 0
assert 0.05 < strokes.sum() / disc.sum() < 0.4, strokes.sum() / disc.sum()
