import Dice from "./Dice.tsx";

interface CurrentRollProps {
  onPlay: () => void;
  roll: number;
  onReset: () => void;
  onSave: (id: number) => void;
  activePlayer: number;
  diceArray: number[];
}

export default function CurrentRoll({
  onPlay,
  roll,
  onReset,
  onSave,
  activePlayer,
  diceArray,
}: CurrentRollProps) {
  return (
    <div>
      <h2>
        {roll === 0
          ? "Welcome!"
          : `Player ${activePlayer} - Current Roll = ${roll}`}
      </h2>
      <Dice onSave={onSave} diceArray={diceArray} />
      <button onClick={onPlay} className="play-btn">
        {roll === 0
          ? "Play"
          : roll === 1
          ? "Next Roll"
          : roll === 2
          ? "Last Roll"
          : "New Roll"}
      </button>
      <button onClick={onReset} className="play-btn">
        Reset
      </button>
    </div>
  );
}
