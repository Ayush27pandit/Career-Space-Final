import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../ui/button';

const EmailContentGenerator = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const prompt = `Generate a professional email tailored to the following job description: "${jobDescription}"`;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/ai/email', { prompt });
      // Clean the email content by removing asterisks and trimming spaces
      const cleanContent = response.data.content.replace(/\*\*/g, '').trim();
      setEmailContent(cleanContent);
      toast.success('Email content successfully generated!');
    } catch (err) {
      toast.error('Error generating email content. Please try again.');
      console.error('Error generating email content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (emailContent) {
      navigator.clipboard.writeText(emailContent)
        .then(() => {
          toast.success('Email content copied to clipboard.');
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
          toast.error('Failed to copy email content.');
        });
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Email Content Generator</h2>
      <textarea
        className="border p-2 w-full"
        placeholder="Paste the job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <Button
        className="bg-blue-500 text-white mt-4 p-2 rounded flex items-center justify-center"
        onClick={handleSubmit}
        disabled={loading || !jobDescription}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
        ) : (
          'Generate Email Content'
        )}
      </Button>
      {emailContent && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <Button
            className="bg-green-500 text-white mb-2 p-2 rounded"
            onClick={handleCopy}
          >
            Copy to Clipboard
          </Button>
          <h3 className="font-bold">Generated Email:</h3>
          <div className="mt-2">
            {/* Bold the subject */}
            <div className="font-semibold">
              <strong>Subject:</strong> React Internship Application - [Your Name]
            </div>
            <div className="mt-2">Dear [Hiring Manager Name],</div>
            <div className="mt-2 whitespace-pre-line">{emailContent}</div>
            <div className="mt-4">Sincerely,</div>
            <div className="font-semibold">[Your Name]</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailContentGenerator;
