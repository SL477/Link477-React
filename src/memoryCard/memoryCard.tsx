import { useState } from 'react';
import classes from './memoryCard.module.css';
export default function MemoryCard() {
  const [score] = useState(0);
  const [bestScore] = useState(0);
  return (
    <main>
      <h1 className="centertext">Memory Game</h1>
      <div className={classes.scoreHolder}>
        <p>
          Get points by clicking on an image, but don't click on any more than
          once!
        </p>
        <div>
          <span>Score: {score}</span>
          <br />
          <span>Best Score: {bestScore}</span>
        </div>
      </div>
    </main>
  );
}
