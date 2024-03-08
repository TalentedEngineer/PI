import React from "react";

const GigStepForm = ({
  icon,
  step,
  title,
  disabled,
  currentStep,
  completedStep,
}) => {
  return (
    <div className="vert-line text-center px-4 relative">
      <div className="flex items-center gap-3">
        <button
          className={`p-2.5 rounded-full ${
            completedStep && "text-nft-primary-light bg-purple-200"
          }
              ${
                currentStep &&
                "text-white bg-nft-primary-light shadow-purple-300 shadow-md"
              } ${disabled ? "text-gray-400 bg-gray-50" : ""}`}
        >
          {icon}
        </button>

        <div
          className={`flex-col justify-start text-left ${
            disabled ? "hidden" : "flex"
          }`}
        >
          <span className="text-xs text-nft-primary-light font-medium">
            Step {step}/6
          </span>
          <span className="text-sm font-semibold text-gray-800">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default GigStepForm;
