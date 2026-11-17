import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { scrambleText } from '../lib/scramble';

interface TopRailProps {
  activeSection: string;
  gridVisible: boolean;
  onToggleGrid: () => void;
  onNavigate: (id: string) => void;
  onOpenCommission: () => void;
}

const NAV_ITEMS = [
  { id: 'works', index: '01', label: 'Works' },
  { id: 'strata', index: '02', label: 'Strata' },
  { id: 'capabilities', index: '03', label: 'Matrix' },
  { id: 'specimen', index: '04', label: 'Dark Room' },
  { id: 'practice', index: '05', label: 'Practice' },
];

export function TopRail({
  activeSection,
  gridVisible,
  onToggleGrid,
  onNavigate,
  onOpenCommission,
}: TopRailProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDarkRoom =
    activeSection === 'aperture' ||
    activeSection === 'specimen' ||
    activeSection === 'taktil';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-200 ease-[var(--ease-out)] ${
        isDarkRoom
          ? 'border-b border-[var(--border-hairline-dark)] bg-[#161614]/90 text-[var(--ink-on-dark)] backdrop-blur-md'
          : scrolled
            ? 'border-b border-[var(--border-hairline)] bg-[#F2F0EC]/90 text-[var(--ink-primary)] backdrop-blur-md'
            : 'border-b border-[var(--border-hairline)] bg-transparent text-[var(--ink-primary)]'
      }`}
    >
      <div className="fw-container flex h-full items-center justify-between gap-4">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="flex items-center gap-2.5 text-sm font-bold tracking-[-0.03em] uppercase transition-opacity duration-150 hover:opacity-75"
        >
          <span>FORMWORK®</span>
          <span className="type-meta hidden rounded-[2px] border border-current/25 px-1.5 py-0.5 text-[10px] sm:inline-block">
            ED. IV
          </span>
        </a>

        <nav
          aria-label="Primary chapters"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeSection === item.id ||
              (item.id === 'specimen' && activeSection === 'taktil') ||
              (item.id === 'works' && activeSection === 'aperture');
            return (
              <NavScrambleLink
                key={item.id}
                item={item}
                isActive={isActive}
                onNavigate={onNavigate}
              />
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleGrid}
            aria-pressed={gridVisible}
            title="Toggle 12-column Swiss grid (G)"
            className={`fw-btn-tactile type-meta flex min-h-[36px] items-center gap-2 rounded-[2px] border px-3 transition-colors ${
              gridVisible
                ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                : isDarkRoom
                  ? 'border-[var(--border-hairline-dark)] text-[var(--ink-on-dark-muted)] hover:border-[var(--ink-on-dark)] hover:text-[var(--ink-on-dark)]'
                  : 'border-[var(--border-hairline)] text-[var(--ink-secondary)] hover:border-[var(--ink-primary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            <span className="hidden sm:inline">[G]</span>
            <span>GRID</span>
          </button>

          <button
            type="button"
            onClick={onOpenCommission}
            className="fw-btn-tactile fw-link-draw min-h-[36px] px-1 text-sm font-medium tracking-[-0.01em]"
          >
            Commission
          </button>
        </div>
      </div>

      {/* Subtle architectural scroll-progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="pointer-events-none absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-[var(--accent-vermilion)]"
      />
    </header>
  );
}

function NavScrambleLink({
  item,
  isActive,
  onNavigate,
}: {
  item: { id: string; index: string; label: string };
  isActive: boolean;
  onNavigate: (id: string) => void;
}) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  const triggerScramble = () => {
    if (!labelRef.current) return;
    cancelRef.current?.();
    cancelRef.current = scrambleText(labelRef.current, item.label, {
      duration: 360,
    });
  };

  useEffect(() => () => cancelRef.current?.(), []);

  return (
    <a
      href={`#${item.id}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.id);
      }}
      onPointerEnter={triggerScramble}
      onFocus={triggerScramble}
      className="relative flex items-center gap-2 py-2 text-sm font-medium tracking-[-0.01em] transition-opacity duration-150 hover:opacity-75"
    >
      <span className="type-meta opacity-60">{item.index}</span>
      <span ref={labelRef}>{item.label}</span>
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[var(--accent-vermilion)]"
        />
      )}
    </a>
  );
}
