const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const port = 3000;
const cors = require("cors");
const { listModels, queryOllama } = require("./ollama"); // Import Ollama functions
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const dummyData = require("./dummydata");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<p>some html</p>");
});

const getNextId = (existingUsers) => {
  if (existingUsers.length === 0) {
    return 1; // Start with ID 1 if the file is empty
  }
  const maxId = Math.max(...existingUsers.map((user) => user.id));
  return maxId + 1;
};

// API endpoint to send dummy data
app.get("/api/data", (req, res) => {
  const filePath = path.join(__dirname, "dummydata2.json");

  try {
    // Read the data from the JSON file
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      const userData = JSON.parse(fileData); // Parse the JSON data
      res.json(userData); // Send the parsed data as JSON response
    } else {
      res.status(404).json({ message: "Data not found." });
    }
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});



const applicationsFilePath = path.join(__dirname, 'applications.json'); // File to store applications
const jobDataFilePath = path.join(__dirname, 'dummydata2.json');


app.post("/myjobs", (req, res) => {
  const { jobIds } = req.body; // Array of job IDs sent by the frontend

  // Read existing jobs from dummydata2.json
  let jobs = [];
  if (fs.existsSync(jobDataFilePath)) {
    const fileData = fs.readFileSync(jobDataFilePath, 'utf8');
    jobs = JSON.parse(fileData);
  }

  // Read existing applications from applications.json
  let applications = [];
  if (fs.existsSync(applicationsFilePath)) {
    const fileData = fs.readFileSync(applicationsFilePath, 'utf8');
    applications = JSON.parse(fileData);
  }

  // Filter the jobs based on the job IDs sent by the frontend
  const userJobsWithApplications = jobs
    .filter(job => jobIds.includes(job.id)) // Filter jobs by jobIds
    .map(job => {
      const jobApplications = applications.filter(app => app.jobId === job.id); // Get applications for the job
      return {
        ...job, // Include the job details
        applications: jobApplications, // Attach the applications for this job
      };
    });

  // Send the jobs with their respective applications
  res.status(200).json(userJobsWithApplications);
});

// Endpoint to apply for a job
app.post("/apply", (req, res) => {
  const { jobId, name, email, phone } = req.body;

  // Create an application object
  const application = {
    jobId,
    name,
    email,
    phone,
  };

  // Read existing applications
  let applications = [];
  if (fs.existsSync(applicationsFilePath)) {
    const fileData = fs.readFileSync(applicationsFilePath, 'utf8');
    applications = JSON.parse(fileData);
  }

  // Add new application
  applications.push(application);

  // Write updated applications back to the file
  fs.writeFileSync(applicationsFilePath, JSON.stringify(applications, null, 2));

  res.status(200).json({ message: 'Application submitted successfully!' });
});


// Helper function to read JSON file
const readJSONFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
};

// Helper function to write to JSON file
const writeJSONFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};

// Endpoint to fetch all jobs
app.get('/api/dummydata2', async (req, res) => {
  try {
    const jobs = await readJSONFile(jobsFilePath);
    res.json(jobs);
  } catch (error) {
    console.error("Error reading jobs file:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Endpoint to fetch all applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await readJSONFile(applicationsFilePath);
    res.json(applications);
  } catch (error) {
    console.error("Error reading applications file:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

app.get("/api/applications/:email", (req, res) => {
  const { email } = req.params;
  const filePath = path.join(__dirname, "applications.json");

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    const applications = JSON.parse(fileData);

    // Filter applications by email
    const userApplications = applications.filter(
      (application) => application.email === email
    );

    if (userApplications.length === 0) {
      return res.status(404).json({ message: "No applications found for this email." });
    }

    res.json(userApplications);
  } else {
    res.status(500).json({ message: "Error reading applications data" });
  }
});

app.post("/jobpostform", (req, res) => {
  const {
    jobId, // Accept jobId from frontend
    jobTitle,
    companyName,
    skills, // This might be a string or an array
    location,
    type,
    description,
    forType,
    college,
  } = req.body;

  const filePath = path.join(__dirname, "dummydata2.json");

  // Read existing data
  let userData = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    userData = JSON.parse(fileData);
  }

  // Create new job data with the jobId from frontend
  const newJobData = {
    id: jobId, // Use the jobId from frontend
    jobTitle,
    companyName,
    skills: Array.isArray(skills) ? skills : skills.split(",").map((skill) => skill.trim()), // Check if skills is an array
    location,
    type,
    description,
    forType,
    college: forType === "College" ? college : undefined,
  };

  // Add new data
  userData.push(newJobData);

  // Write updated data back to file
  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));

  res.status(200).json({
    msg: "success",
    id: jobId,
  });
});


// Route to handle user details submission
app.post("/api/users", (req, res) => {
  const userDetails = req.body;

  // Path to the JSON file
  const filePath = path.join(__dirname, "userDetails.json");

  // Read the existing data
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Server error");
    }

    // Parse existing data or initialize an empty array
    const existingUsers = data ? JSON.parse(data) : [];

    // Add new user details to the array
    existingUsers.push(userDetails);

    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Server error");
      }
      res.status(201).send(userDetails); // Send back the saved user details
    });
  });
});

// Route to get available models
app.get("/models", async (req, res) => {
  try {
    const models = await listModels();
    res.json({ models });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

// Route to send a question to Ollama API
app.post("/query", async (req, res) => {
  const { question, model = "llama3.1" } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const models = await listModels();
    if (!models.includes(model)) {
      return res.status(404).json({
        error: `Model "${model}" not found. Available models: ${models.join(
          ", "
        )}`,
      });
    }

    const answer = await queryOllama(question, model);
    res.json({ answer });
  } catch (error) {
    console.error("Error querying Ollama:", error.message);
    res.status(500).json({ error: "Failed to query Ollama" });
  }
});

//quizData
let quizData = null; // This will store the quiz in-memory (temporary)

app.post("/api/quiz", (req, res) => {
  quizData = req.body;
  return res.status(201).json({ message: "Quiz saved!" });
});

app.get("/api/quiz", (req, res) => {
  if (!quizData) {
    return res.status(404).json({ message: "Quiz not found!" });
  }
  return res.json(quizData);
});

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI("AIzaSyChawQdy_EgB6OPp00BAKUAXXnIL9sUNYk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Route to handle AI email generation
app.post("/api/ai/email", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("hit ");
    const result = await model.generateContent(prompt);
    const emailContent = result.response.text(); // Get the generated text
    res.json({ content: emailContent });
  } catch (error) {
    console.error("Error communicating with Google Generative AI:", error);
    res.status(500).json({ error: "Failed to generate email content" });
  }
});

app.post("/api/ai/skill", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("hit ");
    const result = await model.generateContent(prompt);

    // Check the type of response and parse it accordingly
    let skillTree;
    
    if (typeof result.response === 'string') {
      // If it's a string, attempt to parse it as JSON
      skillTree = JSON.parse(result.response); 
    } else {
      // If it's an object, handle it as a JSON object directly
      skillTree = result.response; 
    }
    console.log(skillTree)
    res.json({ skillTree });
  } catch (error) {
    console.error("Error communicating with Google Generative AI:", error);
    res.status(500).json({ error: "Failed to generate skill roadmap" });
  }
});

// Route to handle AI quiz generation
app.post("/api/ai/quiz", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Received prompt for quiz generation:", prompt);

    // Call the model to generate the quiz
    const result = await model.generateContent(prompt);

    // Get the generated quiz JSON
    const quizData = result.response.text(); // Get the generated quiz JSON

    // Remove any unwanted characters or formatting
    const cleanQuizData = quizData
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse the cleaned JSON
    const parsedQuizData = JSON.parse(cleanQuizData);

    // Send the parsed quiz data back
    res.json({ quiz: parsedQuizData });
  } catch (error) {
    console.error("Error communicating with Google Generative AI:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.listen(3000, () => {
  console.log(`Server is listening is ${port}...`);
});
