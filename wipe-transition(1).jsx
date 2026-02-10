import { useState, useEffect, useCallback, useRef } from "react";

const TRANSITION_DURATION = 800;
const BLUR_BAND_WIDTH = 120;

const pages = [
  {
    id: 0,
    title: "Meridian",
    subtitle: "Design Studio",
    bg: "#0a0a0a",
    accent: "#e4ff1a",
    body: "We craft digital experiences that transcend the ordinary. Every pixel, every interaction — intentional.",
  },
  {
    id: 1,
    title: "Solstice",
    subtitle: "Collection '26",
    bg: "#1a0a2e",
    accent: "#ff6b35",
    body: "Where light meets shadow. A curated exploration of contrast, texture, and bold expression.",
  },
  {
    id: 2,
    title: "Tidepool",
    subtitle: "Immersive Lab",
    bg: "#0b1d26",
    accent: "#00e5a0",
    body: "Dive into generative worlds. Real-time visuals shaped by data, sound, and human gesture.",
  },
];

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function PageContent({ page, style }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: page.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${page.accent}08 1px, transparent 1px),
            linear-gradient(90deg, ${page.accent}08 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${page.accent}20, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, padding: "0 40px" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: page.accent,
            marginBottom: 16,
            opacity: 0.9,
          }}
        >
          {page.subtitle}
        </div>
        <h1
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 400,
            color: "#fff",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {page.title}
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            marginTop: 24,
            maxWidth: 420,
          }}
        >
          {page.body}
        </p>
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: `1.5px solid ${page.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: page.accent,
              fontSize: 18,
            }}
          >
            →
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Explore
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WipeTransition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const isTransitioning = useRef(false);
  const animFrameRef = useRef(null);

  const startTransition = useCallback(
    (dir) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      const next =
        dir === 1
          ? (currentIndex + 1) % pages.length
          : (currentIndex - 1 + pages.length) % pages.length;

      setDirection(dir);
      setNextIndex(next);
      setProgress(0);

      const start = performance.now();
      const animate = (now) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / TRANSITION_DURATION, 1);
        const eased = easeInOutCubic(t);
        setProgress(eased);

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCurrentIndex(next);
          setNextIndex(null);
          setProgress(0);
          isTransitioning.current = false;
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [currentIndex]
  );

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") startTransition(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") startTransition(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [startTransition]);

  const currentPage = pages[currentIndex];
  const nextPage = nextIndex !== null ? pages[nextIndex] : null;
  const wipePos = progress * 100;

  // Blur peaks mid-transition, fades at start/end
  const blurIntensity = Math.sin(progress * Math.PI) * 28;

  const getNewPageClip = () => {
    if (direction === 1) return `inset(0 ${100 - wipePos}% 0 0)`;
    return `inset(0 0 0 ${100 - wipePos}%)`;
  };

  const getLinePosition = () => {
    if (direction === 1) return `${wipePos}%`;
    return `${100 - wipePos}%`;
  };

  const lineAccent = nextPage ? nextPage.accent : currentPage.accent;

  // Compute blur band positions for old page side
  const oldBlurLeft =
    direction === 1
      ? `calc(${wipePos}% - ${BLUR_BAND_WIDTH}px)`
      : `calc(${100 - wipePos}%)`;
  const oldBlurMask =
    direction === 1
      ? "linear-gradient(to right, transparent, black)"
      : "linear-gradient(to left, transparent, black)";

  // Compute blur band positions for new page side
  const newBlurLeft =
    direction === 1
      ? `calc(${wipePos}%)`
      : `calc(${100 - wipePos}% - ${BLUR_BAND_WIDTH}px)`;
  const newBlurMask =
    direction === 1
      ? "linear-gradient(to left, transparent, black)"
      : "linear-gradient(to right, transparent, black)";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=JetBrains+Mono:wght@400&family=DM+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* ─── OLD PAGE (base layer) ─── */}
      <PageContent
        page={currentPage}
        style={
          nextPage
            ? { filter: `blur(${blurIntensity * 0.3}px)`, willChange: "filter" }
            : {}
        }
      />

      {/* ─── BLUR BAND on OLD page side (localized near wipe edge) ─── */}
      {nextPage && (
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
              left: oldBlurLeft,
              width: BLUR_BAND_WIDTH,
              backdropFilter: `blur(${blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${blurIntensity}px)`,
              willChange: "left, backdrop-filter",
              maskImage: oldBlurMask,
              WebkitMaskImage: oldBlurMask,
            }}
          />
        </div>
      )}

      {/* ─── NEW PAGE (clipped, revealed progressively) ─── */}
      {nextPage && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: getNewPageClip(),
            willChange: "clip-path",
            zIndex: 2,
          }}
        >
          <PageContent
            page={nextPage}
            style={{
              filter: `blur(${blurIntensity * 0.3}px)`,
              willChange: "filter",
            }}
          />

          {/* BLUR BAND on NEW page side */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: newBlurLeft,
              width: BLUR_BAND_WIDTH,
              backdropFilter: `blur(${blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${blurIntensity}px)`,
              willChange: "left, backdrop-filter",
              maskImage: newBlurMask,
              WebkitMaskImage: newBlurMask,
              zIndex: 1,
            }}
          />
        </div>
      )}

      {/* ─── SWEEPING LINE ─── */}
      {nextPage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: getLinePosition(),
            width: 2,
            background: lineAccent,
            zIndex: 4,
            transform: "translateX(-50%)",
            willChange: "left",
            boxShadow: `
              0 0 40px 12px ${lineAccent}70,
              0 0 100px 30px ${lineAccent}30,
              0 0 160px 50px ${lineAccent}15
            `,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: lineAccent,
              boxShadow: `0 0 24px 8px ${lineAccent}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: `${20 + Math.sin(progress * Math.PI * 3) * 8}%`,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: lineAccent,
              opacity: blurIntensity / 28,
              boxShadow: `0 0 12px 4px ${lineAccent}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: `${80 - Math.sin(progress * Math.PI * 2.5) * 8}%`,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: lineAccent,
              opacity: blurIntensity / 28,
              boxShadow: `0 0 12px 4px ${lineAccent}`,
            }}
          />
        </div>
      )}

      {/* ─── NAVIGATION ─── */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 24,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => startTransition(-1)}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.5)")}
          onMouseLeave={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
        >
          ←
        </button>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {pages.map((p, i) => (
            <div
              key={p.id}
              style={{
                width: i === currentIndex ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === currentIndex ? currentPage.accent : "rgba(255,255,255,0.2)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => startTransition(1)}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.5)")}
          onMouseLeave={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
        >
          →
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.2)",
          zIndex: 10,
        }}
      >
        ARROW KEYS OR CLICK
      </div>
    </div>
  );
}
