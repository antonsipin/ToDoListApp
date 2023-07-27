const WebSocket = require('ws')

module.exports = function createSocketServer(server) {
    const socketServer = new WebSocket.Server({ server })

    socketServer.on('connection', (socketClient) => {
        console.log('SocketClient connected!')

        socketClient.on('message', (data) => {
            console.log('Socket client data is: ', JSON.parse(data))
        })
    })
}