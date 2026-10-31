import { useMemo } from "react";

// Sirf CSS se chalne wale halke hearts (reduced-motion me band ho jate hain)
export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        left: 6 + ((i * 11) % 88),
        size: 12 + ((i * 7) % 14),
        delay: -(i * 2.7),
        duration: 16 + ((i * 5) % 10),
      })),
    []
  );

  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
