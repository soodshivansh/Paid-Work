import React from 'react';
import './petInfo.css';

const PetInfo = ({ petDetails }) => {
  return (
    <div className="pet-info">
      {petDetails.map((detail, index) => (
        <div key={index} className="info-card">
          <div className="icon">{detail.icon}</div>
          <p className="label">{detail.label}</p>
          <p className="value">{detail.value}</p>
        </div>
      ))}
    </div>
  );
};

export default PetInfo;
