import { ProductOrders } from '../product-orders/types'

export interface Order {
  id: string | null
  id_payment_link: string | null
  status: string | null
  createdAt: Date | null
  updatedAt: Date | null
  product_orders?: ProductOrders[]
}
