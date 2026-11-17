import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { PRACTICE_MANIFESTO } from '../data/exhibition';

interface PracticeSectionProps {
  reducedMotion: boolean;
}

export function PracticeSection({ reducedMotion }: PracticeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.manifesto-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parts = entry.target.querySelectorAll('.manifesto-part');
            anime({
              targets: parts,
              opacity: [0, 1],
              translateY: [12, 0],
              duration: 420,
              delay: anime.stagger(45),
              easing: 'cubicBezier(0.23, 1, 0.32, 1)',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((el) => {
      el.querySelectorAll('.manifesto-part').forEach((part) => {
        (part as HTMLElement).style.opacity = '0';
      });
      observer.observe(el);
    });

    const partsAll = sectionRef.current.querySelectorAll('.manifesto-part');
    return () => {
      observer.disconnect();
      anime.remove(partsAll);
    };
  }, [reducedMotion]);

  return (
    <section
      id="practice"
      ref={sectionRef}
      className="py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid items-start gap-y-12">
          {/* Left Sticky Column: Cols 1-4 */}
          <div className="col-span-4 md:col-span-8 lg:sticky lg:top-24 lg:col-span-4">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              04 / PRACTICE &amp; ETHOS
            </span>
            <h2 className="type-h1 mb-6 text-[var(--ink-primary)]">
              Built for the{' '}
              <span className="type-serif-accent font-normal">critical</span>{' '}
              eye.
            </h2>

            <div className="space-y-2 border-t border-[var(--border-hairline)] pt-5 text-[var(--ink-secondary)]">
              <p className="type-meta">KREIS 5 — ZURICH</p>
              <p className="type-meta">KEMANG — JAKARTA</p>
            </div>
          </div>

          {/* Right Manifesto Column: Cols 5-12 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <div className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
              {PRACTICE_MANIFESTO.map((point) => (
                <article
                  key={point.index}
                  className="manifesto-item group py-10 first:pt-8 last:pb-8"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                    <div className="sm:col-span-2">
                      <span className="manifesto-part type-meta inline-block text-[var(--ink-secondary)] transition-colors duration-150 group-hover:text-[var(--accent-vermilion)]">
                        {point.index}
                      </span>
                    </div>
                    <div className="sm:col-span-10">
                      <h3 className="manifesto-part type-h2 mb-3 text-[var(--ink-primary)]">
                        {point.heading}
                      </h3>
                      <p className="manifesto-part type-body-lg max-w-[55ch] text-[var(--ink-secondary)]">
                        {point.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
