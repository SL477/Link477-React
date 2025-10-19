import { Link } from 'react-router-dom';

export default function Home() {
  const routes = [
    ['/arrays', 'Arrays'],
    ['/battleship', 'Battleship'],
    ['/cv', 'CV'],
    ['/gameoflife', 'Game Of Life'],
    ['/memoryCard', 'Memory Card'],
    ['/recipeBox', 'Recipe Box'],
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
