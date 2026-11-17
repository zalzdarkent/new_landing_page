import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ArchiveStudy {
  id: string;
  index: string;
  title: string;
  material: string;
  ratio: string;
  tolerance: string;
  note: string;
  image: string;
  alt: string;
}

const STUDIES: ArchiveStudy[] = [
  {
    id: 'study-01',
    index: 'FIG. 01',
    title: 'Cast-in-Place Daylight Geometry',
    material: 'RAW LIMESTONE CONCRETE',
    ratio: '1 : 1.618',
    tolerance: '±0.4MM SHUTTER',
    note: 'Photometric calibration of natural clerestory grazing across poured board-formed walls.',
    image: '/images/plate-01-pavilion.jpg',
    alt: 'Geometric daylight shafts across cast concrete gallery walls',
  },
  {
    id: 'study-02',
    index: 'FIG. 02',
    title: 'Detent Torque & Anodized Scale',
    material: 'BRUSHED ALUMINUM + BASALT',
    ratio: 'k=140 / c=22',
    tolerance: '15° STEP ANGLE',
    note: 'Rotary encoder mechanical detent resistance mapped directly to browser spring physics.',
    image: '/images/plate-02-instrument.jpg',
    alt: 'Precision machined drafting caliper and divider on limestone plinth',
  },
  {
    id: 'study-03',
    index: 'FIG. 03',
    title: 'Smyth-Sewn Grid Proportion',
    material: 'UNCOATED LINEN & STOCK',
    ratio: '62CH MEASURE',
    tolerance: '120GSM MUNKEN',
    note: 'Zero-shift subgrid parity between physical sewn architectural folios and fluid web viewports.',
    image: '/images/plate-03-monograph.jpg',
    alt: 'Open architectural monograph showing orthographic plan and tonal plate',
  },
  {
    id: 'study-04',
    index: 'FIG. 04',
    title: 'Shadow-Gap Structural Seam',
    material: 'LIMESTONE + 316L STAINLESS',
    ratio: '2.0MM REVEAL',
    tolerance: 'LASER PLUMB',
    note: 'Acoustic and visual separation joint eliminating baseboards in favor of recessed shadow lines.',
    image: '/images/hero-detail.jpg',
    alt: 'Close-up concrete tie-rod recess meeting brushed stainless steel reveal',
  },
  {
    id: 'study-05',
    index: 'FIG. 05',
    title: 'Basalt Acoustic Baffle Array',
    material: 'POURED DARKROOM BASALT',
    ratio: 'RT60 0.28S',
    tolerance: '32-CH WAVEFIELD',
    note: 'Low-albedo basalt surface treatments engineered for zero glare in mastering environments.',
    image: '/images/plate-02-instrument.jpg',
    alt: 'Matte basalt acoustic surface and machined metal reference scale',
  },
  {
    id: 'study-06',
    index: 'FIG. 06',
    title: 'Borosilicate Optical Refraction',
    material: 'CROWN GLASS IOR 1.48',
    ratio: '80% TRANSMISSION',
    tolerance: 'λ/4 FLATNESS',
    note: 'Physical transmission and roughness shader studies for layered spatial HUD interfaces.',
    image: '/images/plate-01-pavilion.jpg',
    alt: 'Architectural light refraction across stone and glass planes',
  },
];

export function ArchiveStrip({ reducedMotion }: { reducedMotion: boolean }) {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progressPct, setProgressPct] = useState(0);
  const [activeStudyId, setActiveStudyId] = useState<string>(STUDIES[0].id);

  useEffect(() => {
    if (reducedMotion || !outerRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const el = trackRef.current!;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 64);

      const scrollTween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgressPct(Math.round(self.progress * 100));
            const idx = Math.min(
              STUDIES.length - 1,
              Math.floor(self.progress * STUDIES.length)
            );
            setActiveStudyId(STUDIES[idx].id);
          },
        },
      });

      gsap.utils.toArray<HTMLElement>('.archive-hcard').forEach((card) => {
        const img = card.querySelector<HTMLElement>('.archive-hcard__img');
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      id="archive"
      ref={outerRef}
      aria-label="Material & Proportion Studies"
      className={`relative border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] ${
        reducedMotion ? 'py-16' : 'py-16 md:min-h-[250svh] md:py-0'
      }`}
    >
      <div
        className={
          reducedMotion
            ? ''
            : 'md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-between md:overflow-hidden md:py-20'
        }
      >
        {/* Top Header */}
        <div className="fw-container mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-0">
          <div>
            <span className="type-meta mb-2 block text-[var(--ink-secondary)]">
              06 / HORIZONTAL FIELD ARCHIVE
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Material &amp;{' '}
              <span className="type-serif-accent font-normal">Proportion</span>{' '}
              Studies
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="type-meta text-[var(--ink-secondary)]">
              TRAVERSE REEL — 06 PLATES
            </span>
            <span className="type-meta rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-surface)] px-3 py-1 text-[var(--accent-vermilion)]">
              {String(progressPct).padStart(3, '0')}% TRAVERSED
            </span>
          </div>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--rail-padding)] pb-4 md:w-max md:snap-none md:overflow-visible md:pb-0"
        >
          {STUDIES.map((study) => {
            const isHighlighted = activeStudyId === study.id;
            return (
              <article
                key={study.id}
                tabIndex={0}
                onPointerEnter={() => setActiveStudyId(study.id)}
                onFocus={() => setActiveStudyId(study.id)}
                data-cursor="drag"
                data-cursor-label="STUDY"
                className={`archive-hcard group w-[84vw] shrink-0 snap-start rounded-[2px] border p-4 transition-colors duration-200 sm:w-[60vw] md:w-[42vw] lg:w-[34vw] ${
                  isHighlighted
                    ? 'border-[var(--accent-vermilion)] bg-[var(--bg-surface)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]/70 hover:border-[var(--ink-primary)]'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="type-meta text-[var(--accent-vermilion)]">
                    {study.index}
                  </span>
                  <span className="type-meta text-[var(--ink-secondary)]">
                    {study.tolerance}
                  </span>
                </div>

                <div className="aspect-[16/10] overflow-hidden rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
                  <img
                    src={study.image}
                    alt={study.alt}
                    loading="lazy"
                    className="archive-hcard__img h-full w-[120%] max-w-none -ml-[10%] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-[var(--border-hairline)] pb-3">
                  <h3 className="archive-hcard__title text-lg font-medium tracking-[-0.02em] text-[var(--ink-primary)]">
                    {study.title}
                  </h3>
                  <span className="type-meta shrink-0 text-[var(--accent-vermilion)]">
                    {study.ratio}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {study.note}
                </p>

                <div className="mt-4 flex items-center justify-between text-[var(--ink-secondary)]">
                  <span className="type-meta">{study.material}</span>
                  <span className="type-meta text-[var(--ink-primary)]">
                    ORTHOGRAPHIC VERIFIED
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Architectural Ruler Gauge */}
        <div className="fw-container mt-8 hidden md:block">
          <div className="relative h-6 w-full border-t border-[var(--border-hairline-strong)] pt-2">
            <div
              style={{ width: `${progressPct}%` }}
              className="absolute top-[-1.5px] left-0 h-[3px] bg-[var(--accent-vermilion)] transition-[width] duration-75"
            />
            <div className="flex justify-between text-[var(--ink-secondary)]">
              {STUDIES.map((s) => (
                <span
                  key={s.id}
                  className={`type-meta transition-colors ${
                    activeStudyId === s.id
                      ? 'font-medium text-[var(--accent-vermilion)]'
                      : ''
                  }`}
                >
                  {s.index} — {s.ratio}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
