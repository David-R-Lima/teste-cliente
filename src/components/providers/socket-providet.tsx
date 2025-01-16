'use client'

import { socket } from '@/socket'
import { useEffect } from 'react'

interface Props {
  id: string | undefined
}

export function Socket({ id }: Props) {
  useEffect(() => {
    if (id) {
      socket.connect()
      socket.emit('register', id)
    }

    return () => {
      socket.disconnect()
    }
  }, [id])
  return null
}
