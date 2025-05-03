const socket = io();

function checkSocketStatus() {
    console.log("socket status: ", socket.connected)
}

socket.on('connect', () => {
    console.log(`DESDE EL CLIENTE: el socket ${socket.id} se ha conectado 😊`)
    checkSocketStatus();
})

socket.on('connect_error', () => {
    console.log(`DESDE EL CLIENTE: No pude conectarme 🤷🏻‍♀️`)
    checkSocketStatus();
})

socket.on('disconnect', () => {
    console.log(`DESDE EL CLIENTE: el socket ${socket.id} se ha desconectado 😔`)
    checkSocketStatus();
})

socket.io.on('reconnect_attempt', () => {
    console.log(`DESDE EL CLIENTE: el socket ${socket.id} está intentando reconectarse 🚀`)

})

socket.io.on('reconnect', () => {
    console.log(`DESDE EL CLIENTE: Me logré reconectar YEAAAA`)

})
