import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { STUDIO_CAPABILITIES } from '../data/exhibition';

export function CapabilitiesSection({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const [activeId, setActiveId] = useState(STUDIO_CAPABILITIES[0].id);
  const activeCap =
    STUDIO_CAPABILITIES.find((c) => c.id === activeId) ?? STUDIO_CAPABILITIES[0];

  return (
    <section
      id="capabilities"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid mb-12 items-end border-b border-[var(--border-hairline)] pb-6 lg:mb-16">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              04 / STUDIO CAPABILITIES
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Four Disciplines,{' '}
              <span className="type-serif-accent font-normal">One</span> Standard.
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:text-right">
            <span className="type-meta text-[var(--ink-secondary)]">
              SELECT A DISCIPLINE TO INSPECT SCOPE
            </span>
          </div>
        </div>

        <div className="fw-grid items-start gap-y-10">
          {/* Left Interactive Selector Rail: Cols 1-5 */}
          <div
            role="tablist"
            aria-label="Studio capabilities"
            className="col-span-4 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)] md:col-span-8 lg:col-span-5"
          >
            {STUDIO_CAPABILITIES.map((cap) => {
              const isSelected = cap.id === activeId;
              return (
                <button
                  key={cap.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveId(cap.id)}
                  className="relative flex min-h-[72px] w-full items-center justify-between gap-4 px-4 py-5 text-left transition-colors duration-150 hover:bg-[var(--bg-canvas)]/60"
                >
                  {isSelected && (
                    <motion.span
                      layoutId="capability-active-bar"
                      transition={
                        reducedMotion
                          ? { duration: 0.01 }
                          : { type: 'spring', stiffness: 300, damping: 28 }
                      }
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent-vermilion)]"
                    />
                  )}
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`type-meta ${
                        isSelected
                          ? 'text-[var(--accent-vermilion)]'
                          : 'text-[var(--ink-secondary)]'
                      }`}
                    >
                      {cap.index}
                    </span>
                    <span className="type-h3 text-[var(--ink-primary)]">
                      {cap.title}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`type-meta transition-transform duration-150 ${
                      isSelected
                        ? 'translate-x-0 text-[var(--accent-vermilion)]'
                        : '-translate-x-1 text-[var(--ink-secondary)] opacity-50'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Live Stage: Cols 6-12 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.id}
                initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                role="tabpanel"
                className="rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 sm:p-10"
              >
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
                  <span className="type-meta text-[var(--accent-vermilion)]">
                    DISCIPLINE {activeCap.index}
                  </span>
                  <span className="type-meta text-[var(--ink-secondary)]">
                    {activeCap.stack}
                  </span>
                </div>

                <h3 className="type-h2 mb-6 text-[var(--ink-primary)]">
                  {activeCap.headline}
                </h3>

                <div className="grid grid-cols-1 gap-6 border-b border-[var(--border-hairline)] pb-8 sm:grid-cols-2">
                  <div>
                    <span className="type-meta mb-2 block text-[var(--ink-secondary)]">
                      WHAT IT IS
                    </span>
                    <p className="text-base leading-relaxed text-[var(--ink-primary)]">
                      {activeCap.whatItIs}
                    </p>
                  </div>
                  <div>
                    <span className="type-meta mb-2 block text-[var(--ink-secondary)]">
                      WHY IT MATTERS
                    </span>
                    <p className="text-base leading-relaxed text-[var(--ink-secondary)]">
                      {activeCap.whyItMatters}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
                    CORE DELIVERABLES
                  </span>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {activeCap.deliverables.map((item) => (
                      <li
                        key={item}
                        className="border-l border-[var(--border-hairline)] pl-3 text-sm font-medium text-[var(--ink-primary)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

