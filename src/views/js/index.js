// vamos a autenticarnos
// dentro de la funcion io, yo puedo mandar una propiedad auth con mi token

const socket = io({
    auth: {
        token: "token1234"
    }
});

// si no se conecta y hay error en el middleware
socket.on("connect_error", err => {
    console.log("error de conexion");
    console.log(err.message);
    console.log("err.data",err.data);
})