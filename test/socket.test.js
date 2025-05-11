// Para hacer test dentro de socket.io tenemos que crear un server de socket.io en nuestro test

const {createServer} = require("http");
const {Server} = require("socket.io");

// si nosotros queremos testear bien esto, debemos teber alguna manera de testear la parte del cliente
// per como estamos haciendo testing en la terminal no tenemos una forma de hacerlo en el cliente (para eso instalamos de socker.io-client), ya que asi simulamos codigo en el cliente
const Client = require("socket.io-client");

// descibe para iniciar nuestro test
describe("testing socket.io", () => {
    let io, serverSocket, clientSocket;
    // antes de que todo el testing se ejecute vamos a evaluar que el server este creado
    beforeAll(done => {
        //server http
        const httpServer = createServer();

        // creamos el server socket.io
        io = new Server(httpServer);

        // ponemos nuestro server a escuchar
        httpServer.listen(() => {
            // vemos en que puerto esta el server
            const port = httpServer.address().port

            //definimos el cliente simulado
            // este debe conectarse a mi server http
            clientSocket = new Client(`http://localhost:${port}`)

            io.on("connection", socket => {
                serverSocket = socket
            })

            // cuando el liente este ya conectado entonces done
            clientSocket.on("connect", done)
        })
    })

    // y despues de que nuestros test terminen de correr usamos after
    afterAll(() => {
        // lo que queremos es cerrar mi server de web socket
        io.close();

        // y l mismo con el del cliente
        clientSocket.close();
    })
})

