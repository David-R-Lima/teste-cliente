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
    }),
  bank_code: z.coerce.number({
    required_error: 'Bank code is required',
  }),
  is_default: z.boolean().optional().default(true),
})
