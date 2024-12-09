import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaVenusMars, FaPaw, FaPalette, FaRuler, FaCat, FaDog, FaFilter, FaUndo } from 'react-icons/fa';
import Card from "../../components/Card/Card";
import "./AdoptPage.css";
import { useLocation } from 'react-router-dom';

// Define fetchPets outside the component so it can be exported
const fetchPetsData = async (setLoading, setPets) => {
  try {
    setLoading(true);
    const response = await axios.get("http://localhost:8080/api/pets");
    // Sort pets by creation date to show newest first
    const sortedPets = response.data.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPets(sortedPets);
  } catch (error) {
    console.error("Error fetching pets:", error);
  } finally {
    setLoading(false);
  }
};

const AdoptPage = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    gender: "",
    breed: "",
    color: "",
    size: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Immediately fetch pets when navigating from rehoming page
    if (location.state?.fromRehoming) {
      fetchPetsData(setLoading, setPets);
    }
  }, [location]);

  const dogBreeds = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Rottweiler",
    "Yorkshire Terrier",
    "Boxer",
    "Dachshund"
  ];

  const catBreeds = [
    "Persian",
    "Maine Coon",
    "Siamese",
    "British Shorthair",
    "Ragdoll",
    "Bengal",
    "American Shorthair",
    "Sphynx",
    "Scottish Fold",
    "Russian Blue"
  ];

  const colors = [
    "Black",
    "White",
    "Brown",
    "Gray",
    "Cream",
    "Golden",
    "Mixed",
    "Spotted",
    "Tabby",
    "Calico"
  ];

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setError(null);
        const response = await axios.get("http://localhost:8080/api/pets");
        setPets(response.data);
      } catch (error) {
        setError("Failed to fetch pets. Please try again later.");
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    fetchPetsData(setLoading, setPets);
  }, []);

  const resetFilters = () => {
    setFilters({
      location: "",
      type: "",
      gender: "",
      breed: "",
      color: "",
      size: "",
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
      // If changing pet type, reset breed
      if (name === 'type') {
        return {
          ...prev,
          [name]: value,
          breed: ''
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getBreedOptions = () => {
    if (filters.type === 'dog') {
      return dogBreeds;
    } else if (filters.type === 'cat') {
      return catBreeds;
    }
    return [];
  };

  const filteredPets = pets.filter((pet) => {
    const locationMatch = !filters.location || 
      pet.location?.city?.toLowerCase().includes(filters.location.toLowerCase()) ||
      pet.location?.state?.toLowerCase().includes(filters.location.toLowerCase());
    
    const typeMatch = !filters.type || 
      pet.type.toLowerCase() === filters.type.toLowerCase();
    
    const genderMatch = !filters.gender || 
      pet.gender.toLowerCase() === filters.gender.toLowerCase();
    
    const breedMatch = !filters.breed || 
      pet.breed.toLowerCase() === filters.breed.toLowerCase();
    
    const colorMatch = !filters.color || 
      pet.color.toLowerCase() === filters.color.toLowerCase();
    
    const sizeMatch = !filters.size || 
      pet.size.toLowerCase() === filters.size.toLowerCase();

    return locationMatch && typeMatch && genderMatch && 
           breedMatch && colorMatch && sizeMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // console.log("saurabh Hwro",pets[0]?.images[0].path);/
  return (
    <div className="adopt-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Find Your Perfect Companion</h1>
        <p>Browse through our available pets and find your new family member</p>
      </motion.div>

      <div className="content-container">
        <motion.div 
          className="filters-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="filters-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2>
              <FaFilter />
              Filter Pets
            </h2>
            <button 
              onClick={resetFilters}
              className="reset-filters-btn"
            >
              <FaUndo />
              Reset Filters
            </button>
          </motion.div>
          
          <motion.div 
            className="filter-groups-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="filter-group">
              <div className="filter-label">
                <FaMapMarkerAlt />
                <span>Location</span>
              </div>
              <input
                type="text"
                name="location"
                placeholder="Search by city or state"
                value={filters.location}
                onChange={handleFilterChange}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <div className="filter-label">
                {filters.type === 'dog' ? <FaDog /> : filters.type === 'cat' ? <FaCat /> : <FaPaw />}
                <span>Pet Type</span>
              </div>
              <select 
                name="type" 
                value={filters.type}
                onChange={handleFilterChange} 
                className="filter-input"
              >
                <option value="">All Types</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <div className="filter-group">
              <div className="filter-label">
                <FaPaw />
                <span>Breed</span>
              </div>
              <select 
                name="breed" 
                value={filters.breed}
                onChange={handleFilterChange} 
                className="filter-input"
                disabled={!filters.type}
              >
                <option value="">All Breeds</option>
                {getBreedOptions().map((breed) => (
                  <option key={breed} value={breed.toLowerCase()}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <div className="filter-label">
                <FaVenusMars />
                <span>Gender</span>
              </div>
              <select 
                name="gender" 
                value={filters.gender}
                onChange={handleFilterChange} 
                className="filter-input"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="filter-group">
              <div className="filter-label">
                <FaPalette />
                <span>Color</span>
              </div>
              <select 
                name="color" 
                value={filters.color}
                onChange={handleFilterChange} 
                className="filter-input"
              >
                <option value="">All Colors</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <div className="filter-label">
                <FaRuler />
                <span>Size</span>
              </div>
              <select 
                name="size" 
                value={filters.size}
                onChange={handleFilterChange} 
                className="filter-input"
              >
                <option value="">All Sizes</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="pets-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="retry-btn"
              >
                Retry
              </button>
            </div>
          ) : filteredPets.length > 0 ? (
            <motion.div 
              className="pets-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {filteredPets.map((pet, index) => (
                <motion.div
                  key={pet._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1, // Stagger the animations
                    ease: "easeOut"
                  }}
                >
                  <Card pet={pet} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>No pets found</h3>
              <p>Try adjusting your filters to find more pets</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Export both the component and the fetch function
export const refreshPetsList = (setLoading, setPets) => fetchPetsData(setLoading, setPets);
export default AdoptPage;
