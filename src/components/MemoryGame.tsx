import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJIS = ["💗", "🌹", "🎂", "🎁", "✨", "🥂", "🧸", "💌"];

type Card = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  return shuffle(pairs).map((emoji, id) => ({
    id,
    emoji,
    flipped: false,
    matched: false,
  }));
}

export function MemoryGame({ onWin }: { onWin: () => void }) {
  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const matchedCount = useMemo(
    () => cards.filter((c) => c.matched).length,
    [cards]
  );
  const total = cards.length;
  const progress = (matchedCount / total) * 100;

  useEffect(() => {
    if (matchedCount === total && total > 0) {
      const t = setTimeout(onWin, 900);
      return () => clearTimeout(t);
    }
  }, [matchedCount, total, onWin]);

  useEffect(() => {
    if (picked.length !== 2) return;
    setLocked(true);
    const [a, b] = picked;
    const cardA = cards.find((c) => c.id === a)!;
    const cardB = cards.find((c) => c.id === b)!;

    if (cardA.emoji === cardB.emoji) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a || c.id === b ? { ...c, matched: true } : c
          )
        );
        setPicked([]);
        setLocked(false);
      }, 500);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a || c.id === b ? { ...c, flipped: false } : c
          )
        );
        setPicked([]);
        setLocked(false);
      }, 900);
    }
  }, [picked, cards]);

  const handleClick = (id: number) => {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    );
    setPicked((p) => [...p, id]);
    if (picked.length === 1) setMoves((m) => m + 1);
    if (picked.length === 0) setMoves((m) => m + 1);
  };

  const reset = () => {
    setCards(buildDeck());
    setPicked([]);
    setMoves(0);
    setLocked(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-12"
    >
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Unlock කරන්න Solve කරන්න
        </p>
        <h2 className="mt-2 text-3xl sm:text-5xl font-bold text-gradient-romance">
          Pairs match කරන්න 💕
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          හැම pair එකම match කරාම ඔයාගේ gift එක unlock වෙනවා.
        </p>
      </div>

      <div className="mb-6 flex w-full max-w-md items-center gap-4">
        <div className="glass flex-1 rounded-full p-1">
          <motion.div
            className="h-2 rounded-full bg-gradient-romance"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", damping: 20 }}
          />
        </div>
        <div className="glass rounded-full px-4 py-1 text-sm">
          Moves: <span className="font-semibold text-rose">{moves}</span>
        </div>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const showFace = card.flipped || card.matched;
          return (
            <motion.button
              key={card.id}
              onClick={() => handleClick(card.id)}
              whileHover={{ scale: showFace ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative aspect-square w-full"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: showFace ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* back */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-romance shadow-soft flex items-center justify-center text-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  💗
                </div>
                {/* face */}
                <div
                  className={`absolute inset-0 rounded-2xl glass flex items-center justify-center text-3xl sm:text-5xl ${
                    card.matched ? "ring-2 ring-rose shadow-glow" : ""
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {card.emoji}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={reset}
        className="mt-8 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        ↻ අලුතින් පටන් ගන්න
      </button>
    </motion.div>
  );
}
