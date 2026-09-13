import { useEffect, useRef, useState } from "react";
import { FaAws } from "react-icons/fa";
import { SiCisco, SiGit, SiUbuntu, SiVirtualbox } from "react-icons/si";

/**
 * Custom inline SVG for GNS3 (no library icon exists).
 * A simple network-topology glyph (nodes + links).
 */
function Gns3Icon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="5" r="2.6" />
      <line x1="6.2" y1="6.8" x2="10" y2="10.4" />
      <circle cx="20" cy="5" r="2.6" />
      <line x1="17.8" y1="6.8" x2="14" y2="10.4" />
      <circle cx="4" cy="19" r="2.6" />
      <line x1="6.2" y1="17.2" x2="10" y2="13.6" />
      <circle cx="20" cy="19" r="2.6" />
      <line x1="17.8" y1="17.2" x2="14" y2="13.6" />
    </svg>
  );
}

/**
 * IconMarquee — draggable, infinite row of tool icons.
 *
 * - Drags left or right with mouse / touch (works both directions).
 * - The tool under your finger/mouse enlarges while you hold & drag.
 * - Clicking or dragging a tool shows a short description below.
 *
 * EDIT the `tools` array below to add/remove tools.
 */
const tools = [
  {
    label: "VirtualBox",
    desc: "Runs multiple operating systems on one machine as lightweight virtual machines.",
    icon: <SiVirtualbox />,
  },
  {
    label: "AWS",
    desc: "Cloud infrastructure — servers, storage, and services deployed at scale.",
    icon: <FaAws />,
  },
  {
    label: "Ubuntu",
    desc: "Linux distribution used for everyday general-purpose development.",
    icon: <SiUbuntu />,
  },
  {
    label: "GNS3",
    desc: "Network emulator for designing virtual routers and network topologies.",
    icon: <Gns3Icon />,
  },
  {
    label: "Cisco Packet Tracer",
    desc: "Practice building, configuring, and testing networks with Cisco gear.",
    icon: <SiCisco />,
  },
  {
    label: "Git",
    desc: "Version control for tracking code changes and collaborating on projects.",
    icon: <SiGit />,
  },
];

/* One full copy of the tools strip scrolls past in this many ms. */
const AUTOPLAY_MS = 15000;

export default function IconMarquee() {
  const [active, setActive] = useState(null); // currently selected tool
  const [shown, setShown] = useState(null); // what the panel renders (kept during fade-out)
  const [fading, setFading] = useState(false); // fade-out in progress
  const [pressed, setPressed] = useState(null); // index currently held (enlarges)
  const [view, setView] = useState(0); // rendered track offset

  const trackRef = useRef(null);
  const gestureRef = useRef(null); // active pointer gesture, if any
  const posRef = useRef(0); // live track offset in px
  const halfRef = useRef(0); // width of one copy (tools are duplicated)
  const pausedRef = useRef(false); // pause autoplay while hovered / just interacted
  const pointerGestureRef = useRef(false); // did the last input start from a pointer?
  const resumeTimerRef = useRef(null);
  const selectTimerRef = useRef(null); // 5s auto-hide timer
  const fadeTimerRef = useRef(null); // fade-out → clear the rendered content

  // Duplicate the list so the strip can loop forever.
  const items = [...tools, ...tools];

  /** Hide the description with a short fade-out. */
  const hideTool = () => {
    clearTimeout(selectTimerRef.current);
    setActive(null);
    setFading(true);
    fadeTimerRef.current = setTimeout(() => setShown(null), 250);
  };

  /**
   * Select a tool and show its description.
   * With `toggle`, selecting the currently shown tool hides it instead.
   */
  const selectTool = (tool, toggle = false) => {
    clearTimeout(selectTimerRef.current);
    clearTimeout(fadeTimerRef.current);
    if (toggle && active?.label === tool.label) {
      hideTool();
      return;
    }
    setActive(tool);
    setShown(tool);
    setFading(false);
    selectTimerRef.current = setTimeout(hideTool, 5000); // auto-hide after 5s
  };

  // Measure one copy of the strip (total width / 2) on load & resize.
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
      clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Auto-hide the tool description 5s after it is selected.
  useEffect(() => () => {
    clearTimeout(selectTimerRef.current);
    clearTimeout(fadeTimerRef.current);
  }, []);

  // Autoplay — slow right-to-left drift that loops forever.
  // Skipped entirely when the user prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();

    const step = (now) => {
      const dt = Math.min(now - last, 100);
      last = now;

      if (!gestureRef.current && !pausedRef.current && halfRef.current > 0) {
        posRef.current -= (halfRef.current / AUTOPLAY_MS) * dt;
        const half = halfRef.current;
        while (posRef.current < -half) posRef.current += half;
        while (posRef.current > 0) posRef.current -= half;
        setView(posRef.current);
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  /** Pause autoplay briefly after an interaction so the strip stays put. */
  const pauseBriefly = () => {
    pausedRef.current = true;
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 1200);
  };

  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const itemEl = e.target.closest(".marquee-item");
    if (!itemEl) return;

    const index = Number(itemEl.dataset.index);
    const wasActive = active?.label === tools[index].label;

    pointerGestureRef.current = true; // this pointer will emit its own click
    gestureRef.current = {
      x: e.clientX,
      start: posRef.current,
      moved: false,
      wasActive,
    };

    // Show the description immediately (tap OR drag — both cover this).
    selectTool(tools[index]);
    setPressed(index);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const g = gestureRef.current;
    if (!g) return;

    const dx = e.clientX - g.x;
    if (Math.abs(dx) > 6) g.moved = true;

    if (g.moved) {
      // Drag scrolls the strip in whichever direction the finger goes.
      posRef.current = g.start + dx;
      const half = halfRef.current;
      if (half > 0) {
        while (posRef.current < -half) posRef.current += half;
        while (posRef.current > 0) posRef.current -= half;
      }
      setView(posRef.current);
    }

    // Enlarge + describe whatever is under the pointer right now.
    const hovered = document
      .elementFromPoint(e.clientX, e.clientY)
      ?.closest(".marquee-item");
    if (hovered) {
      const index = Number(hovered.dataset.index);
      setPressed(index);
      if (active?.label !== tools[index].label) selectTool(tools[index]);
    }
  };

  const handlePointerEnd = (e) => {
    const g = gestureRef.current;
    if (!g) return;

    // A clean tap on the already-selected tool closes the description.
    if (!g.moved && g.wasActive) hideTool();

    gestureRef.current = null;
    setPressed(null);
    pauseBriefly();
    if (e && e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
  };

  /** Button click — covers keyboard activation (Enter/Space). */
  const handleClick = (tool) => {
    if (pointerGestureRef.current) {
      pointerGestureRef.current = false; // consume the click that came from a pointer
      return;
    }
    selectTool(tool, true);
  };

  return (
    <section className="tools" aria-label="Tools I use">
      <div
        className="icon-marquee"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!gestureRef.current) pausedRef.current = false;
        }}
      >
        <div
          className="icon-marquee-track"
          ref={trackRef}
          style={{ transform: `translate3d(${view}px, 0, 0)` }}
        >
          {items.map((tool, i) => {
            const duplicate = i >= tools.length;
            return (
              <button
                type="button"
                className={`marquee-item${
                  pressed === i % tools.length ? " is-pressed" : ""
                }`}
                key={`${tool.label}-${i}`}
                data-index={i % tools.length}
                aria-hidden={duplicate}
                tabIndex={duplicate ? -1 : 0}
                onClick={() => handleClick(tool)}
              >
                <span className="marquee-icon">{tool.icon}</span>
                <span className="marquee-label">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="icon-marquee-info" aria-live="polite">
        <div
          className={`icon-marquee-info-content${fading ? " fade-out" : ""}`}
          key={shown?.label ?? "empty"}
        >
          {shown && (
            <>
              <span className="marquee-info-prefix">&gt;</span>
              <span className="marquee-info-name">{shown.label}</span>
              <span className="marquee-info-desc">{shown.desc}</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}