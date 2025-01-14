import axios from "axios";

// Use environment variables or default to localhost
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

// Create and export Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
