import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

interface FinalFormSectionProps {
  reducedMotion: boolean;
  onReboot: () => void;
}

export function FinalFormSection({
  reducedMotion,
  onReboot,
}: FinalFormSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !crestRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        crestRef.current,
        { scale: 0.72, opacity: 0.25 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="final"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_center,#1C090D_0%,#06070A_68%)] pt-24 pb-12"
    >
      <div className="fw-container relative z-20 flex items-center justify-between">
        <span className="type-meta text-[#38BDF8]">12 // THE FINAL FORM — MORPH 05</span>
        <span className="type-meta text-[#F5D061]">MARK LXXXV // COMPLETE</span>
      </div>

      {/* Converged Mark LXXXV Crest */}
      <div
        ref={crestRef}
        className="relative z-10 my-auto flex flex-col items-center justify-center px-4 text-center"
      >
        <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
          <div className="absolute inset-0 rounded-full border border-[#E11D2E]/40 shadow-[0_0_90px_rgba(225,29,46,0.28)]" />
          <div className="absolute inset-6 rounded-full border border-[#F5D061]/45" />
          <div className="absolute inset-12 rounded-full border border-[#38BDF8]/60 shadow-[0_0_40px_rgba(56,189,248,0.35)]" />

          {/* Glowing Hex Core */}
          <svg viewBox="0 0 120 120" className="h-28 w-28">
            <polygon
              points="60,12 102,36 102,84 60,108 18,84 18,36"
              fill="rgba(56,189,248,0.2)"
              stroke="#E0F2FE"
              strokeWidth="3"
            />
            <polygon
              points="60,28 88,44 88,76 60,92 32,76 32,44"
              fill="#E0F2FE"
            />
          </svg>
        </div>

        <h2 className="type-hero mt-8 text-white">
          STARK <span className="text-[#F5D061]">INDUSTRIES</span>
        </h2>

        <motion.button
          type="button"
          onClick={onReboot}
          whileHover={reducedMotion ? undefined : { scale: 1.03 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          data-cursor="label"
          data-cursor-label="REBOOT"
          className="fw-btn-tactile type-meta mt-8 rounded-[2px] border border-[#38BDF8] bg-[#38BDF8]/15 px-7 py-3.5 text-[#E0F2FE] shadow-[0_0_30px_rgba(56,189,248,0.28)] hover:bg-[#38BDF8]/25"
        >
          REBOOT SEQUENCE ↑
        </motion.button>
      </div>

      <footer className="fw-container relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <span className="type-meta text-[10px] text-[var(--ink-secondary)]">
          STARK INDUSTRIES // MARK LXXXV INTERACTIVE EXPERIENCE
        </span>
        <span className="type-meta text-[10px] text-[#38BDF8]">
          ALL SYSTEMS NOMINAL
        </span>
      </footer>
    </section>
  );
}

