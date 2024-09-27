import React, { useState } from 'react';
import axios from 'axios';
import { Alert, AlertDescription } from '@/components/ui/alert';

const UserDetailsForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

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
    } catch (error) {
      console.error('Error saving user details:', error);
      setError("An error occurred while saving user details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Alert>
        <AlertDescription>User details submitted successfully!</AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={userDetails.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={userDetails.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" name="phone" value={userDetails.phone} onChange={handleChange} required />
      </div>
      <div>
        <label>Skills:</label>
        <input type="text" name="skills" value={userDetails.skills} onChange={handleChange} />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default UserDetailsForm;