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

// aqui opasa lo mismo qu en el cliente. ya no vamos a usar directamente este io, porque este hace referencia al namespace default
// io.on('connection', (socket) => {
// })

// creamos 2 namespaces
const teachers = io.of("teachers")
const students = io.of("students")

// y ahora si, detectamos el evento de conexion por el namespace correspondeinte
teachers.on("connection", (socket) => {
    // y aqui escucharemos eventos uncamente del namespace teachers
    console.log(`socket.id: ${socket.id}, se ha conectado a la sala de profes`);

    // vamos a recibir el evento del mensaje del cliente soket correspondiente.
    // y cundo detectemos el evento de enviar mensaje, al namespace de teacher hay que emitirle el mensaje
    socket.on("send-message", data => {
        teachers.emit("message", data)
    })
    
})

students.on("connection", (socket) => {
    // y aqui escucharemos eventos uncamente del namespace students
    console.log(`socket.id: ${socket.id}, se ha conectado a la sala de estudiantes`);

    // y hacemos lo mismo en students
    socket.on("send-message", data => {
        students.emit("message", data)
    })
})

server.listen(3000, () => {
  console.log('Servidor corriendo');
});
