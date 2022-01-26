const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const PORT = 3001
const { Server } = require("socket.io")

app.use(cors())

const server = http.createServer(app);




server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
})