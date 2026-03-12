// src/components/MatchOver.jsx
// Final result screen with both innings summary

export default function MatchOver({
  team1, team2,
  inn1Runs, inn1Wickets, inn1Balls,
  inn2Runs, inn2Wickets, inn2Balls,
  battingFirst, chasingTeam,
  target, totalOvers, reason,
  onRestart,
}) {
  const totalBalls = totalOvers * 6;

  // Determine winner
  let winner = null;
  let margin = "";
  let resultMsg = "";

  if (reason === "target_achieved") {
    winner = chasingTeam;
    const wicketsLeft = (totalOvers === 0 ? 10 : totalOvers) - inn2Wickets;
    margin = `by ${10 - inn2Wickets} wicket${10 - inn2Wickets !== 1 ? "s" : ""}`;
    resultMsg = `🏆 ${winner} wins ${margin}!`;
  } else if (inn2Runs >= target) {
    winner = chasingTeam;
    margin = `by ${10 - inn2Wickets} wicket${10 - inn2Wickets !== 1 ? "s" : ""}`;
    resultMsg = `🏆 ${winner} wins ${margin}!`;
  } else if (inn2Runs === inn1Runs) {
    winner = null;
    resultMsg = "🤝 It's a TIE!";
  } else {
    winner = battingFirst;
    const runMargin = inn1Runs - inn2Runs;
    margin = `by ${runMargin} run${runMargin !== 1 ? "s" : ""}`;
    resultMsg = `🏆 ${winner} wins ${margin}!`;
  }

  const fmt = (b) => `${Math.floor(b/6)}.${b%6}`;

  return (
    <div className="screen match-over-screen">
      <div className="confetti-emoji">🎉</div>
      <div style={{ height: 12 }} />
      <div className="big-title">MATCH OVER</div>
      <div className="sub-title">Final Result</div>

      <div className="card" style={{ textAlign: "center" }}>
        <div className="card-title">🏆 Match Summary</div>

        {/* Winner Banner */}
        <div className="winner-banner">
          {winner ? (
            <>
              <div className="winner-name">{winner}</div>
              <div className="winner-sub">WINS {margin}!</div>
            </>
          ) : (
            <>
              <div className="winner-name">TIE GAME</div>
              <div className="winner-sub">Both teams scored {inn1Runs}</div>
            </>
          )}
        </div>

        {/* Scorecard Summary */}
        <div className="stats-grid">
          <div className="stat-box">
            <div className="s-label">1st Innings</div>
            <div className="s-value" style={{color:"#FFD700"}}>{inn1Runs}/{inn1Wickets}</div>
            <div className="s-team">{battingFirst} · {fmt(inn1Balls)} ov</div>
          </div>
          <div className="stat-box">
            <div className="s-label">2nd Innings</div>
            <div className="s-value" style={{color:"#40C4FF"}}>{inn2Runs}/{inn2Wickets}</div>
            <div className="s-team">{chasingTeam} · {fmt(inn2Balls)} ov</div>
          </div>
          <div className="stat-box">
            <div className="s-label">Target</div>
            <div className="s-value" style={{color:"#FF6B35"}}>{target}</div>
            <div className="s-team">runs to win</div>
          </div>
          <div className="stat-box">
            <div className="s-label">Match</div>
            <div className="s-value">{totalOvers}</div>
            <div className="s-team">overs per side</div>
          </div>
        </div>

        <div className="divider" />

        <div className="info-row">
          <span>{battingFirst}</span>
          <strong style={{color:"#FFD700"}}>{inn1Runs}/{inn1Wickets} ({fmt(inn1Balls)} ov)</strong>
        </div>
        <div className="info-row">
          <span>{chasingTeam}</span>
          <strong style={{color:"#40C4FF"}}>{inn2Runs}/{inn2Wickets} ({fmt(inn2Balls)} ov)</strong>
        </div>

        <div className="divider" />

        <button className="btn btn-gold btn-full" onClick={onRestart}>
          🔄 NEW MATCH
        </button>
      </div>
    </div>
  );
}
