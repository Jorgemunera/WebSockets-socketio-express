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
    // tenemos ue identificar de alguna manera a que sala estamos conectados actualmente
    // eso lo podemos hacer con socket
    socket.connectedRoom = "";

    // escuchamos los eventos
    socket.on("connect-to-room", room => {
        // ante de meterlo a una sala tenemos que sacarlo de la ultima donde estaba
        socket.leave(socket.connectedRoom);

        switch (room) {
            case "room1":
                // con join lo vamos a poder unir a una sala a este socket que envia el evento, si la sala no existe la crea
                socket.join("s-room1");
                socket.connectedRoom = "s-room1"
                break;
            
            case "room2":
                socket.join("s-room2");
                socket.connectedRoom = "s-room2"
                break;

            case "room3":
                socket.join("s-room3");
                socket.connectedRoom = "s-room3"
                break;
        
            default:
                break;
        }
    })

    // escuchamos el evento del mensaje
    socket.on("message", message => {
        // entonces tenemos que saber a que sala esta conectado el socket para saber a cual sala mandar el mensaje
        const room = socket.connectedRoom;
        console.log("room al que estoy conectado:", room)

        //y ahora mandamos el mensaje a la sala correspondiente
        io.to(room).emit("send-message", {
            message,
            room
        })
    })
})

server.listen(3000, () => {
  console.log('Servidor corriendo');
});
