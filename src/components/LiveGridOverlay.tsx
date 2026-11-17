import { AnimatePresence, motion } from 'motion/react';

interface LiveGridOverlayProps {
  visible: boolean;
  reducedMotion?: boolean;
}

export function LiveGridOverlay({ visible, reducedMotion }: LiveGridOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className="pointer-events-none fixed inset-0 z-40"
        >
          <div className="fw-container h-full">
            <div className="fw-grid h-full">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-full border-x border-[rgba(217,56,30,0.16)] bg-[rgba(217,56,30,0.04)] ${
                    idx >= 4 && idx < 8 ? 'hidden md:block' : ''
                  } ${idx >= 8 ? 'hidden lg:block' : ''}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
