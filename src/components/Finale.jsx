import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple } from "../data/story.js";

export default function Finale() {
  const [open, setOpen] = useState(false);

  // Tap karne par hearts har taraf failte hain
  const burst = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2;
        const dist = 90 + (i % 5) * 38;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 30,
          size: 14 + (i % 4) * 6,
        };
      }),
    []
  );

  return (
    <section className="section finale">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="btn"
            type="button"
            className="finale__btn"
            onClick={() => setOpen(true)}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.94 }}
          >
            Ek aakhri baat sunogi?
          </motion.button>
        ) : (
          <motion.div
            key="msg"
            className="finale__msg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            {burst.map((h) => (
              <motion.span
                key={h.id}
                className="burst"
                style={{ fontSize: h.size }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                animate={{ x: h.x, y: h.y, opacity: 0, scale: 1.2 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                aria-hidden="true"
              >
                ♥
              </motion.span>
            ))}
            <p className="script">{couple.nickname}</p>
            <h2>I love you.</h2>
            <p>Kal bhi, aaj bhi, hamesha bhi.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="foot">{couple.him} ne {couple.her} ke liye banaya, pyaar se.</footer>
    </section>
  );
}
