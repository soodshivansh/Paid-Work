import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeRehoming, updatePetInfo, finalizeRehoming } from "../../services/rehoming.service";
import "./ChooseToRehome.css";

const ChooseToRehome = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const petId = localStorage.getItem("petId");
  const [petData, setPetData] = useState({
    type: "",
    name: "",
    age: "",
    gender: "",
    breed: "",
    color: "",
    size: "",
    spayed: "",
    rehomingReason: "",
    timeAvailable: "",
    location: {
      postcode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
    },
    personality: "",
    dailyRoutine: "",
    idealHome: "",
    images: [],
    documents: [],
    keyFacts: {
      shotsUpToDate: "",
      microchipped: "",
      houseTrained: "",
      goodWithDogs: "",
      goodWithCats: "",
      goodWithKids: "",
      purebred: "",
      specialNeeds: "",
      behavioralIssues: "",
    }
  });

  const handleInputChange = (field, value, category = null) => {
    setPetData(prev => {
      if (category) {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    setPetData(prev => ({
      ...prev,
      [type]: [...prev[type], ...files]
    }));
  };

  const handleNext = async () => {
    if (currentStep === 1 && !termsAgreed) {
      setError("Please agree to the terms and conditions");
      return;
    }
  
    try {
      if (currentStep === 1) {
        await initializeRehoming(termsAgreed);
        setError("");
      } else if (currentStep > 1 && currentStep < 8) {
        await updatePetInfo({
          ...petData,
          step: currentStep,
          petId
        });
      }
  
      if (currentStep === 8) {
        await finalizeRehoming(petData);
        // Clear rehoming data from localStorage
        localStorage.removeItem('rehomerId');
        localStorage.removeItem('petId');
        // Navigate to adopt page with refresh state
        navigate("/adopt", { state: { fromRehoming: true } });
        return;
      }
  
      if (currentStep < 9) {
        setCurrentStep(currentStep + 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Welcome to Rehome Your Pet</h2>
            <p>
              To apply for rehoming your pet, please fill out the required
              details. Click "Start" to begin the process.
            </p>
            <div className="user-details">
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Name:</strong> {userInfo.name}</p>
              {userInfo.phone && <p><strong>Phone:</strong> {userInfo.phone}</p>}
            </div>
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
            <label className="terms-checkbox">
              <input 
                type="checkbox" 
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
              I agree to the <a href="#terms">Terms</a> and{" "}
              <a href="#privacy-policy">Privacy Policy</a>.
            </label>
          </div>
        );
      case 2:
        return (
          <div className="step-content"> 
            <h2>Primary Questions</h2>
            <form className="primary-questions">
              <label>
                <strong>Are you rehoming a dog or cat?</strong>
                <div>
                  <div className="" style={{"display":"flex","justifyContent":"center","alignContent":"center"}}>
                    <label>Dog</label>
                  <input 
                    type="radio" 
                    name="type" 
                    value="dog"
                    checked={petData.type === "dog"}
                    onChange={(e) => handleInputChange("type", e.target.value)} 
                  />
                  </div>
                  <input 
                    type="radio" 
                    name="type" 
                    value="cat"
                    checked={petData.type === "cat"}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  /> Cat
                </div>
              </label>
              <label>
                <strong>Is your pet spayed or neutered?</strong>
                <div>
                  <input 
                    type="radio" 
                    name="spayed" 
                    value="yes"
                    checked={petData.spayed === "yes"}
                    onChange={(e) => handleInputChange("spayed", e.target.value)}
                  /> Yes
                  <input 
                    type="radio" 
                    name="spayed" 
                    value="no"
                    checked={petData.spayed === "no"}
                    onChange={(e) => handleInputChange("spayed", e.target.value)}
                  /> No
                </div>
              </label>
              <label>
                <strong>Why do you need to rehome your pet?</strong>
                <select
                  value={petData.rehomingReason}
                  onChange={(e) => handleInputChange("rehomingReason", e.target.value)}
                >
                  <option value="">Select a reason</option>
                  <option value="moving">Moving</option>
                  <option value="allergies">Allergies</option>
                  <option value="financial">Financial difficulties</option>
                </select>
              </label>
              <label>
                <strong>How long can you keep your pet while we find a home?</strong>
                <select
                  value={petData.timeAvailable}
                  onChange={(e) => handleInputChange("timeAvailable", e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="1week">1 week</option>
                  <option value="1month">1 month</option>
                  <option value="more">More than a month</option>
                </select>
              </label>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h2>Pet's Images</h2>
            <p>
              Upload images of your pet. Accepted formats are (.jpg, .png, .jpeg). 
              Dimensions should be 600x600 pixels. Max size is 1024 KB.
            </p>
            <div className="image-grid">
              {[1, 2, 3, 4].map((num) => (
                <div className="image-box" key={num}>
                  <span>{num}. Main</span>
                  <input type="file" onChange={(e) => handleFileChange(e, "images")} />
                </div>
              ))}
            </div>
          </div>
        );
      case 4: // Characteristics Step
        return (
          <div className="step-content">
            <h2>Characteristics</h2>
            <form className="characteristics-form">
              <label>
                Pet's Name *
                <input 
                  type="text" 
                  value={petData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter pet's name" 
                />
              </label>
              <label>
                Age (Years) *
                <input 
                  type="number" 
                  value={petData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  min="0" 
                  placeholder="0" 
                />
              </label>
              <label>
                Size *
                <select
                  value={petData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </label>
              <label>
                Gender *
                <select
                  value={petData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label>
                Breed(s) *
                <input 
                  type="text" 
                  value={petData.breed}
                  onChange={(e) => handleInputChange("breed", e.target.value)}
                  placeholder="Enter breed(s)" 
                />
              </label>
              <label>
                Colors
                <input 
                  type="text" 
                  value={petData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  placeholder="Enter colors" 
                />
              </label>
            </form>
          </div>
        );
      case 5: // Key Facts Step
        return (
          <div className="step-content">
            <h2>Key Facts</h2>
            <form className="key-facts-form">
              {[/* ... */].map((fact, index) => (
                <div key={index} className="fact-row">
                  <label>{fact}</label>
                  <div className="radio-group">
                    <label>
                      <input 
                        type="radio" 
                        name={fact} 
                        value="yes"
                        checked={petData.keyFacts[fact] === "yes"}
                        onChange={(e) => handleInputChange(fact, e.target.value, "keyFacts")}
                      /> Yes
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name={fact} 
                        value="no"
                        checked={petData.keyFacts[fact] === "no"}
                        onChange={(e) => handleInputChange(fact, e.target.value, "keyFacts")}
                      /> No
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name={fact} 
                        value="unknown"
                        checked={petData.keyFacts[fact] === "unknown"}
                        onChange={(e) => handleInputChange(fact, e.target.value, "keyFacts")}
                      /> Unknown
                    </label>
                  </div>
                </div>
              ))}
            </form>
          </div>
        );
      case 6: // Pet's Location Step
        return (
          <div className="step-content">
            <h2>Pet's Location</h2>
            <form className="location-form">
              <label>
                Postcode *
                <input 
                  type="text" 
                  value={petData.location.postcode}
                  onChange={(e) => handleInputChange("postcode", e.target.value, "location")}
                  placeholder="Enter postcode" 
                />
              </label>
              <label>
                Address Line 1 *
                <input 
                  type="text" 
                  value={petData.location.addressLine1}
                  onChange={(e) => handleInputChange("addressLine1", e.target.value, "location")}
                  placeholder="Enter address line 1" 
                />
              </label>
              <label>
                Address Line 2
                <input 
                  type="text" 
                  value={petData.location.addressLine2}
                  onChange={(e) => handleInputChange("addressLine2", e.target.value, "location")}
                  placeholder="Enter address line 2" 
                />
              </label>
              <label>
                City *
                <input 
                  type="text" 
                  value={petData.location.city}
                  onChange={(e) => handleInputChange("city", e.target.value, "location")}
                  placeholder="Enter city" 
                />
              </label>
            </form>
          </div>
        );
      case 7:
        return (
          <div className="step-content">
            <h2>Tell Your Pet's Story</h2>
            <p className="description">Help potential adopters connect with your pet by sharing their story.</p>
            
            <div className="story-form">
              <label htmlFor="petPersonality">What's your pet's personality like?</label>
              <textarea 
                id="petPersonality" 
                value={petData.personality}
                onChange={(e) => handleInputChange("personality", e.target.value)}
                placeholder="Describe your pet's temperament, favorite activities, and unique traits..."
              ></textarea>
      
              <label htmlFor="dailyRoutine">What's their daily routine?</label>
              <textarea 
                id="dailyRoutine" 
                value={petData.dailyRoutine}
                onChange={(e) => handleInputChange("dailyRoutine", e.target.value)}
                placeholder="Share about their eating habits, exercise needs, sleeping schedule..."
              ></textarea>
      
              <label htmlFor="idealHome">What would be their ideal new home?</label>
              <textarea 
                id="idealHome" 
                value={petData.idealHome}
                onChange={(e) => handleInputChange("idealHome", e.target.value)}
                placeholder="Describe the perfect environment and family for your pet..."
              ></textarea>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="step-content">
            <h2>Upload Documents</h2>
            <p className="description">
              Upload any relevant documents for your pet (vaccination records, medical history, etc.).
              Accepted formats are (.pdf, .jpg, .png). Max size is 5MB per file.
            </p>
            <div className="document-grid">
              {[1, 2, 3, 4].map((num) => (
                <div className="document-box" key={num}>
                  <span>{num}. Document</span>
                  <div className="upload-area">
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      onChange={(e) => handleFileChange(e, "documents")}
                    />
                    <p>Click to upload or drag and drop</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 9:
        return (
          <div className="step-content">
            <h2>Confirmation</h2>
            <div className="confirmation-content">
              <div className="confirmation-icon">✓</div>
              <h3>Thank You for Choosing to Rehome Your Pet with Us!</h3>
              <p>We have received all your information successfully.</p>
              
              <div className="next-steps">
                <h4>What happens next?</h4>
                <ul>
                  <li>We will review your submission within 24-48 hours</li>
                  <li>You'll receive an email confirmation with your listing details</li>
                  <li>When potential adopters show interest, we'll notify you immediately</li>
                  <li>You can track the status of your listing in your dashboard</li>
                </ul>
              </div>
      
              <div className="contact-info">
                <p>If you have any questions, please contact us at:</p>
                <p>Email: support@paws4home.com</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </div>
          </div>
        );
      default:
        return <p>Content for Step {currentStep} is not available yet.</p>;
    }
  };

  return (
    <div className="choose-to-rehome">
      {/* Progress Bar */}
      <div className="progress-bar">
        <img
          src={require(`../../../public/assets/stepsRehome/step${currentStep}.png`)}
          alt={`Step ${currentStep}`}
          className="progress-image"
        />
      </div>

      {/* Form Content */}
      <div className="form-content">
        <h1>Step {currentStep} of 9</h1>
        <p>Fill in the details for your pet. These will help adopters learn more about them.</p>
        <div className="form-fields">{renderStepContent()}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="back-button"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === 9}
          className="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChooseToRehome;
