import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import StudentGrades from './Arrays';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import './main.css';
import Weather from './weather/Weather';
import Battleship from './battleship/battleship';
import GameOfLife from './gameOfLife/GameOfLife';
import RockPaperScissors from './rockPaperScissors';
import TicTacToe from './ticTacToe/tictactoe';
import SantaTracker from './santaTracker/santaTracker';
import Home from './home';
import Terminal from './terminal/terminal';
import RecipeBox from './recipeBox/RecipeBox';
import CV from './cv/cv';
import MemoryCard from './memoryCard/memoryCard';

const router = createHashRouter([
  { path: '/', element: <Home /> },
  { path: '/arrays', element: <StudentGrades /> },
  { path: '/weather', element: <Weather /> },
  { path: '/battleship', element: <Battleship /> },
  { path: '/gameoflife', element: <GameOfLife /> },
  { path: '/rockPaperScissors', element: <RockPaperScissors /> },
  { path: '/tictactoe', element: <TicTacToe /> },
  { path: '/santaTracker', element: <SantaTracker /> },
  { path: 'terminal', element: <Terminal /> },
  { path: 'recipeBox', element: <RecipeBox /> },
  { path: '/cv', element: <CV /> },
  { path: '/memoryCard', element: <MemoryCard /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
