'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AvailableBalance } from '@/components/home/available-balance'
import { ToBeAvailable } from '@/components/home/to-be-available'
import { ClientGrowthChart } from '@/components/home/graph-customer'
import { useCustomerMetrics } from '@/hooks/useCustomerMetrics'
import { useChargeMetrics } from '@/hooks/useChargeMetrics'
import { ChargeGrowthChartComponent } from '@/components/home/graph-charges'

export default function Dashboard() {
  const [item, setItem] = useState<string>('customer')

  const customerMetric = useCustomerMetrics()
  const chargeMetric = useChargeMetrics()

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row justify-between lg:h-[50vh] space-y-4 lg:space-y-0 lg:space-x-8 w-full">
        <AvailableBalance></AvailableBalance>
        <ToBeAvailable></ToBeAvailable>
      </div>
      <div className="border-2 rounded-lg h-[35vh] p-4">
        <div>
          <Button
            variant={'link'}
            className={`font-bold ${item === 'customer' ? 'text-primary' : 'text-secondary'}`}
            onClick={() => setItem('customer')}
          >
            Clientes
          </Button>
          <Button
            variant={'link'}
            className={`font-bold ${item === 'charges' ? 'text-primary' : 'text-secondary'}`}
            onClick={() => setItem('charges')}
          >
            Cobranças
          </Button>
          <Button
            variant={'link'}
            className={`font-bold ${item === 'subscriptions' ? 'text-primary' : 'text-secondary'}`}
            onClick={() => setItem('subscriptions')}
          >
            Assinaturas
          </Button>
        </div>
        <div className="h-[280px] p-6">
          {item === 'customer' && (
            <div className="flex items-center h-full">
              <div className="hidden lg:flex flex-col items-center bg-primary-foreground p-8 rounded-lg">
                <span className="text-secondary font-black text-xl">Total</span>
                <span className="text-secondary font-black text-8xl">
                  {customerMetric.data
                    ? customerMetric.data.customerMetrics[
                        customerMetric.data.customerMetrics.length - 1
                      ]?.number
                    : 0}
                </span>
              </div>
              <ClientGrowthChart></ClientGrowthChart>
            </div>
          )}
          {item === 'charges' && (
            <div className="flex items-center h-full">
              <div className="hidden lg:flex flex-col items-center bg-primary-foreground p-8 rounded-lg">
                <span className="text-secondary font-black text-xl">Total</span>
                <span className="text-secondary font-black text-8xl">
                  {chargeMetric.data
                    ? chargeMetric.data.chargeMetrics.reduce(
                        (sum, metric) => sum + (metric.number || 0),
                        0,
                      )
                    : 0}
                </span>
              </div>
              <ChargeGrowthChartComponent></ChargeGrowthChartComponent>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
