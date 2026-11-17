import { Suspense, lazy, useEffect, useRef } from 'react';
import anime from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring } from 'motion/react';

const HeroMonolith = lazy(() =>
  import('./HeroMonolith').then((mod) => ({ default: mod.HeroMonolith }))
);

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  reducedMotion: boolean;
  onNavigate: (id: string) => void;
}

export function HeroSection({ reducedMotion, onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const inlineFrameRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const monolithScrollRef = useRef(0);

  // Subtle magnetic pull on the primary CTA (max ±4px inside button bounds)
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springX = useSpring(btnX, { stiffness: 220, damping: 24, mass: 0.8 });
  const springY = useSpring(btnY, { stiffness: 220, damping: 24, mass: 0.8 });

  useEffect(() => {
    if (reducedMotion || !headlineRef.current) return;

    const lines = headlineRef.current.querySelectorAll('.hero-line-inner');
    const inlineEl = inlineFrameRef.current;
    const metaEl = metaRef.current;

    anime.set(lines, { translateY: '105%', opacity: 0 });
    anime({
      targets: lines,
      translateY: ['105%', '0%'],
      opacity: [0, 1],
      duration: 680,
      delay: anime.stagger(55, { start: 60 }),
      easing: 'cubicBezier(0.23, 1, 0.32, 1)',
    });

    if (inlineEl) {
      anime.set(inlineEl, { scale: 0.92, opacity: 0 });
      anime({
        targets: inlineEl,
        scale: [0.92, 1],
        opacity: [0, 1],
        duration: 520,
        delay: 220,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
      });
    }

    if (metaEl) {
      anime.set(metaEl, { opacity: 0, translateY: 12 });
      anime({
        targets: metaEl,
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 500,
        delay: 260,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
      });
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        monolithScrollRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
      anime.remove(lines);
      if (inlineEl) anime.remove(inlineEl);
      if (metaEl) anime.remove(metaEl);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col justify-between pt-24 pb-10 lg:pt-28 lg:pb-12"
    >
      <div className="fw-container my-auto">
        <div className="fw-grid items-end gap-y-8 lg:gap-y-10">
          {/* Left Zone: Cols 1-7 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <div className="mb-6 flex items-center gap-3 text-[var(--ink-secondary)]">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-vermilion)]" />
              <span className="type-meta uppercase">
                01 / Spatial &amp; Typographic Practice
              </span>
            </div>

            <h1 ref={headlineRef} className="type-hero text-[var(--ink-primary)]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner block">
                  Architecture for{' '}
                  <span className="type-serif-accent font-normal">the</span>
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
                  <span>unhurried</span>
                  {/* Inline type-height visual punctuation on tablet/desktop */}
                  <span
                    ref={inlineFrameRef}
                    className="hidden h-[0.76em] w-[1.45em] translate-y-[0.06em] origin-center overflow-hidden rounded-[2px] border border-[var(--border-hairline)] align-baseline md:inline-block"
                  >
                    <img
                      src="/images/hero-detail.jpg"
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span>eye.</span>
                </span>
              </span>
            </h1>

            {/* Mobile stacked architectural detail */}
            <div className="mt-5 h-32 w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)] md:hidden">
              <img
                src="/images/hero-detail.jpg"
                alt="Cast limestone concrete and brushed steel shadow gap"
                className="h-full w-full object-cover"
              />
            </div>

            <div
              ref={metaRef}
              className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-[var(--border-hairline)] pt-6 sm:flex-row sm:items-end lg:mt-12"
            >
              <p className="max-w-[44ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                FORMWORK® is an independent design and engineering studio shaping
                digital monographs, spatial interfaces, and tactile brand systems.
              </p>

              <motion.a
                href="#works"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('works');
                }}
                style={reducedMotion ? undefined : { x: springX, y: springY }}
                onPointerMove={(e) => {
                  if (reducedMotion) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const relX = (e.clientX - rect.left) / rect.width - 0.5;
                  const relY = (e.clientY - rect.top) / rect.height - 0.5;
                  btnX.set(relX * 8);
                  btnY.set(relY * 6);
                }}
                onPointerLeave={() => {
                  btnX.set(0);
                  btnY.set(0);
                }}
                className="fw-btn-tactile inline-flex min-h-[44px] shrink-0 items-center gap-3 rounded-[2px] bg-[var(--accent-vermilion)] px-6 text-sm font-medium tracking-[-0.01em] text-[#FAF9F6] hover:bg-[var(--accent-vermilion-hover)]"
              >
                <span>Enter Archive</span>
                <span aria-hidden="true" className="type-meta">
                  01
                </span>
              </motion.a>
            </div>
          </div>

          {/* Right Zone: Cols 8-12 Dedicated 3D Canvas */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Suspense
              fallback={
                <div
                  aria-label="Loading 3D monolith study"
                  className="flex h-[280px] w-full items-end justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[#EAE6DF] p-3 text-[var(--ink-secondary)] sm:h-[380px] lg:h-[560px]"
                >
                  <span className="type-meta">FIG. 01 — MONOLITH STUDY</span>
                  <span className="type-meta">INITIALIZING WEBGL</span>
                </div>
              }
            >
              <HeroMonolith
                reducedMotion={reducedMotion}
                scrollProgress={monolithScrollRef}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Bottom Hairline Chapter Divider */}
      <div className="fw-container mt-10">
        <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-[var(--ink-secondary)]">
          <span className="type-meta">ZURICH — JAKARTA</span>
          <span className="type-meta">01 / 05</span>
        </div>
      </div>
    </section>
  );
}
