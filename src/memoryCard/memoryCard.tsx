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
        new imgCard(1, 'Engineer George', 'EngineerGeorge'),
        new imgCard(2, 'Brother Julius', 'BrotherJulius'),
        new imgCard(3, 'Lt Carstairs', 'LtCarstairs'),
        new imgCard(4, 'Preacher Peter', 'PreacherPeter'),
        new imgCard(5, 'Private Graham', 'PrivateGraham'),
        new imgCard(6, 'Brother Matheus', 'BrotherMatheus'),
        new imgCard(7, 'The Reaper', 'TheReaper'),
        new imgCard(8, 'Brutus', 'Brutus'),
        new imgCard(9, 'Private Chris', 'PrivateChris'),
        new imgCard(10, 'Sgt Smith', 'SgtSmith'),
        new imgCard(11, 'Private Darius', 'PrivateDarius'),
        new imgCard(12, 'Private Jones', 'PrivateJones'),
        new imgCard(13, 'Sam', 'Sam'),
        new imgCard(14, 'Specialist Mark', 'SpecialistMark'),
        new imgCard(15, 'Gustav', 'Gustav'),
        new imgCard(16, 'Lyle', 'Lyle'),
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
            <picture>
              <source srcSet={`/Link477-React/${i.path}.webp`} type='image/webp'/>
              <source srcSet={`/Link477-React/${i.path}.jpg`} type='image/jpg'/>
              <img src={`/Link477-React/${i.path}.jpg`} alt={i.name} />
            </picture>
            <p>{i.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
