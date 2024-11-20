import React, { useState } from "react";
import Card from "../../components/Card/Card";
import "./AdoptPage.css";

const AdoptPage = ({ pets }) => {
  const [filters, setFilters] = useState({ gender: "", size: "" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredPets = pets.filter((pet) => {
    return (
      (!filters.gender || pet.gender === filters.gender) &&
      (!filters.size || pet.size === filters.size)
    );
  });

  return (
    <div className="adopt-page">
      <h1>Find Your Perfect <span className="highlight">Pet</span></h1>

      <div className="filters">
        <select name="gender" onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="size" onChange={handleFilterChange}>
          <option value="">All Sizes</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      <div className="pets-grid">
        {filteredPets.map((pet) => (
          <Card key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default AdoptPage;
