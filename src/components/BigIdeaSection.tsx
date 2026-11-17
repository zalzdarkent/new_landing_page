import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const BIG_IDEA_TEXT =
  'Most digital work borrows its skeleton from a template. We cast the mold from the inside out—letting proportion, friction, and optical rhythm dictate every pixel.';

export function BigIdeaSection({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const target = rootRef.current.querySelector<HTMLElement>('[data-split]');
    if (!target) return;

    const ctx = gsap.context(() => {
      SplitText.create(target, {
        type: 'words',
        tag: 'span',
        aria: 'hidden',
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: 'none',
              duration: 0.4,
              stagger: 0.09,
              scrollTrigger: {
                trigger: target,
                start: 'top 78%',
                end: 'bottom 45%',
                scrub: true,
              },
            }
          );
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      aria-label="Core Studio Thesis"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-[clamp(5.5rem,12vw,10rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid items-start gap-y-8">
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <span className="type-meta block text-[var(--ink-secondary)]">
              02 / THE PREMISE
            </span>
            <span className="type-meta mt-2 block text-[var(--accent-vermilion)]">
              FORMWORK THESIS
            </span>
          </div>

          <div className="col-span-4 md:col-span-5 lg:col-span-9">
            <p className="max-w-[26ch] font-medium tracking-[-0.03em] text-[var(--ink-primary)] text-[clamp(1.85rem,3.8vw,3.5rem)] leading-[1.08]">
              <span className="sr-only">{BIG_IDEA_TEXT}</span>
              <span aria-hidden="true" data-split>
                {BIG_IDEA_TEXT}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

