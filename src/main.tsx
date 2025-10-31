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
import Shop from './shop/shop';
import ShopHome from './shop/shopHome';
import ShopStore from './shop/shopStore';
import ShopBasket from './shop/shopBasket';
import WheresWaldo from './wheresWaldo/wheresWaldo';

const router = createHashRouter([
  { path: '/', element: <Home /> },
  { path: '/arrays', element: <StudentGrades /> },
  { path: '/weather', element: <Weather /> },
  { path: '/battleship', element: <Battleship /> },
  { path: '/gameoflife', element: <GameOfLife /> },
  { path: '/rockPaperScissors', element: <RockPaperScissors /> },
  { path: '/tictactoe', element: <TicTacToe /> },
  { path: '/santaTracker', element: <SantaTracker /> },
  {
    path: '/shop',
    element: <Shop />,
    children: [
      { index: true, element: <ShopHome /> },
      { path: 'store', element: <ShopStore /> },
      { path: 'basket', element: <ShopBasket /> },
    ],
  },
  { path: 'terminal', element: <Terminal /> },
  { path: 'recipeBox', element: <RecipeBox /> },
  { path: '/cv', element: <CV /> },
  { path: '/memoryCard', element: <MemoryCard /> },
  { path: '/wheresGeorge', element: <WheresWaldo /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
