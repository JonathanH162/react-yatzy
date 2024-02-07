interface SavedDiceProps {
  onRemove: (index: number) => void;
  savedDiceArray: number[];
}

export default function SavedDice({
  onRemove,
  savedDiceArray,
}: SavedDiceProps) {
  return (
    <>
      <h2>Saved Dice</h2>
      <div className="saved-dice-div">
        <span>
          {savedDiceArray.map((diceNumber: number, index: number) => (
            <span>
              <img
                id={`savedDie${index}`}
                className="dice"
                src={`src/Dice/dice ${diceNumber}.png`}
                key={`savedDie${index}`}
                onClick={() => onRemove(index)}
              ></img>
            </span>
          ))}
        </span>
      </div>
    </>
  );
}
