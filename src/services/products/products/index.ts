import { api } from '@/services/api'
import { Product } from './types'
import { QueryFunctionContext } from '@tanstack/react-query'
import { createProductFormSchema } from '@/app/dashboard/products/components/create-product-form'
import { Boleto, QrCode } from '@/services/payment-link/types'

export interface GetRecommendedProductsProps {
  merchantId: string
  excludedItens?: string[]
}

export async function GetRecommendedProducts({
  excludedItens,
  merchantId,
}: GetRecommendedProductsProps) {
  const params: Record<string, string> = {}

  if (excludedItens && excludedItens.length > 0) {
    params.excludedItens = excludedItens.join(',')
  }

  const res = await api.get<{ products: Product[] }>(
    '/products-recommended' +
      '?merchant_id=' +
      merchantId +
      '&excludedItens=' +
      params.excludedItens,
  )

  return res.data
}

export async function GetProducts(ctx: QueryFunctionContext) {
  const [, page, filter] = ctx.queryKey

  const res = await api.get<{ products: Product[] }>('/products', {
    params: {
      page,
      filter: filter ?? undefined,
    },
  })

  return res.data
}

export async function CreateProduct(data: createProductFormSchema) {
  console.log(data.value)
  const res = await api.post('/products', {
    ...data,
    value: data.value * 100,
  })

  return res.data
}

interface UpdateProductProps {
  id: string
  data: createProductFormSchema
}

export async function UpdateProduct(data: UpdateProductProps) {
  const res = await api.put('/product/' + data.id, {
    ...data.data,
    value: data.data.value * 100,
  })
  return res.data
}

export async function GetProduct(id: string) {
  const res = await api.get<{ product: Product }>('/product/' + id)

  return res.data
}

interface BuyProductsProps {
  product_ids: string[]
  merchant_id: string
  cupom?: string
  affiliate_id?: string
  card_token?: string
  payment_type: string
  customer: {
    name: string
    email: string
    phone: string
    document: {
      type: string
      text: string
    }
    address: {
      street?: string
      neighbourhood?: string
      number?: string
      complement?: string
      city: string
      state: string
      country: string
      zip_code: string
    }
  }
}

export async function BuyProducts(req: BuyProductsProps) {
  const res = await api.post<{
    charge_id: string
    qr_codes?: QrCode[]
    boleto?: Boleto
  }>('/buy-products', req)

  return res.data
}
