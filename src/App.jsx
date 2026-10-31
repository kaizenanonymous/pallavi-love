import { motion, useScroll, useSpring } from "framer-motion";
import FloatingHearts from "./components/FloatingHearts.jsx";
import ChatHero from "./components/ChatHero.jsx";
import Story from "./components/Story.jsx";
import Gallery from "./components/Gallery.jsx";
import Letter from "./components/Letter.jsx";
import Countdown from "./components/Countdown.jsx";
import Finale from "./components/Finale.jsx";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <FloatingHearts />
      <main>
        <ChatHero />
        <Story />
        <Gallery />
        <Letter />
        <Countdown />
        <Finale />
      </main>
    </>
  );
}
