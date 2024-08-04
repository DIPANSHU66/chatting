const { Server } = require("socket.io");

const http = require("http");

const express = require("express");

const app = express();

const server = http.createServer(app);
require("dotenv").config();


const io = new Server(server, {
  cors: {
    origin: process.env.URL,
    methods: ["GET", "POST", "PUT"],
  },
});

const usersocketMap = {};

const getReciverSocketid = (receiverId) => {
  return usersocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    usersocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(usersocketMap));
  socket.on("disconnect", () => {
    console.log("user Disconnected", socket.id);
    delete usersocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(usersocketMap));
  });
});

module.exports = { getReciverSocketid, app, server, io };
