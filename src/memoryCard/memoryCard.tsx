import { useState } from 'react';
import classes from './memoryCard.module.css';
export default function MemoryCard() {
  const [score] = useState(0);
  const [bestScore] = useState(0); //TODO: save this to local storage

  const newAntiochTeam = [
    {
      name: 'Engineer George',
      path: 'EngineerGeorge.jpg',
      id: 1,
      sort: Math.random(),
    },
    {
      name: 'Brother Julius',
      path: 'BrotherJulius.jpg',
      id: 2,
      sort: Math.random(),
    },
    {
      name: 'Lt Carstairs',
      path: 'LtCarstairs.jpg',
      id: 3,
      sort: Math.random(),
    },
    {
      name: 'Preacher Peter',
      path: 'PreacherPeter.jpg',
      id: 4,
      sort: Math.random(),
    },
    {
      name: 'Private Graham',
      path: 'PrivateGraham.jpg',
      id: 5,
      sort: Math.random(),
    },
    {
      name: 'Brother Mathius',
      path: 'BrotherMathius.jpg',
      id: 6,
      sort: Math.random(),
    },
    { name: 'The Reaper', path: 'TheReaper.jpg', id: 7, sort: Math.random() },
  ];

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
      <div className={classes.pictureGrid}>
        {newAntiochTeam
          .sort((i) => i.sort)
          .map((i) => (
            <div key={i.id} className={classes.pictureHolder}>
              <img src={`/Link477-React/${i.path}`} alt={i.name} />
              <p>{i.name}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
