'use client'

import React, { useState } from 'react'
import { ClientGrowthChart, GraphClient } from '@/components/graficos'
import { Button } from '@/components/ui/button'
import { Receber } from './receber'
import { ChargeGrowthChart, GraphCharge } from '@/components/grapf-charge'
import {
  GraphSignature,
  SignatureGrowthChart,
} from '@/components/graph-signatures'

export default function Dashboard() {
  const [item, setItem] = useState<string>('customer')

  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-500">Seja bem-vindo ao seu dashboard!</p>
      </div>
      <hr />
      <div className="lg:flex items-end p-4 bg-accent rounded-lg">
        <Receber />
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
        <div key="customer" className="space-y-4">
          <GraphClient />
          <h1 className="italic font-bold">Clientes cadastrados por mês</h1>
          <div className="w-full p-2 bg-accent rounded-lg">
            <ClientGrowthChart />
          </div>
        </div>
      )}

      {item === 'billing' && (
        <div key="billing" className="space-y-4">
          <GraphCharge />
          <h1 className="italic font-bold">Cobranças por mês</h1>{' '}
          {/* Corrigi o texto aqui */}
          <div className="w-full p-2 bg-accent rounded-lg">
            <ChargeGrowthChart />
          </div>
        </div>
      )}

      {item === 'subscriptions' && (
        <div key="subscriptions" className="space-y-4">
          <GraphSignature />
          <h1 className="italic font-bold">Assinaturas por mês</h1>{' '}
          {/* Corrigi o texto aqui */}
          <div className="w-full p-2 bg-accent rounded-lg">
            <SignatureGrowthChart />
          </div>
        </div>
      )}
    </div>
  )
}
