import { QueryFunctionContext } from "@tanstack/react-query"
import { api } from "../api"
import { Charges } from "./types"

export const getCharges = async (ctx: QueryFunctionContext) => {
  const [, page] = ctx.queryKey
    const { data } = await api.get<{charges: Charges[]}>('/charges?page=' + page)

    return data.charges
  }