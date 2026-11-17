import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ColophonFooterProps {
  commissionOpen: boolean;
  onOpenCommission: () => void;
  onCloseCommission: () => void;
}

export function ColophonFooter({
  commissionOpen,
  onOpenCommission,
  onCloseCommission,
}: ColophonFooterProps) {
  const [studioTime, setStudioTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  // Edge-to-edge fitted architectural footer wordmark (frontend-atlas text-effects.md#14)
  useEffect(() => {
    const el = wordmarkRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.fontSize = '100px';
      if (el.scrollWidth > 0) {
        const ratio = parent.clientWidth / el.scrollWidth;
        el.style.fontSize = `${Math.floor(100 * ratio * 100) / 100}px`;
      }
    };

    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    document.fonts?.ready.then(fit);
    fit();

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Zurich',
      }).format(now);
      setStudioTime(`${formatted} CET`);
    };
    updateClock();
    const id = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!commissionOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseCommission();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [commissionOpen, onCloseCommission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || !brief.trim()) {
      setError('Please provide your name, a valid email, and a short project note.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <footer
      id="commission"
      className="border-t border-[var(--border-hairline)] pt-[clamp(4rem,8vw,7rem)] pb-10"
    >
      <div className="fw-container">
        {/* Final Brand Statement */}
        <div className="mb-16 border-b border-[var(--border-hairline)] pb-14">
          <span className="type-meta mb-4 block text-[var(--ink-secondary)]">
            11 / FINAL STATEMENT
          </span>
          <p className="type-hero max-w-[18ch] text-[var(--ink-primary)]">
            Form is what{' '}
            <span className="type-serif-accent font-normal">remains</span> when
            every shortcut is removed.
          </p>
        </div>

        <div className="fw-grid items-end gap-y-10 pb-16">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-4 block text-[var(--ink-secondary)]">
              12 / CORRESPONDENCE
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Commission a{' '}
              <span className="type-serif-accent font-normal">considered</span>{' '}
              system.
            </h2>
          </div>

          <div className="col-span-4 flex flex-col items-start gap-4 md:col-span-3 lg:col-span-5 lg:items-end">
            <button
              type="button"
              onClick={onOpenCommission}
              className="fw-btn-tactile inline-flex min-h-[48px] items-center gap-3 rounded-[2px] bg-[var(--accent-vermilion)] px-7 text-sm font-medium text-[#FAF9F6] hover:bg-[var(--accent-vermilion-hover)]"
            >
              <span>Start a Commission</span>
              <span aria-hidden="true" className="type-meta">
                →
              </span>
            </button>
            <span className="type-meta text-[var(--ink-secondary)]">
              STUDIO TIME — {studioTime}
            </span>
          </div>
        </div>

        {/* Colophon Row */}
        <div className="flex flex-col justify-between gap-4 border-t border-[var(--border-hairline)] pt-6 text-[var(--ink-secondary)] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="type-meta text-[var(--ink-primary)]">FORMWORK®</span>
            <span className="type-meta">
              SET IN CABINET GROTESK, INSTRUMENT SERIF &amp; JETBRAINS MONO
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="type-meta">PRESS [G] FOR GRID</span>
            <a
              href="mailto:studio@formwork.example"
              className="fw-link-draw type-meta text-[var(--ink-primary)]"
            >
              STUDIO@FORMWORK.EXAMPLE
            </a>
          </div>
        </div>

        {/* Giant Fitted Architectural Wordmark */}
        <div
          aria-hidden="true"
          className="mt-10 overflow-hidden border-t border-[var(--border-hairline)] pt-6"
        >
          <div
            ref={wordmarkRef}
            className="w-fit whitespace-nowrap font-extrabold leading-[0.82] tracking-[-0.045em] text-[var(--ink-primary)] select-none"
          >
            FORMWORK®
          </div>
        </div>
      </div>

      {/* Commission Drawer */}
      <AnimatePresence>
        {commissionOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-[#161614]/55 p-4 backdrop-blur-[2px] sm:p-6"
            onClick={onCloseCommission}
            role="dialog"
            aria-modal="true"
            aria-labelledby="commission-dialog-title"
          >
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <span className="type-meta text-[var(--ink-secondary)]">
                  NEW COMMISSION BRIEF
                </span>
                <button
                  type="button"
                  onClick={onCloseCommission}
                  className="fw-btn-tactile type-meta min-h-[44px] min-w-[44px] rounded-[2px] border border-[var(--border-hairline)] px-3 text-[var(--ink-primary)]"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <h3
                id="commission-dialog-title"
                className="type-h2 mb-6 text-[var(--ink-primary)]"
              >
                Tell us what you are building.
              </h3>

              {submitted ? (
                <div className="rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
                  <span className="type-meta mb-2 block text-[var(--accent-vermilion)]">
                    BRIEF RECORDED
                  </span>
                  <p className="text-base leading-relaxed text-[var(--ink-primary)]">
                    Thank you, {name}. We review every inquiry directly and
                    respond within two studio days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setBrief('');
                      onCloseCommission();
                    }}
                    className="fw-btn-tactile type-meta mt-6 min-h-[44px] rounded-[2px] border border-[var(--border-hairline)] px-4 text-[var(--ink-primary)]"
                  >
                    RETURN TO EXHIBITION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor="comm-name"
                      className="type-meta mb-2 block text-[var(--ink-secondary)]"
                    >
                      NAME
                    </label>
                    <input
                      id="comm-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dieter Keller"
                      className="min-h-[44px] w-full rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 text-base text-[var(--ink-primary)] placeholder:text-[var(--ink-secondary)]/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comm-email"
                      className="type-meta mb-2 block text-[var(--ink-secondary)]"
                    >
                      EMAIL
                    </label>
                    <input
                      id="comm-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dieter@atelier.example"
                      className="min-h-[44px] w-full rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 text-base text-[var(--ink-primary)] placeholder:text-[var(--ink-secondary)]/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comm-brief"
                      className="type-meta mb-2 block text-[var(--ink-secondary)]"
                    >
                      SCOPE &amp; TIMELINE
                    </label>
                    <textarea
                      id="comm-brief"
                      rows={4}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Spatial web flagship, design system, or monograph..."
                      className="w-full rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5 text-base text-[var(--ink-primary)] placeholder:text-[var(--ink-secondary)]/50"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-[var(--accent-vermilion)]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="fw-btn-tactile min-h-[48px] w-full rounded-[2px] bg-[var(--accent-vermilion)] px-6 text-sm font-medium text-[#FAF9F6] hover:bg-[var(--accent-vermilion-hover)]"
                  >
                    Transmit Brief
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}

