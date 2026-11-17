import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOLAR_INTERVALS = [
  {
    id: 'dawn',
    time: '08:00 CET',
    label: 'EASTERN CLERESTORY',
    lux: '420 LUX',
    angle: '14.2°',
    filter: 'brightness(0.88) contrast(1.08) sepia(0.08)',
  },
  {
    id: 'zenith',
    time: '12:15 CET',
    label: 'OCULUS DIRECT',
    lux: '4,800 LUX',
    angle: '68.5°',
    filter: 'brightness(1.02) contrast(1.04) sepia(0)',
  },
  {
    id: 'dusk',
    time: '17:40 CET',
    label: 'WESTERN GRAZING',
    lux: '610 LUX',
    angle: '11.8°',
    filter: 'brightness(0.76) contrast(1.15) sepia(0.18)',
  },
] as const;

export function SpatialApertureSection({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [aperturePct, setAperturePct] = useState(reducedMotion ? 100 : 24);
  const [solarIdx, setSolarIdx] = useState(1);

  useEffect(() => {
    if (reducedMotion || !trackRef.current || !frameRef.current || !imgRef.current)
      return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
      },
      (context) => {
        const isMobile = context.conditions?.mobile;
        const startClip = isMobile
          ? 'inset(14% 6% 14% 6% round 2px)'
          : 'inset(16% 18% 16% 18% round 2px)';

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              setAperturePct(Math.round(24 + p * 76));
              if (p < 0.33) setSolarIdx(0);
              else if (p < 0.72) setSolarIdx(1);
              else setSolarIdx(2);
            },
          },
        });

        tl.fromTo(
          frameRef.current,
          { clipPath: startClip },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
          0
        ).fromTo(imgRef.current, { scale: 1.24 }, { scale: 1 }, 0);
      }
    );

    return () => mm.revert();
  }, [reducedMotion]);

  const activeSolar = SOLAR_INTERVALS[solarIdx];

  return (
    <section
      id="aperture"
      ref={trackRef}
      aria-label="Kurokawa Spatial Daylight Study"
      className={`relative border-b border-[var(--border-hairline)] bg-[var(--bg-darkroom)] text-[var(--ink-on-dark)] ${
        reducedMotion ? 'py-20' : 'min-h-[210svh]'
      }`}
    >
      <div
        className={
          reducedMotion
            ? 'fw-container'
            : 'sticky top-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden'
        }
      >
        {/* Top Architectural HUD Bar */}
        <div className="fw-container relative z-20 pt-20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline-dark)] pb-3">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-vermilion)]" />
              <span className="type-meta text-[var(--ink-on-dark)]">
                03 / SPATIAL APERTURE STUDY — KUROKAWA ANNEX
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="type-meta text-[var(--ink-on-dark-muted)]">
                APERTURE OPEN: <strong className="text-[var(--ink-on-dark)]">{aperturePct}%</strong>
              </span>
              <span className="type-meta text-[var(--accent-vermilion)]">
                {activeSolar.lux} // {activeSolar.angle}
              </span>
            </div>
          </div>
        </div>

        {/* Expanding Clipped Architectural Frame */}
        <div
          ref={frameRef}
          className={`relative inset-0 z-10 overflow-hidden ${
            reducedMotion
              ? 'my-8 aspect-[16/9] w-full rounded-[2px] border border-[var(--border-hairline-dark)]'
              : 'absolute inset-0 h-full w-full'
          }`}
        >
          <img
            ref={imgRef}
            src="/images/plate-01-pavilion.jpg"
            alt="Kurokawa concrete light pavilion interior with geometric sun beams"
            style={{ filter: activeSolar.filter }}
            className="h-full w-full object-cover transition-[filter] duration-500 will-change-transform"
          />

          {/* Subtle Dark-Room Gradient Vignette for Readability */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161614]/85 via-[#161614]/25 to-[#161614]/65"
          />

          {/* Orthographic Crosshair & Bay Ratio Overlay inside the Aperture */}
          <svg
            viewBox="0 0 1200 700"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
          >
            <line
              x1="741"
              y1="0"
              x2="741"
              y2="700"
              stroke="#F2F0EC"
              strokeWidth="0.75"
              strokeDasharray="4 6"
            />
            <line
              x1="0"
              y1="432"
              x2="1200"
              y2="432"
              stroke="#F2F0EC"
              strokeWidth="0.75"
              strokeDasharray="4 6"
            />
            <circle
              cx="741"
              cy="432"
              r="64"
              fill="none"
              stroke="#D9381E"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Bottom Interactive Daylight Console & Caption */}
        <div className="fw-container relative z-20 pb-8">
          <div className="fw-grid items-end gap-y-6 border-t border-[var(--border-hairline-dark)] pt-5">
            <div className="col-span-4 md:col-span-5 lg:col-span-7">
              <span className="type-meta mb-2 block text-[var(--accent-vermilion)]">
                SOLAR SYNCHRONIZATION // {activeSolar.time} — {activeSolar.label}
              </span>
              <h2 className="type-h2 max-w-[28ch] text-[var(--ink-on-dark)]">
                Light is treated as a{' '}
                <span className="type-serif-accent font-normal">
                  load-bearing
                </span>{' '}
                material across both concrete and browser canvas.
              </h2>
            </div>

            <div className="col-span-4 md:col-span-3 lg:col-span-5">
              <div className="flex flex-col gap-2 sm:items-end">
                <span className="type-meta text-[var(--ink-on-dark-muted)]">
                  INSPECT DAYLIGHT INTERVAL
                </span>
                <div
                  role="group"
                  aria-label="Daylight intervals"
                  className="grid w-full grid-cols-3 gap-1.5 sm:w-auto"
                >
                  {SOLAR_INTERVALS.map((interval, idx) => {
                    const selected = solarIdx === idx;
                    return (
                      <button
                        key={interval.id}
                        type="button"
                        onClick={() => setSolarIdx(idx)}
                        aria-pressed={selected}
                        className={`fw-btn-tactile type-meta min-h-[38px] rounded-[2px] border px-3 py-1.5 transition-colors ${
                          selected
                            ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                            : 'border-[var(--border-hairline-dark)] bg-[#161614]/80 text-[var(--ink-on-dark-muted)] hover:border-[var(--ink-on-dark)] hover:text-[var(--ink-on-dark)]'
                        }`}
                      >
                        {interval.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

