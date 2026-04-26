import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const PRIZES = [
  { label: "Birthday Photoshoot", emoji: "📸", color: "#ff6fa3" },
  { label: "Special Dinner Date", emoji: "🍝", color: "#ffd86b" },
  { label: "Movie Night", emoji: "🎬", color: "#a78bfa" },
  { label: "Unlimited Hugs", emoji: "🤗", color: "#fb923c" },
  { label: "Spin Again!", emoji: "🔄", color: "#34d399" },
  { label: "Pick Anything You Want!", emoji: "✨", color: "#f472b6" },
];

export function SpinWheel({
  onFinish,
}: {
  onFinish: (prize: { label: string; emoji: string }) => void;
}) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const segAngle = 360 / PRIZES.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    let chosen = Math.floor(Math.random() * PRIZES.length);
    // Avoid landing on "Spin Again!" too — but allow re-spin behavior
    const turns = 6;
    // Pointer is at top (0deg). Segment i is centered at i*segAngle + segAngle/2.
    // We want chosen segment center to be at top after rotation.
    const targetAngle = 360 - (chosen * segAngle + segAngle / 2);
    const finalRotation = rotation + turns * 360 + (targetAngle - (rotation % 360));

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(chosen);
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#ff6fa3", "#ffd86b", "#ffffff", "#a78bfa"],
      });
    }, 4500);
  };

  const handleContinue = () => {
    if (result === null) return;
    const prize = PRIZES[result];
    if (prize.label === "Spin Again!") {
      setResult(null);
      spin();
      return;
    }
    onFinish({ label: prize.label, emoji: prize.emoji });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center"
    >
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        Bonus round 🎡
      </motion.p>
      <motion.h2
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="mt-3 text-3xl sm:text-5xl font-bold text-gradient-romance"
      >
        Spin කරලා surprise එකක් ගන්න 💗
      </motion.h2>

      <div className="relative mt-10 flex items-center justify-center">
        {/* Pointer */}
        <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
          <div className="h-0 w-0 border-x-[14px] border-t-[24px] border-x-transparent border-t-rose drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4.5, ease: [0.17, 0.67, 0.16, 0.99] }}
          className="relative h-72 w-72 sm:h-96 sm:w-96 rounded-full shadow-glow"
          style={{
            background: `conic-gradient(${PRIZES.map((p, i) => {
              const start = (i / PRIZES.length) * 360;
              const end = ((i + 1) / PRIZES.length) * 360;
              return `${p.color} ${start}deg ${end}deg`;
            }).join(", ")})`,
          }}
        >
          {PRIZES.map((p, i) => {
            const angle = i * segAngle + segAngle / 2;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-[0_0]"
                style={{
                  transform: `rotate(${angle}deg) translateY(-42%)`,
                }}
              >
                <div
                  className="-translate-x-1/2 text-center text-white font-bold drop-shadow"
                  style={{ width: "110px" }}
                >
                  <div className="text-2xl">{p.emoji}</div>
                  <div className="text-[10px] sm:text-xs leading-tight mt-1">
                    {p.label}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-glow flex items-center justify-center text-2xl">
            💗
          </div>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        {result !== null && !spinning ? (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="glass rounded-2xl px-6 py-4 shadow-glow"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              ඔයාට ලැබුණා 🎉
            </p>
            <p className="mt-1 text-2xl font-bold text-gradient-romance">
              {PRIZES[result].emoji} {PRIZES[result].label}
            </p>
          </motion.div>
        ) : null}

        <motion.button
          whileHover={{ scale: spinning ? 1 : 1.05 }}
          whileTap={{ scale: spinning ? 1 : 0.95 }}
          onClick={result === null ? spin : handleContinue}
          disabled={spinning}
          className="rounded-full bg-gradient-romance px-8 py-3 text-base font-semibold text-primary-foreground shadow-glow disabled:opacity-50"
        >
          {spinning
            ? "Spinning..."
            : result === null
              ? "SPIN 🎡"
              : PRIZES[result].label === "Spin Again!"
                ? "Spin Again 🔄"
                : "Continue →"}
        </motion.button>
      </div>
    </motion.div>
  );
}
