const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors({
  origin: 'https://chat-app-1-dpjv.onrender.com',
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-1-dpjv.onrender.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get('/', (req, res) => {
  res.send("Hello World!")
})

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
