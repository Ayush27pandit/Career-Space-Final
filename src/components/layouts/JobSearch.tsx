import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Alert, AlertDescription } from '@/components/ui/alert';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [applySuccess, setApplySuccess] = useState(null); // For showing success alert
  const [applyError, setApplyError] = useState(null); // For showing error alert

  // Fetch the data from the backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/data'); // Update the URL if needed
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data); // Initialize filtered jobs with all jobs
    } catch (error) {
      console.error("Error fetching the jobs:", error);
    }
    setLoading(false);
  };

  // Handle search/filter logic
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const filteredData = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(e.target.value.toLowerCase()) ||
        job.companyName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredJobs(filteredData);
  };

  // Handle "Apply" button click
  const handleApply = (jobId) => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      setApplyError("Please submit your user details before applying for a job.");
      setApplySuccess(null); // Clear success message if exists
    } else {
      setApplySuccess(`You have successfully applied for the job with ID: ${jobId}`);
      setApplyError(null); // Clear error message if exists
      console.log(`Apply button clicked for job with ID: ${jobId}`);
    }
  };

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
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Skills',
      selector: (row) => row.skills.join(', '),
    },
    {
      name: 'Apply', // Custom column for Apply button
      cell: (row) => (
        <button 
          onClick={() => handleApply(row.id)} 
          style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Apply
        </button>
      ),
    },
  ];

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by job title or company name"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />
      {/* Button to fetch data */}
      <button onClick={fetchJobs} disabled={loading} style={{ marginBottom: '20px' }}>
        {loading ? 'Loading...' : 'Fetch Jobs'}
      </button>

      {/* Alerts for apply success or error */}
      {applySuccess && (
        <Alert className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          <AlertDescription>{applySuccess}</AlertDescription>
        </Alert>
      )}
      {applyError && (
        <Alert variant="destructive" className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
          <AlertDescription>{applyError}</AlertDescription>
        </Alert>
      )}

      {/* DataTable to display jobs */}
      <DataTable
        columns={columns}
        data={filteredJobs}
        pagination
        highlightOnHover
        striped
        progressPending={loading}
      />
    </div>
  );
};

export default JobList;
