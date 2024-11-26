import React, { useState } from "react";
import "./ChooseToAdopt.css";
import FormStep1 from "../../components/FormSteps/FormStep1";
import FormStep3 from "../../components/FormSteps/FormStep3";
import FormStep2 from "../../components/FormSteps/FormStep2";
import FormStep4 from "../../components/FormSteps/FormStep4";
import FormStep5 from "../../components/FormSteps/FormStep5";
import FormStep6 from "../../components/FormSteps/FormStep6";

const ChooseToAdopt = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 7;
  const progressBarImage = `/assets/steps/step${currentStep + 1}.png`;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Render form content based on the step
  const renderFormContent = () => {
    switch (currentStep) {
      case 0:
        return <FormStep1 />;
      case 1:
        return <FormStep2 />;
      case 2:
        return <FormStep3 />;
      case 3:
        return <FormStep4 />;
      case 4:
        return <FormStep5 />;
      case 5:
        return <FormStep6 />;
      default:
        return <h2>Other content for step {currentStep + 1}</h2>;
    }
  };

  return (
    <div className="choose-to-adopt">
      {/* Progress Bar */}
      <div className="progress-bar">
        <img
          src={progressBarImage}
          alt={`Step ${currentStep + 1}`}
          className="progress-bar-image"
        />
      </div>

      {/* Dynamic Form Content */}
      <div className="form-content">{renderFormContent()}</div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={handleBack} disabled={currentStep === 0}>
          Back
        </button>
        <button onClick={handleNext} disabled={currentStep === totalSteps - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ChooseToAdopt;
