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
    // vamos a escuchar e evento cuando me emiten la posicion del circulo
    socket.on("circle-position", position => {
        // ahora mi server deberia mandar esto a todos los usuarios onectados o clientes conectados
        // io.emit("move-circle", position);

        // pero en lugar de io.emit como lo tenemos arriba, lo mejor es usar broadcast
        // broadcast emite el evento a todos menos a el socket especifico (a mi)
        socket.broadcast.emit("move-circle", position);

    })
})

server.listen(3000, () => {
  console.log('Servidor corriendo');
});
