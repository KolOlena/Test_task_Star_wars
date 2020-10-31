import React, { Component } from 'react';
import './PlanetInformation.css'
import StarWarsService from "../../service/star-wars-service";

export default class PlanetInformation extends Component {
  StarWarsService = new StarWarsService();

  state = {
    planet: {},
    residents: []
  }


  componentDidMount() {
    const {itemId} = this.props;
    if (!itemId) {
      return;
    }
    this.StarWarsService
      .getPlanet(itemId)
      .then((planet) => {
        this.setState(({planet}))
        const {residents} = this.state.planet
        if (residents) {
          const residentsArray = []
          residents.forEach((resident) => {
            residentsArray.push(this.StarWarsService.getResident(resident));
          })
          Promise.all(residentsArray).then(residents => {
            this.setState({residents})
          });
        }
      })

  }

  renderItems(planet) {
    let item = []
    for (let key in planet) {
      if (key === 'residents') {
        if (planet[key].length == 0) {
          item.push(`${key}: unknown`)
        } else {
          let residents = this.state.residents.map((resident) => (` ${resident.name}`))
          item.push(`${key}: ${residents}`)}
      } else {
      item.push(`${key}: ${planet[key]}`)}
    }

    return item.map(el => <li className="list-group-item">{el}</li>)
  }

  render() {
    const {planet} = this.state;
    if (!planet) {
      return 'loading...';
    }
    const items = this.renderItems(planet);
    return (
      <div className="card">
        <div className="card-header">
          Planet {planet.name}
        </div>
        <ul className="list-group list-group-flush">
          {items}
        </ul>
      </div>
    )
  }
}

