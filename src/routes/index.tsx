import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Welcome } from "@/components/Welcome";
import { MemoryGame } from "@/components/MemoryGame";
import { GiftReveal } from "@/components/GiftReveal";
import { FinalOutro } from "@/components/FinalOutro";
import { FloatingHearts } from "@/components/FloatingHearts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday My Love 💗" },
      {
        name: "description",
        content:
          "A tiny birthday game made just for you. Solve the puzzle to unlock your gift.",
      },
      { property: "og:title", content: "Happy Birthday My Love 💗" },
      {
        property: "og:description",
        content: "A tiny birthday game made just for you.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

type Stage = "welcome" | "game" | "gift" | "outro";

function Index() {
  const [stage, setStage] = useState<Stage>("welcome");

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-rose/30 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {stage !== "outro" && <FloatingHearts />}

      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <Welcome key="welcome" onStart={() => setStage("game")} />
        )}
        {stage === "game" && (
          <MemoryGame key="game" onWin={() => setStage("gift")} />
        )}
        {stage === "gift" && (
          <GiftReveal key="gift" onFinish={() => setStage("outro")} />
        )}
        {stage === "outro" && (
          <FinalOutro key="outro" onReplay={() => setStage("welcome")} />
        )}
      </AnimatePresence>
    </main>
  );
}

