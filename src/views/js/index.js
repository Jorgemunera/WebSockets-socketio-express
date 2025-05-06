const socket = io();

const send = document.querySelector("#send")
const disconnect = document.querySelector("#disconnect")
const reconnet = document.querySelector("#reconnet")

// añadimos eventos
// recordar que vamos a simular la desconexion y reconexion
send.addEventListener("click", () => {

    // antes de enviar el evento consultamos si el socket esta conectado
    if(socket.connected){
        socket.emit("is-connected", "esta conectado 👍🏻")
    }
});

disconnect.addEventListener("click", () => {
    // estamos simulando una desconexion forzosa para poder ejemplificar este tema
    socket.disconnect();
})

disconnect.addEventListener("click", () => {
    // estamos simulando una reconexion forzosa para poder ejemplificar este tema
    socket.connect();
})