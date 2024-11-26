import React, { useState } from "react";
import "./FormStep4.css";

const FormStep4 = () => {
  const [images, setImages] = useState([null]);

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const addImageBox = () => {
    if (images.length < 4) {
      setImages([...images, null]);
    }
  };

  return (
    <div className="form-step-container">
      <h2 className="form-title">Pet Photos</h2>
      <p className="form-instructions">
        Please add at least one photo of your pet. You can add up to 4 photos to help potential adopters better understand your pet.
        The first photo will be used as the main photo in listings.
      </p>
      <div className="image-upload-grid">
        {images.map((image, index) => (
          <div key={index} className="image-upload-box">
            {image ? (
              <img src={image} alt={`Pet ${index + 1}`} className="uploaded-image" />
            ) : (
              <label htmlFor={`upload-${index}`} className="upload-placeholder">
                <span className="upload-icon">+</span>
                <span className="upload-text">{index === 0 ? "Add Main Photo *" : "Add Photo"}</span>
                <input
                  type="file"
                  id={`upload-${index}`}
                  accept=".jpg,.jpeg,.png"
                  className="file-input"
                  onChange={(event) => handleImageUpload(index, event)}
                  required={index === 0}
                />
              </label>
            )}
          </div>
        ))}
      </div>
      {images.length < 4 && (
        <button type="button" onClick={addImageBox} className="add-photo-btn">
          Add Another Photo
        </button>
      )}
    </div>
  );
};

export default FormStep4;
