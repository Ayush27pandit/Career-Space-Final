import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './nav';

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  // Add a new question with default answers and correctAnswer as an empty string
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { 
        question: '', 
        answers: ['', '', '', ''], // Array of answer options
        correctAnswer: '', // Now stores the actual correct answer as a string
        points: 0,
        questionType: 'text', // Default question type as 'text'
      },
    ]);
  };

  // Handle input changes for question, correctAnswer, points, etc.
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  // Handle changes to the answers (previously options)
  const handleAnswerChange = (qIndex, aIndex, event) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex] = value; // Update the answers array
    setQuestions(newQuestions);
  };

  // Handle setting the correct answer (as a string from answers array)
  const handleCorrectAnswerChange = (qIndex, event) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value; // Store the actual correct answer string
    setQuestions(newQuestions);
  };

  // Submit the quiz
  const handleSubmit = async () => {
    const quizData = {
      title: quizTitle,
      questions,
    };
    try {
      await axios.post('http://localhost:3000/api/quiz', quizData);
      alert('Quiz saved successfully');
    } catch (err) {
      console.error('Error saving quiz:', err);
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Quiz</h1>
      <div className="mb-6">
        <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Quiz Title
        </label>
        <input
          id="quizTitle"
          type="text"
          placeholder="Enter quiz title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {questions.map((q, qIndex) => (
        <fieldset key={qIndex} className="mb-6 border border-gray-300 p-4 rounded-md">
          <legend className="text-lg font-semibold mb-4">Question {qIndex + 1}</legend>

          <div className="mb-4">
            <label htmlFor={`question-${qIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              id={`question-${qIndex}`}
              type="text"
              name="question"
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleInputChange(qIndex, e)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Answers (Max 4)</label>
            {q.answers.map((answer, aIndex) => (
              <div key={aIndex} className="mb-2">
                <input
                  type="text"
                  placeholder={`Answer ${aIndex + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e)} // Update answer value
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={aIndex >= 4}
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor={`correctAnswer-${qIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
              Correct Answer
            </label>
            <select
              id={`correctAnswer-${qIndex}`}
              name="correctAnswer"
              value={q.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(qIndex, e)} // Update correct answer as a string
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select the correct answer
              </option>
              {q.answers.map((answer, aIndex) => (
                <option key={aIndex} value={answer}>
                  {`Answer ${aIndex + 1}: ${answer}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor={`points-${qIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
              Points
            </label>
            <input
              id={`points-${qIndex}`}
              type="number"
              name="points"
              placeholder="Points"
              value={q.points}
              onChange={(e) => handleInputChange(qIndex, e)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </fieldset>
      ))}

      <button
        onClick={addQuestion}
        className="w-full py-2 mb-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Submit Quiz
      </button>
    </div>
    </>
  );
};

export default QuizCreator;
