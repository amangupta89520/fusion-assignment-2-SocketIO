import express from "express";
import { Server } from "socket.io";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

const expressServer = app.listen(process.env.PORT, () => {
  console.log('started listening on port '+ process.env.PORT);
});

const socketServer = new Server(expressServer, {
  cors: {
    origin: '*'
  }
});

socketServer.on('connect', (socket) => {
  socket.on('message', (data) => {
    socket.to(data.to.socketId).emit('message', data);
  });
  socket.on('joined', (data) => {
    socket.broadcast.emit('joined', data);
  })
});