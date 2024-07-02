'use client' // Certifique-se de adicionar as aspas duplas

import { GraphClient } from '@/components/graficos'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Receber } from './receber'

export default function Dashboard() {
  const [item, setItem] = useState<string>('customer')

  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-500">Seja bem-vindo ao seu dashboard!</p>
      </div>
      <hr />
      <div className="lg:flex items-end  p-4 bg-accent rounded-lg">
        <Receber></Receber>
        <Button variant={'link'}>
          Clique aqui para saber mais sobre o valor que irá receber.
        </Button>
      </div>
      <hr />
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
      {item === 'customer' && (
        <div className="space-y-4">
          <GraphClient />
        </div>
      )}
    </div>
  )
}
