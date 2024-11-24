import React from 'react';
import { Link } from 'react-router-dom';
import { pets } from '../../../data/pets';
import './SimilarPets.css';

const SimilarPets = ({ currentPet, maxPets = 3 }) => {
  // Filter similar pets based on size or gender
  const similarPets = pets
    .filter(pet => 
      pet.id !== currentPet.id && // Exclude current pet
      (pet.size === currentPet.size || pet.gender === currentPet.gender) // Match by size or gender
    )
    .slice(0, maxPets); // Limit the number of similar pets

  if (similarPets.length === 0) {
    return null; // Don't show the section if no similar pets
  }

  return (
    <div className="similar-pets-section">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Pets You May Like</h2>
      <div className="similar-pets-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarPets.map((pet) => (
          <Link to={`/petDescription/${pet.id}`} key={pet.id} className="pet-card">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={`/images/${pet.image}`}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                <p className="text-sm text-gray-600">{pet.size} Size</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{pet.gender}</span>
                  <span className="text-sm font-medium text-blue-600">View Details</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarPets;
