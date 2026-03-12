// src/components/InningsBreak.jsx
// Shows end of 1st innings, reveals target for 2nd innings team

export default function InningsBreak({
  battingTeam,   // team that just batted
  chasingTeam,   // team that will bat 2nd
  runs,
  wickets,
  balls,
  totalOvers,
  reason,
  onStartSecondInnings,
}) {
  const totalBalls  = totalOvers * 6;
  const overs       = Math.floor(balls / 6);
  const ballsInOver = balls % 6;
  const target      = runs + 1;
  const rr          = balls > 0 ? ((runs / balls) * 6).toFixed(2) : "0.00";

  const reasonText = {
    all_out:        "All Out",
    overs_complete: `${totalOvers} Overs Complete`,
  }[reason] || "Innings Complete";

  return (
    <div className="screen innings-break">
      <div className="big-title">INNINGS 1 OVER</div>
      <div className="sub-title">{reasonText}</div>

      <div className="card" style={{ textAlign: "center" }}>
        <div className="card-title">📊 {battingTeam} — 1st Innings</div>

        {/* Score */}
        <div className="inning1-score">{runs}/{wickets}</div>
        <div style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.85rem", marginTop:"4px", letterSpacing:"2px" }}>
          in {overs}.{ballsInOver} overs · RR: {rr}
        </div>

        {/* Target Reveal */}
        <div className="target-reveal">
          <div className="target-sub">{chasingTeam} needs</div>
          <div className="target-num">{target} RUNS</div>
          <div className="target-detail">
            to win in {totalBalls} balls ({totalOvers} overs)
          </div>
        </div>

        <div className="divider" />

        <div className="info-row"><span>1st Innings Score</span><strong style={{color:"#FFD700"}}>{runs}/{wickets}</strong></div>
        <div className="info-row"><span>Run Rate</span><strong>{rr}</strong></div>
        <div className="info-row"><span>Target</span><strong style={{color:"#FF6B35"}}>{target}</strong></div>
        <div className="info-row"><span>Balls Available</span><strong>{totalBalls}</strong></div>

        <div className="divider" />

        <button
          className="btn btn-gold btn-full"
          onClick={() => onStartSecondInnings({ target })}
        >
          🏏 START 2ND INNINGS →
        </button>
      </div>
    </div>
  );
}
