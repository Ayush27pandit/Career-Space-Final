const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const port = 3000;
const cors = require('cors');
const { listModels, queryOllama } = require('./ollama'); // Import Ollama functions
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const dummyData = require('./dummydata')

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send('<p>some html</p>');
});

// API endpoint to send dummy data
app.get('/api/data', (req, res) => {
  try {
    console.log("hit")
    res.json(dummyData);
  } catch (error) {
    console.log(error)
  }
  }); 

app.post("/jobpostform", (req, res) => {
  const { jobTitle, companyName, skills } = req.body;

  const newUserData = {
    jobTitle,
    companyName,
    skills: skills.split(",").map((skill) => skill.trim()),
    location,
    type,
    description,
  };

  // Read existing data
  let userData = [];
  const filePath = path.join(__dirname, "userData.json");

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    userData = JSON.parse(fileData);
  }

  // Add new data
  userData.push(newUserData);

  // Write updated data back to file
  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));

  res.status(200).json({
    msg: "success",
  });
});


// Route to handle user details submission
app.post('/api/users', (req, res) => {
  const userDetails = req.body;

  // Path to the JSON file
  const filePath = path.join(__dirname, 'userDetails.json');

  // Read the existing data
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server error');
    }

    // Parse existing data or initialize an empty array
    const existingUsers = data ? JSON.parse(data) : [];

    // Add new user details to the array
    existingUsers.push(userDetails);

    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Server error');
      }
      res.status(201).send(userDetails); // Send back the saved user details
    });
  });
});


// Route to get available models
app.get('/models', async (req, res) => {
  try {
    const models = await listModels();
    res.json({ models });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

// Route to send a question to Ollama API
app.post('/query', async (req, res) => {
  const { question, model = 'llama3.1' } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const models = await listModels();
    if (!models.includes(model)) {
      return res.status(404).json({ error: `Model "${model}" not found. Available models: ${models.join(', ')}` });
    }

    const answer = await queryOllama(question, model);
    res.json({ answer });
  } catch (error) {
    console.error('Error querying Ollama:', error.message);
    res.status(500).json({ error: 'Failed to query Ollama' });
  }
});


//quizData
let quizData = null; // This will store the quiz in-memory (temporary)

app.post('/api/quiz', (req, res) => {
  quizData = req.body;
  return res.status(201).json({ message: 'Quiz saved!' });
});

app.get('/api/quiz', (req, res) => {
  if (!quizData) {
    return res.status(404).json({ message: 'Quiz not found!' });
  }
  return res.json(quizData);
});

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI('AIzaSyCxjrzPyF9W3WuK5X8FOsaMFOCQZPCYPNE');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Route to handle AI email generation
app.post('/api/ai/email', async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("hit ")
    const result = await model.generateContent(prompt);
    const emailContent = result.response.text(); // Get the generated text
    res.json({ content: emailContent });
  } catch (error) {
    console.error('Error communicating with Google Generative AI:', error);
    res.status(500).json({ error: 'Failed to generate email content' });
  }
});

// Route to handle AI skill gap identification
app.post('/api/ai/skill', async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("hit");
    const result = await model.generateContent(prompt);
    const suggestions = result.response.text(); // Get the generated suggestions
    res.json({ suggestions }); // Send suggestions back
  } catch (error) {
    console.error('Error communicating with Google Generative AI:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

// Route to handle AI quiz generation
app.post('/api/ai/quiz', async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Received prompt for quiz generation:", prompt);
    
    // Call the model to generate the quiz
    const result = await model.generateContent(prompt);
    
    // Get the generated quiz JSON
    const quizData = result.response.text(); // Get the generated quiz JSON
    
    // Remove any unwanted characters or formatting
    const cleanQuizData = quizData.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parse the cleaned JSON
    const parsedQuizData = JSON.parse(cleanQuizData);

    // Send the parsed quiz data back
    res.json({ quiz: parsedQuizData });
  } catch (error) {
    console.error('Error communicating with Google Generative AI:', error);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});


app.listen(3000, () => {
  console.log(`Server is listening is ${port}...`);
});
