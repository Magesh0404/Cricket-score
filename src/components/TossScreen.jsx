// src/components/TossScreen.jsx
// Screen 2 — Coin toss with team names

import { useState } from "react";

export default function TossScreen({ team1, team2, onNext }) {
  const [tossChoice, setTossChoice] = useState(null);
  const [tossResult, setTossResult] = useState(null);
  const [isFlipping, setIsFlipping]= useState(false);

  function flipCoin(choice) {
    if (isFlipping) return;
    setTossChoice(choice);
    setIsFlipping(true);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "HEADS" : "TAILS";
      setTossResult(result);
      setIsFlipping(false);
    }, 1300);
  }

  const tossWinner = tossResult
    ? (tossResult === tossChoice ? team1 : team2)
    : null;

  return (
    <div className="screen">
      <div className="steps">
        <div className="step-dot done" />
        <div className="step-dot active" />
        <div className="step-dot" />
        <div className="step-dot" />
        <div className="step-dot" />
      </div>

      <div className="big-title">TOSS TIME</div>
      <div className="sub-title">{team1} calls the toss</div>

      <div className="card">
        <div className="card-title">🪙 Flip the Coin</div>

        <div className="coin-wrap">
          <div className={`coin ${isFlipping ? "flipping" : ""}`}>
            <div className={`coin-face ${tossResult === "TAILS" ? "tails" : "heads"}`}>
              {tossResult === "TAILS" ? "🔘" : "⭐"}
            </div>
          </div>
        </div>

        {tossResult && (
          <div className="result-badge">
            <div className="result-label">Result</div>
            <div className="result-value">{tossResult}!</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.88rem", marginTop:"4px" }}>
              <strong style={{ color:"#FFD700" }}>{tossWinner}</strong> won the toss! 🎉
            </div>
          </div>
        )}

        {!tossResult && !isFlipping && (
          <>
            <div style={{ textAlign:"center", color:"rgba(255,255,255,0.4)", fontSize:"0.78rem", letterSpacing:"2px", marginBottom:"14px" }}>
              {team1} — CALL IT
            </div>
            <div className="btn-row">
              <button className="btn btn-gold"   onClick={() => flipCoin("HEADS")}>⭐ Heads</button>
              <button className="btn btn-silver" onClick={() => flipCoin("TAILS")}>🔘 Tails</button>
            </div>
          </>
        )}

        {isFlipping && (
          <div style={{ textAlign:"center", color:"#FFD700", fontFamily:"'Orbitron',monospace", fontSize:"0.78rem", letterSpacing:"3px" }}>
            FLIPPING...
          </div>
        )}

        {tossResult && (
          <button
            className="btn btn-green btn-full"
            style={{ marginTop:"12px" }}
            onClick={() => onNext({ tossResult, tossWinner, tossLoser: tossWinner === team1 ? team2 : team1 })}
          >
            NEXT: CHOOSE INNINGS →
          </button>
        )}
      </div>
    </div>
  );
}
