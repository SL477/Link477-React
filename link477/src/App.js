import React from 'react';
import Home from './components/Home';
import './App.css';
import Navigation from './components/NavBar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      <Navigation/>
      <div className="container-fluid">
        <Switch>
          <Route path="/modelrail">
            <img src="/ModelRail.jpg" alt="Lego Hogwarts Express" width="40%" height="40%"></img>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
