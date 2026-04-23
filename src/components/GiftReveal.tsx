import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function GiftReveal({ onReplay }: { onReplay: () => void }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
        colors: ["#ff6fa3", "#ffb3c8", "#ffd86b", "#ff4f81", "#ffffff"],
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const openGift = () => {
    setOpened(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#ff6fa3", "#ffd86b", "#ffffff", "#ff4f81"],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center"
    >
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        You solved it
      </motion.p>
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="mt-3 text-4xl sm:text-6xl font-bold text-gradient-romance"
      >
        Here's your gift 🎁
      </motion.h2>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="gift"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", damping: 12 }}
            onClick={openGift}
            className="mt-12 text-9xl drop-shadow-2xl animate-pulse-glow rounded-full p-8"
            aria-label="Open gift"
          >
            🎁
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ scale: 0.6, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 18 }}
            className="glass mt-10 max-w-xl rounded-3xl p-8 sm:p-12 shadow-glow text-left"
          >
            <h3 className="text-2xl font-bold text-gradient-romance mb-4">
              To my favourite person,
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
              Every day with you feels like a celebration, but today is the one
              the whole world should celebrate. Thank you for your laugh, your
              kindness, and the way you make the ordinary feel like magic.
              <br />
              <br />
              I hope this year brings you everything you wish for — and more
              little surprises along the way.
            </p>
            <p className="mt-6 text-right italic text-rose">
              — Yours, always 💗
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onReplay}
          className="mt-10 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ↻ play again
        </motion.button>
      )}
    </motion.div>
  );
}
