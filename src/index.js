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

// creamos un arreglo para almacenar los sockets conectados
const socketsOnline = [];

// router
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

io.on('connection', (socket) => {

    // cuando se conecta un cliente entonces vamos a guardar en el array la informacion del id del socket que se conecta
    socketsOnline.push(socket.id)

    socket.emit("welcome", "ahora estas conectado 😊");

    socket.on("toServer", data => {
        console.log("data recibida del cliente:", data)
    })

    io.emit("everyone", socket.id + " se ha conectado 🧩")

    // recibir el evento que se va a emitir a uno solo
    socket.on("toLast", data => {
        // vamos a obtener el ultimo socket que se conecto
        const lastSocket = socketsOnline[socketsOnline.length - 1];

        // ya tenemos el id del ultimo socket, entonces ahora le vamos a emitir el saludo solo al ultimo cliente que se conecta
        io.to(lastSocket).emit("salute", data)
    })

})

server.listen(3000, () => {
  console.log('Servidor corriendo');
});
