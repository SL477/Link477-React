import { useState } from 'react';
import classes from './tictactoe.module.css';

const opponentTypes = {
  none: '',
  AI: 'AI',
  Human: 'human',
};

export default function TicTacToe() {
  const [currentGrid, setCurrentGrid] = useState<(number | string)[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [AIMark, setAIMark] = useState('');
  const [humanMark, setHumanMark] = useState('');
  const [block, setBlock] = useState(false);
  const [message, setMessage] = useState('');
  const [humanScore, setHumanScore] = useState(0);
  const [AIScore, setAIScore] = useState(0);
  const [OpponentType, setOpponentType] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');

  const marks = {
    x: 'X',
    o: 'O',
  };

  const displayValue = (index: number) => {
    if (currentGrid[index] === marks.x || currentGrid[index] === marks.o) {
      return currentGrid[index];
    }
    return ' ';
  };

  /**
   * @returns {number[]}
   */
  const getAllEmptyCellsIndexes = (
    currentBoardState: (number | string)[]
  ): number[] => {
    // step 4
    return currentBoardState
      .filter((i) => i !== marks.x && i !== marks.o)
      .map((i) => Number(i));
  };

  const checkIfWinnerFound = (
    currentBoardState: (number | string)[],
    currentMark: string
  ) => {
    // step 5
    return (
      (currentBoardState[0] === currentMark &&
        currentBoardState[1] === currentMark &&
        currentBoardState[2] === currentMark) ||
      (currentBoardState[3] === currentMark &&
        currentBoardState[4] === currentMark &&
        currentBoardState[5] === currentMark) ||
      (currentBoardState[6] === currentMark &&
        currentBoardState[7] === currentMark &&
        currentBoardState[8] === currentMark) ||
      (currentBoardState[0] === currentMark &&
        currentBoardState[3] === currentMark &&
        currentBoardState[6] === currentMark) ||
      (currentBoardState[1] === currentMark &&
        currentBoardState[4] === currentMark &&
        currentBoardState[7] === currentMark) ||
      (currentBoardState[2] === currentMark &&
        currentBoardState[5] === currentMark &&
        currentBoardState[8] === currentMark) ||
      (currentBoardState[0] === currentMark &&
        currentBoardState[4] === currentMark &&
        currentBoardState[8] === currentMark) ||
      (currentBoardState[2] === currentMark &&
        currentBoardState[4] === currentMark &&
        currentBoardState[6] === currentMark)
    );
  };

  interface testPlayInfo {
    score: number;
    index?: number | string;
  }

  /**
   * @returns {testPlayInfo}
   */
  const miniMax = (
    currentBoardStateOld: (number | string)[],
    currentMark: string
  ): testPlayInfo => {
    const currentBoardState = [...currentBoardStateOld];
    // Step 8
    const availableCellsIndexes = getAllEmptyCellsIndexes(currentBoardState);

    // step 9, check if terminal state
    if (checkIfWinnerFound(currentBoardState, humanMark)) {
      return { score: -1 };
    } else if (checkIfWinnerFound(currentBoardState, AIMark)) {
      return { score: 1 };
    } else if (availableCellsIndexes.length === 0) {
      return { score: 0 };
    }

    // step 10
    const allTestPlayInfos: testPlayInfo[] = [];

    // step 11
    for (let i = 0; i < availableCellsIndexes.length; i++) {
      const currentTestPlayInfo: testPlayInfo = {
        score: 0,
      };
      currentTestPlayInfo.index = currentBoardState[availableCellsIndexes[i]];
      currentBoardState[availableCellsIndexes[i]] = currentMark;
      // console.log('currentBoardState', currentBoardState, availableCellsIndexes[i]);

      if (currentMark === AIMark) {
        const result = miniMax(currentBoardState, humanMark);
        currentTestPlayInfo['score'] = result['score'];
      } else {
        const result = miniMax(currentBoardState, AIMark);
        currentTestPlayInfo['score'] = result['score'];
      }

      // step 12
      currentBoardState[availableCellsIndexes[i]] = currentTestPlayInfo.index;

      allTestPlayInfos.push(currentTestPlayInfo);
    }

    // step 14

    // step 15
    let bestTestPlay = 0;

    // step 16
    if (currentMark === AIMark) {
      let bestScore = -Infinity;
      for (let i = 0; i < allTestPlayInfos.length; i++) {
        if (allTestPlayInfos[i].score > bestScore) {
          bestScore = allTestPlayInfos[i].score;
          bestTestPlay = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < allTestPlayInfos.length; i++) {
        if (allTestPlayInfos[i].score < bestScore) {
          bestScore = allTestPlayInfos[i].score;
          bestTestPlay = i;
        }
      }
    }
    // step 17
    return allTestPlayInfos[bestTestPlay];
  };

  const resetGame = () => {
    setBlock(true);
    // delay 3 seconds and then restart
    setTimeout(() => {
      setCurrentGrid([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      setBlock(false);
      if (OpponentType === opponentTypes.AI) {
        setMessage('');
      } else {
        setMessage(`${player1Name} turn`);
        setCurrentPlayer(0);
      }
    }, 3000);
  };

  const humanMove = (index: number) => {
    if (block) {
      // waiting for computer to move
      return;
    }
    console.log('test', index);
    if (displayValue(index) === ' ') {
      const currentBoardState = [...currentGrid];
      currentBoardState[index] = currentPlayer === 0 ? humanMark : AIMark;
      setCurrentGrid(currentBoardState);
      setBlock(true);

      if (
        checkIfWinnerFound(
          currentBoardState,
          currentPlayer === 0 ? humanMark : AIMark
        )
      ) {
        setMessage(
          `${
            OpponentType === opponentTypes.AI
              ? 'You won!'
              : currentPlayer === 0
                ? player1Name
                : player2Name
          } won!`
        );
        setHumanScore(humanScore + 1);
        resetGame();
      } else if (getAllEmptyCellsIndexes(currentBoardState).length === 0) {
        // draw
        setMessage('Draw!');
        resetGame();
      } else {
        if (OpponentType === opponentTypes.AI) {
          setTimeout(() => {
            const aiMove = miniMax(currentBoardState, AIMark);
            console.log(aiMove);
            if (aiMove.index && typeof aiMove.index === 'number') {
              currentBoardState[aiMove.index] = AIMark;
            } else {
              currentBoardState[getAllEmptyCellsIndexes(currentBoardState)[0]] =
                AIMark;
            }
            setCurrentGrid(currentBoardState);
            setBlock(false);
            if (checkIfWinnerFound(currentBoardState, AIMark)) {
              setMessage('You lost!');
              setAIScore(AIScore + 1);
              resetGame();
            } else if (
              getAllEmptyCellsIndexes(currentBoardState).length === 0
            ) {
              setMessage('Draw!');
              resetGame();
            }
          }, 1000);
        } else {
          setBlock(false);
          setMessage(`${currentPlayer === 0 ? player2Name : player1Name} turn`);
          setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
        }
      }
    } else {
      console.log('Position filled');
    }
  };

  const chooseSide =
    OpponentType === '' ? (
      <>
        <p className={classes.choose}>Choose your opponent's type:</p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setOpponentType(opponentTypes.AI)}
        >
          AI
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setOpponentType(opponentTypes.Human);
          }}
        >
          Human
        </button>
      </>
    ) : (
      <>
        <p className={classes.choose}>
          {OpponentType === opponentTypes.AI
            ? 'Choose your side'
            : `${player1Name} side`}
          :
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setAIMark(marks.o);
            setHumanMark(marks.x);
            if (OpponentType === opponentTypes.Human) {
              setMessage(`${player1Name} turn`);
            }
          }}
          type="button"
        >
          X
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setAIMark(marks.x);
            setHumanMark(marks.o);
            if (OpponentType === opponentTypes.Human) {
              setMessage(`${player1Name} turn`);
            }
          }}
          type="button"
        >
          O
        </button>
        {OpponentType === opponentTypes.AI ? (
          ''
        ) : (
          <>
            <br />
            <label className="form-label">
              Player 1 Name:
              <input
                type="text"
                className="form-control"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
              />
            </label>
            <label className="form-label">
              Player 2 Name:
              <input
                type="text"
                className="form-control"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
              />
            </label>
          </>
        )}
      </>
    );

  const gameScreen = (
    <>
      <div className={classes.tbl}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className={classes.td} onClick={() => humanMove(0)}>
                {displayValue(0)}
              </td>
              <td className={classes.td} onClick={() => humanMove(1)}>
                {displayValue(1)}
              </td>
              <td className={classes.td} onClick={() => humanMove(2)}>
                {displayValue(2)}
              </td>
            </tr>
            <tr>
              <td className={classes.td} onClick={() => humanMove(3)}>
                {displayValue(3)}
              </td>
              <td className={classes.td} onClick={() => humanMove(4)}>
                {displayValue(4)}
              </td>
              <td className={classes.td} onClick={() => humanMove(5)}>
                {displayValue(5)}
              </td>
            </tr>
            <tr>
              <td className={classes.td} onClick={() => humanMove(6)}>
                {displayValue(6)}
              </td>
              <td className={classes.td} onClick={() => humanMove(7)}>
                {displayValue(7)}
              </td>
              <td className={classes.td} onClick={() => humanMove(8)}>
                {displayValue(8)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div className={classes.scoresTbl}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className={`${classes.th} ${classes.centre}`}>
                {OpponentType === opponentTypes.AI
                  ? 'Your Score'
                  : `${player1Name} Score`}
              </th>
              <th className={`${classes.th} ${classes.centre}`}>
                {OpponentType === opponentTypes.AI
                  ? 'Computer Score'
                  : `${player2Name} Score`}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{humanScore}</td>
              <td>{AIScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>{message}</p>
      <button type="button" onClick={resetGame} className="btn btn-danger">
        Reset
      </button>
    </>
  );

  return (
    <div className={classes.centre}>
      {humanMark === '' ? chooseSide : gameScreen}
    </div>
  );
}
