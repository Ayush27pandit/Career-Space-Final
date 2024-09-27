import React, { useContext } from "react";
import { ResumeContext } from "../layouts/resumeMaker";
import FormButton from "./FormButton";

const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleSocialMedia = (e, index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index][e.target.name] = e.target.value.replace(
      "https://",
      ""
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  const removeSocialMedia = (index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index] = newSocialMedia[newSocialMedia.length - 1];
    newSocialMedia.pop();
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Social Media</h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <div key={index} className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Social Media"
            name="socialMedia"
            className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={socialMedia.socialMedia}
            onChange={(e) => handleSocialMedia(e, index)}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={socialMedia.link}
            onChange={(e) => handleSocialMedia(e, index)}
          />
        </div>
      ))}
      <FormButton
        size={resumeData.socialMedia.length}
        add={addSocialMedia}
        remove={removeSocialMedia}
      />
    </div>
  );
};

export default SocialMedia;
