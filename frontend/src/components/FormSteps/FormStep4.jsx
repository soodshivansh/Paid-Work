import React, { useState } from "react";
import { FaHome, FaUpload, FaTrash, FaImage, FaInfoCircle } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep4 = () => {
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
    );

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          url: e.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaHome style={{ marginRight: '12px' }} />
        Home Photos
      </h2>

      <div className="form-info" style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
          Please provide photos of your home environment to help us understand the living space for the pet.
        </p>
      </div>

      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: '2px dashed #6c63ff',
          borderRadius: '12px',
          padding: '40px 20px',
          textAlign: 'center',
          background: dragActive ? 'rgba(108, 99, 255, 0.05)' : 'white',
          transition: 'all 0.3s ease'
        }}
      >
        <FaUpload style={{ fontSize: '2rem', color: '#6c63ff', marginBottom: '16px' }} />
        <p style={{ margin: '0 0 16px 0', color: '#666' }}>
          Drag and drop your home photos here, or
        </p>
        <label className="upload-button">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          Browse Files
        </label>
        <p style={{ margin: '16px 0 0 0', fontSize: '0.9rem', color: '#888' }}>
          Maximum 5 photos, up to 5MB each
        </p>
      </div>

      {images.length > 0 && (
        <div className="uploaded-images" style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#333', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <FaImage style={{ marginRight: '8px' }} />
            Uploaded Photos
          </h3>
          <div className="image-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {images.map((image, index) => (
              <div key={index} className="image-item" style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={image.url} 
                  alt={`Home photo ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                />
                <button
                  onClick={() => removeImage(index)}
                  className="remove-button"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ff4444'
                  }}
                >
                  <FaTrash size={14} />
                </button>
                <div style={{
                  padding: '8px',
                  background: 'white',
                  fontSize: '0.9rem',
                  color: '#666',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}>
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="photo-guidelines" style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#333', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
          <FaInfoCircle style={{ marginRight: '8px' }} />
          Photo Guidelines
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0,
          display: 'grid',
          gap: '12px',
          color: '#666'
        }}>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <FaHome style={{ marginRight: '8px', color: '#6c63ff' }} />
            Include photos of the main living areas where the pet will spend time
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <FaHome style={{ marginRight: '8px', color: '#6c63ff' }} />
            Show any outdoor spaces, yard, or fenced areas if available
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <FaHome style={{ marginRight: '8px', color: '#6c63ff' }} />
            Capture any pet-specific areas (sleeping space, play areas)
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <FaHome style={{ marginRight: '8px', color: '#6c63ff' }} />
            Ensure photos are well-lit and clearly show the space
          </li>
        </ul>
      </div>

      <style jsx>{`
        .upload-button {
          background: #6c63ff;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          display: inline-block;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .upload-button:hover {
          background: #5b52ff;
        }

        .drag-active {
          border-color: #5b52ff !important;
          background: rgba(108, 99, 255, 0.1) !important;
        }

        .remove-button:hover {
          background: rgba(255,255,255,1);
          color: #ff2222;
        }
      `}</style>
    </div>
  );
};

export default FormStep4;
