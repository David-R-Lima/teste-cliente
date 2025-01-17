'use server'

import { Server } from 'socket.io'

let io

export async function initSocket(server) {
  if (!io) {
    io = new Server(server)

    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`)

      socket.on('register', (id) => {
        socket.join(id)
        console.log(`User registered: ${id}`)
      })

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`)
      })
    })

    // Armazena no escopo global para evitar reexecuções em hot reloads
    global.io = io
  }
  return io
}

export async function getSocketInstance() {
  if (!global.io) {
    throw new Error('Socket.IO instance not initialized')
  }
  return global.io
}
