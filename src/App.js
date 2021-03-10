import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Layout from './Containers/Layout';
import Home from './Components/Home';
import Products from './Components/Products';
import Review from './Components/Review';
import Reviews from './Components/Reviews';

export default function OliverTakeHome() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Layout><Products /></Layout>
          </Route>
          <Route path="/home">
             <Layout><Home /></Layout>
          </Route>
          <Route path="/reviews/:id">
             <Layout><Reviews /></Layout>
          </Route>
          <Route path="/review/:id">
             <Layout><Review /></Layout>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
