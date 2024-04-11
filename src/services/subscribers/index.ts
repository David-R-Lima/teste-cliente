import { api } from "../api"
import { Subscriber } from "./types"

export const getSubscriptions = async () => {
    const { data } = await api.get<{subscribers: Subscriber[]}>('/subscriptions?merchant_id=MERCHANT_TEST_ID')
    console.log('data: ', data);

    return data.subscribers
}