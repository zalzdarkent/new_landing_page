import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './hooks/useReducedMotion';
import { CHAPTER_SECTIONS } from './data/stark';
import { TopRail } from './components/TopRail';
import { LiveGridOverlay } from './components/LiveGridOverlay';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { VelocityTicker } from './components/VelocityTicker';
import { ArcReactorPortalSection } from './components/sections/ArcReactorPortalSection';
import { HelmetAssemblySection } from './components/sections/HelmetAssemblySection';
import { ArmorShowcaseSection } from './components/sections/ArmorShowcaseSection';
import { ArmorAssemblySection } from './components/sections/ArmorAssemblySection';
import { EvolutionSection } from './components/sections/EvolutionSection';
import { TechnologySchematicSection } from './components/sections/TechnologySchematicSection';
import { SuitSystemSection } from './components/sections/SuitSystemSection';
import { ArmoryGallerySection } from './components/sections/ArmoryGallerySection';
import { FlightSystemSection } from './components/sections/FlightSystemSection';
import { StarkEnvironmentSection } from './components/sections/StarkEnvironmentSection';
import { FinalFormSection } from './components/sections/FinalFormSection';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const reducedMotion = useReducedMotion();
  const [gridVisible, setGridVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('awakening');
  const lenisRef = useRef<Lenis | null>(null);

  // Sync Lenis smooth scroll with GSAP ScrollTrigger
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
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
          offset: 0,
          duration: 1.0,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }
    },
    [reducedMotion]
  );

  // Track active chapter for TopRail HUD indicator
  useEffect(() => {
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

    CHAPTER_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // [G] key toggles J.A.R.V.I.S. tactical HUD grid overlay
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
    <div className="stark-grain relative min-h-[100dvh] bg-[var(--bg-obsidian)] text-[var(--ink-primary)]">
      <CustomCursor reducedMotion={reducedMotion} />
      <LiveGridOverlay visible={gridVisible} />

      <TopRail
        activeSection={activeSection}
        gridVisible={gridVisible}
        onToggleGrid={() => setGridVisible((v) => !v)}
        onNavigate={scrollToSection}
      />

      <main>
        {/* 01 // THE AWAKENING */}
        <HeroSection
          reducedMotion={reducedMotion}
          onNavigate={scrollToSection}
        />

        <VelocityTicker reducedMotion={reducedMotion} />

        {/* 02 // THE CORE — MORPH 01 */}
        <ArcReactorPortalSection reducedMotion={reducedMotion} />

        {/* 03 // THE HELMET — MORPH 02 */}
        <HelmetAssemblySection reducedMotion={reducedMotion} />

        {/* 04 // THE ARMOR */}
        <ArmorShowcaseSection reducedMotion={reducedMotion} />

        {/* 05 // THE ASSEMBLY — MORPH 03 */}
        <ArmorAssemblySection reducedMotion={reducedMotion} />

        {/* 06 // THE EVOLUTION */}
        <EvolutionSection reducedMotion={reducedMotion} />

        {/* 07 // THE TECHNOLOGY — MORPH 04 */}
        <TechnologySchematicSection reducedMotion={reducedMotion} />

        {/* 08 // THE SUIT SYSTEM */}
        <SuitSystemSection reducedMotion={reducedMotion} />

        {/* 09 // THE ARMORY */}
        <ArmoryGallerySection reducedMotion={reducedMotion} />

        {/* 10 // FLIGHT SYSTEM */}
        <FlightSystemSection reducedMotion={reducedMotion} />

        {/* 11 // STARK INDUSTRIES */}
        <StarkEnvironmentSection reducedMotion={reducedMotion} />

        {/* 12 // THE FINAL FORM — MORPH 05 */}
        <FinalFormSection
          reducedMotion={reducedMotion}
          onReboot={() => scrollToSection('awakening')}
        />
      </main>
    </div>
  );
}
export default App;
