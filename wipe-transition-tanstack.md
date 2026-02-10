# Wipe Transition — TanStack Router Integration

TanStack Router doesn't have a `useOutlet` hook like React Router, so you can't easily grab the outgoing element and hold it in state. The workaround is to **snapshot the old page's DOM** before the new route renders, then display that snapshot underneath the incoming page during the wipe.

---

## Install

```bash
npm install @tanstack/react-router
```

No animation library needed.

---

## The Problem

TanStack Router's `<Outlet />` always renders the **current** matched route. The moment the route changes, the old content is gone. There's no hook to "freeze" it. The community has discussed this extensively ([#823](https://github.com/TanStack/router/discussions/823), [#1831](https://github.com/TanStack/router/discussions/1831)) and the snapshot approach is the most reliable solution.

---

## Implementation

### 1. `WipeTransition.tsx` — The transition wrapper

```tsx
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";

const DURATION = 800;
const BLUR_BAND = 120;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function WipeTransition() {
  const { pathname, status } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      status: s.status,
    }),
  });

  const outletRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<string | null>(null);
  const prevPathRef = useRef(pathname);
  const isReady = useRef(false);

  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animating = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Take a snapshot when route starts changing
  useLayoutEffect(() => {
    if (status === "idle") {
      isReady.current = true;
    }

    if (status === "pending" && isReady.current && outletRef.current) {
      // Capture the current outlet's rendered HTML
      snapshotRef.current = outletRef.current.innerHTML;
    }
  }, [status]);

  // Animate when pathname actually changes
  useEffect(() => {
    if (pathname === prevPathRef.current) return;
    if (animating.current) return;

    prevPathRef.current = pathname;

    // Only animate if we have a snapshot
    if (!snapshotRef.current) return;

    animating.current = true;
    setIsAnimating(true);
    setProgress(0);

    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setProgress(easeInOutCubic(t));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setProgress(0);
        snapshotRef.current = null;
        animating.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]);

  const wipePos = progress * 100;
  const blur = Math.sin(progress * Math.PI) * 28;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* OLD page snapshot (underneath) */}
      {isAnimating && snapshotRef.current && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              filter: `blur(${blur * 0.3}px)`,
              zIndex: 0,
            }}
            dangerouslySetInnerHTML={{ __html: snapshotRef.current }}
          />

          {/* Blur band — old page side */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `calc(${wipePos}% - ${BLUR_BAND}px)`,
                width: BLUR_BAND,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                maskImage:
                  "linear-gradient(to right, transparent, black)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black)",
              }}
            />
          </div>
        </>
      )}

      {/* NEW page (current Outlet) */}
      <div
        ref={outletRef}
        style={{
          position: isAnimating ? "absolute" : "relative",
          inset: isAnimating ? 0 : undefined,
          clipPath: isAnimating
            ? `inset(0 ${100 - wipePos}% 0 0)`
            : "none",
          filter: isAnimating ? `blur(${blur * 0.3}px)` : "none",
          zIndex: 2,
          minHeight: "100vh",
        }}
      >
        <Outlet />

        {/* Blur band — new page side */}
        {isAnimating && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `calc(${wipePos}%)`,
              width: BLUR_BAND,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage:
                "linear-gradient(to left, transparent, black)",
              WebkitMaskImage:
                "linear-gradient(to left, transparent, black)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Sweeping line */}
      {isAnimating && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${wipePos}%`,
            width: 2,
            background: "#fff",
            zIndex: 4,
            transform: "translateX(-50%)",
            boxShadow:
              "0 0 40px 12px rgba(255,255,255,0.4), 0 0 100px 30px rgba(255,255,255,0.15)",
          }}
        />
      )}
    </div>
  );
}
```

### 2. Root route — use it as the layout

**File-based routing** (`routes/__root.tsx`):

```tsx
import { createRootRoute } from "@tanstack/react-router";
import { WipeTransition } from "../components/WipeTransition";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>{/* your nav here */}</nav>
      <WipeTransition />
    </>
  ),
});
```

**Code-based routing**:

```tsx
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { WipeTransition } from "./WipeTransition";
import Home from "./pages/Home";
import About from "./pages/About";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <nav>{/* your nav links */}</nav>
      <WipeTransition />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

export const router = createRouter({ routeTree });
```

### 3. Pages — nothing special

```tsx
// routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div style={{ height: "100vh", background: "#0a0a0a", color: "#fff", padding: 60 }}>
      <h1>Home</h1>
    </div>
  ),
});
```

---

## How It Works

```
1. User clicks a <Link>
2. TanStack Router status → "pending"
3. useLayoutEffect fires:
   └─ Snapshot outletRef.current.innerHTML
4. Route resolves, status → "idle"
5. pathname changes, useEffect fires:
   ├─ Render snapshot via dangerouslySetInnerHTML (old page)
   ├─ Render <Outlet /> with clip-path (new page)
   ├─ Start rAF animation loop
   └─ Sweeping line + blur bands animate
6. Animation completes:
   └─ Clear snapshot, remove clip-path
```

The key difference from React Router: we use **`dangerouslySetInnerHTML`** to display the frozen old page, since TanStack Router doesn't let us hold onto the old React element tree.

---

## Tradeoffs of the Snapshot Approach

**Works well for:**
- Static or mostly-static page content
- Text, images, styled layouts
- Most typical page transitions

**Limitations:**
- The snapshot is inert HTML — no interactivity (event handlers, state) on the old page during the transition. This is usually fine since the old page is just fading out.
- If the old page had playing videos or canvases, they'll appear frozen in the snapshot.
- Any CSS animations on the old page will restart or freeze.

**Alternatives if you need a live old page:**
- Clone the entire router context (heavier, discussed in TanStack [#823](https://github.com/TanStack/router/discussions/823))
- Use the browser's native View Transition API (`document.startViewTransition()`) — TanStack Router has a built-in option for this: set `viewTransition: true` on your `createRouter()` call

---

## Customization

| Param | Default | Effect |
|---|---|---|
| `DURATION` | `800` | Transition speed (ms) |
| `BLUR_BAND` | `120` | Width of blur zone (px) |
| `* 28` | `28` | Peak blur intensity |
| `* 0.3` | `0.3` | Global page blur multiplier |
| Line styles | `#fff` | Color, glow, width of sweeping line |

### Custom line color per route

You can pass route-specific accent colors through TanStack Router's context:

```tsx
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
  context: () => ({ accent: "#ff6b35" }),
});

// In WipeTransition, read it:
const matches = useRouterState({ select: (s) => s.matches });
const accent = matches.at(-1)?.context?.accent ?? "#fff";
```

### Bidirectional wipe

Track route order to determine direction:

```tsx
const routeOrder = ["/", "/about", "/work", "/contact"];

// In WipeTransition:
const prevIndex = routeOrder.indexOf(prevPathRef.current);
const nextIndex = routeOrder.indexOf(pathname);
const direction = nextIndex > prevIndex ? 1 : -1;
```

Then flip `clip-path` and blur band positions based on direction, same as the standalone demo.

---

## Native View Transition Alternative

If you don't need the custom line + blur effect and just want smooth page transitions, TanStack Router supports the View Transition API natively:

```tsx
const router = createRouter({
  routeTree,
  defaultViewTransition: true,
});
```

This uses `document.startViewTransition()` under the hood — zero custom code, but limited to cross-fade by default. You can customize it with CSS `::view-transition-*` pseudo-elements, but you won't get the sweeping line + blur effect without the manual approach above.
