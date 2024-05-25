import { Link } from 'react-router-dom';

export default function Home() {
  const routes = [
    ['/arrays', 'Arrays'],
    ['/battleship', 'Battleship'],
    ['/gameoflife', 'Game Of Life'],
    ['/rockPaperScissors', 'Rock Paper Scissors'],
    ['/santaTracker', 'Santa Tracker'],
    ['terminal', 'Terminal'],
    ['/tictactoe', 'Tic Tac Toe'],
    ['/weather', 'Weather'],
  ];

  return (
    <ul>
      {routes.map((r, idx) => (
        <li key={idx}>
          <Link to={r[0]}>{r[1]}</Link>
        </li>
      ))}
    </ul>
  );
}
