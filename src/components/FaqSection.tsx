import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { STUDIO_FAQS } from '../data/exhibition';

export function FaqSection({ reducedMotion }: { reducedMotion: boolean }) {
  const [openId, setOpenId] = useState<string | null>(STUDIO_FAQS[0].id);

  return (
    <section
      id="faq"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid items-start gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              10 / QUESTIONS
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Working Notes
            </h2>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <div className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
              {STUDIO_FAQS.map((item, idx) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex min-h-[68px] w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-150 hover:text-[var(--accent-vermilion)]"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="type-meta text-[var(--ink-secondary)]">
                          0{idx + 1}
                        </span>
                        <span className="type-h3 text-[var(--ink-primary)]">
                          {item.question}
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`type-meta shrink-0 transition-transform duration-200 ease-[var(--ease-out)] ${
                          isOpen ? 'rotate-45 text-[var(--accent-vermilion)]' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={
                            reducedMotion
                              ? undefined
                              : { height: 0, opacity: 0 }
                          }
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={
                            reducedMotion
                              ? undefined
                              : { height: 0, opacity: 0 }
                          }
                          transition={{
                            duration: 0.22,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[56ch] pb-6 pl-8 text-base leading-relaxed text-[var(--ink-secondary)]">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

