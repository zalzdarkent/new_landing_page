import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ArchiveStudy {
  id: string;
  index: string;
  title: string;
  material: string;
  ratio: string;
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
    image: '/images/plate-01-pavilion.jpg',
    alt: 'Geometric daylight shafts across cast concrete gallery walls',
  },
  {
    id: 'study-02',
    index: 'FIG. 02',
    title: 'Detent Torque & Anodized Scale',
    material: 'BRUSHED ALUMINUM + BASALT',
    ratio: 'k=100 / c=20',
    image: '/images/plate-02-instrument.jpg',
    alt: 'Precision machined drafting caliper and divider on limestone plinth',
  },
  {
    id: 'study-03',
    index: 'FIG. 03',
    title: 'Smyth-Sewn Grid Proportion',
    material: 'UNCOATED LINEN & STOCK',
    ratio: '62CH MEASURE',
    image: '/images/plate-03-monograph.jpg',
    alt: 'Open architectural monograph showing orthographic plan and tonal plate',
  },
  {
    id: 'study-04',
    index: 'FIG. 04',
    title: 'Shadow-Gap Structural Seam',
    material: 'LIMESTONE + STAINLESS',
    ratio: '2MM REVEAL',
    image: '/images/hero-detail.jpg',
    alt: 'Close-up concrete tie-rod recess meeting brushed stainless steel reveal',
  },
];

export function ArchiveStrip({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const el = trackRef.current!;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

      const scrollTween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${distance() * 1.15}`,
          pin: true,
          pinType: 'transform',
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>('.archive-hcard').forEach((card) => {
        const img = card.querySelector<HTMLElement>('.archive-hcard__img');
        const title = card.querySelector<HTMLElement>('.archive-hcard__title');

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

        if (title) {
          gsap.from(title, {
            yPercent: 100,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 78%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      // Keyboard accessibility: tabbing to an offscreen study scrolls to reveal it
      const st = scrollTween.scrollTrigger!;
      const onFocus = (e: FocusEvent) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>('.archive-hcard');
        if (!card || distance() === 0) return;
        const ratio = gsap.utils.clamp(
          0,
          1,
          (card.offsetLeft - window.innerWidth * 0.1) / distance()
        );
        const y = st.start + ratio * (st.end - st.start);
        window.scrollTo(0, y);
      };
      el.addEventListener('focusin', onFocus);

      return () => {
        el.removeEventListener('focusin', onFocus);
      };
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      aria-label="Material & Proportion Studies"
      className="relative overflow-clip border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-16 md:flex md:min-h-[100dvh] md:flex-col md:justify-center md:py-0"
    >
      <div className="fw-container mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="type-meta mb-2 block text-[var(--ink-secondary)]">
            02.5 / MATERIAL STUDIES
          </span>
          <h2 className="type-h2 text-[var(--ink-primary)]">
            Horizontal Archive Reel
          </h2>
        </div>
        <span className="type-meta text-[var(--ink-secondary)]">
          SCROLL TO TRAVERSE — 04 PLATES
        </span>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--rail-padding)] pb-4 md:w-max md:snap-none md:overflow-visible md:pb-0"
      >
        {STUDIES.map((study) => (
          <article
            key={study.id}
            tabIndex={0}
            data-cursor="drag"
            data-cursor-label="STUDY"
            className="archive-hcard group w-[82vw] shrink-0 snap-start sm:w-[62vw] md:w-[44vw] lg:w-[38vw]"
          >
            <div className="aspect-[16/10] overflow-hidden rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
              <img
                src={study.image}
                alt={study.alt}
                loading="lazy"
                className="archive-hcard__img h-full w-[120%] max-w-none -ml-[10%] object-cover"
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-[var(--border-hairline)] pt-3">
              <div className="overflow-hidden">
                <h3 className="archive-hcard__title text-lg font-medium tracking-[-0.02em] text-[var(--ink-primary)]">
                  {study.title}
                </h3>
              </div>
              <span className="type-meta shrink-0 text-[var(--ink-secondary)]">
                {study.index}
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[var(--ink-secondary)]">
              <span className="type-meta">{study.material}</span>
              <span className="type-meta text-[var(--accent-vermilion)]">
                {study.ratio}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

