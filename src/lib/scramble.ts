export type ScrambleOptions = {
  duration?: number;
  chars?: string;
  swapEvery?: number;
  lead?: number;
};

export function scrambleText(
  el: HTMLElement,
  finalText: string,
  opts: ScrambleOptions = {}
): () => void {
  const {
    duration = 420,
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/',
    swapEvery = 40,
    lead = 0.25,
  } = opts;

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    el.textContent = finalText;
    return () => {};
  }

  const len = finalText.length;
  const current = Array.from({ length: len }, () => '');
  const start = performance.now();
  let lastSwap = 0;
  let raf = 0;

  const pick = () => chars[Math.floor(Math.random() * chars.length)];

  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const swap = now - lastSwap >= swapEvery;
    if (swap) lastSwap = now;

    let out = '';
    for (let i = 0; i < len; i++) {
      const lockAt = lead + ((i + 1) / len) * (1 - lead);
      const ch = finalText[i];
      if (ch === ' ' || t >= lockAt) {
        out += ch;
      } else {
        if (swap || !current[i]) current[i] = pick();
        out += current[i];
      }
    }

    el.textContent = out;
    if (t < 1) raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    el.textContent = finalText;
  };
}

