// src/components/session-validator.tsx
'use client'

import { useEffect } from 'react'
import { getSession } from 'next-auth/react'

export function SessionValidator() {
  useEffect(() => {
    async function checkSession() {
      const session = await getSession()
      if (!session) {
        await fetch('/api/clear-access-token', { method: 'POST' })
      }
    }

    checkSession()
  }, [])

  return null
}
