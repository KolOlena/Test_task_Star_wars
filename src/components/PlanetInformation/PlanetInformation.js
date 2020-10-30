import React, { Component } from 'react';
import './PlanetInformation.css'
import StarWarsService from "../../service/star-wars-service";

export default class PlanetInformation extends Component {
  StarWarsService = new StarWarsService();

  state = {
    planet: {},
  }


  componentDidMount() {
    this.updatePlanet();
  }

  updatePlanet = () => {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.StarWarsService
      .getPlanet(itemId)
      .then((planet) => {
        this.setState(({planet}))
      })
  };

  render() {
    const { planet} = this.state;
    const {name, population, rotationPeriod, diameter, climate, gravity, terrain, residents} = planet

    return (
        <div className="card">
          <div className="card-header">
            Planet {name}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rotation Period: {rotationPeriod}</li>
            <li className="list-group-item">Diameter: {diameter}</li>
            <li className="list-group-item">Climate: {climate}</li>
            <li className="list-group-item">Gravity: {gravity}</li>
            <li className="list-group-item">Terrain: {terrain}</li>
            <li className="list-group-item">Population: {population}</li>
            <li className="list-group-item">Residents: {residents}</li>
          </ul>
        </div>
    )
  }
}

