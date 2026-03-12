// src/App.jsx
// Main controller — full 2-team, 2-innings cricket match

import { useState } from "react";
import StarField      from "./components/StarField";
import SetupScreen    from "./components/SetupScreen";
import TossScreen     from "./components/TossScreen";
import ChoiceScreen   from "./components/ChoiceScreen";
import OversScreen    from "./components/OversScreen";
import Scorecard      from "./components/Scorecard";
import InningsBreak   from "./components/InningsBreak";
import MatchOver      from "./components/MatchOver";

const SCREENS = {
  SETUP:    "setup",
  TOSS:     "toss",
  CHOICE:   "choice",
  OVERS:    "overs",
  INN1:     "inn1",
  BREAK:    "break",
  INN2:     "inn2",
  RESULT:   "result",
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SETUP);

  // Setup
  const [team1,   setTeam1]   = useState("");
  const [team2,   setTeam2]   = useState("");
  const [members, setMembers] = useState(11);

  // Toss
  const [tossWinner, setTossWinner] = useState("");
  const [tossLoser,  setTossLoser]  = useState("");

  // Choice
  const [battingFirst,  setBattingFirst]  = useState("");
  const [bowlingFirst,  setBowlingFirst]  = useState("");

  // Overs
  const [totalOvers, setTotalOvers] = useState(10);

  // 1st Innings result
  const [inn1Result, setInn1Result] = useState(null);

  // 2nd Innings result
  const [inn2Result, setInn2Result] = useState(null);
  const [target,     setTarget]     = useState(0);

  // ── Header info ──
  const headerInfo = () => {
    if (screen === SCREENS.INN1) return `INN 1 · ${battingFirst} vs ${bowlingFirst}`;
    if (screen === SCREENS.INN2) return `INN 2 · ${bowlingFirst} CHASING ${target}`;
    if (team1 && team2) return `${team1} vs ${team2}`;
    return "";
  };

  // ── Handlers ──
  function handleSetup({ team1, team2, members }) {
    setTeam1(team1); setTeam2(team2); setMembers(members);
    setScreen(SCREENS.TOSS);
  }

  function handleToss({ tossWinner, tossLoser }) {
    setTossWinner(tossWinner); setTossLoser(tossLoser);
    setScreen(SCREENS.CHOICE);
  }

  function handleChoice({ battingFirst, bowlingFirst }) {
    setBattingFirst(battingFirst); setBowlingFirst(bowlingFirst);
    setScreen(SCREENS.OVERS);
  }

  function handleOvers({ totalOvers }) {
    setTotalOvers(totalOvers);
    setScreen(SCREENS.INN1);
  }

  function handleInn1End(result) {
    setInn1Result(result);
    setScreen(SCREENS.BREAK);
  }

  function handleStartInn2({ target }) {
    setTarget(target);
    setScreen(SCREENS.INN2);
  }

  function handleInn2End(result) {
    setInn2Result(result);
    setScreen(SCREENS.RESULT);
  }

  function handleRestart() {
    setScreen(SCREENS.SETUP);
    setTeam1(""); setTeam2(""); setMembers(11);
    setTossWinner(""); setTossLoser("");
    setBattingFirst(""); setBowlingFirst("");
    setTotalOvers(10);
    setInn1Result(null); setInn2Result(null); setTarget(0);
  }

  return (
    <div className="cricket-app">
      <StarField />

      <div className="app-header">
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <span className="ball">🏏</span>
          <span className="logo">CRICKET</span>
        </div>
        {headerInfo() && (
          <div className="header-info">{headerInfo()}</div>
        )}
      </div>

      {screen === SCREENS.SETUP && (
        <SetupScreen onNext={handleSetup} />
      )}

      {screen === SCREENS.TOSS && (
        <TossScreen team1={team1} team2={team2} onNext={handleToss} />
      )}

      {screen === SCREENS.CHOICE && (
        <ChoiceScreen tossWinner={tossWinner} tossLoser={tossLoser} onNext={handleChoice} />
      )}

      {screen === SCREENS.OVERS && (
        <OversScreen battingFirst={battingFirst} bowlingFirst={bowlingFirst} onNext={handleOvers} />
      )}

      {screen === SCREENS.INN1 && (
        <Scorecard
          key="innings1"
          battingTeam={battingFirst}
          bowlingTeam={bowlingFirst}
          totalOvers={totalOvers}
          members={members}
          innings={1}
          target={null}
          targetBalls={null}
          onInningsEnd={handleInn1End}
        />
      )}

      {screen === SCREENS.BREAK && inn1Result && (
        <InningsBreak
          battingTeam={battingFirst}
          chasingTeam={bowlingFirst}
          runs={inn1Result.runs}
          wickets={inn1Result.wickets}
          balls={inn1Result.balls}
          totalOvers={totalOvers}
          reason={inn1Result.reason}
          onStartSecondInnings={handleStartInn2}
        />
      )}

      {screen === SCREENS.INN2 && (
        <Scorecard
          key="innings2"
          battingTeam={bowlingFirst}
          bowlingTeam={battingFirst}
          totalOvers={totalOvers}
          members={members}
          innings={2}
          target={target}
          targetBalls={totalOvers * 6}
          onInningsEnd={handleInn2End}
        />
      )}

      {screen === SCREENS.RESULT && inn1Result && inn2Result && (
        <MatchOver
          team1={team1}
          team2={team2}
          inn1Runs={inn1Result.runs}
          inn1Wickets={inn1Result.wickets}
          inn1Balls={inn1Result.balls}
          inn2Runs={inn2Result.runs}
          inn2Wickets={inn2Result.wickets}
          inn2Balls={inn2Result.balls}
          battingFirst={battingFirst}
          chasingTeam={bowlingFirst}
          target={target}
          totalOvers={totalOvers}
          reason={inn2Result.reason}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
