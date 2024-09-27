import React, { useContext } from "react";
import { ResumeContext } from "../layouts/resumeMaker";
import FormButton from "./FormButton";

const Education = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleEducation = (e, index) => {
    const newEducation = [...resumeData.education];
    newEducation[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { school: "", degree: "", startYear: "", endYear: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = newEducation[newEducation.length - 1];
    newEducation.pop();
    setResumeData({ ...resumeData, education: newEducation });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Education</h2>
      {resumeData.education.map((education, index) => (
        <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="School"
            name="school"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={education.school}
            onChange={(e) => handleEducation(e, index)}
          />
          <input
            type="text"
            placeholder="Degree"
            name="degree"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={education.degree}
            onChange={(e) => handleEducation(e, index)}
          />
          <div className="flex flex-wrap gap-4">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={education.startYear}
              onChange={(e) => handleEducation(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={education.endYear}
              onChange={(e) => handleEducation(e, index)}
            />
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.education.length}
        add={addEducation}
        remove={removeEducation}
      />
    </div>
  );
};

export default Education;
