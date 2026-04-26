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
  { text: "❤️", bg: "bg-rose/50" },
  { text: "💗", bg: "bg-pink-200/70" },
  { text: "💖", bg: "bg-violet-200/60" },
  { text: "🌸", bg: "bg-emerald-200/60" },
];

export function ScatteredLabels() {
  // Generate per-label random waypoints across the whole viewport (in vw/vh).
  const items = useMemo(() => {
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    return LABELS.map((l, i) => {
      // 5 waypoints spread across the screen so it visibly roams everywhere
      const waypoints = Array.from({ length: 5 }, () => ({
        x: rand(2, 88), // vw — keep small margin from edges
        y: rand(4, 88), // vh
        r: rand(-15, 15),
      }));
      // Loop back to the first point so motion is seamless
      waypoints.push(waypoints[0]);

      return {
        ...l,
        waypoints,
        duration: rand(28, 46), // long, slow drift across the screen
        delay: i * 0.4,
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
