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

// vamos a emitir el evento cuando se presione el boton
const emitToLast = document.querySelector("#emit-to-last");
emitToLast.addEventListener("click", () => {
    socket.emit("toLast", "hola papito estas retrasado ⏳ (emitido desde el cliente)")
})

// vamos a escuchar el evento de saludo que se va a enviar al ultimo cliente conectado
socket.on("salute", data => {
    console.log("data que se va a enviar al ultimo cliente conectado, recibido desde el server: ", data)
})

// on, one, off
// on: nos permite escuchar un evento que se emite varias veces
socket.on("on", data => {
    console.log("se emite varias veces: ", data)
})

// once: nos permite escuchar un evento que se emite una sola vez
socket.once("once", data => {
    console.log("se emite una vez: ", data)
})

// off: apaga el evento
const listener = () => {
    console.log("se va a apagar el evento...")
}

socket.on("evento-to-off", listener);

setTimeout(() => {
    socket.off("evento-to-off", listener)
    console.log("pasan 2 segundo");
}, 2000)

