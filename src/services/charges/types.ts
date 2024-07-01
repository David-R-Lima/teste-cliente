export enum Currency {
  BRL = 'BRL',
  USD = 'USD',
}

export enum PaymentType {
  CREDIT_CARD = 'CARTAO_CREDITO',
  PIX = 'PIX',
  BOLETO = 'BOLETO',
}

export enum ChargeType {
  SINGLE = 'UNICA',
  RECURRENCE = 'RECORRENCIA',
}

export enum PaymentCardType {
  CREDIT_CARD = 'CARTAO_CREDITO',
}

export enum ChargeStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  PRE_AUTHORIZED = 'PRE_AUTHORIZED',
  AUTHORIZED = 'AUTHORIZED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED',
  REFUND_PENDING = 'REFUND_PENDING',
  CHARGED_BACK = 'CHARGED_BACK',
  IN_DISPUTE = 'IN_DISPUTE',
  IN_ANALYSIS = 'IN_ANALYSIS',
}

export interface Charges {
  id: string
  merchant_id: string
  value: number
  currency: Currency
  invoice_description: string
  capture: boolean
  provider_id: string
  description: string
  situation: ChargeStatus
  charge_type: ChargeType
  card_id: string
  pix_id: string
  boleto_id?: string
  payment_type: string
  nsu: string
  customer_id?: string
  recurrence_id?: string
  payer: {
    name: string
    email: string
    phone: string
  }
  address?: {
    street: string
    number: string
    country: string
  }
  created_at: string
  updated_at?: string
}
