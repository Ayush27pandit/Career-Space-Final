import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  Quiz  from 'react-quiz-component';

const QuizTaker = () => {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get('http://localhost:3000/api/quiz');
      setQuiz(response.data);
    };
    fetchQuiz();
  }, []);

  return (
    <div>
      <h1>Take Quiz</h1>
      {quiz ? (
        <Quiz quiz={quiz} shuffle={true} />
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizTaker;
