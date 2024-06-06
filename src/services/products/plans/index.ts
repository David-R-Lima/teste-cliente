import { api } from "../../api"
import { Plans } from "./types"

export const getPlans = async () => {
    const { data } = await api.get<{plans: Plans[]}>('/plans')

    return data
}