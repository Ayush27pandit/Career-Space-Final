import React, { useContext } from "react";
import { ResumeContext } from "../layouts/resumeMaker";
import FormButton from "./FormButton";

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          name: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeProjects = (index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = newProjects[newProjects.length - 1];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Project Name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={project.name}
            onChange={(e) => handleProjects(e, index)}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={project.link}
            onChange={(e) => handleProjects(e, index)}
          />
          <div className="relative">
            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
              value={project.description}
              maxLength={250}
              onChange={(e) => handleProjects(e, index)}
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {project.description.length}/250
            </div>
          </div>
          <textarea
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-40"
            value={project.keyAchievements}
            onChange={(e) => handleProjects(e, index)}
          />
          <div className="flex flex-wrap gap-4">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={project.startYear}
              onChange={(e) => handleProjects(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={project.endYear}
              onChange={(e) => handleProjects(e, index)}
            />
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.projects.length}
        add={addProjects}
        remove={removeProjects}
      />
    </div>
  );
};

export default Projects;
