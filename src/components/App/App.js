import './App.css';
import React, { Component } from 'react';
import PlanetItem from "../PlanetItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PlanetInformation from "../PlanetInformation";


export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path="/:id"
                   render={({ match }) => {
                     const { id } = match.params;
                     return <PlanetInformation itemId={id} />
                   }}/>
            <Route exact path='/' component={PlanetItem}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

