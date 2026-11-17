import { useRef, useState } from 'react';

// Visual before/after: two real composed mock layouts instead of paragraphs.
function TemplateMock() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#EDEDED] p-6">
      <div className="h-3 w-24 rounded-full bg-[#C7C7C7]" />
      <div className="h-6 w-2/3 rounded bg-[#B5B5B5]" />
      <div className="h-6 w-1/2 rounded bg-[#B5B5B5]" />
      <div className="h-9 w-28 rounded-full bg-[#9B7BEA]" />
      <div className="mt-4 grid w-full max-w-xl grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] rounded-xl bg-[#DADADA]" />
        ))}
      </div>
      <span className="type-meta absolute left-4 top-4 text-[#777]">TEMPLATE</span>
    </div>
  );
}

function FormworkMock() {
  return (
    <div className="absolute inset-0 grid grid-cols-12 gap-3 bg-[#161614] p-6 text-[#F2F0EC]">
      <div className="col-span-7 flex flex-col justify-end">
        <p className="text-[clamp(2.2rem,6vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          Form{' '}
          <span className="type-serif-accent font-normal text-[var(--accent-vermilion)]">follows</span>
          <br />
          friction.
        </p>
      </div>
      <div className="col-span-5 grid grid-rows-5 gap-3">
        <img src="/images/plate-01-pavilion.jpg" alt="" className="row-span-3 h-full w-full object-cover" />
        <div className="row-span-2 grid grid-cols-2 gap-3">
          <img src="/images/plate-02-instrument.jpg" alt="" className="h-full w-full object-cover" />
          <div className="bg-[var(--accent-vermilion)]" />
        </div>
      </div>
      <span className="type-meta absolute left-4 top-4 text-[var(--accent-vermilion)]">FORMWORK®</span>
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
            Template <span className="type-serif-accent font-normal text-[var(--accent-vermilion)]">vs.</span> form
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
          className="relative aspect-[4/5] touch-pan-y select-none overflow-hidden rounded-[2px] border border-[var(--border-hairline-strong)] sm:aspect-[16/9]"
        >
          <TemplateMock />
          <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
            <FormworkMock />
          </div>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Template versus Formwork"
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
