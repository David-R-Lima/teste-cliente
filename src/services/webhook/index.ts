import { QueryFunctionContext } from "@tanstack/react-query";
import { api } from "../api";
import { MerchantSetting } from "./types";

interface CreateWebhookRequest {
    str: string;
}

export async function CreateWebhook(request: CreateWebhookRequest) {
    const { data } = await api.post<{merchantSetting: MerchantSetting}>('/merchant-setting', {
            parameter_name: "TX_MER_NOT_PAG",
            str: request.str
    })

    return data.merchantSetting
}

export async function GetWebhook() {
    const { data } = await api.get<{merchantSetting: MerchantSetting}>('/merchant-setting?parameter_name=TX_MER_NOT_PAG')

    return data.merchantSetting

}

export async function UpdateWebhook(request: CreateWebhookRequest) {
    const { data } = await api.put<{merchantSetting: MerchantSetting}>('/merchant-setting', {
            parameter_name: "TX_MER_NOT_PAG",
            str: request.str
    })

    return data.merchantSetting
}