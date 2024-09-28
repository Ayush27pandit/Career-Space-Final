import React, { useContext } from "react";
import { ResumeContext } from "../layouts/resumeMaker";

const Certification = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const skillType = "certifications";
  const title = "Certifications";

  const handleCertification = (e, index) => {
    const newCertifications = [...resumeData[skillType]];
    newCertifications[index] = e.target.value;
    setResumeData({ ...resumeData, [skillType]: newCertifications });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      [skillType]: [...resumeData[skillType], ""],
    });
  };

  const removeCertification = (index) => {
    const newCertifications = [...resumeData[skillType]];
    newCertifications.splice(index, 1);
    setResumeData({ ...resumeData, [skillType]: newCertifications });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <div className="space-y-2">
        {resumeData[skillType].map((certification, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter certification"
              name={title}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={certification}
              onChange={(e) => handleCertification(e, index)}
            />
            <button
              onClick={() => removeCertification(index)}
              className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Remove certification"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addCertification}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Add Certification
      </button>
    </div>
  );
};

export default Certification;
