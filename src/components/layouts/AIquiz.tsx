import React, { useState } from 'react';
import axios from 'axios';

const AIQuizGenerator = () => {
  const [quizTopic, setQuizTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const handleSubmit = async () => {
    const prompt = `Generate a ${difficulty} level quiz on the topic "${quizTopic}" with ${numQuestions} questions.`;
    try {
      const response = await axios.post('/api/ai', { prompt });
      setGeneratedQuiz(response.data.quiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">AI Quiz Generator</h2>
      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder="Enter quiz topic"
        value={quizTopic}
        onChange={(e) => setQuizTopic(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        type="number"
        placeholder="Number of questions"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
        min="1"
        max="20"
      />
      <select
        className="border p-2 w-full mb-2"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
        Generate Quiz
      </button>

      {generatedQuiz && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold">Generated Quiz:</h3>
          {generatedQuiz.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{`Q${index + 1}: ${question.question}`}</p>
              <ul>
                {question.answers.map((answer, i) => (
                  <li key={i}>{answer}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIQuizGenerator;
