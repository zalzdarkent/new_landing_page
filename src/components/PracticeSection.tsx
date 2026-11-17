import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import gsap from 'gsap';
import { ARCHIVE_LEDGER, PRACTICE_MANIFESTO } from '../data/exhibition';

interface PracticeSectionProps {
  reducedMotion: boolean;
}

export function PracticeSection({ reducedMotion }: PracticeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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

  // Hover Image Reveal List floating preview (frontend-atlas interactions.md#3)
  useEffect(() => {
    const el = previewRef.current;
    const box = ledgerRef.current;
    if (!el || !box) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', {
      duration: reducedMotion ? 0.01 : 0.55,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo(el, 'y', {
      duration: reducedMotion ? 0.01 : 0.55,
      ease: 'power3.out',
    });
    const rTo = gsap.quickTo(el, 'rotation', {
      duration: 0.45,
      ease: 'power3.out',
    });

    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!reducedMotion) {
        rTo(gsap.utils.clamp(-7, 7, (e.clientX - lastX) * 0.35));
      }
      lastX = e.clientX;
    };

    box.addEventListener('pointermove', onMove, { passive: true });
    return () => box.removeEventListener('pointermove', onMove);
  }, [reducedMotion]);

  return (
    <section
      id="practice"
      ref={sectionRef}
      className="border-t border-[var(--border-hairline)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid items-start gap-y-12">
          {/* Left Sticky Column: Cols 1-4 */}
          <div className="col-span-4 md:col-span-8 lg:sticky lg:top-24 lg:col-span-4">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              13 / PRACTICE &amp; ARCHIVE LEDGER
            </span>
            <h2 className="type-h1 mb-6 text-[var(--ink-primary)]">
              Built for the{' '}
              <span className="type-serif-accent font-normal">critical</span>{' '}
              eye.
            </h2>

            <p className="mb-6 max-w-[36ch] text-base leading-relaxed text-[var(--ink-secondary)]">
              Operating between Zurich and Jakarta, we partner with cultural
              foundations, architectural publishers, and precision hardware
              engineers.
            </p>

            <div className="space-y-3 border-t border-[var(--border-hairline)] pt-5 text-[var(--ink-secondary)]">
              <div className="flex items-center justify-between">
                <span className="type-meta text-[var(--ink-primary)]">
                  KREIS 5 — ZURICH
                </span>
                <span className="type-meta">LIMMATSTRASSE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="type-meta text-[var(--ink-primary)]">
                  KEMANG — JAKARTA
                </span>
                <span className="type-meta">SOUTH ARCHIVE</span>
              </div>
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
                    <div className="sm:col-span-3">
                      <span className="manifesto-part type-meta inline-block text-[var(--accent-vermilion)]">
                        {point.code}
                      </span>
                      <span className="manifesto-part type-meta mt-1 block text-[var(--ink-secondary)]">
                        {point.principle}
                      </span>
                    </div>
                    <div className="sm:col-span-9">
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

        {/* Complete Curatorial Archive Index with Floating Hover Image Reveal */}
        <div
          ref={ledgerRef}
          onPointerLeave={() => setHoveredRow(null)}
          className="mt-20 border-t border-[var(--border-hairline-strong)] pt-12"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="type-meta mb-2 block text-[var(--accent-vermilion)]">
                INDEX // 2024 — 2026
              </span>
              <h3 className="type-h2 text-[var(--ink-primary)]">
                Complete Commission Ledger
              </h3>
            </div>
            <span className="type-meta text-[var(--ink-secondary)]">
              SWEEP ROWS TO INSPECT ARCHIVAL PLATES
            </span>
          </div>

          <ul className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {ARCHIVE_LEDGER.map((entry, idx) => {
              const dimmed = hoveredRow !== null && hoveredRow !== idx;
              const active = hoveredRow === idx;
              return (
                <li
                  key={entry.id}
                  onPointerEnter={() => setHoveredRow(idx)}
                  data-cursor="view"
                  data-cursor-label={entry.code}
                  className={`grid grid-cols-1 items-baseline gap-2 py-5 transition-all duration-300 ease-[var(--ease-out)] sm:grid-cols-12 ${
                    dimmed ? 'opacity-35' : 'opacity-100'
                  } ${active ? 'sm:translate-x-2' : ''}`}
                >
                  <span className="type-meta text-[var(--accent-vermilion)] sm:col-span-2">
                    {entry.code}
                  </span>
                  <span className="text-lg font-medium tracking-[-0.02em] text-[var(--ink-primary)] sm:col-span-4">
                    {entry.title}
                  </span>
                  <span className="text-sm text-[var(--ink-secondary)] sm:col-span-3">
                    {entry.client} ({entry.location})
                  </span>
                  <span className="type-meta text-[var(--ink-secondary)] sm:col-span-2">
                    {entry.discipline}
                  </span>
                  <span className="type-meta text-right text-[var(--ink-primary)] sm:col-span-1">
                    {entry.year}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Floating Cursor-Following Preview Window */}
          <div
            ref={previewRef}
            aria-hidden="true"
            className={`pointer-events-none fixed top-0 left-0 z-40 hidden aspect-[4/3] w-[280px] overflow-hidden rounded-[2px] border border-[var(--border-hairline-strong)] bg-[#161614] shadow-xl transition-transform duration-300 lg:block ${
              hoveredRow !== null ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            <div
              style={{
                transform: `translateY(${(hoveredRow ?? 0) * -100}%)`,
                transition: 'transform 460ms cubic-bezier(0.76, 0, 0.24, 1)',
              }}
              className="h-full w-full"
            >
              {ARCHIVE_LEDGER.map((entry) => (
                <div key={entry.id} className="relative h-full w-full">
                  <img
                    src={entry.image}
                    alt=""
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-[#161614]/85 px-2.5 py-1 text-[#F2F0EC]">
                    <span className="type-meta text-[10px]">{entry.code}</span>
                    <span className="type-meta text-[10px] text-[var(--accent-vermilion)]">
                      {entry.ratio}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
