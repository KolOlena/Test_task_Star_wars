export default class StarWarsService {

  _requestBase = 'https://swapi.dev/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img'

  getResource = async (url) => {
    const res = await fetch(`${this._requestBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }


  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }


  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`
  }
  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
      climate: planet.climate
    };
  };
}

