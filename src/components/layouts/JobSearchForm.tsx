import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from './nav';

const UserDetailsForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    jobPreference: '', // New field for job preference
    jobType: '', // New field to specify job posting type
    collegeName: '', // New field for college name
    companyName: '', // New field for company name
    location: '', // New field for company location
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Fetch user details from localStorage if available
  useEffect(() => {
    const savedDetails = localStorage.getItem('userDetails');
    if (savedDetails) {
      setUserDetails(JSON.parse(savedDetails));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/api/users', userDetails);
      console.log('User details saved:', response.data);
      setIsSubmitted(true);

      // Save details to localStorage
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    } catch (error) {
      console.error('Error saving user details:', error);
      setError("An error occurred while saving user details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Alert className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
        <AlertDescription>User details submitted successfully!</AlertDescription>
      </Alert>
    );
  }

  return (
   <>
   <Navbar />
   <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone:
        </label>
        <input
          type="tel"
          name="phone"
          value={userDetails.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Job Preference */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobPreference">
          Are you looking for jobs or do you want to post jobs?
        </label>
        <select
          name="jobPreference"
          value={userDetails.jobPreference}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select...</option>
          <option value="looking">Looking for jobs</option>
          <option value="posting">Posting jobs</option>
        </select>
      </div>

      {/* Conditional fields based on job preference */}
      {userDetails.jobPreference === 'posting' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">
              Do you want to submit your job to a particular college or to everyone?
            </label>
            <select
              name="jobType"
              value={userDetails.jobType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select...</option>
              <option value="college">Particular College</option>
              <option value="everyone">Everyone</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collegeName">
              College Name (if applicable):
            </label>
            <input
              type="text"
              name="collegeName"
              value={userDetails.collegeName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              Company Name:
            </label>
            <input
              type="text"
              name="companyName"
              value={userDetails.companyName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location of the Company:
            </label>
            <input
              type="text"
              name="location"
              value={userDetails.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      {userDetails.jobPreference === 'looking' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
            Skills:
          </label>
          <input
            type="text"
            name="skills"
            value={userDetails.skills}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4 p-4 bg-red-100 text-red-800 rounded-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>

   </>  
  );
};

export default UserDetailsForm;
