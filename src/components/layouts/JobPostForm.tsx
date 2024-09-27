import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  jobTitle: string;
  companyName: string;
  skills: string;
}

function JobPostForm() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    companyName: "",
    skills: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/jobpostform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({ jobTitle: "", companyName: "", skills: "" }); // Reset form
      } else {
        alert("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Job Submission Form</h1>
      <form className=" space-y-4 " onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className=" text-black"
          />
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className=" text-black"
          />
        </div>
        <div>
          <label htmlFor="skills">Skills (comma-separated):</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className=" text-black"
          />
        </div>
        <button
          className="bg-blue-400 rounded-lg text-2xl m-1 p-1"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default JobPostForm;