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
    // emision basica
    // nosotros vamos a poner al server a emitir el primer evento
    // lo que va a suceder es que cada vez que alguien se conecte el server de web socket va a detectarlo y va a emitir un evento "welcome" con el valo "ahora estas conectado"
    // esto lo emite el servidor hacia el liente 
    socket.emit("welcome", "ahora estas conectado 😊");

    // queremos tambien recibir el evento que emite el cliente
    socket.on("toServer", data => {
        console.log("data recibida del cliente:", data)
    })

    // queremos emitir a todos los clientes
    // queremos por ejemplo mandar el socket.id de cada nuevo cliente que se conecte
    io.emit("everyone", socket.id + " se ha conectado 🧩")

})

server.listen(3000, () => {
  console.log('Servidor corriendo');
});
