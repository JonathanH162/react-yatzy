export default function SavedDice({ onRemove, savedDiceArray }) {
  return (
    <>
      <h2>Saved Dice</h2>
      <div className="saved-dice-div">
        <span>
          {savedDiceArray.map((diceNumber, index) => (
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
