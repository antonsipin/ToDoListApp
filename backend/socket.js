const WebSocket = require('ws')

module.exports = function createSocketServer(server) {
    const socketServer = new WebSocket.Server({ server })

    socketServer.on('listening', (socketClient) => {
        console.log('SocketClient connected!')
    })
}