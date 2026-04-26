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

  const N = PRIZES.length;
  const segAngle = 360 / N;
  const SIZE = 360; // svg viewBox size
  const R = SIZE / 2;

  // Build wedge path for segment i
  const wedgePath = (i: number) => {
    const start = i * segAngle - 90; // start at top
    const end = (i + 1) * segAngle - 90;
    const sx = R + R * Math.cos((start * Math.PI) / 180);
    const sy = R + R * Math.sin((start * Math.PI) / 180);
    const ex = R + R * Math.cos((end * Math.PI) / 180);
    const ey = R + R * Math.sin((end * Math.PI) / 180);
    const largeArc = segAngle > 180 ? 1 : 0;
    return `M ${R} ${R} L ${sx} ${sy} A ${R} ${R} 0 ${largeArc} 1 ${ex} ${ey} Z`;
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const chosen = Math.floor(Math.random() * N);
    const turns = 6;
    // Pointer is at top. Segment i center angle (cw from top) = i*segAngle + segAngle/2
    const targetAngle = 360 - (chosen * segAngle + segAngle / 2);
    const finalRotation =
      rotation + turns * 360 + (targetAngle - (rotation % 360));

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
        <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2">
          <div className="h-0 w-0 border-x-[14px] border-t-[26px] border-x-transparent border-t-rose drop-shadow-lg" />
        </div>

        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4.5, ease: [0.17, 0.67, 0.16, 0.99] }}
          className="rounded-full shadow-glow"
          style={{
            width: "min(85vw, 420px)",
            height: "min(85vw, 420px)",
          }}
        >
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-full w-full drop-shadow-2xl"
          >
            <defs>
              <filter id="wedgeShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Wedges */}
            {PRIZES.map((p, i) => (
              <path
                key={i}
                d={wedgePath(i)}
                fill={p.color}
                stroke="#ffffff"
                strokeWidth={3}
              />
            ))}

            {/* Labels — rotate group to wedge center, then place text along radius */}
            {PRIZES.map((p, i) => {
              const centerAngle = i * segAngle + segAngle / 2 - 90;
              // Position emoji + text along the wedge radius
              const textRadius = R * 0.62;
              const emojiRadius = R * 0.78;
              const ex = R + emojiRadius * Math.cos((centerAngle * Math.PI) / 180);
              const ey = R + emojiRadius * Math.sin((centerAngle * Math.PI) / 180);
              const tx = R + textRadius * Math.cos((centerAngle * Math.PI) / 180);
              const ty = R + textRadius * Math.sin((centerAngle * Math.PI) / 180);

              // Rotate text so it reads outward along radius
              const textRotate = centerAngle + 90;

              // Split label into max 2 lines for fit
              const words = p.label.split(" ");
              const mid = Math.ceil(words.length / 2);
              const line1 = words.slice(0, mid).join(" ");
              const line2 = words.slice(mid).join(" ");

              return (
                <g key={`lbl-${i}`}>
                  <text
                    x={ex}
                    y={ey}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="22"
                  >
                    {p.emoji}
                  </text>
                  <g transform={`rotate(${textRotate} ${tx} ${ty})`}>
                    <text
                      x={tx}
                      y={ty}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#ffffff"
                      style={{
                        paintOrder: "stroke",
                        stroke: "rgba(0,0,0,0.25)",
                        strokeWidth: 0.6,
                      }}
                    >
                      <tspan x={tx} dy="-0.4em">
                        {line1}
                      </tspan>
                      {line2 && (
                        <tspan x={tx} dy="1.1em">
                          {line2}
                        </tspan>
                      )}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Outer ring */}
            <circle
              cx={R}
              cy={R}
              r={R - 2}
              fill="none"
              stroke="#ffffff"
              strokeWidth={4}
            />

            {/* Center hub */}
            <circle cx={R} cy={R} r={32} fill="#ffffff" />
            <text
              x={R}
              y={R}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="28"
            >
              💗
            </text>
          </svg>
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
