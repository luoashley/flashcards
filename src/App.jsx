import { useState } from "react";
import Card from "./components/Card.jsx";
import cards from "./cards.js";
import "./App.css";

function App() {
  // --- State Variables ---
  const [cardPool, setCardPool] = useState(cards);
  const [masteredIds, setMasteredIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [userGuess, setUserGuess] = useState("");
  const [guessStatus, setGuessStatus] = useState("unsubmitted"); // 'correct' | 'incorrect' | 'unsubmitted'
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Derived State: filter out mastered cards
  const activeCards = cardPool.filter((card) => !masteredIds.includes(card.id));
  const currentCard = activeCards[currentIndex];

  // --- Handlers ---
  const handleNext = () => {
    if (currentIndex < activeCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetGuessState();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetGuessState();
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCardPool(shuffled);
    setCurrentIndex(0);
    resetGuessState();
  };

  const handleMaster = () => {
    if (!currentCard) return;

    setMasteredIds((prev) => [...prev, currentCard.id]);

    if (currentIndex >= activeCards.length - 1 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    resetGuessState();
  };

  const handleResetPool = () => {
    setCardPool(cards);
    setMasteredIds([]);
    setCurrentIndex(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    resetGuessState();
  };

  const resetGuessState = () => {
    setUserGuess("");
    setGuessStatus("unsubmitted");
  };

  const handleCheckGuess = (e) => {
    e.preventDefault();
    if (!currentCard || !userGuess.trim()) return;

    const sanitize = (str) =>
        str
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?—]/g, "")
            .replace(/\s+/g, " ")
            .trim();

    const cleanGuess = sanitize(userGuess);
    const cleanAnswer = sanitize(currentCard.answer);

    if (cleanGuess.length > 0 && (cleanAnswer.includes(cleanGuess) || cleanGuess.includes(cleanAnswer))) {
      setGuessStatus("correct");
      setCurrentStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setGuessStatus("incorrect");
      setCurrentStreak(0);
    }
  };

  return (
      <div className="app">
        {/* Top Decorative Plant Strip */}
        <div className="plant-strip plant-strip--top" aria-hidden="true">
          <PlantSVG />
        </div>

        {/* Main Container - Structured to be Centered */}
        <main className="content">
          <header className="header">
            <h1 className="title">The Ultimate Plant Parent!</h1>
            <p className="description">
              How good of a plant parent are you? Test all of your planty knowledge here!
            </p>
            <p className="card-count">
              Cards remaining: {activeCards.length} / {cards.length}
              {masteredIds.length > 0 && ` (${masteredIds.length} mastered)`}
            </p>

            {/* Streak Dashboards */}
            <div className="streak-container">
              <span className="streak-badge current-streak">Current Streak: {currentStreak} 🔥</span>
              <span className="streak-badge max-streak">Longest Streak: {maxStreak} 🏆</span>
            </div>
          </header>

          {activeCards.length > 0 ? (
              <>
                <section className="card-area">
                  <Card key={currentCard.id} card={currentCard} />
                </section>

                {/* Guess Input Form Container */}
                <form onSubmit={handleCheckGuess} className="guess-form">
                  <div className={`input-group ${guessStatus}`}>
                    <input
                        type="text"
                        placeholder="Type your guess here..."
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        className="guess-input"
                        disabled={guessStatus === "correct"}
                    />
                    <button type="submit" className="submit-btn" disabled={guessStatus === "correct"}>
                      Submit
                    </button>
                  </div>
                  {guessStatus === "correct" && <p className="feedback correct-text">Correct! 🎉</p>}
                  {guessStatus === "incorrect" && <p className="feedback incorrect-text">Incorrect, try again! ❌</p>}
                </form>

                {/* Action Buttons Interface */}
                <div className="controls-container">
                  <button
                      type="button"
                      className="nav-btn"
                      onClick={handleBack}
                      disabled={currentIndex === 0}
                  >
                    ← Back
                  </button>

                  <button type="button" className="action-btn master-btn" onClick={handleMaster}>
                    Mastered 👑
                  </button>

                  <button type="button" className="action-btn shuffle-btn" onClick={handleShuffle}>
                    Shuffle 🔀
                  </button>

                  <button
                      type="button"
                      className="nav-btn"
                      onClick={handleNext}
                      disabled={currentIndex === activeCards.length - 1}
                  >
                    Next →
                  </button>
                </div>
              </>
          ) : (
              <div className="completion-screen">
                <h2>🌿 Ultimate Status Achieved! 🌿</h2>
                <p>You have successfully mastered every single flashcard in this set.</p>
                <button className="nav-btn" onClick={handleResetPool}>
                  Restart Deck
                </button>
              </div>
          )}
        </main>

        {/* Bottom Decorative Plant Strip */}
        <div className="plant-strip plant-strip--bottom" aria-hidden="true">
          <PlantSVG flip />
        </div>
      </div>
  );
}

function PlantSVG({ flip }) {
  return (
      <svg
          viewBox="0 0 900 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: flip ? "scaleX(-1)" : undefined }}
          preserveAspectRatio="xMidYMid slice"
      >
        <g transform="translate(60,10)" stroke="#8aba84" strokeWidth="1.5" fill="none">
          <path d="M40,110 C20,60 0,30 30,10 C50,-5 80,10 70,40 C65,60 55,80 40,110Z" />
          <path d="M40,70 C30,55 20,45 15,40" />
          <path d="M40,85 C50,70 60,60 65,50" />
          <line x1="40" y1="110" x2="40" y2="10" strokeDasharray="3,3" strokeOpacity="0.4" />
        </g>
        <g transform="translate(200,20)" stroke="#8aba84" strokeWidth="1.5" fill="none">
          <rect x="20" y="0" width="22" height="90" rx="11" />
          <path d="M31,25 C20,20 8,22 5,35 C3,45 10,48 20,45" />
          <path d="M31,45 C42,40 54,42 57,55 C59,65 52,68 42,65" />
          <rect x="14" y="88" width="34" height="10" rx="3" />
          {[10,20,30,50,65,80].map((y, i) => (
              <line key={i} x1="20" y1={y} x2="12" y2={y - 3} strokeWidth="1" />
          ))}
        </g>
        <g transform="translate(360,0)" stroke="#6fa86a" strokeWidth="1.5" fill="none">
          <path d="M30,0 C35,20 20,40 25,60 C28,75 35,90 30,115" />
          {[15,35,55,75,100].map((y, i) => (
              <ellipse key={i} cx={30 + (i % 2 === 0 ? -20 : 20)} cy={y} rx="14" ry="10"
                       transform={`rotate(${i % 2 === 0 ? -20 : 20}, ${30 + (i % 2 === 0 ? -20 : 20)}, ${y})`} />
          ))}
        </g>
        <g transform="translate(500,5)" stroke="#8aba84" strokeWidth="1.5" fill="none">
          {[-18, -7, 0, 7, 18].map((x, i) => (
              <path key={i} d={`M30,115 C${30 + x * 0.5},90 ${30 + x},50 ${30 + x},${10 + Math.abs(x) * 2}`} />
          ))}
          <rect x="10" y="110" width="40" height="12" rx="3" />
        </g>
        <g transform="translate(660,0)" stroke="#6fa86a" strokeWidth="1.5" fill="none">
          <line x1="40" y1="120" x2="40" y2="40" />
          {[0, 30, 60, 90, 120, 150, 210, 240, 270, 300, 330].map((angle, i) => (
              <path key={i}
                    d={`M40,${40 + i * 0} C${40 + Math.cos((angle * Math.PI) / 180) * 50},${40 + Math.sin((angle * Math.PI) / 180) * 30 - i * 8} ${40 + Math.cos((angle * Math.PI) / 180) * 70},${25 + Math.sin((angle * Math.PI) / 180) * 40 - i * 8}`}
              />
          ))}
          <path d="M40,40 C10,10 -10,5 -20,15" />
          <path d="M40,40 C30,10 25,-5 15,-10" />
          <path d="M40,40 C60,10 75,-2 80,10" />
          <path d="M40,40 C70,15 85,12 90,22" />
        </g>
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
