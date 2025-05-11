const {createServer} = require("http");
const {Server} = require("socket.io");

const Client = require("socket.io-client");

describe("testing socket.io", () => {
    let io, serverSocket, clientSocket;
    beforeAll(done => {
        const httpServer = createServer();
        io = new Server(httpServer);

        httpServer.listen(() => {
            const port = httpServer.address().port

            clientSocket = new Client(`http://localhost:${port}`)

            io.on("connection", socket => {
                serverSocket = socket
            })

            clientSocket.on("connect", done)
        })
    })

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    // comenzamos con los test
    test("Test evento", done => {
        // cuando el cliente reciba el evento saludo
        clientSocket.on("greeting", greet => {
            try {
                expect(greet).toBe("Holi");
                done();    
            } catch (error) {
                done(error);
            }
        });
        // creamos el evento emit desde el server
        serverSocket.emit("greeting", "Holi")
    });

    // simulamos otro test
    test("testing callback (acknoledgements)", done => {
        serverSocket.on("ladrar", callback => {
            callback("guau!")
        });

        clientSocket.emit("ladrar", arg => {
            try {
                expect(arg).toBe("guau!");
                done();
            } catch (error) {
                done(error);
                
            }
        })
    })
})

