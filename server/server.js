const { Socket } = require("dgram");
const express = require("express");
const req = require("express/lib/request");
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

//routes
app.get("/", (req, res) => {
    res.send("Real time whiteboard sharing app is working");
});

let roomIdGlobal, imageURLGlobal;

io.on("connection", (socket) => {
    socket.on("userJoined", (data) => {
        const { name, userId, roomId, host, presenter } = data;
        roomIdGlobal = roomId;
        socket.join(roomId);
        socket.emit("userIsJoined", { success: true });
        if (imageURLGlobal) {
            socket.emit("whiteboardDataResponse", { imageURL: imageURLGlobal });
        }
    });

    socket.on("whiteboardData", (data) => {
        imageURLGlobal = data;
        socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse", {
            imageURL: data,
        });
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running port on http://localhost:${port}`));