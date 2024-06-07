import { api } from "../api"
import { Subscriber } from "./types"

export const getSubscriptions = async () => {
    const { data } = await api.get<{subscribers: Subscriber[]}>('/subscriptions')

    return data.subscribers
}