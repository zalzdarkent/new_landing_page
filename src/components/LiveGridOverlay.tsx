import { AnimatePresence, motion } from 'motion/react';

interface LiveGridOverlayProps {
  visible: boolean;
}

export function LiveGridOverlay({ visible }: LiveGridOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40"
        >
          {/* 12-column blueprint guides */}
          <div className="fw-container h-full">
            <div className="fw-grid h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full border-x border-[#38BDF8]/10 bg-[#38BDF8]/[0.015]"
                />
              ))}
            </div>
          </div>

          {/* Center J.A.R.V.I.S. Targeting Reticle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-64 w-64 rounded-full border border-[#38BDF8]/20">
              <div className="absolute inset-6 rounded-full border border-dashed border-[#38BDF8]/25" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[#38BDF8]/20" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#38BDF8]/20" />
              <span className="type-meta absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#38BDF8]/80">
                J.A.R.V.I.S. // HUD CALIBRATION
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
