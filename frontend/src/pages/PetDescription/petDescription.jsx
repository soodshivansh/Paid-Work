import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './petDescription.css';
import PetInfo from '../../components/PetInfo/petInfo';
import { mapPetToDetails } from '../../utils/petUtils';
import SimilarPets from '../../components/features/SimilarPets/SimilarPets';

const PetDescription = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/pets/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPet(data);
      } catch (err) {
        console.error("Error fetching pet data:", err);
        setError(err.message); // Capture error
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message if API fails
  }

  if (!pet) {
    return <p>No pet details available</p>; // Handle case where pet is not found
  }

  return (
    <div className="pet-description">
      <div className="header">
        <h1>Hi Human!</h1>
        <div className="petDetails">
          <div>
            <img src={pet.photos[0]} alt={pet.name} className="main-image" />
          </div>
          <div>
            <h2>{pet.name}</h2>
            <p>Pet ID: {pet._id}</p>
          </div>
        </div>
        <div className="location">
          <p>{pet.location.country}</p>
          <p>📍 {`${pet.location.city}, ${pet.location.state}`}</p>
        </div>
      </div>
      <div className="main-section">
        <div className="image-section">
          <img src={pet.photos[0]} alt={pet.name} className="main-image" />
          <div className="thumbnail-section">
            {pet.photos.map((photo, i) => (
              <img key={i} src={photo} alt={`Thumbnail ${i}`} className="thumbnail" />
            ))}
          </div>
        </div>

        <div className="story">
          <h3>{pet.name}'s Story</h3>
          <p>{pet.story}</p>
          <ul>
            {pet.vaccinated && <li>Vaccinated</li>}
            {pet.houseTrained && <li>House-trained</li>}
            {pet.neutered && <li>Neutered</li>}
            {pet.microchipped && <li>Microchipped</li>}
          </ul>
        </div>
      </div>
      <PetInfo petDetails={mapPetToDetails(pet)} />

      <div className="adopt-prompt">
        <p>If you are interested to adopt</p>
        <button 
          className="get-started-button" 
          onClick={() => navigate('/choose-to-adopt', { state: { petId: id } })}
        >
          Get started
        </button>
      </div>

      {/* Similar Pets Section */}
      <SimilarPets currentPet={pet} maxPets={3} />
    </div>
  );
};

export default PetDescription;
