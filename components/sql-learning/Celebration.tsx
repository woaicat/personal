"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";

const pieces = Array.from({ length: 34 }, (_, index) => ({
  color: ["#246fe0", "#ef6255", "#f5b83c", "#32a879", "#9755d6"][index % 5],
  delay: (index % 9) * 24,
  endX: ((index * 47) % 440) - 220,
  fall: 210 + ((index * 29) % 180),
  startX: ((index * 31) % 110) - 55,
  turn: 280 + ((index * 83) % 440),
}));

interface CelebrationProps { onDone: () => void; }

export function Celebration({ onDone }: CelebrationProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1800);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="celebration" aria-live="polite" aria-label="任务完成，喝彩动画">
      <div className="celebration-message">完成一题！</div>
      {pieces.map((piece, index) => (
        <i
          className="confetti-piece"
          key={index}
          style={{
            "--confetti-end-x": `${piece.endX}px`,
            "--confetti-fall": `${piece.fall}px`,
            "--confetti-start-x": `${piece.startX}px`,
            "--confetti-turn": `${piece.turn}deg`,
            animationDelay: `${piece.delay}ms`,
            backgroundColor: piece.color,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
