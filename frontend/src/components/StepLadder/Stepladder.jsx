import React from "react";
import "./StepLadder.css";

const StepLadder = ({ currentStep, steps }) => {
  // Get the current step image
  const progressBarImage = `/assets/steps/step${currentStep + 1}.png`;

  return (
    <div className="step-ladder">
      {/* Progress bar image */}
      <img
        src={progressBarImage}
        alt={`Step ${currentStep + 1} Progress`}
        className="progress-bar-image"
      />

      {/* Steps */}
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index <= currentStep ? "active" : ""}`}
        >
          <div className="step-icon">{step.icon}</div>
          <p>{step.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StepLadder;
