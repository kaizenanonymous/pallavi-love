import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { couple, photos } from "../data/story.js";

function Typing({ side }) {
  return (
    <motion.div
      className={`chat__row chat__row--${side}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="bubble bubble--typing" aria-label="typing">
        <i /> <i /> <i />
      </div>
    </motion.div>
  );
}

export default function ChatHero() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 5 : 0);

  useEffect(() => {
    if (reduce) return;
    const timers = [600, 1900, 3300, 4400, 5600].map((ms, i) =>
      setTimeout(() => setStep(i + 1), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <section className="hero">
      <div className="chat" role="img" aria-label="Pallavi ne 9:45 pe I love you likha, Ved ne haan kaha">
        <header className="chat__head">
          <img src={photos[0]} alt="" className="chat__avatar" />
          <div>
            <strong>{couple.nickname} 💕</strong>
            <span>online</span>
          </div>
        </header>

        <div className="chat__body">
          {step === 1 && <Typing side="her" />}

          {step >= 2 && (
            <motion.div
              className="chat__row chat__row--her"
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="bubble bubble--her">
                I love you 🥹
                <time>9:45</time>
              </div>
            </motion.div>
          )}

          {step === 3 && <Typing side="him" />}

          {step >= 4 && (
            <motion.div
              className="chat__row chat__row--him"
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="bubble bubble--him">
                haan 💗
                <time>9:46</time>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className="hero__title"
        initial={{ opacity: 0, y: 18 }}
        animate={step >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="script">{couple.pet}, {couple.nickname.toLowerCase()} ke liye</p>
        <h1>
          {couple.him} aur {couple.her}
        </h1>
        <p className="hero__hint">Neeche scroll karo, kahani yahin se shuru hoti hai.</p>
        <span className="hero__dot" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
