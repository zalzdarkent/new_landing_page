import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './hooks/useReducedMotion';
import { TopRail } from './components/TopRail';
import { LiveGridOverlay } from './components/LiveGridOverlay';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { VelocityTicker } from './components/VelocityTicker';
import { BigIdeaSection } from './components/BigIdeaSection';
import { SpatialApertureSection } from './components/SpatialApertureSection';
import { WorksSection } from './components/WorksSection';
import { DeconstructedStackSection } from './components/DeconstructedStackSection';
import { ArchiveStrip } from './components/ArchiveStrip';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ProcessSection } from './components/ProcessSection';
import { DarkRoomSpecimen } from './components/DarkRoomSpecimen';
import { TactileHardwareSection } from './components/TactileHardwareSection';
import { TypographyLabSection } from './components/TypographyLabSection';
import { ComparisonSection } from './components/ComparisonSection';
import { PracticeSection } from './components/PracticeSection';
import { FaqSection } from './components/FaqSection';
import { ColophonFooter } from './components/ColophonFooter';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const reducedMotion = useReducedMotion();
  const [gridVisible, setGridVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [workDrawerOpen, setWorkDrawerOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Pause Lenis background scroll while any drawer is open
  useEffect(() => {
    const anyOpen = commissionOpen || workDrawerOpen;
    if (anyOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [commissionOpen, workDrawerOpen]);

  // Sync Lenis smooth scroll with GSAP ScrollTrigger (disabled for reduced motion)
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollToSection = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(target, {
          offset: id === 'hero' ? 0 : -64,
          duration: 0.95,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }
    },
    [reducedMotion]
  );

  // Track active chapter for TopRail indicator and Dark-Room chrome shift
  useEffect(() => {
    const ids = [
      'hero',
      'thesis',
      'aperture',
      'works',
      'strata',
      'archive',
      'capabilities',
      'process',
      'specimen',
      'taktil',
      'typolab',
      'comparison',
      'practice',
      'faq',
      'commission',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // [G] key toggles live 12-column Swiss grid overlay
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === 'g' || e.key === 'G') {
        setGridVisible((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="fw-grain relative min-h-[100dvh] bg-[var(--bg-canvas)] text-[var(--ink-primary)]">
      <CustomCursor reducedMotion={reducedMotion} />

      <TopRail
        activeSection={activeSection}
        gridVisible={gridVisible}
        onToggleGrid={() => setGridVisible((v) => !v)}
        onNavigate={scrollToSection}
        onOpenCommission={() => setCommissionOpen(true)}
      />

      <LiveGridOverlay visible={gridVisible} reducedMotion={reducedMotion} />

      <main>
        <HeroSection
          reducedMotion={reducedMotion}
          onNavigate={scrollToSection}
          onOpenCommission={() => setCommissionOpen(true)}
        />
        <VelocityTicker reducedMotion={reducedMotion} />
        <BigIdeaSection reducedMotion={reducedMotion} />
        <SpatialApertureSection reducedMotion={reducedMotion} />
        <WorksSection
          reducedMotion={reducedMotion}
          onDrawerChange={setWorkDrawerOpen}
        />
        <DeconstructedStackSection reducedMotion={reducedMotion} />
        <ArchiveStrip reducedMotion={reducedMotion} />
        <CapabilitiesSection reducedMotion={reducedMotion} />
        <ProcessSection reducedMotion={reducedMotion} />
        <DarkRoomSpecimen reducedMotion={reducedMotion} />
        <TactileHardwareSection reducedMotion={reducedMotion} />
        <TypographyLabSection reducedMotion={reducedMotion} />
        <ComparisonSection />
        <PracticeSection reducedMotion={reducedMotion} />
        <FaqSection reducedMotion={reducedMotion} />
      </main>

      <ColophonFooter
        commissionOpen={commissionOpen}
        onOpenCommission={() => setCommissionOpen(true)}
        onCloseCommission={() => setCommissionOpen(false)}
      />
    </div>
  );
}

export default App;
