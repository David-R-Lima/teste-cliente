'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AvailableBalance } from '@/components/home/available-balance'
import { ToBeAvailable } from '@/components/home/to-be-available'
import { ClientGrowthChart } from '@/components/home/graph-customer'

export default function Dashboard() {
  const [item, setItem] = useState<string>('customer')

  return (
    <div className="space-y-4">
      <div className="flex justify-between h-[50vh] space-x-8">
        <AvailableBalance></AvailableBalance>
        <ToBeAvailable></ToBeAvailable>
      </div>
      <div className="border-2 rounded-lg h-[35vh] p-4">
        <div className="text-secondary">
          <Button
            variant={'link'}
            className="text-secondary font-bold"
            onClick={() => setItem('customer')}
          >
            Clientes
          </Button>
          <Button
            variant={'link'}
            className="text-secondary font-bold"
            onClick={() => setItem('billing')}
          >
            Cobranças
          </Button>
          <Button
            variant={'link'}
            className="text-secondary font-bold"
            onClick={() => setItem('subscriptions')}
          >
            Assinaturas
          </Button>
        </div>
        <div className="h-[280px] p-6">
          {item === 'customer' && (
            <div className="flex items-center h-full">
              <div className="flex flex-col items-center bg-primary-foreground p-8 rounded-lg">
                <span className="text-secondary font-black text-xl">Total</span>
                <span className="text-secondary font-black text-8xl">80</span>
              </div>
              <ClientGrowthChart></ClientGrowthChart>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
