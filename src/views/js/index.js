const socket = io();

const drag = e => {
    const position = {
        top: e.clientY + "px",
        left: e.clientX + "px"
    }

    drawCircle(position)

    console.log("se envia el evento al servidor")
    socket.volatile.emit("circle-position", position)
}

const drawCircle = position => {
    circle.style.top = position.top;
    circle.style.left = position.left;
}

const circle = document.querySelector("#circle");
document.addEventListener("mousedown", e => {
    document.addEventListener("mousemove", drag)
})

document.addEventListener("mouseup", e => {
    document.removeEventListener("mousemove", drag)
})

socket.on("move-circle", position => {
    drawCircle(position)
})