import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type CursorState = 'default' | 'link' | 'view' | 'drag' | 'label' | 'hidden';

const DEFAULT_LABEL: Partial<Record<CursorState, string>> = {
  view: 'INSPECT',
  drag: 'DRAG',
};

const INTERACTIVE =
  "[data-cursor], a[href], button, [role='button'], summary, label, select, input, textarea, [contenteditable='true'], iframe";
const NATIVE_CURSOR =
  "input:not([type='checkbox'], [type='radio'], [type='range'], [type='button'], [type='submit']), textarea, [contenteditable='true'], iframe";

function resolveState(target: EventTarget | null): {
  state: CursorState;
  label: string;
} {
  const el =
    target instanceof Element ? target.closest<HTMLElement>(INTERACTIVE) : null;
  if (!el) return { state: 'default', label: '' };
  if (el.matches(NATIVE_CURSOR)) return { state: 'hidden', label: '' };
  const explicit = el.dataset.cursor as CursorState | undefined;
  if (explicit) {
    return {
      state: explicit,
      label: el.dataset.cursorLabel ?? DEFAULT_LABEL[explicit] ?? '',
    };
  }
  return { state: 'link', label: '' };
}

export function CustomCursor({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!canHover || reducedMotion) return null;
  return <CursorLayer />;
}

function CursorLayer() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const dot = el.querySelector<HTMLElement>("[data-part='dot']");
    const ring = el.querySelector<HTMLElement>("[data-part='ring']");
    const label = el.querySelector<HTMLElement>("[data-part='label']");
    if (!dot || !ring || !label) return;

    const html = document.documentElement;
    html.classList.add('has-custom-cursor');

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.09, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.09, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.38, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.38, ease: 'power3.out' });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const { clientX: x, clientY: y } = e;
      if (!shown) {
        dotX(x, x);
        dotY(y, y);
        ringX(x, x);
        ringY(y, y);
        el.dataset.visible = 'true';
        shown = true;
        return;
      }
      dotX(x);
      dotY(y);
      ringX(x);
      ringY(y);
    };

    const onOver = (e: PointerEvent) => {
      const { state, label: text } = resolveState(e.target);
      el.dataset.state = state;
      label.textContent = text;
    };

    const onDown = () => el.toggleAttribute('data-pressed', true);
    const onUp = () => el.toggleAttribute('data-pressed', false);
    const onHide = () => {
      el.dataset.visible = 'false';
      shown = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    html.addEventListener('pointerleave', onHide);
    window.addEventListener('blur', onHide);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      html.removeEventListener('pointerleave', onHide);
      window.removeEventListener('blur', onHide);
      html.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div
      ref={root}
      className="fw-cursor"
      data-state="default"
      data-visible="false"
      aria-hidden="true"
    >
      <div className="fw-cursor__pos" data-part="ring">
        <div className="fw-cursor__ring" />
        <span className="fw-cursor__label" data-part="label" />
      </div>
      <div className="fw-cursor__pos" data-part="dot">
        <div className="fw-cursor__dot" />
      </div>
    </div>
  );
}

