import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import "./AdoptPage.css";

const AdoptPage = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    gender: "",
    breed: "",
    color: "",
    size: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/pets");
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets", error);
      }
    };
    fetchPets();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredPets = pets.filter((pet) => {
    const petLocation = pet.location ? `${pet.location.city}, ${pet.location.state}, ${pet.location.country}` : "";
    return (
      (!filters.location || petLocation.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.gender || pet.gender === filters.gender) &&
      (!filters.breed || pet.breed === filters.breed) &&
      (!filters.color || pet.color === filters.color) &&
      (!filters.size || pet.size === filters.size)
    );
  });

  return (
    <div className="adopt-page flex min-h-screen bg-gray-100">
      <div className="filters w-1/4 p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Search by location"
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select 
              name="gender" 
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
            <select 
              name="breed" 
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Breeds</option>
              {/* Add breed options dynamically */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <select 
              name="color" 
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Colors</option>
              {/* Add color options dynamically */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <select 
              name="size" 
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Sizes</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pets-grid w-3/4 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <Card key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default AdoptPage;
