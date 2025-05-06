const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();

// server express
const server = http.createServer(app);

// server websocket
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'views')));


// router
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

io.on('connection', (socket) => {
    socket.on("circle-position", position => {
        socket.broadcast.emit("move-circle", position);
    })
})

server.listen(3000, () => {
  console.log('Servidor corriendo');
});
