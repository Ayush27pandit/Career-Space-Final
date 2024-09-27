const axios = require('axios');

const OLLAMA_API_BASE = 'http://localhost:11434/api';

// Function to list models from Ollama API
async function listModels() {
  try {
    const response = await axios.get(`${OLLAMA_API_BASE}/tags`);
    return response.data.models;
  } catch (error) {
    console.error('Error listing models:', error.message);
    return [];
  }
}

// Function to query Ollama API
async function queryOllama(question, model = 'llama3.1') {
  try {
    const response = await axios.post(`${OLLAMA_API_BASE}/generate`, {
      model: model,
      prompt: question,
      stream: false
    });
    return response.data.response;
  } catch (error) {
    console.error('Error querying Ollama:', error.message);
    throw error;
  }
}

module.exports = { listModels, queryOllama };
