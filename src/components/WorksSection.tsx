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

export function WorksSection({ reducedMotion, onDrawerChange }: WorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedWork, setSelectedWork] = useState<ExhibitionWork | null>(null);

  useEffect(() => {
    onDrawerChange?.(selectedWork !== null);
  }, [selectedWork, onDrawerChange]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const articles = gsap.utils.toArray<HTMLElement>('.exhibition-article');
      articles.forEach((article) => {
        const plate = article.querySelector<HTMLElement>('.exhibition-plate-frame');
        const parallax = article.querySelector<HTMLElement>('.exhibition-plate-parallax');
        const metaItems = article.querySelectorAll<HTMLElement>('.exhibition-meta-reveal');

        if (plate) {
          gsap.fromTo(
            plate,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.72,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: article,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }

        if (metaItems.length > 0) {
          gsap.fromTo(
            metaItems,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.045,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: article,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }

        // Parallax runs on the outer wrapper so CSS hover scale on <img> never conflicts
        if (parallax && window.innerWidth >= 1024) {
          gsap.fromTo(
            parallax,
            { yPercent: -3.5 },
            {
              yPercent: 3.5,
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

  return (
    <section
      id="works"
      ref={sectionRef}
      className="py-[clamp(4.5rem,9vw,8.5rem)]"
    >
      <div className="fw-container">
        {/* Chapter Header */}
        <div className="fw-grid mb-14 items-end border-b border-[var(--border-hairline)] pb-6 lg:mb-20">
          <div className="col-span-4 md:col-span-4 lg:col-span-6">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              02 / SELECTED ARTIFACTS
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Exhibition Plates
            </h2>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:text-right">
            <p className="type-meta text-[var(--ink-secondary)]">
              THREE COMMISSIONS — PROPORTION, HARDWARE &amp; PRINT
            </p>
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
                        PLATE {work.index} — {work.client.toUpperCase()}
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
                            className="type-meta rounded-[2px] border border-[var(--border-hairline)] px-2.5 py-1 text-[var(--ink-secondary)]"
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
                        INSPECT PLATE →
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedWork(work)}
                    data-cursor="view"
                    data-cursor-label="INSPECT"
                    className="exhibition-plate-frame block w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-left"
                    aria-label={`Inspect ${work.title}`}
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden lg:aspect-[21/9]">
                      <div className="exhibition-plate-parallax h-[108%] w-full">
                        <img
                          src={work.image}
                          alt={work.alt}
                          loading={work.index === '01' ? 'eager' : 'lazy'}
                          className="h-full w-full origin-center object-cover transition-transform duration-[380ms] ease-[var(--ease-out)] group-hover:scale-[1.025]"
                        />
                      </div>
                    </div>
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
                      data-cursor="view"
                      data-cursor-label="INSPECT"
                      className="exhibition-plate-frame block w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-left"
                      aria-label={`Inspect ${work.title}`}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <div className="exhibition-plate-parallax h-[108%] w-full">
                          <img
                            src={work.image}
                            alt={work.alt}
                            loading={work.index === '01' ? 'eager' : 'lazy'}
                            className="h-full w-full origin-center object-cover transition-transform duration-[380ms] ease-[var(--ease-out)] group-hover:scale-[1.025]"
                          />
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Metadata Column (no captions under image) */}
                  <div
                    className={`col-span-4 flex h-full flex-col justify-between border-t border-[var(--border-hairline)] pt-5 md:col-span-3 lg:pt-0 ${
                      isLeftWide
                        ? 'lg:col-span-4 lg:order-2 lg:border-t-0 lg:border-l lg:pl-6'
                        : 'lg:col-span-4 lg:order-1 lg:border-t-0 lg:border-r lg:pr-6'
                    }`}
                  >
                    <div>
                      <div className="exhibition-meta-reveal mb-4 flex items-center justify-between text-[var(--ink-secondary)]">
                        <span className="type-meta">PLATE {work.index}</span>
                        <span className="type-meta">{work.year}</span>
                      </div>
                      <h3 className="exhibition-meta-reveal type-h2 mb-3 text-[var(--ink-primary)]">
                        <button
                          type="button"
                          onClick={() => setSelectedWork(work)}
                          className="fw-link-draw text-left"
                        >
                          {work.title}
                        </button>
                      </h3>
                      <p className="exhibition-meta-reveal mb-6 max-w-[38ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                        {work.summary}
                      </p>
                    </div>

                    <div className="exhibition-meta-reveal space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {work.disciplines.map((d) => (
                          <span
                            key={d}
                            className="type-meta rounded-[2px] border border-[var(--border-hairline)] px-2.5 py-1 text-[var(--ink-secondary)]"
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
                        <span>READ SPECIFICATIONS</span>
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-[180ms] ease-[var(--ease-out)] group-hover:translate-x-[3px]"
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
            className="fixed inset-0 z-50 flex items-center justify-end bg-[#161614]/55 p-4 backdrop-blur-[2px] sm:p-6"
            onClick={() => setSelectedWork(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <span className="type-meta text-[var(--ink-secondary)]">
                  PLATE {selectedWork.index} — {selectedWork.client.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedWork(null)}
                  className="fw-btn-tactile type-meta min-h-[44px] min-w-[44px] rounded-[2px] border border-[var(--border-hairline)] px-3 text-[var(--ink-primary)] hover:border-[var(--ink-primary)]"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <h3 id="work-modal-title" className="type-h1 mb-4 text-[var(--ink-primary)]">
                {selectedWork.title}
              </h3>

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
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
