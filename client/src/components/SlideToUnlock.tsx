import React, { useRef, useState, useEffect } from "react";

// SlideToUnlock.jsx
// A compact, accessible, Tailwind-ready React component that implements
// a slide to unlock control. The component uses pointer events so it works
// with mouse, touch, and pen input.
//
// Exports a default React component. All props are documented below.

export default function SlideToUnlock({
  width = 340,                 // total width in pixels
  height = 56,                 // total height in pixels
  knobSize = 48,               // diameter of the circular knob
  text = "slide to register",  // label shown inside the track
  onUnlock = () => {},         // called when unlocked
  successTimeout = 1200,       // ms to show success state before optional reset
  resetAfter = 3000,           // ms after unlocking to auto-reset. 0 disables auto-reset
  disabled = false,            // disable interaction
  trackClassName = "bg-gray-200 dark:bg-black/20 backdrop-blur-lg",
  knobClassName = "bg-white shadow",
  successClassName = "bg-blue-500",
}) {


  // refs and state
  const trackRef = useRef(null);
  const knobRef = useRef(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const [progress, setProgress] = useState(0); // 0..1
  const [unlocked, setUnlocked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Derived sizes
  const trackPadding = Math.max(4, (height - knobSize) / 2);
  const usableWidth = Math.max(4, width - knobSize - trackPadding * 2);

  // clamp helper
  function clamp(v: number, a: number = 0, b: number = 1): number {
    return Math.min(b, Math.max(a, v));
  }

  // pointer handlers
  useEffect(() => {
    function onPointerMove(e: PointerEvent | TouchEvent) {
      if (!draggingRef.current || !trackRef.current) return;
      let clientX: number | undefined;
      if ("touches" in e && e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
      } else if ("clientX" in e) {
        clientX = (e as PointerEvent).clientX;
      }
      if (clientX == null) return;
      const delta = clientX - startXRef.current;
      const frac = clamp(delta / usableWidth);
      setProgress(frac);
      e.preventDefault();
    }

    function onPointerUp(): void {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      // Snap logic: consider it unlocked if progress >= 0.9
      if (progress >= 0.9) {
      handleUnlock();
      } else {
      // smoothly reset to 0
      setProgress(0);
      }
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [progress, usableWidth]);

  // Handle both pointer and touch events
  function onPointerDown(
    e: React.PointerEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    if (disabled || unlocked) return;
    draggingRef.current = true;
    let clientX: number;
    if ("touches" in e && e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else if ("clientX" in e) {
      clientX = (e as React.PointerEvent<HTMLDivElement>).clientX;
    } else {
      clientX = 0;
    }
    startXRef.current = clientX - progress * usableWidth;
    // ensure focus for keyboard support
    if (knobRef.current) (knobRef.current as HTMLElement).focus();
    e.preventDefault();
  }

  function handleUnlock() {
    if (unlocked) return;
    setProgress(1);
    setUnlocked(true);
    setIsSuccess(true);
    try {
      onUnlock();
    } catch (err) {
      // swallow errors from the callback so UI remains stable
      // The caller should handle their own errors
      console.error(err);
    }

    // clear success state after successTimeout
    setTimeout(() => setIsSuccess(false), successTimeout);

    // optionally reset after resetAfter ms
    if (resetAfter && resetAfter > 0) {
      setTimeout(() => {
        setUnlocked(false);
        setProgress(0);
      }, resetAfter);
    }
  }

  // keyboard support: ArrowRight to move, Enter to complete
  interface KeyDownEvent extends React.KeyboardEvent<HTMLDivElement> {}

  function onKeyDown(e: KeyDownEvent): void {
    if (disabled || unlocked) return;
    if (e.key === "ArrowRight") {
      setProgress((p) => clamp(p + 0.05));
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      setProgress((p) => clamp(p - 0.05));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (progress >= 0.9) handleUnlock();
      else setProgress((p) => clamp(p + 0.2));
    }
  }

  // accessible label for screen readers
  const ariaLabel = unlocked ? "Unlocked" : "Slide to unlock control";

  // Inline style helpers for smooth animation
  const knobTransform = { transform: `translateX(${progress * usableWidth}px)` };
  const fillWidth = Math.max(0, progress * usableWidth + knobSize / 2);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      style={{ width, height }}
      className={`relative select-none user-select-none ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* Track background */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onTouchStart={onPointerDown}
        style={{ height, borderRadius: height / 2 }}
        className={`flex items-center p-1 ${trackClassName} transition-colors duration-200`}
      >
        {/* Filled portion behind the knob */}
        <div
          aria-hidden
          style={{ width: fillWidth, height: height - trackPadding * 2, borderRadius: (height - trackPadding * 2) / 2 }}
          className={`absolute left-0 top-0 ml-${trackPadding} ${isSuccess ? successClassName : "bg-transparent"} transition-all duration-150`}
        />

        {/* Label in the center */}
        <div className="flex-1 text-center pointer-events-none">
          <div className={`font-medium ${isSuccess ? "text-white" : "text-gray-700 dark:text-gray-200"}`}>
            {isSuccess ? "Redirecting" : text}
          </div>
        </div>

        {/* Knob */}
        <div
          ref={knobRef}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-pressed={unlocked}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onTouchStart={onPointerDown}
          style={{ width: knobSize, height: knobSize, borderRadius: knobSize / 2, ...knobTransform }}
          className={`absolute top-1/2 -translate-y-1/2 left-1 ${knobClassName} flex items-center justify-center transition-transform duration-75 focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          {/* simple chevron icon using SVG */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M8 5l7 7-7 7" stroke={isSuccess ? "white" : "#333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* visually hidden status for screen readers */}
      <div className="sr-only" aria-live="polite">
        {unlocked ? "Unlocked" : `Progress ${Math.round(progress * 100)} percent`}
      </div>
    </div>
  );
}
