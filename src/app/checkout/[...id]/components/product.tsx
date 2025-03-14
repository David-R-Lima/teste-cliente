'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/services/products/products/types'

interface Props {
  product: Product
  onclickAdd: () => void
  onclickRemove: () => void
  onclickDescrease: () => void
  displayButtons: boolean
}
export function ProductComponent({
  product,
  onclickAdd,
  onclickDescrease,
  onclickRemove,
  displayButtons,
}: Props) {
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
        <p>
          <span className="font-bold">Preço: </span>R${' '}
          {value ? value.toFixed(2) : ''}
        </p>
        <div className="flex w-full space-x-2 items-center py-4">
          <p>
            <span className="font-bold">Quantidade:</span> {product.quantity}
          </p>
          {displayButtons && (
            <>
              <Button
                variant={'outline'}
                className="text-primary text-xl size-6"
                onClick={onclickAdd}
              >
                +
              </Button>
              <Button
                variant={'outline'}
                className="text-primary text-xl size-6"
                onClick={onclickDescrease}
              >
                -
              </Button>
            </>
          )}
        </div>

        {displayButtons && (
          <div className="flex space-x-2 w-full items-center justify-between">
            <Button variant="destructive" className="" onClick={onclickRemove}>
              Remover item
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
