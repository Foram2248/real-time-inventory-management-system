import { io } from "socket.io-client";

const WEBSOCKET_URL = process.env.WEBSOCKET_URL || "http://localhost:5000";
let socket;

export const initializeWebsocket = () => {
  if (!socket) {
    socket = io(WEBSOCKET_URL);
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error(
      "WebSocket not initialized. Call initializeWebsocket first."
    );
  }
  return socket;
};
