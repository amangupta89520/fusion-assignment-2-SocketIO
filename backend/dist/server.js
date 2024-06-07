"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
const expressServer = app.listen(process.env.PORT, () => {
    console.log('started listening on port ' + process.env.PORT);
});
const socketServer = new socket_io_1.Server(expressServer, {
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
    });
});
