import React, { Component } from 'react';
import StarWarsService from "../../service/star-wars-service";
import './PlanetItem.css';
import { Link } from "react-router-dom";


export default class PlanetItem extends Component {
  StarWarsService = new StarWarsService();
  getData=this.StarWarsService.getAllPlanets

  state = {
    planetArray: null,
    selectedItem: null
  }

  componentDidMount() {
    this.getData()
      .then((itemList) => {
        this.setState({
          planetArray: itemList
        });
      });
  }

  renderItems(arr) {
    return arr.map((planet) => {
      return (
        <Link to={planet.id}>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">Название: {planet.name}</li>
                <li className="list-group-item">Климат: {planet.climate}</li>
                <li className="list-group-item">Население: {planet.population}</li>
              </ul>
            </div>
        </Link>
        )
    })
  }

  render() {

    const {planetArray} = this.state

    if (!planetArray) {
      return 'loading...';
    }
    const items = this.renderItems(planetArray);

    return (
      <div className="row">
        {items}
      </div>
    )
  }
}

