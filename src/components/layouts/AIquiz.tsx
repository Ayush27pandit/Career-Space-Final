import React, { useState } from 'react';
import axios from 'axios';
import Quiz from 'react-quiz-component';
import { Input } from '../ui/input';
import Navbar from './nav';

const AIQuizComponent = () => {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState('');
  const [quizResult, setQuizResult] = useState(null); // New state for quiz results

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setQuizResult(null); // Reset quiz results when a new quiz is generated

    try {
      const prompt = `Create a quiz with the following parameters: 
            Topic: "${topic}", 
            Number of Questions: ${numQuestions}, 
            Difficulty: "${difficulty}". 
            Please provide the quiz in the following JSON format:
            {
              "quizTitle": "Quiz Title",
              "nrOfQuestions": "number",
              "questions": [
                {
                  "question": "Question text",
                  "questionType": "text", // or "boolean" if needed
                  "answers": [ 
                  "answer 1",
                  "answer 2",
                  "answer 3",
                  "answer 4",
                  ],
                  "correctAnswer": "number"//from 1-4
                }
              ]
            }`;

      const response = await axios.post('http://localhost:3000/api/ai/quiz', { prompt });
      console.log('API Response:', response.data); // Log the response

      const quizStructure = {
        quizTitle: response.data.quiz.quizTitle,
        quizSynopsis: "Generated quiz on " + topic,
        progressBarColor: "#9de1f6",
        nrOfQuestions: response.data.quiz.nrOfQuestions.toString(),
        questions: response.data.quiz.questions.map((q) => ({
          question: q.question,
          questionType: q.questionType,
          answerSelectionType: "single",
          answers: q.answers, // The array of answers
          correctAnswer: q.correctAnswer.toString(), // Convert index to string
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          explanation: "Generated explanation for the correct answer.",
          point: "10"
        }))
      };

      setQuizData(quizStructure); // Set the properly structured quiz data
    } catch (error) {
      setError('Error generating quiz, please try again.');
      console.error('Error generating quiz:', error);
    }
  };

  const handleQuizCompletion = (result) => {
    console.log('Quiz result:', result);
    setQuizResult(result); // Set the quiz results state
  };

  return (
    <>
    <Navbar />
      <div className='h-[100vh] w-full flex items-center justify-center bg-gray-100'>

<div className="p-6 shadow-lg rounded-lg max-w-md mx-auto bg-white">
  <h2 className="text-5xl font-bold mb-6 text-center text-black">AI Quiz Generator</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <Input
      className="border font-bold text-lg text-black border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      placeholder="Enter quiz topic"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
    />
    <Input
      className="border text-black border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="number"
      placeholder="Number of questions (1-5)"
      value={numQuestions}
      onChange={(e) => setNumQuestions(Math.max(1, Math.min(5, e.target.value)))}
      min="1"
      max="5"
    />
    <select
      className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
      Generate Quiz
    </button>
  </form>

  {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

  {quizData && (
    <div className="mt-6 h-[22rem] w-full max-w-md overflow-y-auto font-bold text-black">
      <h3 className="font-bold text-lg text-black-800">Generated Quiz:</h3>
      <Quiz
        quiz={{
          ...quizData,
          questions: quizData.questions.map((q) => ({
            ...q,
            render: (props) => (
              <div key={q.question} className="mb-4">
                <h4 className="text-lg">{q.question}</h4>
                <div className="mt-2 space-y-2">
                  {q.answers.map((answer, index) => (
                    <button
                      key={index}
                      className="w-full bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition duration-200"
                      onClick={() => props.onAnswerSelected(index + 1)}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            )
          }))
        }}
        onComplete={handleQuizCompletion} // Handle quiz completion
      />
    </div>
  )}

  {/* Results Box */}
  {quizResult && (
    <div className="mt-6 p-4 border rounded-md border-gray-300 bg-gray-50">
      <h3 className="font-bold text-lg">Quiz Results:</h3>
      <p>Total Questions: {quizResult.numberOfQuestions}</p>
      <p>Correct Answers: {quizResult.numberOfCorrectAnswers}</p>
      <p>Your Score: {quizResult.correctPoints} / {quizResult.numberOfQuestions * 10}</p>
      {/* Add more result details if necessary */}
    </div>
  )}
</div>
</div>    
    </>
  );
};

export default AIQuizComponent;

// import React, { useState } from 'react';
// import axios from 'axios';
// import  Quiz  from 'react-quiz-component';
// import Navbar from './nav';

// const AIQuizComponent = () => {
//   const [topic, setTopic] = useState('');
//   const [numQuestions, setNumQuestions] = useState(5);
//   const [difficulty, setDifficulty] = useState('medium');
//   const [quizData, setQuizData] = useState(null);
//   const [error, setError] = useState('');
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors
//     try {
//         const prompt = `Create a quiz with the following parameters: 
//             Topic: "${topic}", 
//             Number of Questions: ${numQuestions}, 
//             Difficulty: "${difficulty}". 
//             Please provide the quiz in the following JSON format:
//             {
//               "quizTitle": "Quiz Title",
//               "nrOfQuestions": "number",
//               "questions": [
//                 {
//                   "question": "Question text",
//                   "questionType": "text", // or "boolean" if needed
//                   "answers": [ 
//                   "answer 1",
//                   "answer 2",
//                   "answer 3",
//                   "answer 4",
//                   ],
//                   "correctAnswer": "number"//from 1-4
//                 }
//               ]
//             }`;
        
//         const response = await axios.post('http://localhost:3000/api/ai/quiz', { prompt });
//         console.log('API Response:', response.data); // Log the response

//         // Transform the response data to match react-quiz-component structure
//         const quizStructure = {
//             quizTitle: response.data.quiz.quizTitle,
//             quizSynopsis: "Generated quiz on " + topic,
//             progressBarColor: "#9de1f6",
//             nrOfQuestions: response.data.quiz.nrOfQuestions.toString(),
//             questions: response.data.quiz.questions.map((q) => ({
//                 question: q.question,
//                 questionType: q.questionType,
//                 answerSelectionType: "single",
//                 answers: q.answers,  // The array of answers
//                 correctAnswer: q.correctAnswer.toString(),  // Convert index to string
//                 messageForCorrectAnswer: "Correct answer. Good job.",
//                 messageForIncorrectAnswer: "Incorrect answer. Please try again.",
//                 explanation: "Generated explanation for the correct answer.",
//                 point: "10"
//             }))
//         };

//         setQuizData(quizStructure); // Set the properly structured quiz data
//     } catch (error) {
//         setError('Error generating quiz, please try again.');
//         console.error('Error generating quiz:', error);
//     }
// };



//   return (
//     <>
//       <Navbar />
//       <div className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4">AI Quiz Generator</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           className="border p-2 w-full mb-2"
//           type="text"
//           placeholder="Enter quiz topic"
//           value={topic}
//           onChange={(e) => setTopic(e.target.value)}
//         />
//         <input
//           className="border p-2 w-full mb-2"
//           type="number"
//           placeholder="Number of questions (1-5)"
//           value={numQuestions}
//           onChange={(e) => setNumQuestions(Math.max(1, Math.min(5, e.target.value)))}
//           min="1"
//           max="5"
//         />
//         <select
//           className="border p-2 w-full mb-2"
//           value={difficulty}
//           onChange={(e) => setDifficulty(e.target.value)}
//         >
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </select>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Generate Quiz
//         </button>
//       </form>

//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       {quizData && (
//         <div className="mt-4">
//           <h3 className="font-bold">Generated Quiz:</h3>
//           <Quiz
//             quiz={quizData}
//             onComplete={(result) => {
//               console.log('Quiz result:', result);
//             }}
//           />
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default AIQuizComponent;
