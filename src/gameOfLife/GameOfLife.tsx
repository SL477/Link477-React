import classes from './GameOfLife.module.css';
import { useState, useEffect } from 'react';

export default function GameOfLife() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [rows] = useState(16);
  const [cols] = useState(16);
  const [started, setStarted] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [isDebug] = useState(false);
  const [timer, setTimer] = useState<number>();

  const createGrid = (isRandom: boolean) => {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const newRow = [];
      for (let j = 0; j < cols; j++) {
        if (isRandom) {
          if (Math.floor(Math.random() * 10) > 7) {
            newRow.push(1);
          } else {
            newRow.push(0);
          }
        } else {
          newRow.push(0);
        }
      }
      newGrid.push(newRow);
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    createGrid(true);
  }, []);

  const toggleLive = (row: number, col: number, current: number) => {
    if (!started) {
      const newGrid = [...grid];
      newGrid[row][col] = current == 0 ? 1 : 0;
      setGrid(newGrid);
    }
  };

  const calcNeighbors = (row: number, col: number) => {
    let ret = 0;
    // check all of the neighbouring cells and see if they are live or dead and return the number of live cells
    const hasLeft = col > 0;
    const hasRight = col < cols - 1;
    if (grid.length > 0) {
      if (row > 0) {
        // has cells above
        if (grid[row - 1][col] && grid[row - 1][col] == 1) {
          ret++;
        }
        if (hasLeft && grid[row - 1][col - 1] && grid[row - 1][col - 1] == 1) {
          ret++;
        }
        if (hasRight && grid[row - 1][col + 1] && grid[row - 1][col + 1] == 1) {
          ret++;
        }
      }

      if (hasLeft && grid[row][col - 1] && grid[row][col - 1] == 1) {
        ret++;
      }

      if (
        hasRight &&
        col + 1 < cols &&
        grid[row][col + 1] &&
        grid[row][col + 1] == 1
      ) {
        ret++;
      }

      // below row
      if (row < rows - 1) {
        if (grid[row + 1][col] && grid[row + 1][col] == 1) {
          ret++;
        }
        if (hasLeft && grid[row + 1][col - 1] && grid[row + 1][col - 1] == 1) {
          ret++;
        }
        if (hasRight && grid[row + 1][col + 1] && grid[row + 1][col + 1] == 1) {
          ret++;
        }
      }
    }
    return ret;
  };

  const incrementGeneration = () => {
    const newGrid = [...grid];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const numNeighbours = calcNeighbors(i, j);
        if (grid[i][j] === 1) {
          // live cell
          newGrid[i][j] = numNeighbours === 2 || numNeighbours === 3 ? 1 : 0;
        } else {
          // dead cell
          newGrid[i][j] = numNeighbours === 3 ? 1 : 0;
        }
      }
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    if (started) {
      setGeneration(generation + 1);
    }
  }, [grid, started]);

  const start = () => {
    setStarted(true);
    setGenerations();
  };

  const setGenerations = () => {
    setTimer(setInterval(incrementGeneration, 1000));
  };

  const stop = () => {
    clearInterval(timer);
    setStarted(false);
  };

  const clearGrid = () => {
    stop();
    createGrid(true);
    setStarted(false);
    setGeneration(0);
  };

  return (
    <div>
      <div className="flex-container">
        {grid.map((row, i) => {
          return (
            <div key={i} className={classes.row}>
              {row.map((col, ind) => {
                return (
                  <div
                    key={ind}
                    className={
                      col === 1
                        ? `${classes.col} ${classes.hovered}`
                        : classes.col
                    }
                    onClick={() => toggleLive(i, ind, col)}
                  >
                    {isDebug ? calcNeighbors(i, ind) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <p>Generation: {generation}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          started ? stop() : start();
        }}
        type="button"
      >
        Start/Pause
      </button>
      <button className="btn btn-danger" onClick={clearGrid} type="button">
        Clear
      </button>
    </div>
  );
}
