import express from "express";
import { Server } from "socket.io";

const app = express();

const expressServer = app.listen(3000, () => {
  console.log('started listening on port 3000');
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