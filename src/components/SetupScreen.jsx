// src/components/SetupScreen.jsx
// Screen 1 — Enter team names and number of players

import { useState } from "react";

export default function SetupScreen({ onNext }) {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [members, setMembers] = useState(11);

  const memberOptions = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20];
  const canProceed = team1.trim().length > 0 && team2.trim().length > 0;

  return (
    <div className="screen">
      <div className="steps">
        <div className="step-dot active" />
        <div className="step-dot" />
        <div className="step-dot" />
        <div className="step-dot" />
        <div className="step-dot" />
      </div>

      <div className="big-title">MATCH SETUP</div>
      <div className="sub-title">Enter team details</div>

      <div className="card">
        <div className="card-title">🏟️ Team Registration</div>

        <div className="input-group">
          <label className="input-label">🔴 Team 1 Name</label>
          <input
            className="input-field"
            type="text"
            placeholder="e.g. Mumbai Indians"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            maxLength={20}
          />
        </div>

        <div className="input-group">
          <label className="input-label">🔵 Team 2 Name</label>
          <input
            className="input-field"
            type="text"
            placeholder="e.g. Chennai Kings"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            maxLength={20}
          />
        </div>

        <div className="divider" />

        <label className="input-label">👥 Players Per Side</label>
        <div className="member-grid">
          {memberOptions.map((m) => (
            <div
              key={m}
              className={`member-btn ${members === m ? "selected" : ""}`}
              onClick={() => setMembers(m)}
            >
              {m}
            </div>
          ))}
        </div>

        <button
          className="btn btn-gold btn-full"
          style={{ opacity: canProceed ? 1 : 0.35, pointerEvents: canProceed ? "auto" : "none" }}
          onClick={() => onNext({ team1: team1.trim(), team2: team2.trim(), members })}
        >
          NEXT: TOSS →
        </button>
      </div>
    </div>
  );
}
