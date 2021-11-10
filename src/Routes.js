import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import BeerLists from './Pages/BeerLists.jsx';
import Home from './Pages/Home.jsx';
// import ReactGA from "react-ga";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/beerlist" component={BeerLists} />

        <Redirect to="/home" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
