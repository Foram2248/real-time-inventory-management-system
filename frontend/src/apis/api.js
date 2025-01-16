import axios from "axios";

const WEBSOCKET_URL = process.env.WEBSOCKET_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: WEBSOCKET_URL,
});

export default api;
