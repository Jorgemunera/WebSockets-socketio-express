// hasta ahora siempre haciamos esto, pero hay que tener en cuenta que cuando hacemos esto socketio asigna al soket al namespace por defecto
// const socket = io();

// lo que queremos saber primero es si el cliente que se conecta es un profesor o un estudiante
const user = prompt("Escribe tu usuario");

// nuestros profesores
const profes = ["RetazMaster", "juandc", "DNDX"];

let soketNamespace, group;

// seleccionamos los elementos, caja de chat y el span
const chat = document.querySelector("#chat");
const namespace = document.querySelector("#namespace");


if(profes.includes(user)){
    // es un profesor
    // aqui ya no estamos asignando al socket al namespace por defecto sino al que nosotros le indicamos
    soketNamespace = io("/teachers");
    group = "teachers"
} else {
    // y a ls estudiantes los mtemos al namespace diferente
    soketNamespace = io("/students");
    group = "students"
}

// cuando escuchemos que el socket se conecta, entonces vamos a poner en el html del span el grupo correspondiente
soketNamespace.on("connect", () => {
    namespace.textContent = group;
})

// programar logica de enevio de mensajes
const sendMessage = document.querySelector("#sendMessage");
sendMessage.addEventListener("click", () => {
    const message = promt("escribe tu mensaje: ")
    soketNamespace.emit("send-message", {
        message,
        user
    })
})

// y ahora escuchamos el evento del server de acuerdo al namespace correspondiente
soketNamespace.on("message", data => {
    // lo vamos a mandar al html
    const { user, message} = data;

    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`

    chat.append(li)
})