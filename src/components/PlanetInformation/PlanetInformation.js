import React, { Component } from 'react';
import StarWarsService from "../../service/star-wars-service";
import ErrorPage from "../ErrorPage";
import PlanetCard from "../PlanetCard";

export default class PlanetInformation extends Component {
  StarWarsService = new StarWarsService();

  state = {
    planet: {},
    residents: [],
    error: false
  }

  onError = () => {
    this.setState({
      error: true,
    });
  };

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
          })

        }
      })
      .catch(
        this.onError
  )

  }

  renderItems(planet) {
    let item = []
    for (let key in planet) {
      if (key === 'residents') {
        if (planet[key].length == 0) {
          item.push(`${key}: unknown`)
        } else {
          let residents = this.state.residents.map((resident) => (` ${resident.name}`))
          item.push(`${key}: ${residents}`)
        }
      } else {
        item.push(`${key}: ${planet[key]}`)
      }
    }

    return item.map(el => <li className="list-group-item">{el}</li>)
  }

  render() {
    const {planet, error} = this.state;
    const errorMessage = error ? <ErrorPage/> : null;
    const items = this.renderItems(planet);


    if (!planet) {
      return 'loading...';
    }

    const content = items.length > 0 ? <PlanetCard items={items} name={planet.name}/>: null


    return (
      <div className="card">
        {errorMessage}
        {content}
      </div>
    )
  }
}

