interface diceProps {
  onSave: (index: number) => void;
  diceArray: number[];
}

export default function Dice({ onSave, diceArray }: diceProps) {
  return (
    <div className="dice-div">
      <span>
        {diceArray.map((diceNumber, index) => (
          <span>
            <img
              id={`die${index}`}
              className="dice"
              src={`src/Dice/dice ${diceNumber}.png`}
              key={`die${index}`}
              onClick={() => onSave(index)}
            ></img>
          </span>
        ))}
      </span>
    </div>
  );
}
