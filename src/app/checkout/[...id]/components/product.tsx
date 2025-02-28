'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/services/products/products/types'
import Image from 'next/image'

interface Props {
  product: Product
}
export function ProductComponent({ product }: Props) {
  const value = product.value ? product.value / 100 : undefined
  return (
    <Card className="w-full flex items-center justify-start p-2">
      <CardContent className="p-2 space-y-1">
        <h1>
          <span className="font-bold">Nome: </span>
          {product.name}
        </h1>
        <h1>
          <span className="font-bold">Descrição: </span>
          {product.description}
        </h1>
        <p>R$ {value ? value.toFixed(2) : ''}</p>
      </CardContent>
    </Card>
  )
}
