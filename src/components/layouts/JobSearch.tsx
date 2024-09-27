// frontend/components/JobList.js
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FilterComponent } from 'react-data-table-component-extensions';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

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
