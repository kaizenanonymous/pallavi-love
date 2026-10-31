import { motion } from "framer-motion";
import { letter, couple } from "../data/story.js";

export default function Letter() {
  return (
    <section className="section letter">
      <h2 className="section__title">Tumse kuch kehna hai</h2>

      <div className="paper">
        {letter.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.9 }}
          >
            {line}
          </motion.p>
        ))}
        <p className="script paper__sign">Tumhara {couple.him} 💗</p>
      </div>
    </section>
  );
}
