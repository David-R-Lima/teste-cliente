export enum PeriodType {
  MONTHLY = 'MENSAL',
  ANNUALLY = 'ANUAL',
}

export interface Plans {
  id: string
  name: string
  value: number
  description: string
  period_type: PeriodType
  is_test_period: boolean
  test_days: number
  external: string
  created_at: string
  updated_at: string
}
