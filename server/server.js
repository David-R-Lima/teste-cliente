import { createServer } from 'node:http'
import next from 'next'
import { initSocket } from './socket.js'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(async () => {
  const httpServer = createServer(handler)

  // Inicializar o Socket.IO
  await initSocket(httpServer)

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
