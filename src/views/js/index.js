const socket = io();

const drag = e => {
    const position = {
        top: e.clientY + "px",
        left: e.clientX + "px"
    }

    // y para no depender del servidor primero dibujamos el circulito y luego emitimos el evento con la position
    drawCircle(position)

    // vamos a emitir la posicion del circulo
    socket.emit("circle-position", position)
}

// creamos una funcion drawCircle
const drawCircle = position => {
    circle.style.top = position.top;
    circle.style.left = position.left;
}

// queremos mover el circle
const circle = document.querySelector("#circle");
document.addEventListener("mousedown", e => {
    document.addEventListener("mousemove", drag)
})

document.addEventListener("mouseup", e => {
    document.removeEventListener("mousemove", drag)
})

// ahora vamos a escuchar el evento move-circle que va a enviar el servidor a todos los lientes, para que todos los clientes en tiempo real sepan que pasa con la posicion del circulo
socket.on("move-circle", position => {
    // llamar ahora a nuestra funcion drawCircle
    drawCircle(position)
})