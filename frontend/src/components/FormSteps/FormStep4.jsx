import React, { useState } from "react";
import "./FormStep4.css";

const FormStep4 = () => {
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  return (
    <div className="form-step-page">
      <div className="form-container">
        <h2 className="form-title">Images of Home</h2>
        <p className="form-instructions">
          Please add 4 photos of your home and any outside space as it helps the pet’s current owner to visualize the home you are offering. (A minimum of 2 photos are required, but uploading 4 is better!)
        </p>
        <div className="image-upload-grid">
          {images.map((image, index) => (
            <div key={index} className="image-upload-box">
              {image ? (
                <img src={image} alt={`Uploaded ${index + 1}`} className="uploaded-image" />
              ) : (
                <label htmlFor={`upload-${index}`} className="upload-placeholder">
                  <span className="upload-icon">+</span>
                  <span className="upload-text">Add Image</span>
                  <input
                    type="file"
                    id={`upload-${index}`}
                    accept=".jpg, .jpeg, .png"
                    className="file-input"
                    onChange={(event) => handleImageUpload(index, event)}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormStep4;
