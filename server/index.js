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

let onlineUsers = [];

let otherUserText = [];

io.on('connection', socket => {
  socket.on('send message', ({ chatId, senderId, text }) => {
    otherUserText.push({senderId, text}); //   [{ senderId: '65bdc6b7beef2ad895256bbf', text: '테스트해보자' },{...}],
    io.emit('receive message', { chatId: chatId, senderId: senderId, text: text });
    io.emit('other user text', otherUserText)
  });

  socket.on('loginUser', ({user}) => {
    if (!onlineUsers.some(item => item.user === user)) {
      onlineUsers.push({user});
      console.log(onlineUsers);
      io.emit('receive user', onlineUsers);
    }
  })

  socket.on('disconnect', () => {
		console.log('user disconnected: ', socket.id);
    console.log(onlineUsers)
	});
});

server.listen(port, () => {
  console.log(`server running on port : ${port}`)
})

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connection!!"))
  .catch((error) => console.log("MongoDB connection failed : ", error).message)