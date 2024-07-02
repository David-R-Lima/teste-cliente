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
// PAGO
// PENDENTE
// PRE_AUTORIZADO
// AUTORIZADO
// ESTORNADO
// RECUSADO
// ESTORNO_PENDENTE
// CANCELADO
// COBRAR_VOLTA
// EM_DISPUTA
// EM_ANALISE

// export enum ChargeStatus {
//   PAID = 'PAID',
//   PENDING = 'PENDING',
//   PRE_AUTHORIZED = 'PRE_AUTHORIZED',
//   AUTHORIZED = 'AUTHORIZED',
//   FAILED = 'FAILED',
//   CANCELED = 'CANCELED',
//   REFUNDED = 'REFUNDED',
//   REFUND_PENDING = 'REFUND_PENDING',
//   CHARGED_BACK = 'CHARGED_BACK',
//   IN_DISPUTE = 'IN_DISPUTE',
//   IN_ANALYSIS = 'IN_ANALYSIS',
// }

export enum ChargeStatus {
  PAID = 'PAGO',
  PENDING = 'PENDENTE',
  PRE_AUTHORIZED = 'PRE_AUTORIZADO',
  AUTHORIZED = 'AUTORIZADO',
  FAILED = 'RECUSADO',
  CANCELED = 'CANCELADO',
  REFUNDED = 'ESTORNADO',
  REFUND_PENDING = 'ESTORNO_PENDENTE',
  CHARGED_BACK = 'COBRAR_VOLTA',
  IN_DISPUTE = 'EM_DISPUTA',
  IN_ANALYSIS = 'EM_ANALISE',
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
