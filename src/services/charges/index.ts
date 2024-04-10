import { api } from "../api"
import { Charges } from "./types"

export const getCharges = async () => {
    const { data } = await api.get<{charges: Charges[]}>('/charges?merchant_id=MERCHANT_TEST_ID')

    return data.charges
  }