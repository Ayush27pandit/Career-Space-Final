import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Header } from "./Header";
import Navbar from "./nav";
import { Link } from "react-router-dom";

interface FormData {
  jobTitle: string;
  companyName: string;
  skills: string;
  type: string;
  location: string;
  description: string;
}

function JobPostForm() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    companyName: "",
    skills: "",
    type: "",
    location: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        setFormData({
          jobTitle: "",
          companyName: "",
          skills: "",
          type: "",
          location: "",
          description: "",
        }); // Reset form
      } else {
        alert("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
    <Navbar />
    <Link  className="" to={"/jobApplicants"}>
      <Button variant={'default'}>
        See your jobs
      </Button>
    </Link>
    <div className="md:p-5 bg-black h-[100vh] w-[100vw] text-white flex items-center justify-center md:justify-between">
      <div className="text-white">
        <img src="public/images/9464331_4180157.jpg" className="rounded-lg h-[40rem] hidden md:block"/>
      </div>
      <div className="md:m-5">
      <h1 className="font-Roboto font-semibold py-4 text-5xl md:w-[50vw]">Job Submission Form</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="jobTitle">Job Title:</label>
          <Input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="text-black bg-white md:w-[50vw]"
          />
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <Input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="text-black bg-white md:w-[50vw]"
          />
        </div>
        <div>
          <label htmlFor="skills">Skills (comma-separated):</label>
          <Input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className="text-black bg-white md:w-[50vw]"
          />
        </div>
        <div>
          <label htmlFor="type">Job Type (e.g., Full-time, Internship):</label>
          <Input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="text-black bg-white md:w-[50vw]"
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="text-black bg-white md:w-[50vw]"
          />
        </div>
        <div>
          <label htmlFor="description">Job Description:</label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="text-black bg-white md:w-[50vw]"
          />
        </div>
        <Button
          className="bg-blue-400 rounded-lg h-[20px] text-xl m-1 p-4 text-center"
          type="submit"
        >
          Submit
        </Button>
      </form>
      </div>
    </div>
    </>
  );
}

export default JobPostForm;