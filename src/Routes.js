import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import BeerLists from './Pages/BeerLists';
import Cart from './Pages/Cart';
import Home from './Pages/Home.jsx';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />

        <Route path="/home" component={Home} />
        <Route path="/beerlist" component={BeerLists} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
};

export default Routes;
