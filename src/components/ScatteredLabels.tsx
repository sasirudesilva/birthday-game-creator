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

    // Confine labels to edge bands (top, bottom, left, right) so they
    // roam beautifully across the screen without covering center content.
    const edgePoint = () => {
      const side = Math.floor(Math.random() * 4);
      // band thickness in vw/vh
      if (side === 0) {
        // top band
        return { x: rand(2, 92), y: rand(2, 14) };
      } else if (side === 1) {
        // bottom band
        return { x: rand(2, 92), y: rand(82, 94) };
      } else if (side === 2) {
        // left band
        return { x: rand(1, 12), y: rand(10, 88) };
      } else {
        // right band
        return { x: rand(82, 94), y: rand(10, 88) };
      }
    };

    return LABELS.map((l, i) => {
      const waypoints = Array.from({ length: 6 }, () => ({
        ...edgePoint(),
        r: rand(-12, 12),
      }));
      // Loop back to the first point so motion is seamless
      waypoints.push(waypoints[0]);

      return {
        ...l,
        waypoints,
        duration: rand(32, 52), // long, slow drift around the edges
        delay: i * 0.35,
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
