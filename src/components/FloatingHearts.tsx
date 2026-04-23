import { useMemo } from "react";

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 200,
        size: 14 + Math.random() * 22,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-40px",
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `float-heart ${h.duration}s linear ${h.delay}s infinite`,
            // @ts-expect-error css var
            "--drift": `${h.drift}px`,
          }}
        >
          {["💖", "💕", "✨", "🌸", "💗"][h.id % 5]}
        </div>
      ))}
    </div>
  );
}
