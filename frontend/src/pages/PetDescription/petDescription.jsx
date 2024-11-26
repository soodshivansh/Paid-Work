import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './petDescription.css';
import PetInfo from '../../components/PetInfo/petInfo';
import { mapPetToDetails } from '../../utils/petUtils';

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!pet) {
    return <p>No pet details available</p>;
  }

  return (
    <div className="pet-description">
      <div className="header">
        <h1>Meet {pet.name}!</h1>
        <div className="petDetails">
          <div>
            <img src={pet.photos[0]} alt={pet.name} className="main-image" />
          </div>
          <div className="pet-header-info">
            <h2>{pet.name}</h2>
            <div className="basic-details">
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Age:</strong> {pet.age} years</p>
              <p><strong>Gender:</strong> {pet.gender}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
            </div>
          </div>
        </div>
        <div className="location">
          <p>{pet.location.country}</p>
          <p>📍 {`${pet.location.city}, ${pet.location.state} - ${pet.location.pincode}`}</p>
        </div>
      </div>

      <div className="main-section">
        <div className="image-section">
          <img src={pet.photos[0]} alt={pet.name} className="main-image" />
          <div className="thumbnail-section">
            {pet.photos.map((photo, i) => (
              <img key={i} src={photo} alt={`${pet.name} - Photo ${i + 1}`} className="thumbnail" />
            ))}
          </div>
        </div>

        <div className="info-section">
          <div className="story">
            <h3>{pet.name}'s Story</h3>
            <p>{pet.story}</p>
          </div>

          <div className="health-info">
            <h3>Health & Training</h3>
            <ul>
              <li className={pet.vaccinated ? 'active' : ''}>
                <span className="icon">💉</span>
                <span className="label">Vaccinated</span>
                <span className="value">{pet.vaccinated ? 'Yes' : 'No'}</span>
              </li>
              <li className={pet.houseTrained ? 'active' : ''}>
                <span className="icon">🏠</span>
                <span className="label">House-trained</span>
                <span className="value">{pet.houseTrained ? 'Yes' : 'No'}</span>
              </li>
              <li className={pet.neutered ? 'active' : ''}>
                <span className="icon">✂️</span>
                <span className="label">Neutered/Spayed</span>
                <span className="value">{pet.neutered ? 'Yes' : 'No'}</span>
              </li>
              <li className={pet.microchipped ? 'active' : ''}>
                <span className="icon">🔍</span>
                <span className="label">Microchipped</span>
                <span className="value">{pet.microchipped ? 'Yes' : 'No'}</span>
              </li>
            </ul>
          </div>

          <div className="physical-info">
            <h3>Physical Characteristics</h3>
            <ul>
              <li>
                <span className="icon">📏</span>
                <span className="label">Size</span>
                <span className="value">{pet.size}</span>
              </li>
              <li>
                <span className="icon">⚖️</span>
                <span className="label">Weight</span>
                <span className="value">{pet.weight} kg</span>
              </li>
              <li>
                <span className="icon">📏</span>
                <span className="label">Height</span>
                <span className="value">{pet.height} cm</span>
              </li>
              <li>
                <span className="icon">🎨</span>
                <span className="label">Color</span>
                <span className="value">{pet.color}</span>
              </li>
            </ul>
          </div>

          {pet.medicalHistory && (
            <div className="medical-history">
              <h3>Medical History</h3>
              <p>{pet.medicalHistory}</p>
            </div>
          )}
        </div>
      </div>

      <div className="adopt-prompt">
        <p>Interested in giving {pet.name} a forever home?</p>
        <button 
          className="get-started-button" 
          onClick={() => navigate('/choose-to-adopt', { state: { petId: id } })}
        >
          Start Adoption Process
        </button>
      </div>
    </div>
  );
};

export default PetDescription;
