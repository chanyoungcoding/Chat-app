const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');

const http = require("http");   
const { Server } = require('socket.io');

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req,res) => {
  res.send("Welcome our chat app APIs..")
});

const port = process.env.PORT || 4040;
const uri = process.env.ATLAS_URI;

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

io.on('connection', socket => {
  socket.on('send message', ({ chatId, senderId, text }) => {
    console.log(`${senderId} : ${text}`);
    io.emit('receive message', { chatId: chatId, senderId: senderId, text: text });
  });
    socket.on('disconnect', function () {
		console.log('user disconnected: ', socket.id);
	});
});

server.listen(port, () => {
  console.log(`server running on port : ${port}`)
})

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connection!!"))
  .catch((error) => console.log("MongoDB connection failed : ", error).message)