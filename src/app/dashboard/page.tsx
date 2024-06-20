'use client' // Certifique-se de adicionar as aspas duplas

import { GraphClient } from '@/components/graficos'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Dashboard() {
  const [item, setItem] = useState<string>('customer')

  return (
    <div className="space-y-8">
      <div className="border-2 p-2 rounded-lg">
        <Button variant={'link'} onClick={() => setItem('customer')}>
          Clientes
        </Button>
        <Button variant={'link'} onClick={() => setItem('billing')}>
          Cobranças
        </Button>
        <Button variant={'link'} onClick={() => setItem('subscriptions')}>
          Assinaturas
        </Button>
      </div>
      {item === 'customer' && <GraphClient />}
    </div>
  )
}
