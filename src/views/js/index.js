const socket = io();

// selecciono mis botones que me conectaran a las salas
const connectRoom1 = document.querySelector("#connectRoom1");
const connectRoom2 = document.querySelector("#connectRoom2");
const connectRoom3 = document.querySelector("#connectRoom3");

// eventos para que al hacer click me conecte a las salas
connectRoom1.addEventListener("click", (e) => {
    // conectarnos a la sala que queremos
    socket.emit("connect-to-room", "room1");
})

connectRoom2.addEventListener("click", (e) => {
    // conectarnos a la sala que queremos
    socket.emit("connect-to-room", "room2");
})

connectRoom3.addEventListener("click", (e) => {
    // conectarnos a la sala que queremos
    socket.emit("connect-to-room", "room3");
})

// logica para enviar mensaje al undir boton de enviar mensaje
const sendMessage = document.querySelector("#sendMessage")
sendMessage.addEventListener("click", () => {
    const message = prompt("Escribe tu mensaje: ")
    socket.emit("message", message)
})

// vamos a recibir el evento emiido por el server del mensaje
socket.on("send-message", data => {
    const {room, message} = data;

    // vamos a crear un li por cada mensaje y le ponemos el mensaje correspondiente
    const li = document.createElement("li");
    li.textContent = message;

    // vamos a mandar ese elemento li a la sala correspondiente
    document.querySelector(`#${room.replace("s-", "")}`).append(li)

})