import { api } from '@/services/api'
import { Product } from './types'
import { QueryFunctionContext } from '@tanstack/react-query'
import { createProductFormSchema } from '@/app/dashboard/products/components/create-product-form'

export interface GetRecommendedProductsProps {
  orderId: string
  excludedItens?: string[]
}

export async function GetRecommendedProducts({
  excludedItens,
  orderId,
}: GetRecommendedProductsProps) {
  const params: Record<string, string> = {}

  if (excludedItens && excludedItens.length > 0) {
    params.excludedItens = excludedItens.join(',')
    params.order_id = orderId
  }

  const res = await api.get<{ products: Product[] }>(
    '/products-recommended' +
      '?order_id=' +
      orderId +
      '&excludedItens=' +
      params.excludedItens,
  )

  return res.data
}

export async function GetProducts(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey

  const res = await api.get<{ products: Product[] }>('/products?page=' + page)

  return res.data
}

export async function CreateProduct(data: createProductFormSchema) {
  const res = await api.post('/products', data)

  return res.data
}
