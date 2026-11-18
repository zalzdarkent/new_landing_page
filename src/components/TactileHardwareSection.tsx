import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const HARMONIC_PRESETS = [
  { label: '1 : 1 UNISON', fx: 1, fy: 1, torque: '0.18 N·m' },
  { label: '1 : 1.414 ISO', fx: 1, fy: 1.414, torque: '0.24 N·m' },
  { label: '1 : 1.618 PHI', fx: 1, fy: 1.618, torque: '0.32 N·m' },
  { label: '2 : 3 FIFTH', fx: 2, fy: 3, torque: '0.28 N·m' },
  { label: '3 : 4 FOURTH', fx: 3, fy: 4, torque: '0.36 N·m' },
] as const;

export function TactileHardwareSection({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const [detentStep, setDetentStep] = useState(8); // 0..23 (15 deg per step)
  const [presetIdx, setPresetIdx] = useState(2);
  const [vectorCursor, setVectorCursor] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({ x: 0.5, y: 0.5, active: false });

  const lissajousPathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const angleDeg = detentStep * 15;
  const activePreset = HARMONIC_PRESETS[presetIdx];

  // Always-on Lissajous harmonic phase animation (gated by visibility + reducedMotion)
  useEffect(() => {
    const pathEl = lissajousPathRef.current;
    if (!pathEl) return;

    const buildPath = (phase: number) => {
      const pts: string[] = [];
      const steps = 120;
      const freqX = activePreset.fx;
      const freqY = activePreset.fy + (detentStep - 8) * 0.02;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const x = 110 + Math.sin(freqX * t + phase) * 76;
        const y = 90 + Math.sin(freqY * t) * 64;
        pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      return pts.join(' ');
    };

    if (reducedMotion) {
      pathEl.setAttribute('d', buildPath(0.6));
      return;
    }

    let raf = 0;
    let phase = 0;
    let isVisible = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    const tick = () => {
      if (isVisible) {
        phase += 0.018;
        pathEl.setAttribute('d', buildPath(phase));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [activePreset, detentStep, reducedMotion]);

  return (
    <section
      id="taktil"
      ref={sectionRef}
      aria-label="Taktil-04 Hardware Instrumentation Console"
      className="border-t border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom)] py-[clamp(5rem,10vw,9rem)] text-[var(--ink-on-dark)]"
    >
      <div className="fw-container">
        {/* Header */}
        <div className="fw-grid mb-12 items-end border-b border-[var(--border-hairline-dark)] pb-6 lg:mb-16">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--accent-vermilion)]">
              PHYSICAL-TO-DIGITAL INSTRUMENTATION
            </span>
            <h2 className="type-h1 text-[var(--ink-on-dark)]">
              Taktil-04{' '}
              <span className="type-serif-accent font-normal">Reference</span>{' '}
              Deck
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:text-right">
            <span className="type-meta text-[var(--ink-on-dark-muted)]">
              OPERATE ROTARY DETENTS, VECTOR FIELD &amp; HARMONIC SYNTH
            </span>
          </div>
        </div>

        {/* 3-Instrument Console Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Instrument 01: 24-Detent Rotary Encoder (Cols 1-4) */}
          <div className="flex flex-col justify-between rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-6 lg:col-span-4">
            <div className="flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-3">
              <span className="type-meta text-[var(--ink-on-dark-muted)]">
                24-DETENT ENCODER
              </span>
              <span className="type-meta text-[var(--accent-vermilion)]">
                {String(angleDeg).padStart(3, '0')}°
              </span>
            </div>

            {/* Interactive SVG Rotary Dial */}
            <div className="my-6 flex flex-col items-center justify-center">
              <div className="relative h-52 w-52">
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="84"
                    fill="#161614"
                    stroke="rgba(242,240,236,0.16)"
                    strokeWidth="1"
                  />
                  {/* 24 Clickable Detent Notches */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const rad = ((i * 15 - 90) * Math.PI) / 180;
                    const x1 = 100 + Math.cos(rad) * 68;
                    const y1 = 100 + Math.sin(rad) * 68;
                    const x2 = 100 + Math.cos(rad) * 80;
                    const y2 = 100 + Math.sin(rad) * 80;
                    const isSelected = i === detentStep;
                    return (
                      <g
                        key={i}
                        onClick={() => setDetentStep(i)}
                        className="cursor-pointer"
                      >
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={
                            isSelected ? '#D9381E' : 'rgba(242,240,236,0.35)'
                          }
                          strokeWidth={isSelected ? '3' : i % 6 === 0 ? '2' : '1'}
                        />
                      </g>
                    );
                  })}

                  {/* Inner Machined Cap */}
                  <circle
                    cx="100"
                    cy="100"
                    r="50"
                    fill="#1F1F1C"
                    stroke="rgba(242,240,236,0.22)"
                    strokeWidth="1.2"
                  />
                </svg>

                {/* Spring-Damped Rotary Indicator Needle */}
                <motion.div
                  animate={{ rotate: angleDeg }}
                  transition={
                    reducedMotion
                      ? { duration: 0.01 }
                      : { type: 'spring', stiffness: 240, damping: 22 }
                  }
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <div className="h-24 w-0.5 -translate-y-6 bg-[var(--accent-vermilion)]" />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="type-meta text-[10px] text-[var(--ink-on-dark-muted)]">
                    STEP
                  </span>
                  <span className="font-mono text-lg font-bold tabular-nums text-[var(--ink-on-dark)]">
                    {String(detentStep + 1).padStart(2, '0')}/24
                  </span>
                </div>
              </div>

              <div className="mt-4 flex w-full items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setDetentStep((s) => (s + 23) % 24)}
                  className="fw-btn-tactile type-meta min-h-[38px] flex-1 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#161614] text-[var(--ink-on-dark)] hover:border-[var(--accent-vermilion)]"
                >
                  − STEP CCW
                </button>
                <button
                  type="button"
                  onClick={() => setDetentStep((s) => (s + 1) % 24)}
                  className="fw-btn-tactile type-meta min-h-[38px] flex-1 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#161614] text-[var(--ink-on-dark)] hover:border-[var(--accent-vermilion)]"
                >
                  + STEP CW
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border-hairline-dark)] pt-3 text-[var(--ink-on-dark-muted)]">
              <span className="type-meta">TORQUE: {activePreset.torque}</span>
              <span className="type-meta">15° MECHANICAL LOCK</span>
            </div>
          </div>

          {/* Instrument 02: Cursor-Reactive Magnetic Vector Field (Cols 5-8) */}
          <div
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setVectorCursor({
                x: (e.clientX - r.left) / r.width,
                y: (e.clientY - r.top) / r.height,
                active: true,
              });
            }}
            onPointerLeave={() =>
              setVectorCursor((prev) => ({ ...prev, active: false }))
            }
            data-cursor="drag"
            data-cursor-label="FIELD"
            className="flex flex-col justify-between rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-6 lg:col-span-4"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-3">
              <span className="type-meta text-[var(--ink-on-dark-muted)]">
                MAGNETIC VECTOR ARRAY
              </span>
              <span className="type-meta text-[var(--accent-vermilion)]">
                {vectorCursor.active ? 'COUPLED' : 'STANDBY'}
              </span>
            </div>

            <div className="my-6 flex flex-1 items-center justify-center rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#161614] p-4">
              <div className="grid w-full grid-cols-9 gap-3 py-2">
                {Array.from({ length: 54 }).map((_, idx) => {
                  const col = idx % 9;
                  const row = Math.floor(idx / 9);
                  const nx = (col + 0.5) / 9;
                  const ny = (row + 0.5) / 6;
                  const dx = vectorCursor.x - nx;
                  const dy = vectorCursor.y - ny;
                  const dist = Math.hypot(dx, dy);
                  const angle = vectorCursor.active
                    ? (Math.atan2(dy, dx) * 180) / Math.PI + 90
                    : angleDeg * 0.5 + (col + row) * 8;
                  const near = vectorCursor.active && dist < 0.28;

                  return (
                    <div
                      key={idx}
                      className="flex h-5 items-center justify-center"
                    >
                      <span
                        style={{
                          transform: `rotate(${angle.toFixed(1)}deg) scaleY(${
                            near ? 1.35 : 1
                          })`,
                          backgroundColor: near
                            ? '#D9381E'
                            : 'rgba(242,240,236,0.45)',
                        }}
                        className="block h-3.5 w-[1.5px] rounded-full transition-colors duration-150"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border-hairline-dark)] pt-3 text-[var(--ink-on-dark-muted)]">
              <span className="type-meta">54 ORTHOGRAPHIC VECTORS</span>
              <span className="type-meta">SWEEP POINTER TO ALIGN</span>
            </div>
          </div>

          {/* Instrument 03: Live Harmonic Lissajous Synthesizer (Cols 9-12) */}
          <div className="flex flex-col justify-between rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-6 lg:col-span-4">
            <div className="flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-3">
              <span className="type-meta text-[var(--ink-on-dark-muted)]">
                HARMONIC RATIO SYNTH
              </span>
              <span className="type-meta text-[var(--accent-vermilion)]">
                {activePreset.label}
              </span>
            </div>

            <div className="my-5 flex flex-col items-center">
              <div className="relative flex h-48 w-full items-center justify-center rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#161614] p-2">
                <svg
                  viewBox="0 0 220 180"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <line
                    x1="110"
                    y1="10"
                    x2="110"
                    y2="170"
                    stroke="rgba(242,240,236,0.12)"
                    strokeDasharray="2 4"
                  />
                  <line
                    x1="15"
                    y1="90"
                    x2="205"
                    y2="90"
                    stroke="rgba(242,240,236,0.12)"
                    strokeDasharray="2 4"
                  />
                  <path
                    ref={lissajousPathRef}
                    fill="none"
                    stroke="#D9381E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="mt-4 grid w-full grid-cols-5 gap-1">
                {HARMONIC_PRESETS.map((p, idx) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPresetIdx(idx)}
                    className={`type-meta min-h-[34px] rounded-[2px] border text-[10px] transition-colors ${
                      presetIdx === idx
                        ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                        : 'border-[var(--border-hairline-dark)] bg-[#161614] text-[var(--ink-on-dark-muted)] hover:text-[var(--ink-on-dark)]'
                    }`}
                  >
                    {p.fx}:{p.fy}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border-hairline-dark)] pt-3 text-[var(--ink-on-dark-muted)]">
              <span className="type-meta">PHASE-LOCKED OSCILLATOR</span>
              <span className="type-meta">COUPLED TO ENCODER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

