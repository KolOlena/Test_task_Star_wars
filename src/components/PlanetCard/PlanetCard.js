import React  from 'react';
import './PlanetCard.css'


const PlanetCard = ({items, name}) => {
  return (
    <div>
      <div className="card-header">
        Planet {name}
      </div>
      <ul className="list-group list-group-flush">
        {items}
      </ul>
    </div>
  )
}
export default PlanetCard

