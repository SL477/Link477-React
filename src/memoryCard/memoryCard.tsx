import { useState, useEffect } from 'react';
import classes from './memoryCard.module.css';

class imgCard {
  id: number;
  name: string;
  path: string;
  sort: number;
  constructor(id: number, name: string, path: string) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.sort = Math.random();
  }
}

export default function MemoryCard() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedImgs, setClickedImgs] = useState<number[]>([]);
  const [newAntiochTeam, setNewAntiochTeam] = useState<imgCard[]>([]);

  useEffect(() => {
    setNewAntiochTeam(
      [
        new imgCard(1, 'Engineer George', 'EngineerGeorge.jpg'),
        new imgCard(2, 'Brother Julius', 'BrotherJulius.jpg'),
        new imgCard(3, 'Lt Carstairs', 'LtCarstairs.jpg'),
        new imgCard(4, 'Preacher Peter', 'PreacherPeter.jpg'),
        new imgCard(5, 'Private Graham', 'PrivateGraham.jpg'),
        new imgCard(6, 'Brother Matheus', 'BrotherMatheus.jpg'),
        new imgCard(7, 'The Reaper', 'TheReaper.jpg'),
        new imgCard(8, 'Brutus', 'Brutus.jpg'),
        new imgCard(9, 'Private George', 'PrivateGeorge.jpg'),
        new imgCard(10, 'Sgt Smith', 'SgtSmith.jpg'),
        new imgCard(11, 'Private Darius', 'PrivateDarius.jpg'),
        new imgCard(12, 'Private Jones', 'PrivateJones.jpg'),
        new imgCard(13, 'Sam', 'Sam.jpg'),
        new imgCard(14, 'Specialist Mark', 'SpecialistMark.jpg'),
        new imgCard(15, 'Gustav', 'Gustav.jpg'),
        new imgCard(16, 'Lyle', 'Lyle.jpg'),
      ].sort((i, j) => (i.sort > j.sort ? 1 : -1))
    );
    const bestScoreStored = localStorage.getItem('memoryCardScore');
    if (bestScoreStored) {
      setBestScore(Number.parseInt(bestScoreStored));
    }
  }, []);

  const clickedImg = (imgId: number) => {
    if (clickedImgs.includes(imgId)) {
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('memoryCardScore', score.toString());
      }
      setScore(0);
      setClickedImgs([]);
    } else {
      setScore(score + 1);
      setClickedImgs([...clickedImgs, imgId]);
    }
    // resort
    setNewAntiochTeam(
      newAntiochTeam
        .map((i) => {
          i.sort = Math.random();
          return i;
        })
        .sort((i, j) => (i.sort > j.sort ? 1 : -1))
    );
  };

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
        {newAntiochTeam.map((i) => (
          <div
            key={i.id}
            className={classes.pictureHolder}
            onClick={() => clickedImg(i.id)}
          >
            <img src={`/Link477-React/${i.path}`} alt={i.name} />
            <p>{i.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
