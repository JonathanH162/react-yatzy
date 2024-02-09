import { useState, useEffect } from "react";
import "/Users/hellgren162/code/react-yatzy/src/App.css";
import Logo from "./Logo";
import CurrentRoll from "./CurrentRoll";
import SavedDice from "./SavedDice";
import Stats from "./Stats";

//TODO ordna att tärningarna kontrolleras när score kryssas i, och om det inte finns passande tärningar så stryks den.

let diceArray = [6, 6, 6, 6, 6];
let savedDiceArray: number[] = [];
let scoreIndex = 0;
let totalScore1 = 0;
let totalScore2 = 0;
let scoreSum1 = 0;
let scoreSum2 = 0;
const scoreTableArray = [
  "Ones",
  "Twos",
  "Threes",
  "Fours",
  "Fives",
  "Sixes",
  "Sum",
  "Bonus",
  "One Pair",
  "Two Pairs",
  "Three of a kind",
  "Four of a kind",
  "Full house",
  "Small Straight",
  "Large Straight",
  "Chance",
  "Yatzy",
];
let scoreArray: number[] = [];

for (let i = 0; i < scoreTableArray.length * 2; i++) {
  scoreArray.push(0);
}

function App() {
  const [roll, setRoll] = useState(0);
  const [saved, setSaved] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreChecked, setScoreChecked] = useState(false);
  const [activePlayer, setActivePlayer] = useState(1);

  useEffect(() => {
    if (activePlayer === 1 && scoreIndex <= 5) {
      scoreArray[6] += score;
    }
    if (activePlayer === 2 && scoreIndex >= 17 && scoreIndex <= 22) {
      scoreArray[23] += score;
    }
    if (activePlayer === 1 && scoreSum1 >= 63) {
      scoreArray[7] = 50;
      totalScore1 += 50;
    }
    if (activePlayer === 2 && scoreSum2 >= 63) {
      scoreArray[24] = 50;
      totalScore2 += 50;
    }
    scoreArray[scoreIndex] || (scoreArray[scoreIndex] += score);
    activePlayer === 1 ? (totalScore1 += score) : (totalScore2 += score);
    setScore(0);
  }, [score, activePlayer]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }
  function handleReset() {
    diceArray = [6, 6, 6, 6, 6];
    savedDiceArray = [];
    scoreArray = [];
    setRoll(0);
    setScore(0);
    totalScore1 = 0;
    totalScore2 = 0;
    for (let i = 0; i < scoreTableArray.length * 2; i++) {
      scoreArray.push(0);
    }
  }

  function handlePlayButton() {
    if (roll <= 2 || (roll === 3 && scoreChecked)) {
      if (roll === 3) {
        diceArray = [
          generateRandomNumber(),
          generateRandomNumber(),
          generateRandomNumber(),
          generateRandomNumber(),
          generateRandomNumber(),
        ];
        savedDiceArray = [];
        setScoreChecked(false);
        activePlayer === 1 ? setActivePlayer(2) : setActivePlayer(1);
      }
      const updatedDiceArray: number[] = [];
      for (let i = 0; i < diceArray.length; i++) {
        updatedDiceArray.push(generateRandomNumber());
      }
      diceArray = updatedDiceArray;
      {
        roll === 0
          ? setRoll(1)
          : roll === 1
          ? setRoll(2)
          : roll === 2
          ? setRoll(3)
          : setRoll(1);
      }
    }
  }

  function handleSaveDice(id: number) {
    const savedDie = diceArray[id];
    setSaved(saved + 1);
    diceArray.splice(id, 1);
    savedDiceArray.push(savedDie);
  }
  function handleRemoveDice(id: number) {
    const removedDie = savedDiceArray[id];
    setSaved(saved - 1);
    savedDiceArray.splice(id, 1);
    diceArray.push(removedDie);
  }
  function handleUpdateScore(index: number) {
    const sum = savedDiceArray.reduce((a, b) => {
      return a + b;
    }, 0);
    if (!scoreChecked) {
      if (activePlayer === 1 && index <= 5 && scoreArray[index] === 0) {
        scoreSum1 += sum;
      }
      if (
        activePlayer === 2 &&
        index >= 17 &&
        index <= 22 &&
        scoreArray[index] === 0
      ) {
        scoreSum2 += sum;
      }
      scoreIndex = index;
      roll !== 0 ? setRoll(3) : "";
      scoreArray[index] === 0 ? setScore(sum) : "";
      setScoreChecked(true);
    }
  }
  function handleSetStaticScore(index: number, score: number) {
    if (!scoreChecked) {
      scoreIndex = index;
      roll !== 0 ? setRoll(3) : "";
      scoreArray[index] === 0 ? setScore(score) : "";
      setScoreChecked(true);
    }
  }

  return (
    <div>
      <Logo />
      <CurrentRoll
        onPlay={handlePlayButton}
        roll={roll}
        onReset={handleReset}
        onSave={handleSaveDice}
        activePlayer={activePlayer}
        diceArray={diceArray}
      />
      <SavedDice onRemove={handleRemoveDice} savedDiceArray={savedDiceArray} />
      <Stats
        onUpdateScore={handleUpdateScore}
        onSetStaticScore={handleSetStaticScore}
        totalScore1={totalScore1}
        totalScore2={totalScore2}
        activePlayer={activePlayer}
        scoreTableArray={scoreTableArray}
        scoreArray={scoreArray}
      />
    </div>
  );
}

export default App;
