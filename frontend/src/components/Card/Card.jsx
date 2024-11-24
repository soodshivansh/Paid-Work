import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ pet }) => {
  const locationString = pet.location ? `${pet.location.city}, ${pet.location.state}, ${pet.location.country}` : "Location not available";

  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{pet.name}</h3>
        <p className="text-sm">Location: {locationString}</p>
        <p className="text-sm">Gender: {pet.gender}</p>
        <p className="text-sm">Breed: {pet.breed}</p>
        <p className="text-sm">Color: {pet.color}</p>
        <p className="text-sm">Size: {pet.size}</p>
        <Link to={`/petDescription/${pet._id}`}>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
