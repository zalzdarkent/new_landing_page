import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { scrambleText } from '../lib/scramble';
import { CHAPTER_SECTIONS } from '../data/stark';

interface TopRailProps {
  activeSection: string;
  gridVisible: boolean;
  onToggleGrid: () => void;
  onNavigate: (id: string) => void;
}

const NAV_CHAPTERS = [
  { id: 'core', index: '02', label: 'CORE' },
  { id: 'helmet', index: '03', label: 'HELMET' },
  { id: 'armor', index: '04', label: 'MARK LXXXV' },
  { id: 'evolution', index: '06', label: 'EVOLUTION' },
  { id: 'technology', index: '07', label: 'SCHEMATICS' },
  { id: 'flight', index: '10', label: 'FLIGHT' },
];

export function TopRail({
  activeSection,
  gridVisible,
  onToggleGrid,
  onNavigate,
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

  const currentChapter =
    CHAPTER_SECTIONS.find((c) => c.id === activeSection) ?? CHAPTER_SECTIONS[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-200 ease-[var(--ease-out)] ${
        scrolled
          ? 'border-b border-[var(--border-hud)] bg-[#06070A]/85 backdrop-blur-md'
          : 'border-b border-white/5 bg-transparent'
      }`}
    >
      <div className="fw-container flex h-full items-center justify-between gap-4">
        <a
          href="#awakening"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('awakening');
          }}
          className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[var(--ink-primary)] uppercase transition-opacity duration-150 hover:opacity-80"
        >
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38BDF8] opacity-55" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
          </span>
          <span>STARK INDUSTRIES</span>
        </a>

        <nav aria-label="Primary chapters" className="hidden items-center gap-6 lg:flex">
          {NAV_CHAPTERS.map((item) => (
            <NavScrambleLink
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onNavigate={onNavigate}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border border-white/10 bg-[#0E1117]/70 px-3 py-1.5 sm:flex">
            <span className="type-meta text-[#38BDF8]">{currentChapter.code}</span>
            <span className="h-3 w-px bg-white/15" />
            <span className="type-meta text-[var(--ink-secondary)]">
              {currentChapter.label}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleGrid}
            aria-pressed={gridVisible}
            title="Toggle J.A.R.V.I.S. Tactical HUD Grid (G)"
            className={`fw-btn-tactile type-meta flex min-h-[34px] items-center gap-2 rounded-[2px] border px-3 transition-colors ${
              gridVisible
                ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-[#E0F2FE] shadow-[0_0_14px_rgba(56,189,248,0.25)]'
                : 'border-white/15 text-[var(--ink-secondary)] hover:border-[#38BDF8]/60 hover:text-[#E0F2FE]'
            }`}
          >
            <span className="hidden sm:inline text-[#38BDF8]">[G]</span>
            <span>HUD</span>
          </button>
        </div>
      </div>

      {/* Continuous Arc Reactor Scroll Progress Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#38BDF8] via-[#F5D061] to-[#E11D2E]"
        style={{ scaleX }}
        aria-hidden="true"
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

  return (
    <a
      href={`#${item.id}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.id);
      }}
      onMouseEnter={() => {
        if (labelRef.current) scrambleText(labelRef.current, item.label);
      }}
      className={`group relative inline-flex items-center gap-1.5 py-2 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-150 ${
        isActive ? 'text-[#38BDF8]' : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
      }`}
    >
      <span className="font-mono text-[10px] opacity-60">{item.index}</span>
      <span ref={labelRef}>{item.label}</span>
      {isActive && (
        <motion.span
          layoutId="top-rail-active"
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]"
          transition={{ type: 'spring', stiffness: 360, damping: 32 }}
        />
      )}
    </a>
  );
}
