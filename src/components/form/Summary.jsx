import React, { useContext } from "react";
import { ResumeContext } from "../layouts/resumeMaker";

const Summary = () => {
  const { resumeData, handleChange } = useContext(ResumeContext);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
      <div className="w-full">
        <textarea
          placeholder="Enter your professional summary here..."
          name="summary"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-40"
          value={resumeData.summary}
          onChange={handleChange}
          maxLength={500}
        />
      </div>
      <p className="text-sm text-gray-500 text-right">
        {resumeData.summary.length}/500 characters
      </p>
    </div>
  );
};

export default Summary;
