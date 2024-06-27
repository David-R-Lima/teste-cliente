export enum Brand {
  AMERICAN_EXPRESS = 'AMEX',
  MASTERCARD = 'MASTERCARD',
  VISA = 'VISA',
  ELO = 'ELO',
}

export interface Card {
  id: string
  brand: Brand
  first_six_digits: number
  last_four_digits: number
  customer_id: string
  created_at: string
  updated_at: string
}
