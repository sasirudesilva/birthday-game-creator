import { motion } from "framer-motion";

export function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-4 text-sm uppercase tracking-[0.4em] text-muted-foreground"
      >
        ලස්සන surprise එකක් ✨
      </motion.div>

      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className="text-5xl sm:text-7xl md:text-8xl font-bold leading-tight text-gradient-romance"
      >
        සුභ උපන්දිනක්<br />
        <span className="italic">මගේ ආදරේ</span> 💗
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 max-w-xl text-lg text-muted-foreground"
      >
        පොඩි game එකක් solve කරාම... ලොකු ලස්සන surprise එකක් ඔයාට wait වෙනවා 🎁✨
      </motion.p>

      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-12 rounded-full bg-gradient-romance px-10 py-4 text-lg font-semibold text-primary-foreground shadow-glow animate-pulse-glow"
      >
        Game එක පටන් ගමු →
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 text-xs text-muted-foreground"
      >
        💗 එක්ක හැදුවා
      </motion.div>
    </motion.div>
  );
}
