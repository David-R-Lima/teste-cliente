import { z } from 'zod'

export enum AccountBankType {
  CHECKING_ACCOUNT = 'CHECKING_ACCOUNT',
  SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
  SALARY_ACCOUNT = 'SALARY_ACCOUNT',
  PAYMENT_ACCOUNT = 'PAYMENT_ACCOUNT',
}

export const createBankAccountBodySchema = z.object({
  bank_branch: z
    .string({
      required_error: 'Bank branch is required',
    })
    .max(8, {
      message: 'bank branch must be less than 8 caracters',
    })
    .min(1, {
      message: 'Bank branch is required',
    }),
  account_bank_type: z.nativeEnum(AccountBankType, {
    invalid_type_error: 'Invalid account type',
    required_error: 'Account type is required',
  }),
  account_number: z
    .string({
      required_error: 'Account number is required',
    })
    .max(20, {
      message: 'account number must be less than 20 caracters',
    })
    .min(1, {
      message: 'Account number is required',
    }),
  account_digit: z
    .string({
      required_error: 'Account digit is required',
    })
    .max(5, {
      message: 'account digit must be less than 5 caracters',
    })
    .min(1, {
      message: 'Account digit is required',
    }),
  bank_code: z.coerce
    .number({
      required_error: 'Bank code is required',
    })
    .min(1, {
      message: 'Bank code is required',
    }),
  is_default: z.boolean().optional().default(true),
})

export interface BankAccount {
  id: string
  bank_branch: string
  account_number: string
  bank_code: number
  account_digit: number
  account_bank_type: AccountBankType
  merchant_id: string
  created_at: Date
  updated_at: Date | null
}
