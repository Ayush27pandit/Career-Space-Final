import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const JobSeekerDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the user's email from localStorage
  const userEmail = localStorage.getItem('userEmail');

  // Fetch jobs the user has applied to
  const fetchAppliedJobs = async () => {
    if (!userEmail) {
      setError('User email not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/appliedJobs?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setAppliedJobs(data); // Set the jobs the user applied to
      } else {
        setError('Failed to fetch applied jobs.');
      }
    } catch (error) {
      setError('An error occurred while fetching applied jobs.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch applied jobs when the component loads
  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  // Define columns for react-data-table-component
  const columns = [
    {
      name: 'Job Title',
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: 'Company Name',
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: 'Location',
      selector: (row) => row.location,
    },
    {
      name: 'Type',
      selector: (row) => row.type,
    },
    {
      name: 'Date Applied',
      selector: (row) => row.appliedDate || 'N/A', // If you are storing the date of application
    },
  ];

  return (
    <div>
      <h1>Job Seeker Dashboard</h1>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : appliedJobs.length > 0 ? (
        <DataTable
          title="Jobs You Have Applied To"
          columns={columns}
          data={appliedJobs}
          pagination
        />
      ) : (
        <p>You have not applied to any jobs yet.</p>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
