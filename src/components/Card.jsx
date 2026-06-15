import { useState } from "react";
import "./Card.css";

// Category → accent color map (stretch feature: visual styles by category)
const categoryColors = {
  easy:   { bg: "#d4e8d0", border: "#8aba84", label: "Easy" },
  medium: { bg: "#fef0c7", border: "#d4a843", label: "Medium" },
  hard:   { bg: "#fde0de", border: "#d47b75", label: "Hard" },
};

function Card({ card }) {
  const [flipped, setFlipped] = useState(false);
  const colors = categoryColors[card.category] || categoryColors.easy;

  const handleClick = () => setFlipped((prev) => !prev);

  return (
    <div className="card-scene" onClick={handleClick} role="button" aria-label="Flip card" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}>
      <div className={`card-inner${flipped ? " is-flipped" : ""}`}>
        {/* FRONT */}
        <div className="card-face card-front" style={{ borderColor: colors.border }}>
          <span className="card-category-badge" style={{ background: colors.bg, color: colors.border }}>
            {colors.label}
          </span>
          <div className="card-emoji">{card.emoji}</div>
          <p className="card-text">{card.question}</p>
          <span className="card-hint">tap to reveal ↓</span>
        </div>
        {/* BACK */}
        <div className="card-face card-back" style={{ background: colors.bg, borderColor: colors.border }}>
          <span className="card-category-badge" style={{ background: "white", color: colors.border }}>
            {colors.label}
          </span>
          <p className="card-text card-answer">{card.answer}</p>
          <span className="card-hint">tap to flip back ↑</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
