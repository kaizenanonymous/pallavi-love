import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { photos } from "../data/story.js";

// Do columns, dono alag speed se scroll hote hain (parallax)
export default function Gallery() {
  const ref = useRef(null);
  const [open, setOpen] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-20, 60]);

  const left = photos.filter((_, i) => i % 2 === 0);
  const right = photos.filter((_, i) => i % 2 === 1);

  const Tile = ({ src, i }) => (
    <motion.button
      type="button"
      className="tile"
      style={{ "--tilt": `${i % 2 ? 1.6 : -1.6}deg` }}
      onClick={() => setOpen(src)}
      initial={{ clipPath: "inset(0 0 100% 0 round 22px)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0 round 22px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
    >
      <img src={src} alt="Ved aur Pallavi ki photo" loading="lazy" />
    </motion.button>
  );

  return (
    <section className="section gallery" ref={ref}>
      <h2 className="section__title">Hamare pal</h2>
      <p className="section__lead">Kisi bhi photo pe tap karo, bada dikhega.</p>

      <div className="gallery__cols">
        <motion.div className="gallery__col" style={{ y: yLeft }}>
          {left.map((src, i) => (
            <Tile key={src} src={src} i={i * 2} />
          ))}
        </motion.div>
        <motion.div className="gallery__col gallery__col--lower" style={{ y: yRight }}>
          {right.map((src, i) => (
            <Tile key={src} src={src} i={i * 2 + 1} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-label="Photo bada dikh raha hai. Band karne ke liye tap karo."
          >
            <motion.img
              src={open}
              alt="Ved aur Pallavi ki photo"
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            />
            <span className="lightbox__close">Band karne ke liye tap karo</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
