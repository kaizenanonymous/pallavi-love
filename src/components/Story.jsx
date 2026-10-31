import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { story } from "../data/story.js";

export default function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section story" ref={ref}>
      <h2 className="section__title">Hamari kahani</h2>
      <p className="section__lead">
        Ek message se shuru hui, aur ab tak ruki nahi.
      </p>

      <div className="thread">
        <div className="thread__rail" aria-hidden="true">
          <motion.i style={{ scaleY: lineScale }} />
        </div>

        {story.map((item) => (
          <motion.article
            key={item.when}
            className={`msg msg--${item.side}`}
            initial={{ opacity: 0, scale: 0.9, y: 28 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          >
            <div className="msg__meta">
              <span>{item.who}</span>
              <time>{item.when}</time>
            </div>
            <div className="bubble">{item.lead}</div>
            <p className="msg__note">{item.note}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
