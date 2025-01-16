import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

let io
let userSockets = new Map()

app.prepare().then(() => {
  const httpServer = createServer(handler)

  userSockets = new Map()

  io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    socket.on('register', (id) => {
      userSockets.set(id, socket.id)
    })

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`)
      userSockets.forEach((value, key) => {
        if (value === socket.id) {
          userSockets.delete(key)
        }
      })
    })
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })

  // Export io and userSockets for usage elsewhere after preparation
})

export { io, userSockets }
