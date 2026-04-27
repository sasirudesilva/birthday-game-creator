import { motion } from "framer-motion";

export function FinalOutro({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Giant heart that grows from center and absorbs everything */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{
          scale: [0, 1.2, 1, 1.05, 1],
          rotate: [-10, 0, -3, 3, 0],
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.4, 0.6, 0.8, 1],
          ease: "easeOut",
        }}
        className="text-[18rem] sm:text-[24rem] leading-none drop-shadow-2xl"
        style={{
          filter:
            "drop-shadow(0 0 80px rgba(255, 79, 129, 0.6)) drop-shadow(0 0 160px rgba(255, 111, 163, 0.4))",
        }}
      >
        ❤️
      </motion.div>

      {/* Pulsing aura behind the heart */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2, 2.5, 3],
          opacity: [0, 0.6, 0.3, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        className="absolute h-96 w-96 rounded-full bg-rose/40 blur-3xl"
      />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8 text-3xl sm:text-5xl font-bold text-gradient-romance"
      >
        මං ඔයාට <span className="italic">ගොඩක්</span> ආදරේයි පණ 💗
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="mt-4 text-base sm:text-lg text-muted-foreground max-w-md"
      >
        සුභ උපන්දිනක් මගේ සුන්දරියට ✨
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="mt-3 inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-semibold text-rose border border-rose/30"
      >
        💞 සුභ සංවත්සරයක් — අපේ දවසටත් 💍
      </motion.div>

      {/* Floating hearts rising up */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: 200,
            x: (Math.random() - 0.5) * 600,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: -800,
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: 1 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute text-3xl pointer-events-none"
        >
          {["💗", "💖", "💕", "✨", "🌸"][i % 5]}
        </motion.div>
      ))}

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onReplay}
        className="mt-10 rounded-full glass px-8 py-3 text-sm text-foreground/80 hover:text-foreground"
      >
        ↻ ආයෙත් play කරන්න
      </motion.button>
    </motion.div>
  );
}
