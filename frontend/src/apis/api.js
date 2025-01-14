import axios from "axios";

// Use environment variables or default to localhost
const WEBSOCKET_URL = process.env.WEBSOCKET_URL || "http://localhost:5000";

// Create and export Axios instance
const api = axios.create({
  baseURL: WEBSOCKET_URL,
});

export default api;
