import { motion } from "framer-motion";

export function ScatteredLabels() {
  const labels = [
    { text: "ඔයා හරිම ආදරණීයයි", bg: "bg-rose/30", top: "8%", left: "4%", rotate: -12 },
    { text: "ඔයා හරිම ලස්සනයි", bg: "bg-amber-200/60", top: "12%", left: "70%", rotate: 10 },
    { text: "ඔයා හරිම කරුණාවන්තයි", bg: "bg-emerald-200/50", top: "32%", left: "2%", rotate: 6 },
    { text: "ඔයා හරිම හුරු බුහුටියි", bg: "bg-pink-200/60", top: "55%", left: "75%", rotate: -8 },
    { text: "ඔයා මගේ ලොකේ 💗", bg: "bg-violet-200/50", top: "82%", left: "8%", rotate: -4 },
    { text: "❤️", bg: "bg-rose/50", top: "78%", left: "82%", rotate: 14 },
    { text: "💗", bg: "bg-pink-200/60", top: "45%", left: "45%", rotate: 0 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {labels.map((l, i) => {
        const dx = 30 + (i % 3) * 25;
        const dy = 25 + (i % 4) * 20;
        const dur = 12 + (i % 5) * 3;
        return (
          <motion.div
            key={i}
            drag
            dragMomentum={false}
            dragElastic={0.6}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, dx, -dx, dx / 2, 0],
              y: [0, -dy, dy / 2, -dy / 2, 0],
              rotate: [l.rotate, l.rotate + 6, l.rotate - 4, l.rotate + 3, l.rotate],
            }}
            transition={{
              opacity: { delay: i * 0.15, duration: 0.6 },
              scale: { delay: i * 0.15, type: "spring", damping: 10 },
              x: { duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
              y: { duration: dur * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
              rotate: { duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.15, zIndex: 50 }}
            style={{ top: l.top, left: l.left }}
            className={`pointer-events-auto absolute cursor-grab active:cursor-grabbing ${l.bg} backdrop-blur-sm rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground/90 shadow-md whitespace-nowrap select-none touch-none`}
          >
            {l.text}
          </motion.div>
        );
      })}
    </div>
  );
}
