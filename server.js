const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const port = process.env.port || 3000
const { Server } = require("socket.io")
app.use(cors())

app.use(express.static(path.join(__dirname, "client", "build")));
// const publicPath = path.join(__dirname, '..', 'public');
// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
//  });
// app.listen(port, () => {
//     console.log(`Server is up on port ${port}!`);
//  });

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: `http://localhost:${port}`,
        method: ['GET', 'POST'],
    },
})

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected!`);

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});


server.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
})