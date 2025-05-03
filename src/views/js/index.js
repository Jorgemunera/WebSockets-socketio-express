const socket = io();

// el cliente deberia poder recibir esa emision
socket.on("welcome", data => {
    console.log("data: ", data)
    const text = document.querySelector("#text");
    text.textContent = data
})

const emitToServer = document.querySelector("#emit-to-server")
emitToServer.addEventListener("click", () => {
    // quiero que cuando se de click al boton entonces se emita un evento al server
    socket.emit("toServer", "hola servidor soy yo emitiendo desde el cliente 👋🏻")
})

// vamos a recibir el evento que se evia a todos los clientes
socket.on("everyone", data => {
    console.log("evento emitido a todos los clientes desde el server: ", data)
})