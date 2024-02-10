import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentGrades from './Arrays';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './main.css';
import Weather from './Weather';

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
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);