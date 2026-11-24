/**
 * The carved plaster wall behind every page: the H mark in three reliefs (public/relief, made by scripts/relief.py),
 * flat at rest, rising where the cursor or a wandering "ghost" cursor passes, then sinking back slowly. One full-screen
 * shader reads the tiles in page space (so the wall scrolls with the page) and a 256x256 flow map that remembers where to
 * lift. Behind the contact section the wall turns to charcoal and the carving reads as engraved. Ported from the Lussano site.
 *
 * Tile maps: tile-x is the carved detail in grey, lit from the upper left (signed around .5); tile-x-mask is where relief
 * exists (for the drop shadow). The tiles are lit from the upper left, so the wall is never mirrored, not even for Arabic.
 */
import type * as Three from "three";

export type Wall = {
  /** Eases the wall to charcoal (true) or back to cream. */
  setDark: (dark: boolean) => void;
  dispose: () => void;
};

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }
`;

const NOISE = /* glsl */ `
float hash(vec2 p) { p = mod(p, 512.); p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0., a = .5; for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= .5; } return v; }
`;

/** The flow map: scrolls with the page, fades (.98 per 16 ms), and takes two soft stamps a frame (cursor and ghost). */
const FLOW = /* glsl */ `
uniform sampler2D uPrev;
uniform vec2 uShift;
uniform float uDecay;
uniform vec2 uAspect;
uniform vec3 uMouse;
uniform float uMouseSpeed;
uniform vec3 uGhost;
uniform float uGhostSpeed;
uniform float uTime;
varying vec2 vUv;
${NOISE}
vec4 stampAt(vec4 c, vec3 at, float speed, float strength, float n) {
  float f = clamp(smoothstep(.25, 0., length((vUv - at.xy) * uAspect)) * .3 * strength * at.z * n, 0., 1.);
  // r: lift from movement, g: lift from presence, b: how fast it moved (the sheen)
  vec4 s = vec4(1. - pow(1. - min(1., speed), 3.), 1., min(1., speed), 1.);
  return mix(c, s, f);
}
void main() {
  vec2 from = vUv - uShift;
  vec4 c = (from.y < 0. || from.y > 1.) ? vec4(0.) : texture2D(uPrev, from);
  c = max(c * uDecay - .002, 0.);
  float n = mix(.15, 1., noise(vUv * 3. + uTime * .1));
  float n2 = mix(.15, 1., noise(vUv * 3. - uTime * .07 + 7.));
  c = stampAt(c, uMouse, uMouseSpeed, 1., n);
  c = stampAt(c, uGhost, uGhostSpeed, 3., n2);
  gl_FragColor = c;
}
`;

const WALL = /* glsl */ `
uniform sampler2D uFlow;
uniform sampler2D uTa;
uniform sampler2D uTb;
uniform sampler2D uTc;
uniform sampler2D uMa;
uniform sampler2D uMb;
uniform sampler2D uMc;
uniform vec2 uRes;
uniform float uScroll;
uniform float uTileW;
uniform float uTime;
uniform float uDark;
uniform float uFast;
uniform float uStill;
varying vec2 vUv;
${NOISE}
void main() {
  vec2 css = vec2(vUv.x, 1. - vUv.y) * uRes;
  vec2 page = css + vec2(0., uScroll);

  // Tiles in page space: rows alternate by half a tile, and the three motifs follow an uneven order.
  float W = uTileW, H = uTileW * 1.5;
  float row = floor(page.y / H);
  float x = page.x + mod(row, 2.) * .5 * W;
  float tile = floor(x / W);
  vec2 tuv = vec2(fract(x / W), 1. - fract(page.y / H));
  float idx = mod(row * 2. + tile + floor(row * .5), 3.);

  vec4 fl = texture2D(uFlow, vUv);
  float lift = clamp(mix(fl.r, fl.g, .5), 0., 1.);
  lift = mix(lift, .3, uStill);
  lift = mix(lift, 1., uFast * .7);

  float da = texture2D(uTa, tuv).r, db = texture2D(uTb, tuv).r, dc = texture2D(uTc, tuv).r;
  float ma = texture2D(uMa, tuv).r, mb = texture2D(uMb, tuv).r, mc = texture2D(uMc, tuv).r;
  // The drop shadow: relief up and to the left of this point, the higher it rises the longer the shadow.
  vec2 so = tuv + vec2(-1., 1. / 1.5) * (.004 + .016 * lift);
  float ga = texture2D(uMa, so).r, gb = texture2D(uMb, so).r, gc = texture2D(uMc, so).r;
  float g = idx < .5 ? ga : (idx < 1.5 ? gb : gc);
  float here = idx < .5 ? ma : (idx < 1.5 ? mb : mc);
  float det = (idx < .5 ? da : (idx < 1.5 ? db : dc)) - .5;
  float carve = mix(.12, 1., lift);
  float shadow = clamp(g - here * .7, 0., 1.) * lift * .22;

  // Cream plaster (the site's background): fine grain, faint veins, light from the top-left corner of the screen.
  float grain = (fbm(page * .9) - .5) * .035 + (hash(page * 1.7) - .5) * .012;
  float w = fbm(page * .0011 + fbm(page * .0016 + 3.1) * 2.5);
  float vein = 1. - smoothstep(0., .012, abs(w - .5));
  vec2 sp = vec2(vUv.x, 1. - vUv.y);
  float light = 1.03 - .09 * smoothstep(0., 1., length(sp * vec2(.8, 1.)) / 1.28);

  vec3 cream = vec3(.980, .961, .929);
  vec3 col = cream * light * (1. + grain - vein * .02);
  col *= 1. + det * 1.15 * carve;
  col *= 1. - shadow;
  // A faint sheen, from the site's emerald to its peach, where the cursor moved quickly over carved edges.
  vec3 tone = mix(vec3(.055, .353, .333), vec3(.949, .788, .678), .5 + .5 * cos(6.2831 * (det * 4. + uTime * .05)));
  vec3 tint = 1. + (tone / dot(tone, vec3(.3333)) - 1.) * .35;
  col = mix(col, col * tint, fl.b * smoothstep(.02, .3, abs(det)) * .8);
  col = mix(col, clamp((col - .5) * 1.25 + .52, 0., 1.), uFast * .6);

  // Behind the contact section: the cream wall inverted onto charcoal, so the carving reads as engraved.
  // It dims to charcoal first, then the inverse rises.
  vec3 ink = vec3(.042, .025, .015); // html[data-wall-dark] --background, oklch(0.13 0.012 60)
  // The plain inverse, not lifted, so the carving reads but the wall stays near black.
  vec3 night = clamp(ink + cream - col, 0., 1.);
  gl_FragColor = vec4(mix(mix(col, ink, min(uDark * 2., 1.)), night, max(uDark * 2. - 1., 0.)), 1.);
}
`;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp01 = (v: number) => Math.min(0.95, Math.max(0.05, v));
/** Frame-rate independent easing factor for a per-16ms rate. */
const rate = (k: number, dt: number) => 1 - Math.pow(1 - k, dt / 16.67);

/**
 * The ghost cursor: a burst of 1-3 rough strokes (.7-1 s each) from a random point, then parked off the wall for 1-3 s.
 * So patches of the relief rise on their own, even when nobody moves the mouse (and on phones).
 */
function ghostCursor() {
  let from = [0.5, 0.5];
  let to = from;
  let start = 0;
  let length = 0;
  let left = 0;
  let parkedUntil = performance.now() + rand(300, 1200);
  let seed = 0;
  const at = { x: 0.5, y: 0.5, on: 0, speed: 0 };
  return {
    at,
    step(now: number, dt: number) {
      if (now < parkedUntil) {
        at.on = 0;
        at.speed = 0;
        return;
      }
      if (now >= start + length) {
        if (length > 0 && left === 0) {
          parkedUntil = now + rand(1000, 3000);
          length = 0;
          at.on = 0;
          return;
        }
        if (length === 0) {
          left = 1 + Math.floor(Math.random() * 3);
          to = [rand(0.08, 0.92), rand(0.08, 0.92)];
          at.x = to[0];
          at.y = to[1];
        }
        from = to;
        to = [clamp01(from[0] + rand(-0.45, 0.45)), clamp01(from[1] + rand(-0.4, 0.4))];
        start = now;
        length = rand(700, 1000);
        left--;
        seed = Math.random() * 10;
      }
      const t = Math.min(1, (now - start) / length);
      // A "rough" ease: smoothstep with a jitter that vanishes at both ends.
      const e = t * t * (3 - 2 * t) + Math.sin(t * 23 + seed) * 0.035 * Math.sin(Math.PI * t);
      const x = from[0] + (to[0] - from[0]) * e;
      const y = from[1] + (to[1] - from[1]) * e;
      at.speed = Math.min(1, (Math.hypot(x - at.x, y - at.y) / Math.max(dt, 1)) * 1000 * 0.6);
      at.x = x;
      at.y = y;
      at.on = 1;
    },
  };
}

/** Starts the wall on `canvas`; resolves null when WebGL2 or the tiles are missing (the caller shows the still wall instead). */
export async function createWall(canvas: HTMLCanvasElement): Promise<Wall | null> {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;
  const THREE = await import("three");
  const renderer = new THREE.WebGLRenderer({ canvas, context: gl });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.autoClear = false;

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const half = canvas.clientWidth <= 768;
  const loader = new THREE.TextureLoader();
  let tiles: Three.Texture[];
  try {
    const names = ["a", "b", "c"];
    const urls = [
      ...names.map((n) => `/relief/tile-${n}${half ? "-half" : ""}.webp`),
      ...names.map((n) => `/relief/tile-${n}-mask.webp`),
    ];
    tiles = await Promise.all(urls.map((url) => loader.loadAsync(url)));
  } catch {
    renderer.dispose();
    return null;
  }
  for (const tile of tiles) tile.colorSpace = THREE.NoColorSpace;

  // Half floats keep the slow fade smooth; 8-bit targets still work because the fade also subtracts a small step.
  const halfFloat =
    renderer.extensions.has("EXT_color_buffer_half_float") || renderer.extensions.has("EXT_color_buffer_float");
  const target = () =>
    new THREE.WebGLRenderTarget(256, 256, {
      type: halfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });
  let read: Three.WebGLRenderTarget = target();
  let write: Three.WebGLRenderTarget = target();

  const quad = new THREE.PlaneGeometry(2, 2);
  const plain = { depthTest: false, depthWrite: false, blending: THREE.NoBlending };
  const flow = new THREE.ShaderMaterial({
    ...plain,
    vertexShader: VERTEX,
    fragmentShader: FLOW,
    uniforms: {
      uPrev: { value: read.texture },
      uShift: { value: new THREE.Vector2() },
      uDecay: { value: 0.98 },
      uAspect: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector3() },
      uMouseSpeed: { value: 0 },
      uGhost: { value: new THREE.Vector3() },
      uGhostSpeed: { value: 0 },
      uTime: { value: 0 },
    },
  });
  const wall = new THREE.ShaderMaterial({
    ...plain,
    vertexShader: VERTEX,
    fragmentShader: WALL,
    uniforms: {
      uFlow: { value: read.texture },
      uTa: { value: tiles[0] },
      uTb: { value: tiles[1] },
      uTc: { value: tiles[2] },
      uMa: { value: tiles[3] },
      uMb: { value: tiles[4] },
      uMc: { value: tiles[5] },
      uRes: { value: new THREE.Vector2(1, 1) },
      uScroll: { value: 0 },
      uTileW: { value: 720 },
      uTime: { value: 0 },
      uDark: { value: 0 },
      uFast: { value: 0 },
      uStill: { value: still ? 1 : 0 },
    },
  });
  const camera = new THREE.Camera();
  const flowScene = new THREE.Scene();
  const wallScene = new THREE.Scene();
  for (const [scene, material] of [
    [flowScene, flow],
    [wallScene, wall],
  ] as const) {
    const mesh = new THREE.Mesh(quad, material);
    mesh.frustumCulled = false;
    scene.add(mesh);
  }

  const u = wall.uniforms;
  const f = flow.uniforms;
  const look = { dark: 0, fast: 0 };
  const goal = { dark: 0, fast: 0 };
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, on: 0, over: false, speed: 0 };
  const ghost = ghostCursor();
  let width = 1;
  let height = 1;
  let lastScroll = scrollY;
  let fastSpeed = 0;
  let dirty = true;
  let raf = 0;
  let last = performance.now();

  const resize = () => {
    width = Math.max(1, canvas.clientWidth);
    height = Math.max(1, canvas.clientHeight);
    renderer.setSize(width, height, false);
    u.uRes.value.set(width, height);
    u.uTileW.value = width > 768 ? width / 2 : width;
    f.uAspect.value.set(width / height, 1);
    dirty = true;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    mouse.tx = e.clientX / width;
    mouse.ty = 1 - e.clientY / height;
    if (!mouse.over) {
      mouse.x = mouse.tx;
      mouse.y = mouse.ty;
    }
    mouse.over = true;
  };
  const onLeave = () => {
    mouse.over = false;
  };
  if (!still) {
    addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
  }

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(64, now - last);
    last = now;
    const sy = scrollY;
    const dy = sy - lastScroll;
    lastScroll = sy;

    // Fast scrolling: the whole relief rises until the page slows down (mouse and trackpad only).
    if (fine && !still) {
      fastSpeed += (Math.abs(dy) / Math.max(dt, 1) - fastSpeed) * rate(0.2, dt);
      goal.fast = (goal.fast ? fastSpeed > 1.1 : fastSpeed > 2.6) ? 1 : 0;
    }
    const easing = Math.abs(goal.dark - look.dark) + Math.abs(goal.fast - look.fast) > 0.001;
    look.dark += (goal.dark - look.dark) * rate(0.06, dt);
    look.fast += (goal.fast - look.fast) * rate(0.08, dt);

    // Reduced motion: no cursor, no ghost, a fixed middle lift, drawn only when something changed.
    if (still && dy === 0 && !dirty && !easing) return;
    dirty = false;

    const time = now / 1000;
    if (!still) {
      const px = mouse.x;
      const py = mouse.y;
      mouse.x += (mouse.tx - mouse.x) * rate(0.35, dt);
      mouse.y += (mouse.ty - mouse.y) * rate(0.35, dt);
      const v = Math.min(1, (Math.hypot((mouse.x - px) * (width / height), mouse.y - py) / Math.max(dt, 1)) * 1000 * 0.5);
      mouse.speed += (v - mouse.speed) * rate(v > mouse.speed ? 0.1 : 0.04, dt);
      mouse.on += ((mouse.over ? 1 : 0) - mouse.on) * rate(0.1, dt);
      ghost.step(now, dt);

      f.uPrev.value = read.texture;
      f.uShift.value.set(0, dy / height);
      f.uDecay.value = Math.pow(0.98, dt / 16.67);
      f.uMouse.value.set(mouse.x, mouse.y, mouse.on);
      f.uMouseSpeed.value = mouse.speed;
      f.uGhost.value.set(ghost.at.x, ghost.at.y, ghost.at.on);
      f.uGhostSpeed.value = ghost.at.speed;
      f.uTime.value = time;
      renderer.setRenderTarget(write);
      renderer.render(flowScene, camera);
      [read, write] = [write, read];
      u.uFlow.value = read.texture;
    }

    u.uScroll.value = sy;
    u.uTime.value = time;
    u.uDark.value = look.dark;
    u.uFast.value = look.fast;
    renderer.setRenderTarget(null);
    renderer.render(wallScene, camera);
  };
  // Clear the flow map once (render targets start undefined on some drivers).
  renderer.setRenderTarget(read);
  renderer.clear();
  renderer.setRenderTarget(write);
  renderer.clear();
  renderer.setRenderTarget(null);
  raf = requestAnimationFrame(frame);
  canvas.classList.add("on");

  return {
    setDark(dark) {
      goal.dark = dark ? 1 : 0;
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      for (const tile of tiles) tile.dispose();
      read.dispose();
      write.dispose();
      quad.dispose();
      flow.dispose();
      wall.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
