interface statsProps {
  onUpdateScore: (index: number) => void;
  totalScore1: number;
  totalScore2: number;
  onSetStaticScore: (index: number, points: number) => void;
  activePlayer: number;
  scoreTableArray: string[];
  scoreArray: number[];
}

export default function Stats({
  onUpdateScore,
  totalScore1,
  totalScore2,
  onSetStaticScore,
  activePlayer,
  scoreTableArray,
  scoreArray,
}: statsProps) {
  return (
    <div className="score-sheet">
      <div className="player-info">
        <div className="player1-div">
          <p className="player-name">Player 1</p>
          <p className="player-score">Total Score: {totalScore1}</p>
        </div>
        <div className="player2-div">
          <p className="player-name">Player 2</p>
          <p className="player-score">Total Score: {totalScore2}</p>
        </div>
      </div>
      <table className="score-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Player 1</th>
            <th>Player 2</th>
          </tr>
        </thead>
        <tbody>
          {scoreTableArray.map((text, index) => (
            <tr>
              <td
                key={`categoryBox${index}`}
                className={
                  index === 6
                    ? "category-cell-sum"
                    : index === 7
                    ? "category-cell-bonus"
                    : "category-cell"
                }
              >
                {text}
              </td>
              <td
                key={`scoreBox${index}`}
                onClick={
                  activePlayer === 1
                    ? index === 6 || index === 7
                      ? () => {}
                      : index === 13
                      ? () => onSetStaticScore(index, 15)
                      : index === 14
                      ? () => onSetStaticScore(index, 20)
                      : index === 16
                      ? () => onSetStaticScore(index, 50)
                      : () => onUpdateScore(index)
                    : () => {}
                }
                className={
                  index === 6
                    ? "score-cell-sum"
                    : index === 7
                    ? "score-cell-bonus"
                    : "score-cell"
                }
              >
                {scoreArray[index] === 0 ? "-" : scoreArray[index]}
              </td>

              <td
                key={`scoreBox${index + 17}`}
                onClick={
                  activePlayer === 2
                    ? index === 6 || index === 7
                      ? () => {}
                      : index === 13
                      ? () => onSetStaticScore(index + 17, 15)
                      : index === 14
                      ? () => onSetStaticScore(index + 17, 20)
                      : index === 16
                      ? () => onSetStaticScore(index + 17, 50)
                      : () => onUpdateScore(index + 17)
                    : () => {}
                }
                className={
                  index === 6
                    ? "score-cell-sum"
                    : index === 7
                    ? "score-cell-bonus"
                    : "score-cell"
                }
              >
                {scoreArray[index + 17] === 0 ? "-" : scoreArray[index + 17]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
