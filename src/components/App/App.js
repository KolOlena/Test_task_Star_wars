import './App.css';
import StarWarsService from "../../service/star-wars-service";
import React, { Component } from 'react';
import PlanetItem from "../PlanetItem";


export default class App extends Component {
  StarWarsService = new StarWarsService();
  //
  // state = {
  //   planetArray:null
  // }
  //
  // componentDidMount() {
  //   this.getPlanetList();
  // }
  //
  // getPlanetList() {
  //   this.StarWarsService.getAllPlanets().then((planet) => {
  //     this.setState(
  //       {
  //         planetArray:planet,
  //       }
  //     )
  //   })
  // }
  render() {
    // const {planetArray} = this.state

    return (
      <div className="container">
          <PlanetItem getData={this.StarWarsService.getAllPlanets}/>
      </div>
    );
  }
}

