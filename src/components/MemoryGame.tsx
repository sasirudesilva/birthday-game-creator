import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import cardRose from "@/assets/card-rose.jpg";
import cardCake from "@/assets/card-cake.jpg";
import cardTeddy from "@/assets/card-teddy.jpg";
import cardCheers from "@/assets/card-cheers.jpg";
import cardGift from "@/assets/card-gift.jpg";
import cardHeart from "@/assets/card-heart.jpg";
import cardLetter from "@/assets/card-letter.jpg";
import cardFlowers from "@/assets/card-flowers.jpg";

type CardImage = { id: string; src: string; alt: string };

const IMAGES: CardImage[] = [
  { id: "rose", src: cardRose, alt: "Pink rose" },
  { id: "cake", src: cardCake, alt: "Birthday cupcake" },
  { id: "teddy", src: cardTeddy, alt: "Teddy bear with heart" },
  { id: "cheers", src: cardCheers, alt: "Champagne cheers" },
  { id: "gift", src: cardGift, alt: "Pink gift box" },
  { id: "heart", src: cardHeart, alt: "Glowing heart" },
  { id: "letter", src: cardLetter, alt: "Love letter" },
  { id: "flowers", src: cardFlowers, alt: "Tulip bouquet" },
];

type Card = {
  id: number;
  imageId: string;
  src: string;
  alt: string;
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
  const pairs = [...IMAGES, ...IMAGES];
  return shuffle(pairs).map((img, id) => ({
    id,
    imageId: img.id,
    src: img.src,
    alt: img.alt,
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

    if (cardA.imageId === cardB.imageId) {
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
          Pairs match කරලා unlock කරන්න
        </p>
        <h2 className="mt-2 text-3xl sm:text-5xl font-bold text-gradient-romance">
          ලස්සන photos යුගල කරන්න 💕
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          හැම pair එකම match කරාම ඔයාගේ surprise එක unlock වෙනවා.
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
              aria-label={showFace ? card.alt : "Hidden card"}
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
                  className={`absolute inset-0 overflow-hidden rounded-2xl glass ${
                    card.matched ? "ring-2 ring-rose shadow-glow" : ""
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {card.matched && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-rose/20 text-3xl"
                    >
                      💖
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <button
          onClick={reset}
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ↻ අලුතින් පටන් ගන්න
        </button>
        <button
          onClick={onWin}
          className="text-xs text-muted-foreground/60 underline-offset-4 hover:text-muted-foreground hover:underline"
        >
          (skip → testing)
        </button>
      </div>
    </motion.div>
  );
}
