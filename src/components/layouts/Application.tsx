import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button'; // Assuming you have a Button component from shadcn
import Navbar from './nav';

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
      <Navbar />
      <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">My Posted Jobs</h1>
          {jobs.length === 0 ? (
            <p className="text-center text-gray-400">No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.jobId} className="mb-8 p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-white">{job.jobTitle}</h2>
                  <Button onClick={() => navigate(`/job-details/${job.jobId}`)} className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded-md transition-all">View Details</Button>
                </div>
                <p className="text-gray-300"><strong>Company:</strong> {job.companyName}</p>
                <p className="text-gray-300"><strong>Location:</strong> {job.location}</p>
                <p className="text-gray-300"><strong>Type:</strong> {job.type}</p>
                <p className="text-gray-400 mt-3">{job.description}</p>

                <h3 className="mt-6 text-lg font-semibold text-gray-200">Applications:</h3>
                {job.applications.length > 0 ? (
                  <ul className="space-y-4 mt-4">
                    {job.applications.map((app) => (
                      <li key={app.email} className="p-4 bg-gray-600 rounded-lg shadow-md hover:bg-gray-500 transition-all">
                        <p className="text-gray-100"><strong>Name:</strong> {app.name}</p>
                        <p className="text-gray-100"><strong>Email:</strong> {app.email}</p>
                        <p className="text-gray-100"><strong>Phone:</strong> {app.phone}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 mt-2">No applications yet.</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyPostedJobs;
