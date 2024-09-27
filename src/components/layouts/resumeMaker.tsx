import React, { useState, createContext } from "react";
import Language from "../form/Language";
import FormCP from "../form/FormCP";
import LoadUnload from "../form/LoadUnload";
import Preview from "../preview/Preview";
import DefaultResumeData from "../utility/DefaultResumeData";
import SocialMedia from "../form/SocialMedia";
import WorkExperience from "../form/WorkExperience";
import Skill from "../form/Skill";
import PersonalInformation from "../form/PersonalInformation";
import Summary from "../form/Summary";
import Projects from "../form/Projects";
import Education from "../form/Education";
import Certification from "../form/certification";
import "../../styles.css";

const ResumeContext = createContext(DefaultResumeData);

export default function Builder(props) {
  // resume data
  const [resumeData, setResumeData] = useState(DefaultResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    console.log(resumeData);
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row justify-evenly max-w-7xl mx-auto h-screen">
          {!formClose && (
            <form className="p-4 bg-zinc-300 md:max-w-[40%] md:h-full overflow-y-scroll">
              <LoadUnload />
              <PersonalInformation />
              <SocialMedia />
              <Summary />
              <Education />
              <WorkExperience />
              <Projects />
              {resumeData.skills.map((skill, index) => (
                <Skill title={skill.title} key={index} />
              ))}
              <Language />
              <Certification />
            </form>
          )}
          <div className="flex-1 p-4 bg-white overflow-y-auto">
            <Preview />
          </div>
        </div>
        <FormCP formClose={formClose} setFormClose={setFormClose} />
      </ResumeContext.Provider>
    </>
  );
}
export { ResumeContext };
