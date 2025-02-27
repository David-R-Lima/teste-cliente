'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/services/products/products/types'
import Image from 'next/image'

interface Props {
  product: Product
  onCick: () => void
}
export function ProductWithImageComponent({ product, onCick }: Props) {
  const value = product.value ? product.value / 100 : undefined
  return (
    <Card className="w-full flex items-center justify-center">
      <CardContent className="flex flex-col items-center p-4 space-y-2 w-full">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt="imagem"
            width={100}
            height={100}
          ></Image>
        )}
        <h1>{product.name}</h1>
        <p>R$ {value ? value.toFixed(2) : ''}</p>
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault()
            onCick()
          }}
        >
          Adicionar
        </Button>
      </CardContent>
    </Card>
  )
}
