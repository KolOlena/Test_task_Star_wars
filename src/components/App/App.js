import './App.css';
import React, { Component } from 'react';
import PlanetItem from "../PlanetItem";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import PlanetInformation from "../PlanetInformation";


export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/planet/:id"
                   render={({ match }) => {
                     const { id } = match.params;
                     return <PlanetInformation itemId={id} />
                   }}/>
            <Route exact path="/:id"
                   render={({ match }) => {
                     const { id } = match.params;
                     return <PlanetItem page={id} />
                   }}/>
            <Route exact path='/1' component={PlanetItem}/>
            <Redirect from='/' to='/1'/>
          </Switch>
        </div>
      </Router>
    );
  }
}

