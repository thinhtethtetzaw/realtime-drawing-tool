import { io, Socket } from "socket.io-client";

// Create socket instance
const socket: Socket = io("http://localhost:3000");

// Function to emit draw events
export const emitDraw = (drawData: any) => {
  socket.emit("draw", drawData);
};

// Function to listen for draw events
export const onDraw = (callback: (data: any) => void) => {
  socket.on("draw", callback);
};

// Function to remove draw event listener
export const offDraw = (callback: (data: any) => void) => {
  socket.off("draw", callback);
};

// Export socket instance if needed
export default socket;
