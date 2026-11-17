import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'motion/react';
import { EXHIBITION_WORKS, type ExhibitionWork } from '../data/exhibition';

gsap.registerPlugin(ScrollTrigger);

interface WorksSectionProps {
  reducedMotion: boolean;
  onDrawerChange?: (open: boolean) => void;
}

function BlueprintOverlay({
  work,
  forceFull,
}: {
  work: ExhibitionWork;
  forceFull: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={
        forceFull
          ? { WebkitMaskImage: 'none', maskImage: 'none' }
          : undefined
      }
      className={`fw-xray-layer pointer-events-none absolute inset-0 flex flex-col justify-between bg-[#161614]/92 p-5 text-[#F2F0EC] ${
        forceFull ? 'opacity-100' : 'opacity-0 group-hover/plate:opacity-100'
      }`}
    >
      {/* Top Blueprint Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-2.5">
        <span className="type-meta text-[var(--accent-vermilion)]">
          X-RAY ORTHOGRAPHIC // {work.code}
        </span>
        <span className="type-meta text-[#9A9790]">{work.dimensions}</span>
      </div>

      {/* Center Structural Wireframe SVG */}
      <div className="relative my-auto flex items-center justify-center py-4">
        <svg viewBox="0 0 600 280" className="w-full max-w-[520px] opacity-85">
          <rect
            x="24"
            y="20"
            width="552"
            height="240"
            fill="none"
            stroke="rgba(242,240,236,0.28)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="365"
            y1="20"
            x2="365"
            y2="260"
            stroke="#D9381E"
            strokeWidth="1.2"
          />
          <line
            x1="24"
            y1="140"
            x2="576"
            y2="140"
            stroke="rgba(242,240,236,0.22)"
            strokeWidth="1"
          />
          <circle
            cx="365"
            cy="140"
            r="78"
            fill="none"
            stroke="#F2F0EC"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="140"
            r="48"
            fill="none"
            stroke="#D9381E"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M 24 260 L 365 20 L 576 260"
            fill="none"
            stroke="rgba(242,240,236,0.2)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Bottom Blueprint Telemetry */}
      <div className="flex items-center justify-between border-t border-[var(--border-hairline-dark)] pt-2.5">
        <span className="type-meta text-[#F2F0EC]">{work.blueprintNote}</span>
        <span className="type-meta text-[var(--accent-vermilion)]">
          CLICK TO OPEN DOSSIER →
        </span>
      </div>
    </div>
  );
}

export function WorksSection({
  reducedMotion,
  onDrawerChange,
}: WorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedWork, setSelectedWork] = useState<ExhibitionWork | null>(null);
  const [xrayLocked, setXrayLocked] = useState(false);

  useEffect(() => {
    onDrawerChange?.(selectedWork !== null);
  }, [selectedWork, onDrawerChange]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const articles = gsap.utils.toArray<HTMLElement>('.exhibition-article');
      articles.forEach((article) => {
        const plate = article.querySelector<HTMLElement>(
          '.exhibition-plate-frame'
        );
        const parallax = article.querySelector<HTMLElement>(
          '.exhibition-plate-parallax'
        );
        const metaItems = article.querySelectorAll<HTMLElement>(
          '.exhibition-meta-reveal'
        );

        if (plate) {
          gsap.fromTo(
            plate,
            { scale: 0.96 },
            {
              scale: 1,
              duration: 0.72,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: article,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }

        if (metaItems.length > 0) {
          gsap.fromTo(
            metaItems,
            { y: 14 },
            {
              y: 0,
              duration: 0.48,
              stagger: 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: article,
                start: 'top 92%',
                once: true,
              },
            }
          );
        }

        if (parallax && window.innerWidth >= 1024) {
          gsap.fromTo(
            parallax,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: article,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.55,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!selectedWork) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedWork(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedWork]);

  const handlePlatePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const xray = e.currentTarget.querySelector<HTMLElement>('.fw-xray-layer');
    if (!xray) return;
    const rect = e.currentTarget.getBoundingClientRect();
    xray.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    xray.style.setProperty('--my', `${e.clientY - rect.top}px`);
    xray.style.setProperty('--mr', '220px');
  };

  return (
    <section
      id="works"
      ref={sectionRef}
      className="py-[clamp(4.5rem,9vw,8.5rem)]"
    >
      <div className="fw-container">
        {/* Chapter Header + Interactive X-Ray Blueprint Toggle */}
        <div className="fw-grid mb-14 items-end border-b border-[var(--border-hairline)] pb-6 lg:mb-20">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              04 / EXHIBITION MONOGRAPHS
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Selected{' '}
              <span className="type-serif-accent font-normal">
                Architectural
              </span>{' '}
              Plates
            </h2>
          </div>
          <div className="col-span-4 flex flex-wrap items-center justify-between gap-4 md:col-span-3 lg:col-span-5 lg:justify-end">
            <span className="type-meta text-[var(--ink-secondary)]">
              HOVER FOR X-RAY FLASHLIGHT OR LOCK:
            </span>
            <button
              type="button"
              onClick={() => setXrayLocked((v) => !v)}
              aria-pressed={xrayLocked}
              className={`fw-btn-tactile type-meta min-h-[38px] rounded-[2px] border px-3.5 py-1.5 transition-colors ${
                xrayLocked
                  ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                  : 'border-[var(--border-hairline-strong)] bg-[var(--bg-surface)] text-[var(--ink-primary)] hover:border-[var(--ink-primary)]'
              }`}
            >
              {xrayLocked ? 'X-RAY BLUEPRINT: ON' : 'X-RAY BLUEPRINT: HOVER'}
            </button>
          </div>
        </div>

        {/* Alternating Asymmetric Plates */}
        <div className="space-y-[clamp(4.5rem,9vw,8rem)]">
          {EXHIBITION_WORKS.map((work) => {
            if (work.layout === 'panoramic') {
              return (
                <article key={work.id} className="exhibition-article group">
                  <div className="fw-grid mb-5 items-end">
                    <div className="col-span-4 md:col-span-5 lg:col-span-7">
                      <span className="exhibition-meta-reveal type-meta mb-2 block text-[var(--ink-secondary)]">
                        PLATE {work.index} // {work.code} —{' '}
                        {work.client.toUpperCase()} ({work.location})
                      </span>
                      <h3 className="exhibition-meta-reveal type-h2 text-[var(--ink-primary)]">
                        <button
                          type="button"
                          onClick={() => setSelectedWork(work)}
                          className="fw-link-draw text-left"
                        >
                          {work.title}
                        </button>
                      </h3>
                    </div>
                    <div className="exhibition-meta-reveal col-span-4 flex flex-wrap items-center justify-between gap-3 md:col-span-3 lg:col-span-5 lg:justify-end">
                      <div className="flex flex-wrap gap-2">
                        {work.disciplines.map((d) => (
                          <span
                            key={d}
                            className="type-meta rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 text-[var(--ink-secondary)]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedWork(work)}
                        className="fw-btn-tactile type-meta min-h-[44px] px-2 text-[var(--accent-vermilion)] hover:opacity-75"
                      >
                        OPEN DOSSIER →
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedWork(work)}
                    onPointerMove={handlePlatePointerMove}
                    data-cursor="view"
                    data-cursor-label="X-RAY / OPEN"
                    className="exhibition-plate-frame group/plate relative block w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-left"
                    aria-label={`Inspect ${work.title}`}
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden lg:aspect-[21/9]">
                      <div className="exhibition-plate-parallax h-[108%] w-full">
                        <img
                          src={work.image}
                          alt={work.alt}
                          loading={work.index === '01' ? 'eager' : 'lazy'}
                          className="h-full w-full origin-center object-cover transition-transform duration-[420ms] ease-[var(--ease-out)] group-hover/plate:scale-[1.03]"
                        />
                      </div>
                    </div>
                    <BlueprintOverlay work={work} forceFull={xrayLocked} />
                  </button>
                </article>
              );
            }

            const isLeftWide = work.layout === 'left-wide';

            return (
              <article key={work.id} className="exhibition-article group">
                <div className="fw-grid items-start">
                  {/* Image Plate */}
                  <div
                    className={`col-span-4 md:col-span-5 ${
                      isLeftWide
                        ? 'lg:col-span-8 lg:order-1'
                        : 'lg:col-span-8 lg:order-2'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedWork(work)}
                      onPointerMove={handlePlatePointerMove}
                      data-cursor="view"
                      data-cursor-label="X-RAY / OPEN"
                      className="exhibition-plate-frame group/plate relative block w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-left"
                      aria-label={`Inspect ${work.title}`}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <div className="exhibition-plate-parallax h-[108%] w-full">
                          <img
                            src={work.image}
                            alt={work.alt}
                            loading={work.index === '01' ? 'eager' : 'lazy'}
                            className="h-full w-full origin-center object-cover transition-transform duration-[420ms] ease-[var(--ease-out)] group-hover/plate:scale-[1.03]"
                          />
                        </div>
                      </div>
                      <BlueprintOverlay work={work} forceFull={xrayLocked} />
                    </button>
                  </div>

                  {/* Metadata Column */}
                  <div
                    className={`col-span-4 flex h-full flex-col justify-between border-t border-[var(--border-hairline)] pt-5 md:col-span-3 lg:pt-0 ${
                      isLeftWide
                        ? 'lg:col-span-4 lg:order-2 lg:border-t-0 lg:border-l lg:pl-6'
                        : 'lg:col-span-4 lg:order-1 lg:border-t-0 lg:border-r lg:pr-6'
                    }`}
                  >
                    <div>
                      <div className="exhibition-meta-reveal mb-3 flex items-center justify-between text-[var(--ink-secondary)]">
                        <span className="type-meta">
                          PLATE {work.index} // {work.code}
                        </span>
                        <span className="type-meta">{work.year}</span>
                      </div>
                      <h3 className="exhibition-meta-reveal type-h2 mb-2 text-[var(--ink-primary)]">
                        <button
                          type="button"
                          onClick={() => setSelectedWork(work)}
                          className="fw-link-draw text-left"
                        >
                          {work.title}
                        </button>
                      </h3>
                      <p className="exhibition-meta-reveal type-meta mb-4 text-[var(--accent-vermilion)]">
                        {work.client.toUpperCase()} — {work.location.toUpperCase()}
                      </p>
                      <p className="exhibition-meta-reveal mb-4 max-w-[38ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                        {work.summary}
                      </p>
                      <p className="exhibition-meta-reveal mb-6 border-l-2 border-[var(--accent-vermilion)]/60 pl-3 text-sm leading-relaxed text-[var(--ink-primary)]">
                        {work.craftNote}
                      </p>
                    </div>

                    <div className="exhibition-meta-reveal space-y-4 border-t border-[var(--border-hairline)] pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {work.disciplines.map((d) => (
                          <span
                            key={d}
                            className="type-meta rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 text-[var(--ink-secondary)]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedWork(work)}
                        className="fw-btn-tactile type-meta inline-flex min-h-[44px] items-center gap-2 text-[var(--ink-primary)] hover:text-[var(--accent-vermilion)]"
                      >
                        <span>INSPECT TECHNICAL DOSSIER</span>
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-[180ms] ease-[var(--ease-out)] group-hover:translate-x-[4px]"
                        >
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Inspection Drawer */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-[#161614]/60 p-4 backdrop-blur-[2px] sm:p-6"
            onClick={() => setSelectedWork(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
          >
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, x: 24, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <span className="type-meta text-[var(--ink-secondary)]">
                  PLATE {selectedWork.index} // {selectedWork.code} —{' '}
                  {selectedWork.client.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedWork(null)}
                  className="fw-btn-tactile type-meta min-h-[44px] min-w-[44px] rounded-[2px] border border-[var(--border-hairline)] px-3 text-[var(--ink-primary)] hover:border-[var(--ink-primary)]"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <h3
                id="work-modal-title"
                className="type-h1 mb-2 text-[var(--ink-primary)]"
              >
                {selectedWork.title}
              </h3>
              <p className="type-meta mb-6 text-[var(--accent-vermilion)]">
                {selectedWork.location.toUpperCase()} — DIMENSIONS:{' '}
                {selectedWork.dimensions}
              </p>

              <div className="mb-6 aspect-[16/10] w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)]">
                <img
                  src={selectedWork.image}
                  alt={selectedWork.alt}
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="mb-4 text-base leading-relaxed text-[var(--ink-primary)]">
                {selectedWork.summary}
              </p>
              <p className="mb-8 text-base leading-relaxed text-[var(--ink-secondary)]">
                {selectedWork.craftNote}
              </p>

              <div className="border-t border-[var(--border-hairline)] pt-5">
                <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
                  TECHNICAL SPECIFICATIONS
                </span>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {selectedWork.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="border-l border-[var(--border-hairline)] pl-3"
                    >
                      <dt className="type-meta text-[var(--ink-secondary)]">
                        {spec.label.toUpperCase()}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-[var(--ink-primary)]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
