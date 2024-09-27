import React, { useState } from 'react';
import axios from 'axios';

const SkillGapIdentifier = () => {
  const [skills, setSkills] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleSubmit = async () => {
    console.log("hit")
    const prompt = `Given the following skills: "${skills}", identify the skill gaps and suggest what to learn next.`;
    try {
      const response = await axios.post('http://localhost:3000/api/ai/skill', { prompt });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error identifying skill gaps:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Skill Gap Identifier</h2>
      <textarea
        className="border p-2 w-full"
        placeholder="Enter your current skills, separated by commas"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button className="bg-blue-500 text-white mt-4 p-2 rounded" onClick={handleSubmit}>
        Identify Skill Gaps
      </button>
      {suggestions && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold">Suggestions for Improvement:</h3>
          <p>{suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default SkillGapIdentifier;
