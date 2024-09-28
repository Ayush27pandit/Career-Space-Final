import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header'; // Assuming you have a Header component
import { Button } from '../ui/button'; // Assuming you have a Button component

interface Application {
  jobId: string;
  name: string;
  email: string;
  phone: string;
}

interface Job {
  jobId: string; // Job ID from localStorage
  jobTitle: string;
  companyName: string;
  location: string;
  type: string;
  description: string;
  applications: Application[];
}

function MyPostedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsWithApplications = async () => {
      // Get the jobs posted by the user from localStorage
      const userPostedJobs = JSON.parse(localStorage.getItem('jobDetails') || '[]');

      // Ensure we have jobs to display
      if (userPostedJobs.length === 0) {
        alert("No jobs found for this user.");
        return;
      }

      try {
        // Fetch all jobs with their applications from the backend
        const jobIds = userPostedJobs.map((job: Job) => job.jobId); // Get all job IDs

        const response = await fetch(`http://localhost:3000/myjobs`, {
          method: "POST", // Use POST since we're sending data
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobIds }), // Send jobIds to the backend
        });

        if (response.ok) {
          const jobsWithApplications = await response.json();
          setJobs(jobsWithApplications);
        } else {
          console.error("Failed to fetch job applications.");
        }
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobsWithApplications();
  }, []);

  return (
    <>
      <Header />
      <div className="p-5 bg-black h-[100vh] w-[100vw] text-white">
        <h1 className="text-3xl font-bold mb-5">My Posted Jobs</h1>
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.jobId} className="mb-10">
              <h2 className="text-2xl mb-3">{job.jobTitle}</h2>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Description:</strong> {job.description}</p>

              <h3 className="mt-5 text-xl">Applications:</h3>
              {job.applications.length > 0 ? (
                <ul>
                  {job.applications.map((app) => (
                    <li key={app.email} className="bg-gray-800 p-3 rounded-lg my-2">
                      <p><strong>Name:</strong> {app.name}</p>
                      <p><strong>Email:</strong> {app.email}</p>
                      <p><strong>Phone:</strong> {app.phone}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No applications yet.</p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyPostedJobs;
