import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactFlow, { MiniMap, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const SkillGapIdentifier = () => {
  const [goal, setGoal] = useState(''); // For the user's goal
  const [requiredSkills, setRequiredSkills] = useState(''); // For the skills needed for the goal
  const [currentSkills, setCurrentSkills] = useState(''); // For the user's current skills
  const [skillTree, setSkillTree] = useState({ nodes: [], edges: [] }); // For skill nodes and edges
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async () => {
    const prompt = `
      I want to achieve the goal: "${goal}".
      The required skills for this goal are: "${requiredSkills}".
      My current skills are: "${currentSkills}".
      Please generate a detailed skill roadmap going very deep where each skill is represented as a node and connections between them indicate learning dependencies. Return the result as a structured JSON with 'nodes' and 'edges'.
    `;
  
    setLoading(true); // Set loading to true when submitting
  
    try {
      const response = await axios.post('http://localhost:3000/api/ai/skill', { prompt });
      
      // Extract the skill tree string
      const skillTreeString = response.data.skillTree.candidates[0].content.parts[0].text;
  
      // Clean up the string by removing markdown formatting
      const jsonStartIndex = skillTreeString.indexOf('{'); // Find the first '{'
      const jsonEndIndex = skillTreeString.lastIndexOf('}'); // Find the last '}'
      
      const jsonString = skillTreeString.substring(jsonStartIndex, jsonEndIndex + 1); // Extract the JSON part
  
      // Parse the cleaned JSON string
      const skillTree = JSON.parse(jsonString);
  
      console.log(skillTree)
      // Add default position and data property to each node
      const updatedNodes = skillTree.nodes.map((node, index) => ({
        id: node.id, // Ensure id is included
        data: { label: node.label }, // Add a data property with the label
        position: { x: Math.random() * 400, y: index * 100 }, // Random x position, incremental y position
      }));
  
      // Set the updated skill tree state
      setSkillTree({ nodes: updatedNodes, edges: skillTree.edges });
      toast.success('Skill tree successfully generated!'); // Success notification
    } catch (error) {
      toast.error('Error generating skill tree. Please try again.'); // Error notification
      console.error('Error generating skill tree:', error);
    } finally {
      setLoading(false); // Set loading back to false after the request completes
    }
  };
  
  return (
    <div className="flex p-4 bg-white shadow-md rounded-md h-screen"> {/* Flex container for horizontal layout */}
      <div className="flex flex-col w-1/3 p-4"> {/* Left side for forms */}
        <ToastContainer /> {/* Toast container for notifications */}
        <h2 className="text-xl font-bold mb-4">Skill Gap Identifier</h2>

        {/* Input for Goal */}
        <label className="block mb-2 font-semibold">Your Goal</label>
        <textarea
          className="border p-2 mb-4"
          placeholder="Enter your goal (e.g., Become a full-stack web developer)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        {/* Input for Required Skills */}
        <label className="block mb-2 font-semibold">Skills Needed for This Goal</label>
        <textarea
          className="border p-2 mb-4"
          placeholder="Enter the required skills, separated by commas (e.g., React, Node.js, SQL)"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
        />

        {/* Input for Current Skills */}
        <label className="block mb-2 font-semibold">Your Current Skills</label>
        <textarea
          className="border p-2 mb-4"
          placeholder="Enter your current skills, separated by commas (e.g., HTML, CSS, JavaScript)"
          value={currentSkills}
          onChange={(e) => setCurrentSkills(e.target.value)}
        />

        {/* Submit Button */}
        <button 
          className="bg-blue-500 text-white mt-4 p-2 rounded flex items-center justify-center" 
          onClick={handleSubmit}
          disabled={loading || !goal || !requiredSkills || !currentSkills} // Disable button if loading or fields are empty
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
          ) : (
            'Identify Skill Gaps'
          )}
        </button>
      </div>

      {/* Display Skill Tree using React Flow */}
      {skillTree.nodes.length > 0 && (
        <div className="flex-grow mt-8 p-4 bg-gray-100 rounded-md"> {/* Right side for the skill tree */}
          <h3 className="font-bold mb-4">Skill Tree Visualization</h3>
          <div style={{ height: '500px' }}>
            <ReactFlow
              nodes={skillTree.nodes}
              edges={skillTree.edges}
              fitView
              style={{ background: '#F8F8F8' }}
            >
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapIdentifier;
