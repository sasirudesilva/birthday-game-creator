import { useMemo } from "react";
import { motion } from "framer-motion";

const LABELS = [
  { text: "ඔයා හරිම ආදරණීයයි", bg: "bg-rose/40" },
  { text: "ඔයා හරිම ලස්සනයි", bg: "bg-amber-200/70" },
  { text: "ඔයා හරිම කරුණාවන්තයි", bg: "bg-emerald-200/60" },
  { text: "ඔයා හරිම හුරු බුහුටියි", bg: "bg-pink-200/70" },
  { text: "ඔයා මගේ ලොකේ 💗", bg: "bg-violet-200/60" },
  { text: "මං ඔයාට ආදරෙයි 💕", bg: "bg-rose/40" },
  { text: "ඔයා මගේ සතුට", bg: "bg-sky-200/60" },
  { text: "ඔයා මගේ සිහිනේ ✨", bg: "bg-amber-200/70" },
  { text: "සුභ උපන්දිනක් 🎂", bg: "bg-amber-200/70" },
  { text: "Happy Birthday 🎉", bg: "bg-pink-200/70" },
  { text: "🎂🎈🎁", bg: "bg-rose/40" },
  { text: "සුභ සංවත්සරයක් 💞", bg: "bg-violet-200/60" },
  { text: "Happy Anniversary 💍", bg: "bg-rose/50" },
  { text: "අපේ දවස 💑", bg: "bg-pink-200/70" },
  { text: "අවුරුදු ගානක් එක්ක 💕", bg: "bg-emerald-200/60" },
  { text: "❤️", bg: "bg-rose/50" },
  { text: "💗", bg: "bg-pink-200/70" },
  { text: "💖", bg: "bg-violet-200/60" },
  { text: "🌸", bg: "bg-emerald-200/60" },
  { text: "🎊", bg: "bg-amber-200/70" },
];

export function ScatteredLabels() {
  // Keep each label on one edge lane only. If a label jumps between edges,
  // the tween crosses the center, so every path is locked to top/bottom/left/right.
  const items = useMemo(() => {
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const edgePath = (side: number) => {
      if (side === 0) {
        const y = rand(1, 8);
        return Array.from({ length: 6 }, () => ({ x: rand(-10, 96), y }));
      }
      if (side === 1) {
        const y = rand(90, 97);
        return Array.from({ length: 6 }, () => ({ x: rand(-10, 96), y }));
      }
      if (side === 2) {
        const x = rand(-2, 7);
        return Array.from({ length: 6 }, () => ({ x, y: rand(5, 92) }));
      }
      const x = rand(88, 98);
      return Array.from({ length: 6 }, () => ({ x, y: rand(5, 92) }));
    };

    return LABELS.map((l, i) => {
      const side = i % 4;
      const waypoints = edgePath(side).map((point) => ({
        ...point,
        r: rand(-10, 10),
      }));
      waypoints.push(waypoints[0]);

      return {
        ...l,
        waypoints,
        duration: rand(30, 48),
        delay: i * 0.25,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {items.map((l, i) => (
        <motion.div
          key={i}
          drag
          dragMomentum={false}
          dragElastic={0.5}
          initial={{
            opacity: 0,
            scale: 0,
            left: `${l.waypoints[0].x}vw`,
            top: `${l.waypoints[0].y}vh`,
            rotate: l.waypoints[0].r,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            left: l.waypoints.map((w) => `${w.x}vw`),
            top: l.waypoints.map((w) => `${w.y}vh`),
            rotate: l.waypoints.map((w) => w.r),
          }}
          transition={{
            opacity: { delay: l.delay, duration: 0.8 },
            scale: { delay: l.delay, type: "spring", damping: 10 },
            left: {
              duration: l.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: l.delay,
            },
            top: {
              duration: l.duration * 0.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: l.delay,
            },
            rotate: {
              duration: l.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: l.delay,
            },
          }}
          whileHover={{ scale: 1.15 }}
          whileDrag={{ scale: 1.2, zIndex: 50 }}
          className={`pointer-events-auto absolute cursor-grab active:cursor-grabbing ${l.bg} backdrop-blur-sm rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground/90 shadow-md whitespace-nowrap select-none touch-none`}
        >
          {l.text}
        </motion.div>
      ))}
    </div>
  );
}
