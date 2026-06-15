import { useState } from "react";
import Card from "./components/Card.jsx";
import cards from "./cards.js";
import "./App.css";

// Pick a random index that isn't the current one
function getRandomIndex(currentIndex, length) {
  if (length === 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === currentIndex);
  return next;
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => getRandomIndex(prev, cards.length));
  };

  return (
    <div className="app">
      {/* Decorative plant row — SVG inline illustrations */}
      <div className="plant-strip plant-strip--top" aria-hidden="true">
        <PlantSVG />
      </div>

      <main className="content">
        <header className="header">
          <h1 className="title">The Ultimate Plant Parent!</h1>
          <p className="description">
            How good of a plant parent are you? Test all of your planty knowledge here!
          </p>
          <p className="card-count">Number of cards: {cards.length}</p>
        </header>

        <section className="card-area">
          <Card key={currentIndex} card={cards[currentIndex]} />
        </section>

        <button className="next-btn" onClick={handleNext} aria-label="Next random card">
          Next →
        </button>
      </main>

      <div className="plant-strip plant-strip--bottom" aria-hidden="true">
        <PlantSVG flip />
      </div>
    </div>
  );
}

// Minimal inline plant SVG strip matching the screenshot aesthetic
function PlantSVG({ flip }) {
  return (
    <svg
      viewBox="0 0 900 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Monstera leaf */}
      <g transform="translate(60,10)" stroke="#8aba84" strokeWidth="1.5" fill="none">
        <path d="M40,110 C20,60 0,30 30,10 C50,-5 80,10 70,40 C65,60 55,80 40,110Z" />
        <path d="M40,70 C30,55 20,45 15,40" />
        <path d="M40,85 C50,70 60,60 65,50" />
        <line x1="40" y1="110" x2="40" y2="10" strokeDasharray="3,3" strokeOpacity="0.4" />
      </g>
      {/* Cactus */}
      <g transform="translate(200,20)" stroke="#8aba84" strokeWidth="1.5" fill="none">
        <rect x="20" y="0" width="22" height="90" rx="11" />
        <path d="M31,25 C20,20 8,22 5,35 C3,45 10,48 20,45" />
        <path d="M31,45 C42,40 54,42 57,55 C59,65 52,68 42,65" />
        <rect x="14" y="88" width="34" height="10" rx="3" />
        {/* Spines */}
        {[10,20,30,50,65,80].map((y, i) => (
          <line key={i} x1="20" y1={y} x2="12" y2={y - 3} strokeWidth="1" />
        ))}
      </g>
      {/* Trailing pothos */}
      <g transform="translate(360,0)" stroke="#6fa86a" strokeWidth="1.5" fill="none">
        <path d="M30,0 C35,20 20,40 25,60 C28,75 35,90 30,115" />
        {[15,35,55,75,100].map((y, i) => (
          <ellipse key={i} cx={30 + (i % 2 === 0 ? -20 : 20)} cy={y} rx="14" ry="10"
            transform={`rotate(${i % 2 === 0 ? -20 : 20}, ${30 + (i % 2 === 0 ? -20 : 20)}, ${y})`} />
        ))}
      </g>
      {/* Snake plant */}
      <g transform="translate(500,5)" stroke="#8aba84" strokeWidth="1.5" fill="none">
        {[-18, -7, 0, 7, 18].map((x, i) => (
          <path key={i} d={`M30,115 C${30 + x * 0.5},90 ${30 + x},50 ${30 + x},${10 + Math.abs(x) * 2}`} />
        ))}
        <rect x="10" y="110" width="40" height="12" rx="3" />
      </g>
      {/* Palm frond */}
      <g transform="translate(660,0)" stroke="#6fa86a" strokeWidth="1.5" fill="none">
        <line x1="40" y1="120" x2="40" y2="40" />
        {[0, 30, 60, 90, 120, 150, 210, 240, 270, 300, 330].map((angle, i) => (
          <path key={i}
            d={`M40,${40 + i * 0} C${40 + Math.cos((angle * Math.PI) / 180) * 50},${40 + Math.sin((angle * Math.PI) / 180) * 30 - i * 8} ${40 + Math.cos((angle * Math.PI) / 180) * 70},${25 + Math.sin((angle * Math.PI) / 180) * 40 - i * 8}`}
          />
        ))}
        {/* Simplified: just 4 fronds */}
        <path d="M40,40 C10,10 -10,5 -20,15" />
        <path d="M40,40 C30,10 25,-5 15,-10" />
        <path d="M40,40 C60,10 75,-2 80,10" />
        <path d="M40,40 C70,15 85,12 90,22" />
      </g>
      {/* Aloe */}
      <g transform="translate(800,30)" stroke="#8aba84" strokeWidth="1.5" fill="none">
        {[-25, -12, 0, 12, 25].map((x, i) => (
          <path key={i}
            d={`M40,95 C${40 + x * 0.3},70 ${40 + x},50 ${40 + x},${20 + Math.abs(x)}`}
            strokeWidth={i === 2 ? "2" : "1.5"}
          />
        ))}
        <ellipse cx="40" cy="95" rx="28" ry="8" />
      </g>
    </svg>
  );
}

export default App;
