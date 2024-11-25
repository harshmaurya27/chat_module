const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

const Message = require("./models/message");

// WebSocket communication
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Listen for incoming messages
  socket.on("sendMessage", async (messageData) => {
    // Save message to MongoDB
    const newMessage = new Message(messageData);
    await newMessage.save();

    // sending the message to all connected user
    io.emit("receiveMessage", messageData);
  });

  // Handling disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
