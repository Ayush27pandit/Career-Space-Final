const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const port = 3000;
const cors = require('cors');
const { listModels, queryOllama } = require('./ollama'); // Import Ollama functions


const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send('<p>some html</p>');
});


app.post("/jobpostform", (req, res) => {
  const { jobTitle, companyName, skills } = req.body;

  const newUserData = {
    jobTitle,
    companyName,
    skills: skills.split(",").map((skill) => skill.trim()), // Convert skills to an array
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


app.listen(3000, () => {
  console.log(`Server is listening is ${port}...`);
});
