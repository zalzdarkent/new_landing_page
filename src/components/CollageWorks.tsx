import { createPortal } from 'react-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXHIBITION_WORKS, type ExhibitionWork } from '../data/exhibition';

gsap.registerPlugin(ScrollTrigger);

// SEQUENCE 03 — visual collage: four plates drift in from different corners
// (independent timing, rotation, scale, circular radii) and merge into one editorial
// composition. Clicking a plate morphs from its exact viewport rect into a full-bleed spread.
const SCATTER = [
  { x: '-38vw', y: '-34vh', rotation: -14, scale: 0.5, at: 0, d: 1.3 },
  { x: '34vw', y: '-44vh', rotation: 18, scale: 0.55, at: 0.2, d: 1.3 },
  { x: '48vw', y: '26vh', rotation: -22, scale: 0.5, at: 0.35, d: 1.2 },
  { x: '-12vw', y: '58vh', rotation: 12, scale: 0.65, at: 0.1, d: 1.4 },
];
const SLOTS = [
  'md:col-start-1 md:col-span-6 md:row-start-1 md:row-span-4 aspect-[16/10] col-span-2',
  'md:col-start-7 md:col-span-3 md:row-start-1 md:row-span-3 aspect-[4/5]',
  'md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-3 aspect-[4/5]',
  'md:col-start-7 md:col-span-6 md:row-start-4 md:row-span-3 aspect-[16/10] col-span-2',
];

interface ActiveSpread {
  work: ExhibitionWork;
  rect: DOMRect;
}

export function CollageWorks({
  reducedMotion,
  onDrawerChange,
}: {
  reducedMotion: boolean;
  onDrawerChange?: (open: boolean) => void;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ActiveSpread | null>(null);

  const openPlate = (work: ExhibitionWork, el: HTMLElement | null) => {
    const rect =
      el?.getBoundingClientRect() ??
      new DOMRect(window.innerWidth * 0.1, window.innerHeight * 0.1, 320, 240);
    setActive({ work, rect });
  };

  const closePlate = () => {
    if (!spreadRef.current || reducedMotion || !active) {
      setActive(null);
      return;
    }
    const { rect } = active;
    gsap.to(spreadRef.current, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      opacity: 0,
      duration: 0.36,
      ease: 'power3.inOut',
      onComplete: () => setActive(null),
    });
  };

  // Morph portal from clicked card's exact bounding box to full-bleed viewport
  useLayoutEffect(() => {
    if (!active || !spreadRef.current || reducedMotion) return;
    const { rect } = active;
    const el = spreadRef.current;
    gsap.fromTo(
      el,
      {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 4,
      },
      {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        borderRadius: 0,
        duration: 0.65,
        ease: 'power3.inOut',
        clearProps: 'top,left,width,height,borderRadius',
      }
    );
  }, [active, reducedMotion]);

  useEffect(() => {
    onDrawerChange?.(active !== null);
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePlate();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    const root = rootRef.current;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const plates = gsap.utils.toArray<HTMLElement>('.cw-plate', root);
      const imgs = gsap.utils.toArray<HTMLElement>('.cw-img', root);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });
      plates.forEach((p, i) => {
        const s = SCATTER[i];
        tl.fromTo(
          p,
          { x: s.x, y: s.y, rotation: s.rotation, scale: s.scale, borderRadius: '50%' },
          { x: 0, y: 0, rotation: 0, scale: 1, borderRadius: '2px', duration: s.d, ease: 'power2.inOut' },
          s.at
        );
        tl.fromTo(imgs[i], { scale: 1.5 }, { scale: 1, duration: s.d + 0.2 }, s.at);
      });
      tl.fromTo('.cw-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 1.3)
        .to({}, { duration: 0.5 });
    });
    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      id="works"
      ref={rootRef}
      aria-label="Selected plates"
      className={`relative bg-[var(--bg-canvas)] ${reducedMotion ? 'py-20' : 'md:h-[300svh]'}`}
    >
      <div
        className={`${
          reducedMotion ? '' : 'md:sticky md:top-0 md:h-[100svh] md:overflow-hidden'
        } px-[var(--rail-padding)] py-16 md:pt-20 md:pb-8`}
      >
        <div className="mx-auto grid h-full max-w-[90rem] grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-6 md:gap-4">
          {EXHIBITION_WORKS.map((w, i) => (
            <figure
              key={w.id}
              data-plate={w.id}
              data-cursor="view"
              data-cursor-label="ENTER"
              className={`cw-plate group relative m-0 overflow-hidden bg-[#161614] ${SLOTS[i]} rounded-[2px]`}
            >
              <img
                src={w.image}
                alt={w.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="cw-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161614]/80 via-transparent to-transparent" />
              <button
                type="button"
                onClick={(e) => openPlate(w, e.currentTarget.closest('figure'))}
                aria-label={`Open ${w.title}`}
                className="absolute inset-0 cursor-pointer"
              />
              <figcaption className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-end justify-between text-[#F2F0EC]">
                <span className="type-meta">{w.index}</span>
                <span className="text-sm font-medium tracking-[-0.01em]">
                  {w.title}
                </span>
              </figcaption>
            </figure>
          ))}

          <div className="cw-title col-span-2 flex flex-col justify-end md:col-span-6 md:col-start-1 md:row-span-2 md:row-start-5">
            <span className="type-meta mb-2 text-[var(--ink-secondary)]">
              SELECTED WORK / 2024–26
            </span>
            <h2 className="type-h1">
              Four{' '}
              <span className="type-serif-accent font-normal text-[var(--accent-vermilion)]">
                plates.
              </span>
            </h2>
          </div>
        </div>
      </div>

      {active &&
        createPortal(
          <div
            ref={spreadRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.work.title}
            className="fixed inset-0 z-[80] overflow-hidden bg-[#161614] text-[#F2F0EC]"
          >
            <img
              src={active.work.image}
              alt={active.work.alt}
              className="absolute inset-0 h-full w-full object-cover opacity-65"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161614]/90 via-[#161614]/35 to-[#161614]/65"
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-12">
              <div className="flex items-start justify-between gap-4">
                <span className="type-meta text-[#F2F0EC]/85">
                  PLATE {active.work.index} — {active.work.client.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={closePlate}
                  className="fw-btn-tactile type-meta min-h-[44px] rounded-[2px] border border-[#F2F0EC]/40 bg-[#161614]/60 px-4 text-[#F2F0EC] backdrop-blur-sm hover:border-[#F2F0EC]"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <div className="max-w-5xl">
                <h3 className="mb-4 text-[clamp(2.2rem,6.5vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
                  {active.work.title}
                </h3>
                <p className="mb-6 max-w-[52ch] text-base leading-relaxed text-[#F2F0EC]/80">
                  {active.work.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.work.specifications.map((s) => (
                    <span
                      key={s.label}
                      className="type-meta rounded-[2px] border border-[#F2F0EC]/30 bg-[#161614]/70 px-3 py-1.5"
                    >
                      {s.label.toUpperCase()} · {s.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
