'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useState } from 'react'

enum Products {
  plans,
  others,
}

export function CardProducts() {
  const [selected, setSelected] = useState<Products>(Products.plans)
  return (
    <div className="flex justify-start space-x-6">
      <Card
        className={`flex items-center h-20 ${selected === Products.plans ? 'border-2 border-primary' : ''} hover:cursor-pointer`}
        onClick={() => {
          setSelected(Products.plans)
        }}
      >
        <CardHeader>
          <CardTitle className={`p-4 text-2xl font-extrabold`}>
            Planos
          </CardTitle>
        </CardHeader>
      </Card>

      <Card
        className={`flex items-center h-20 ${selected === Products.others ? 'border-2 border-primary' : ''} hover:cursor-pointer`}
        onClick={() => {
          setSelected(Products.others)
        }}
      >
        <CardHeader>
          <CardTitle className={`p-4 text-2xl font-extrabold`}>
            Outros
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
