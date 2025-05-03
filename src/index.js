const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// creamos el server de websocket
// este es necesario que utilicemos explicitamente el createServer del modulo http
const io = new Server(server);

// queremos servir archivos estaticos como css, javascript, etc
// todos los archivos estaticos van a estar en lo que coloquemos en path.join, aqui se van a guardar
app.use(express.static(path.join(__dirname, 'views')));


app.get('/', (req, res) => {
    // queremos responder un archivo html que va a estar en nuestro proyecto
    // este archivo lo vamos a enviar cada que visitemos la ruta raiz
    res.sendFile(__dirname + '/views/index.html')
});

// ahora vamos a escuchar las peticiones con websocket
io.on('connection', (socket) => {
    // cada vez que se conecte un nuevo cliente me va a ejecutar la funcion
    console.log('clientes conectados: ', io.engine.clientsCount);
    console.log('ID socket conectado: ', socket.id);
    socket.on('disconnect', () => {
        console.log(`socket id : ${socket.id} desconectado`)
    })

    socket.conn.once('upgrade', () => {
        console.log(`Hemos pasado de HTTP LONG-POLLING a : ${socket.conn.transport.name}`)
    })

})

server.listen(3000, () => {
  console.log('Servidor corriendo');
});
