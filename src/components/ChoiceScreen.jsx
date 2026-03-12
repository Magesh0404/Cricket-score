// src/components/ChoiceScreen.jsx
// Screen 3 — Toss winner chooses Bat or Bowl

import { useState } from "react";

export default function ChoiceScreen({ tossWinner, tossLoser, onNext }) {
  const [choice, setChoice] = useState(null);

  // battingFirst / bowlingFirst teams
  const battingFirst  = choice === "bat"  ? tossWinner : tossLoser;
  const bowlingFirst  = choice === "bat"  ? tossLoser  : tossWinner;

  return (
    <div className="screen">
      <div className="steps">
        <div className="step-dot done" />
        <div className="step-dot done" />
        <div className="step-dot active" />
        <div className="step-dot" />
        <div className="step-dot" />
      </div>

      <div className="big-title">ELECT TO</div>
      <div className="sub-title">{tossWinner} won the toss</div>

      <div className="card">
        <div className="card-title">🏆 {tossWinner} — Make Your Choice</div>

        <div className="choice-grid">
          <div
            className={`choice-card ${choice === "bat" ? "selected-bat" : ""}`}
            onClick={() => setChoice("bat")}
          >
            <div className="choice-icon">🏏</div>
            <div className="choice-label">BAT</div>
            <div className="choice-sub">Score first</div>
          </div>
          <div
            className={`choice-card ${choice === "bowl" ? "selected-bowl" : ""}`}
            onClick={() => setChoice("bowl")}
          >
            <div className="choice-icon">🎯</div>
            <div className="choice-label">BOWL</div>
            <div className="choice-sub">Chase later</div>
          </div>
        </div>

        {choice && (
          <div style={{ padding:"10px 12px", borderRadius:"10px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", marginBottom:"16px", fontSize:"0.82rem" }}>
            <div className="info-row"><span>🏏 Batting 1st</span><strong style={{color:"#FFD700"}}>{battingFirst}</strong></div>
            <div className="info-row"><span>🎯 Bowling 1st</span><strong style={{color:"#00E676"}}>{bowlingFirst}</strong></div>
          </div>
        )}

        <button
          className="btn btn-gold btn-full"
          style={{ opacity: choice ? 1 : 0.35, pointerEvents: choice ? "auto" : "none" }}
          onClick={() => onNext({ battingFirst, bowlingFirst })}
        >
          CONFIRM →
        </button>
      </div>
    </div>
  );
}
