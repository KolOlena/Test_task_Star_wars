import React, { Component } from 'react';
import StarWarsService from "../../service/star-wars-service";
import './PlanetItem.css';



export default class PlanetItem extends Component {

  state = {
    planetArray: null,
    count: 0
  }

  componentDidMount() {
    const {getData} = this.props
    getData()
      .then((itemList) => {
        this.setState({
          planetArray: itemList
        });
      });
  }

  renderItems(arr) {
    let {count} = this.state
    return arr.map((planet, index) => {
      console.log(index);
        return (
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">Название: {planet.name}</li>
                <li className="list-group-item">Климат: {planet.climate}</li>
                <li className="list-group-item">Население: {planet.population}</li>
              </ul>
            </div>
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

