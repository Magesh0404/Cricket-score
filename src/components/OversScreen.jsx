// src/components/OversScreen.jsx
// Screen 4 — Select overs (5–15)

import { useState } from "react";

export default function OversScreen({ battingFirst, bowlingFirst, onNext }) {
  const [totalOvers, setTotalOvers] = useState(10);
  const overs = Array.from({ length: 11 }, (_, i) => i + 5);

  return (
    <div className="screen">
      <div className="steps">
        <div className="step-dot done" />
        <div className="step-dot done" />
        <div className="step-dot done" />
        <div className="step-dot active" />
        <div className="step-dot" />
      </div>

      <div className="big-title">SET OVERS</div>
      <div className="sub-title">How long is the match?</div>

      <div className="card">
        <div className="card-title">⚙️ Match Configuration</div>

        <div className="info-row"><span>🏏 Batting 1st</span><strong style={{color:"#FFD700"}}>{battingFirst}</strong></div>
        <div className="info-row"><span>🎯 Bowling 1st</span><strong style={{color:"#00E676"}}>{bowlingFirst}</strong></div>

        <div className="divider" />

        <label className="input-label">Select Overs Per Innings</label>
        <div className="select-wrap">
          <select value={totalOvers} onChange={(e) => setTotalOvers(Number(e.target.value))}>
            {overs.map((o) => (
              <option key={o} value={o}>{o} OVERS</option>
            ))}
          </select>
        </div>

        <div style={{ padding:"10px 12px", borderRadius:"10px", background:"rgba(255,215,0,0.06)", border:"1px solid rgba(255,215,0,0.2)", marginBottom:"16px", fontSize:"0.8rem", color:"rgba(255,255,255,0.45)", textAlign:"center", letterSpacing:"1px" }}>
          📋 {totalOvers * 6} balls per innings · {totalOvers * 2} overs total
        </div>

        <button className="btn btn-gold btn-full" onClick={() => onNext({ totalOvers })}>
          🏟️ START MATCH →
        </button>
      </div>
    </div>
  );
}
