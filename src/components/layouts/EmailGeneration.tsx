import React, { useState } from 'react';
import axios from 'axios';

const EmailContentGenerator = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [emailContent, setEmailContent] = useState('');

  const handleSubmit = async () => {
    const prompt = `Generate a professional email tailored to the following job description: "${jobDescription}"`;
    try {
      const response = await axios.post('/api/ai', { prompt });
      setEmailContent(response.data.content);
    } catch (error) {
      console.error('Error generating email content:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Email Content Generator</h2>
      <textarea
        className="border p-2 w-full"
        placeholder="Paste the job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button className="bg-blue-500 text-white mt-4 p-2 rounded" onClick={handleSubmit}>
        Generate Email Content
      </button>
      {emailContent && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold">Generated Email:</h3>
          <p>{emailContent}</p>
        </div>
      )}
    </div>
  );
};

export default EmailContentGenerator;
