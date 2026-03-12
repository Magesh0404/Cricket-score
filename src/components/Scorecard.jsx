// src/components/Scorecard.jsx
// Screen 5 — Live scoring for current batting team

import { useState, useRef } from "react";

export default function Scorecard({
  battingTeam,
  bowlingTeam,
  totalOvers,
  members,        // max wickets = members - 1
  innings,        // 1 or 2
  target,         // runs needed (2nd innings only)
  targetBalls,    // balls available (2nd innings only)
  onInningsEnd,   // called when innings over
}) {
  const [runs, setRuns]                     = useState(0);
  const [wickets, setWickets]               = useState(0);
  const [balls, setBalls]                   = useState(0);
  const [currentOverBalls, setCurrentOverBalls] = useState([]);
  const [overHistory, setOverHistory]       = useState([]);
  const [toast, setToast]                   = useState(null);
  const toastTimer = useRef(null);

  const totalBalls  = totalOvers * 6;
  const maxWickets  = members - 1;
  const currentOver = Math.floor(balls / 6);
  const ballInOver  = balls % 6;

  // 2nd innings chase info
  const runsNeeded   = innings === 2 ? target - runs : null;
  const ballsLeft2   = innings === 2 ? totalBalls - balls : null;
  const isChasing    = innings === 2;

  function showToast(msg) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  function endInnings(finalRuns, finalWickets, finalBalls, reason) {
    setTimeout(() => onInningsEnd({
      runs: finalRuns,
      wickets: finalWickets,
      balls: finalBalls,
      reason,
    }), 350);
  }

  function addBall(runVal, label, type) {
    const isExtra    = type === "WD" || type === "NB";
    const newBalls   = balls + (isExtra ? 0 : 1);
    const newRuns    = runs + runVal;
    const newWickets = type === "W" ? wickets + 1 : wickets;
    const bubble     = { label, type };
    const newOverBalls = [...currentOverBalls, bubble];

    setRuns(newRuns);
    if (type === "W") setWickets(newWickets);
    setBalls(newBalls);
    setCurrentOverBalls(newOverBalls);

    // Over complete
    if (!isExtra && newBalls % 6 === 0 && newBalls > 0) {
      const overRuns = newOverBalls.reduce((s, b) => s + (parseInt(b.label) || 0), 0);
      setOverHistory((prev) => [...prev, { over: currentOver + 1, runs: overRuns }]);
      setCurrentOverBalls([]);
      if (newBalls < totalBalls) showToast(`✦ OVER ${currentOver + 1} — ${overRuns} RUNS`);
    }

    // 2nd innings: check if target achieved
    if (isChasing && newRuns >= target) {
      endInnings(newRuns, newWickets, newBalls, "target_achieved");
      return;
    }

    // All out
    if (newWickets >= maxWickets) {
      endInnings(newRuns, newWickets, newBalls, "all_out");
      return;
    }

    // Overs finished
    if (!isExtra && newBalls >= totalBalls) {
      endInnings(newRuns, newWickets, newBalls, "overs_complete");
      return;
    }
  }

  return (
    <div className="screen scorecard-screen">

      {/* SCORE DISPLAY */}
      <div className="score-display">
        <div className="score-team-label">
          {innings === 1 ? "1ST INNINGS" : "2ND INNINGS"} — {battingTeam.toUpperCase()}
        </div>
        <div className="score-main">
          <span>{runs}</span>
          <span className="score-divider">/</span>
          <span className="score-wickets">{wickets}</span>
        </div>

        <div className="score-meta">
          <div className="score-meta-item">
            <div className="score-meta-label">Overs</div>
            <div className="score-meta-value">{currentOver}.{ballInOver}/{totalOvers}</div>
          </div>
          <div className="score-meta-item">
            <div className="score-meta-label">Balls Left</div>
            <div className="score-meta-value">{totalBalls - balls}</div>
          </div>
          <div className="score-meta-item">
            <div className="score-meta-label">Run Rate</div>
            <div className="score-meta-value">{balls > 0 ? ((runs / balls) * 6).toFixed(1) : "0.0"}</div>
          </div>
          {isChasing && (
            <div className="score-meta-item">
              <div className="score-meta-label">Req Rate</div>
              <div className="score-meta-value" style={{ color: runsNeeded > 0 ? "#FF6B35" : "#00E676" }}>
                {ballsLeft2 > 0 && runsNeeded > 0 ? ((runsNeeded / ballsLeft2) * 6).toFixed(1) : "—"}
              </div>
            </div>
          )}
        </div>

        <div className="batting-info">
          <span className="batting-chip chip-batting">🏏 {battingTeam}</span>
          <span className="batting-chip chip-bowling">🎯 {bowlingTeam}</span>
          <span className="batting-chip chip-inn">
            {wickets}/{maxWickets} WKT
          </span>
        </div>
      </div>

      {/* TARGET BANNER (2nd innings) */}
      {isChasing && runsNeeded > 0 && (
        <div className="target-banner">
          <div>
            <div className="target-main">TARGET: {target}</div>
            <div className="target-balls">in {totalBalls} balls</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="target-need">NEED {runsNeeded} OFF {ballsLeft2} BALLS</div>
          </div>
        </div>
      )}
      {isChasing && runsNeeded <= 0 && (
        <div className="target-banner" style={{ borderColor: "#00E676", background: "rgba(0,230,118,0.1)" }}>
          <div className="target-main" style={{ color: "#00E676" }}>🎉 TARGET ACHIEVED!</div>
        </div>
      )}

      {/* BALL HISTORY */}
      <div className="ball-history">
        <div className="ball-history-label">This Over</div>
        {currentOverBalls.length === 0 && (
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.75rem", letterSpacing: "2px" }}>
            No balls yet
          </span>
        )}
        {currentOverBalls.map((b, i) => (
          <div key={i} className={`ball-bubble ball-${b.type}`}>{b.label}</div>
        ))}
      </div>

      {/* RUN BUTTONS */}
      <div className="action-section-title">● Runs</div>
      <div className="runs-grid">
        {[
          { r: 0, cls: "btn-run-0", label: "DOT" },
          { r: 1, cls: "btn-run-1", label: "SINGLE" },
          { r: 2, cls: "btn-run-2", label: "DOUBLE" },
          { r: 3, cls: "btn-run-3", label: "TRIPLE" },
          { r: 4, cls: "btn-run-4", label: "FOUR" },
          { r: 6, cls: "btn-run-6", label: "SIX" },
        ].map(({ r, cls, label }) => (
          <button key={r} className={`run-btn ${cls}`}
            onClick={() => addBall(r, r === 0 ? "•" : String(r), String(r))}>
            <span className="num">{r === 0 ? "•" : r}</span>
            <span className="run-label">{label}</span>
          </button>
        ))}
      </div>

      {/* EXTRAS & WICKET */}
      <div className="action-section-title">● Extras & Wicket</div>
      <div className="extras-grid">
        <button className="extra-btn btn-wide"   onClick={() => addBall(1, "WD", "WD")}>
          <span className="e-icon">💨</span> Wide
        </button>
        <button className="extra-btn btn-noball" onClick={() => addBall(1, "NB", "NB")}>
          <span className="e-icon">🚫</span> No Ball
        </button>
        <button className="extra-btn btn-wicket" onClick={() => addBall(0, "W", "W")}>
          <span className="e-icon">💥</span> Wicket
        </button>
      </div>

      {/* OVER HISTORY */}
      {overHistory.length > 0 && (
        <div className="over-strip">
          <span className="over-strip-label">OVERS:</span>
          {overHistory.map((o) => (
            <span key={o.over} className="over-tag over-tag-done">O{o.over}:{o.runs}R</span>
          ))}
          {balls < totalBalls && wickets < maxWickets && (
            <span className="over-tag over-tag-current">O{currentOver + 1}▶</span>
          )}
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
