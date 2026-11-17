import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ColophonFooterProps {
  commissionOpen: boolean;
  onOpenCommission: () => void;
  onCloseCommission: () => void;
}

const SCOPE_OPTIONS = [
  {
    id: 'spatial-flagship',
    code: '01 // SPATIAL WEB',
    label: 'Spatial Web Flagship',
    duration: '07 WEEKS',
  },
  {
    id: 'editorial-monograph',
    code: '02 // EDITORIAL',
    label: 'Digital Monograph & Type System',
    duration: '05 WEEKS',
  },
  {
    id: 'hardware-console',
    code: '03 // INSTRUMENT UI',
    label: 'Hardware Companion Interface',
    duration: '07 WEEKS',
  },
  {
    id: 'retainer',
    code: '04 // RETAINER',
    label: 'Principal Design-Engineering Partner',
    duration: 'QUARTERLY',
  },
] as const;

export function ColophonFooter({
  commissionOpen,
  onOpenCommission,
  onCloseCommission,
}: ColophonFooterProps) {
  const [zurichTime, setZurichTime] = useState(() => {
    const formatted = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Europe/Zurich',
    }).format(new Date());
    return `${formatted} CET`;
  });
  const [jakartaTime, setJakartaTime] = useState(() => {
    const formatted = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    }).format(new Date());
    return `${formatted} WIB`;
  });
  const [selectedScope, setSelectedScope] = useState<string>(
    SCOPE_OPTIONS[0].id
  );
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
      const zrh = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Zurich',
      }).format(now);
      const jkt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta',
      }).format(now);
      setZurichTime(`${zrh} CET`);
      setJakartaTime(`${jkt} WIB`);
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

  const activeScopeObj =
    SCOPE_OPTIONS.find((s) => s.id === selectedScope) ?? SCOPE_OPTIONS[0];

  return (
    <footer
      id="commission"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] pt-[clamp(4.5rem,9vw,8rem)] pb-10"
    >
      <div className="fw-container">
        {/* Final Brand Statement */}
        <div className="mb-14 border-b border-[var(--border-hairline)] pb-12">
          <span className="type-meta mb-4 block text-[var(--ink-secondary)]">
            15 / FINAL STATEMENT &amp; COMMISSIONING
          </span>
          <p className="type-hero max-w-[18ch] text-[var(--ink-primary)]">
            Form is what{' '}
            <span className="type-serif-accent font-normal text-[var(--accent-vermilion)]">
              remains
            </span>{' '}
            when every shortcut is removed.
          </p>
        </div>

        {/* Interactive Scope Configurator + Commission Trigger */}
        <div className="fw-grid items-end gap-y-10 pb-16">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--accent-vermilion)]">
              STEP 01 // SELECT COMMISSION ARCHITECTURE
            </span>
            <h2 className="type-h2 mb-6 text-[var(--ink-primary)]">
              Configure your inquiry scope before opening the dossier.
            </h2>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SCOPE_OPTIONS.map((opt) => {
                const active = selectedScope === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedScope(opt.id)}
                    className={`flex flex-col justify-between rounded-[2px] border p-4 text-left transition-colors ${
                      active
                        ? 'border-[var(--accent-vermilion)] bg-[var(--bg-surface)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]/50 hover:border-[var(--ink-primary)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`type-meta ${
                          active
                            ? 'text-[var(--accent-vermilion)]'
                            : 'text-[var(--ink-secondary)]'
                        }`}
                      >
                        {opt.code}
                      </span>
                      <span className="type-meta text-[var(--ink-secondary)]">
                        {opt.duration}
                      </span>
                    </div>
                    <span className="mt-2 text-base font-medium text-[var(--ink-primary)]">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="col-span-4 flex flex-col items-start gap-4 md:col-span-3 lg:col-span-5 lg:items-end">
            <div className="w-full rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 lg:max-w-sm">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                <span className="type-meta text-[var(--ink-secondary)]">
                  SELECTED TRACK
                </span>
                <span className="type-meta text-[var(--accent-vermilion)]">
                  {activeScopeObj.duration}
                </span>
              </div>
              <p className="mb-5 text-base font-medium text-[var(--ink-primary)]">
                {activeScopeObj.label}
              </p>
              <button
                type="button"
                onClick={onOpenCommission}
                className="fw-btn-tactile fw-roll inline-flex min-h-[48px] w-full items-center justify-between rounded-[2px] bg-[var(--accent-vermilion)] px-6 text-sm font-medium text-[#FAF9F6] hover:bg-[var(--accent-vermilion-hover)]"
              >
                <span className="fw-roll__mask">
                  <span className="fw-roll__line">Open Commission Dossier</span>
                  <span className="fw-roll__line" aria-hidden="true">
                    Open Commission Dossier
                  </span>
                </span>
                <span aria-hidden="true" className="type-meta">
                  →
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[var(--ink-secondary)]">
              <span className="type-meta">ZURICH — {zurichTime}</span>
              <span className="type-meta">JAKARTA — {jakartaTime}</span>
            </div>
          </div>
        </div>

        {/* Colophon Row */}
        <div className="flex flex-col justify-between gap-4 border-t border-[var(--border-hairline)] pt-6 text-[var(--ink-secondary)] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="type-meta text-[var(--ink-primary)]">
              FORMWORK® EDITION IV
            </span>
            <span className="type-meta">
              SET IN CABINET GROTESK, INSTRUMENT SERIF &amp; JETBRAINS MONO
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="type-meta">PRESS [G] FOR SWISS GRID</span>
            <a
              href="mailto:studio@formwork.example"
              className="fw-link-draw type-meta text-[var(--ink-primary)]"
            >
              STUDIO@FORMWORK.EXAMPLE
            </a>
          </div>
        </div>

        {/* Giant Fitted Architectural Wordmark with Interactive Character Elevation */}
        <div
          aria-hidden="true"
          className="mt-10 overflow-hidden border-t border-[var(--border-hairline)] pt-6"
        >
          <div
            ref={wordmarkRef}
            className="w-fit whitespace-nowrap font-extrabold leading-[0.82] tracking-[-0.045em] text-[var(--ink-primary)] select-none"
          >
            {Array.from('FORMWORK®').map((ch, idx) => (
              <span
                key={idx}
                className="inline-block transition-transform duration-200 ease-[var(--ease-out)] hover:-translate-y-2 hover:text-[var(--accent-vermilion)]"
              >
                {ch}
              </span>
            ))}
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
              data-lenis-prevent
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <span className="type-meta text-[var(--ink-secondary)]">
                  NEW COMMISSION BRIEF // {activeScopeObj.code}
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
                className="type-h2 mb-2 text-[var(--ink-primary)]"
              >
                Tell us what you are building.
              </h3>
              <p className="type-meta mb-6 text-[var(--accent-vermilion)]">
                TRACK: {activeScopeObj.label.toUpperCase()} (
                {activeScopeObj.duration})
              </p>

              {submitted ? (
                <div className="rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
                  <span className="type-meta mb-2 block text-[var(--accent-vermilion)]">
                    BRIEF RECORDED
                  </span>
                  <p className="text-base leading-relaxed text-[var(--ink-primary)]">
                    Thank you, {name}. We review every inquiry directly across
                    our Zurich and Jakarta studios and respond within two
                    working days.
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
                    <p
                      role="alert"
                      className="text-sm text-[var(--accent-vermilion)]"
                    >
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
