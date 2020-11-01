export default class StarWarsService {

  _requestBase = 'https://swapi.dev/api';

  getResource = async (url) => {
    const res = await fetch(`${this._requestBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }


  getAllPlanets = async (page) => {
    const pageUrl= '?page='
    let request = null
    let res;
    if (page) {
      request = `${pageUrl}${page}`
      res = await this.getResource(`/planets/${request}`);
    } else {
      res = await this.getResource(`/planets/`);
    }

    return {
      result: res.results.map(this._transformPlanet),
      pages: res.count
    };
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  getResident = async (url) => {
    const id = this._extractIdResidents(url)
    const resident = await this.getResource(`/people/${id}/`);
    return {name: resident.name};
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }
  _extractIdResidents = (url) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain:planet.terrain,
      residents: planet.residents
    };
  };
}

