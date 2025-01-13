import { QueryFunctionContext } from '@tanstack/react-query'
import { Cupom } from './types'
import { formSchemaCupom } from '@/app/dashboard/cupons/components/create-cupom'
import { api } from '../api'
import { resolve } from 'path'

export async function CreateCupom(data: formSchemaCupom) {
  const res = await api.post<{ cupom: Cupom }>('/cupons', {
    ...data,
  })

  return res.data.cupom
}

export async function GetAllCupons(ctx: QueryFunctionContext) {
  const [, page] = ctx.queryKey

  const { data } = await api.get<{ cupons: Cupom[] }>('/cupons?page=' + page)

  return data.cupons
}

export async function ValidateCupom(text: string) {
  return new Promise<number>((resolve) => {
    const randomValue = Math.random() < 0.5 ? 1 : 2 // 50% chance of either 1 or 2
    resolve(randomValue)
  })
}
