process.env.DEBUG = "engine, socket.io:socket";

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

// importamos lo necesario de adminUI
const { instrument } = require("@socket.io/admin-ui");

const app = express();

// server express
const server = http.createServer(app);
// server websocket
// y aqui adicionamos otro parametro a nuestro server de socket
const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: false
    }
});

// usamos el instrument
// podemos no usar auth
// instrument(io, {
//     auth: false
// })

// y podemos usar authenticacion
instrument(io, {
    auth: {
        type: "basic",
        username: "usernameCualquiera",
        password: "pass123"

    }
})

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
