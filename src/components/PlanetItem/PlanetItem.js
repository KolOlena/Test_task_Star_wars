import React, { Component } from 'react';
import StarWarsService from "../../service/star-wars-service";
import './PlanetItem.css';
import { Link } from "react-router-dom";
import ErrorPage from "../ErrorPage";


export default class PlanetItem extends Component {
  StarWarsService = new StarWarsService();

  getData = this.StarWarsService.getAllPlanets

  state = {
    planetArray: null,
    selectedItem: null,
    page: null,
    error: false,
    pageCount:null
  }

  onError = () => {
    this.setState({
      error: true,
    });
  };

  componentDidMount() {
    const page = this.props.page
    this.getData(page)
      .then(({result, pages} ) => {
        this.setState({
          planetArray: result,
          page,
          pageCount: pages
        })
      }).catch(this.onError)
  }


  renderItems(arr) {
    return arr.map((planet) => {
      return (
        <div className="col-md-4">
          <Link to={'planet/' + planet.id}>
            <ul className="list-group">
              <li className="list-group-item">Name: {planet.name}</li>
              <li className="list-group-item">Climate: {planet.climate}</li>
              <li className="list-group-item">Population: {planet.population}</li>
            </ul>
          </Link>
        </div>
      )
    })
  }

  updatePlanet = (page) => {
    this.getData(page)
      .then(({result} ) => {
        this.setState({
          planetArray: result,
        })
      }).catch(this.onError)
  };


  createPagination(pageCount) {
    let pag = pageCount/10
    let pagArray = []
    for (let page =1; page <= pag; page++) {
      pagArray.push(<Link to={'/' + page} onClick={() => this.updatePlanet(page)}>{page}</Link>)
    }
    return pagArray.map((page) => page )

  }

  render() {

    const {planetArray, error, pageCount} = this.state
    const errorMessage = error ? <ErrorPage/> : null;

    if (!planetArray && error === false) {
      return 'Loading...';
    }
    if (error === true) {
      return errorMessage
    }
    const items = this.renderItems(planetArray);
    const pagination = this.createPagination(pageCount);

    return (
      <div>
        <div className="row">
          {items}
        </div>
        <div className='pagination'>
          {pagination}
        </div>
      </div>
    )
  }
}

