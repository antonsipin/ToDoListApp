import WebSocket from 'ws'
import EventEmitter from 'events'
import { Server } from 'http'
const clients = new Set()

export default function createSocketServer(server: Server) {
    const socketServer = new WebSocket.Server({ server })
    EventEmitter.defaultMaxListeners = 100

    socketServer.on('connection', (socketClient: Server) => {
        console.log('SocketClient connected')
        clients.add(socketClient)

        socketClient.on('message', (message) => {
            console.log(message)
                for (let client of clients as any) {
                    client.send(message)
                }
        })

        socketServer.on('close', () => {
            clients.delete(WebSocket)
            console.log('SocketClient close connection')
        })
    })
}
