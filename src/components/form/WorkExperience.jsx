import React, { useContext } from "react";
import { ResumeContext } from "../layouts/resumeMaker";
import FormButton from "./FormButton";

const WorkExperience = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleWorkExperience = (e, index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index] = newWorkExperience[newWorkExperience.length - 1];
    newWorkExperience.pop();
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
      {resumeData.workExperience.map((workExperience, index) => (
        <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Company"
            name="company"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={workExperience.company}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={workExperience.position}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <div className="relative">
            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
              value={workExperience.description}
              maxLength={250}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {workExperience.description.length}/250
            </div>
          </div>
          <textarea
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-40"
            value={workExperience.keyAchievements}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <div className="flex flex-wrap gap-4">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workExperience.startYear}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workExperience.endYear}
              onChange={(e) => handleWorkExperience(e, index)}
            />
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />
    </div>
  );
};

export default WorkExperience;
