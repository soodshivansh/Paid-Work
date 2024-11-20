import React from 'react';
import './Card.css';

const Card = ({ pet }) => {
  return (
    <div className="card">
      <img src={pet.image} alt={pet.name} className="card-image" />
      <div className="card-content">
        <h3>{pet.name}</h3>
        <p>{pet.location}</p>
        <p>Gender: {pet.gender}</p>
        <p>Age: {pet.age}</p>
        <button className="card-button">More Info</button>
      </div>
    </div>
  );
};

export default Card;
