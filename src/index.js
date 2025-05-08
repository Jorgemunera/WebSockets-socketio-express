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

// middleware con socketio
// en este caso va a ser un middlware que sera ejecutado antes de que me conecte
// y nos va ayudar a autenticarnos
io.use((socket, next)=>{
    const token = socket.handshake.auth.token;

    if(token == "token123"){
        next()
    } else {
        const err = new Error("token no valido")
        err.data = {
            details: "no pudiste ser autenticado"
        }

        next(err);
    }
});

io.on('connection', (socket) => {
    console.log("")
})

server.listen(3000, () => {
  console.log('Servidor corriendo');
});
