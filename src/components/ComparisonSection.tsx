import { useRef, useState } from 'react';

// Visual before/after: 1:1 architectural sketch wireframe vs. final rendered composition.
function SketchFrame({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden border border-dashed border-[#161614]/30 bg-[#EAE6DE]/60 ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full text-[#161614]/20" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

function SketchMock() {
  return (
    <div
      className="absolute inset-0 grid grid-cols-12 grid-rows-1 gap-3 bg-[#F2F0EC] p-6 text-[#161614]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(22,22,20,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,22,20,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="col-span-7 flex min-h-0 flex-col justify-end">
        <p
          className="text-[clamp(2.2rem,6vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-transparent outline-1 outline-dashed outline-[#161614]/25"
          style={{ WebkitTextStroke: '1px rgba(22, 22, 20, 0.38)' }}
        >
          Form{' '}
          <span className="type-serif-accent font-normal" style={{ WebkitTextStroke: '1px rgba(217, 56, 30, 0.5)' }}>
            follows
          </span>
          <br />
          friction.
        </p>
      </div>
      <div className="col-span-5 grid h-full min-h-0 grid-rows-5 gap-3">
        <SketchFrame className="row-span-3 min-h-0" />
        <div className="row-span-2 grid min-h-0 grid-cols-2 gap-3">
          <SketchFrame className="min-h-0" />
          <div className="h-full min-h-0 w-full border border-dashed border-[var(--accent-vermilion)]/50 bg-[var(--accent-vermilion)]/5" />
        </div>
      </div>
    </div>
  );
}

function FormworkMock() {
  return (
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-1 gap-3 bg-[#161614] p-6 text-[#F2F0EC]">
      <div className="col-span-7 flex min-h-0 flex-col justify-end">
        <p className="text-[clamp(2.2rem,6vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          Form{' '}
          <span className="type-serif-accent font-normal text-[var(--accent-vermilion)]">follows</span>
          <br />
          friction.
        </p>
      </div>
      <div className="col-span-5 grid h-full min-h-0 grid-rows-5 gap-3">
        <img src="/images/plate-01-pavilion.jpg" alt="" className="row-span-3 h-full min-h-0 w-full object-cover" />
        <div className="row-span-2 grid min-h-0 grid-cols-2 gap-3">
          <img src="/images/plate-02-instrument.jpg" alt="" className="h-full min-h-0 w-full object-cover" />
          <div className="h-full min-h-0 bg-[var(--accent-vermilion)]" />
        </div>
      </div>
    </div>
  );
}

export function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(55);
  const [drag, setDrag] = useState(false);

  const update = (x: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setSplit(Math.min(94, Math.max(6, Math.round(((x - r.left) / r.width) * 100))));
  };

  return (
    <section id="comparison" className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-[clamp(4.5rem,9vw,8rem)]">
      <div className="fw-container">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="type-h1">
            Sketch <span className="type-serif-accent font-normal text-[var(--accent-vermilion)]">vs.</span> form
          </h2>
          <span className="type-meta hidden text-[var(--ink-secondary)] sm:block">DRAG ↔ {split}%</span>
        </div>

        <div
          ref={ref}
          data-cursor="drag"
          data-cursor-label="DRAG"
          onPointerDown={(e) => {
            setDrag(true);
            e.currentTarget.setPointerCapture(e.pointerId);
            update(e.clientX);
          }}
          onPointerMove={(e) => drag && update(e.clientX)}
          onPointerUp={() => setDrag(false)}
          onPointerCancel={() => setDrag(false)}
          className="relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden rounded-[2px] border border-[var(--border-hairline-strong)] sm:aspect-[16/9] lg:aspect-auto lg:h-[clamp(420px,62vh,640px)]"
        >
          <SketchMock />
          <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
            <FormworkMock />
          </div>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Sketch versus Formwork"
            aria-valuemin={6}
            aria-valuemax={94}
            aria-valuenow={split}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSplit((v) => Math.max(6, v - 4));
              if (e.key === 'ArrowRight') setSplit((v) => Math.min(94, v + 4));
            }}
            style={{ left: `${split}%` }}
            className="absolute bottom-0 top-0 z-10 w-[2px] -translate-x-1/2 cursor-ew-resize bg-[var(--accent-vermilion)]"
          >
            <span className="type-meta absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-vermilion)] px-3 py-2 text-[#FAF9F6]">↔</span>
          </div>
        </div>
      </div>
    </section>
  );
}
