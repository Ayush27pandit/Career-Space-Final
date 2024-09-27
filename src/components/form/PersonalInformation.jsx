import React, { useContext } from "react";
import { ResumeContext } from "../layouts/resumeMaker";
import "../../styles.css";
const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Personal Information</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg font-bold  text-black">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            name="name"
            value={resumeData.name}
            onChange={handleChange}
            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="position"
            className="block text-lg font-bold  text-black"
          >
            Job Title
          </label>
          <input
            id="position"
            type="text"
            placeholder="Job Title"
            name="position"
            value={resumeData.position}
            onChange={handleChange}
            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contactInformation"
            className="block text-lg font-bold  text-black"
          >
            Contact Information
          </label>
          <input
            id="contactInformation"
            type="text"
            placeholder="Contact Information"
            name="contactInformation"
            value={resumeData.contactInformation}
            onChange={handleChange}
            minLength={10}
            maxLength={15}
            className="mt-1  p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-lg font-bold  text-black"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={resumeData.email}
            onChange={handleChange}
            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="address"
            className="block text-lg font-bold  text-black"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            name="address"
            value={resumeData.address}
            onChange={handleChange}
            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="profileImage"
            className="block text-lg font-bold  text-black"
          >
            Profile Picture
          </label>
          <input
            id="profileImage"
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleProfilePicture}
            className="mt-1 p-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
