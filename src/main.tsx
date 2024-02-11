import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentGrades from './Arrays';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './main.css';
import Weather from './weather/Weather';
import Battleship from './battleship/battleship';
import GameOfLife from './gameOfLife/GameOfLife';
import RockPaperScissors from './rockPaperScissors';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Test</div>
  },
  {
    path: '/arrays',
    element: <StudentGrades/>
  },
  {
    path: '/weather',
    element: <Weather/>
  },
  {
    path: '/battleship',
    element: <Battleship/>
  },
  {
    path: 'gameoflife',
    element: <GameOfLife/>
  },
  {
    path: 'rockPaperScissors',
    element: <RockPaperScissors/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
