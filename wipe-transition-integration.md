# Wipe Transition — React Router Integration

## Core Idea

React Router unmounts the old route instantly. To do a wipe transition, you need to **hold onto the old page** while the new one animates in. The strategy:

1. Intercept navigation
2. Store the outgoing page in state
3. Render both pages stacked (`position: absolute`)
4. Animate `clip-path` on the new page + blur effects
5. Discard the old page when animation completes

---

## Setup

```bash
npm install react-router-dom
```

No animation library needed — the transition runs on `requestAnimationFrame` with CSS `clip-path` and `backdrop-filter`.

---

## Implementation

### 1. `WipeTransition.jsx` — The wrapper component

```jsx
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";

const DURATION = 800;
const BLUR_BAND = 120;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function WipeTransition({ children }) {
  const location = useLocation();
  const outlet = useOutlet();

  // Store both the element and its key
  const [current, setCurrent] = useState({ key: location.key, element: outlet });
  const [outgoing, setOutgoing] = useState(null);
  const [progress, setProgress] = useState(0);

  const isAnimating = useRef(false);
  const rafRef = useRef(null);

  // Detect route change
  useEffect(() => {
    if (location.key === current.key) return;
    if (isAnimating.current) return;

    // Freeze the old page, set new page
    setOutgoing(current);
    setCurrent({ key: location.key, element: outlet });
    setProgress(0);
    isAnimating.current = true;

    const start = performance.now();
    const animate = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      setProgress(easeInOutCubic(t));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setOutgoing(null);
        setProgress(0);
        isAnimating.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [location.key, outlet]);

  const wipePos = progress * 100;
  const blur = Math.sin(progress * Math.PI) * 28;

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* OLD page (underneath) */}
      {outgoing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: `blur(${blur * 0.3}px)`,
            zIndex: 0,
          }}
        >
          {outgoing.element}
        </div>
      )}

      {/* Blur band on old page */}
      {outgoing && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `calc(${wipePos}% - ${BLUR_BAND}px)`,
              width: BLUR_BAND,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: "linear-gradient(to right, transparent, black)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black)",
            }}
          />
        </div>
      )}

      {/* NEW page (clipped, on top) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: outgoing ? `inset(0 ${100 - wipePos}% 0 0)` : "none",
          filter: outgoing ? `blur(${blur * 0.3}px)` : "none",
          zIndex: 2,
        }}
      >
        {current.element}

        {/* Blur band on new page */}
        {outgoing && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `calc(${wipePos}%)`,
              width: BLUR_BAND,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: "linear-gradient(to left, transparent, black)",
              WebkitMaskImage: "linear-gradient(to left, transparent, black)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Sweeping line */}
      {outgoing && (
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
            boxShadow: "0 0 40px 12px rgba(255,255,255,0.4), 0 0 100px 30px rgba(255,255,255,0.15)",
          }}
        />
      )}
    </div>
  );
}
```

### 2. `App.jsx` — Router setup

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WipeTransition from "./WipeTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WipeTransition />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

The key detail: `WipeTransition` is a **layout route** (no `path`). All child routes render through it via `useOutlet()`.

### 3. Pages — no special setup needed

```jsx
// pages/Home.jsx
export default function Home() {
  return (
    <div style={{ height: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <h1>Home</h1>
    </div>
  );
}
```

Pages don't need any awareness of the transition. They're just normal components.

---

## How It Works

```
Route changes
     │
     ▼
useEffect detects location.key changed
     │
     ├─ Freeze current outlet → outgoing state
     ├─ Store new outlet → current state
     ├─ Start rAF loop (0 → 1 over 800ms)
     │
     ▼
Each frame:
  ┌──────────────────────────────────┐
  │  OLD page    │▓▓│   NEW page     │
  │  (full)      │▓▓│   (clipped)    │
  │              │▓▓│                 │
  │  blur fades  │▓▓│  blur fades    │
  │  out ←       │▓▓│     → out      │
  └──────────────────────────────────┘
                 wipe line moves →

  clip-path: inset(0 ${100 - progress}% 0 0)
  blur: sin(progress × π) — peaks mid-transition
     │
     ▼
progress hits 1 → discard outgoing, clear clip
```

---

## Customization

| Param | Where | Effect |
|---|---|---|
| `DURATION` | Top of file | Transition speed (ms) |
| `BLUR_BAND` | Top of file | Width of blur zone (px) |
| `blur * 0.3` | Page filter | Global page blur amount |
| `* 28` | `blur` calc | Peak blur intensity |
| `easeInOutCubic` | Easing fn | Swap for any easing curve |
| Line color | Inline style | Change `#fff` to match your theme |

### Direction support

The integration above only does left-to-right. To support both directions, track which direction the user is navigating:

```jsx
const prevIndex = useRef(0);

// In your nav links, pass state:
<Link to="/about" state={{ index: 1 }}>About</Link>

// In WipeTransition, detect direction:
const navIndex = location.state?.index ?? 0;
const dir = navIndex > prevIndex.current ? 1 : -1;
prevIndex.current = navIndex;
```

Then flip the `clip-path` and blur band positions based on `dir`, same as in the demo component.

---

## Gotchas

- **Scroll position** — The old page is frozen in state, so scroll position is preserved naturally. Reset scroll on the new page with `window.scrollTo(0, 0)` in a `useEffect` if needed.
- **Heavy pages** — Both pages are in the DOM simultaneously during the transition. If pages are expensive, consider wrapping the outgoing page in `React.memo` or taking a snapshot.
- **`useOutlet` vs `<Outlet />`** — We use the hook `useOutlet()` because it returns the element directly, which we can store in state. `<Outlet />` always renders the current route, which defeats the purpose.
- **Concurrent navigations** — The `isAnimating` ref blocks new transitions mid-animation. If you want interruptible transitions, you'd need to cancel the current animation and blend into the new one.
