import { Plans } from "./types"
import { apiGateway } from "@/services/apiGateway"

export const getPlans = async () => {
    const { data } = await apiGateway.get<{plans: Plans[]}>('/plans')

    return data
}