import { Body } from "../../components/body";
import { Header } from "../../components/header";
import { Post } from "../../components/http-methods";
import { BodyProps } from "../../type";

const data: BodyProps = {
    properties: [
        {
            name: "customer_id",
            type: "string",
            description: "id do cliente",
            required: false,
        },
        {
            name: "value",
            type: "number",
            description: "Valor total da cobrança",
            required: true,
        },
        {
            name: "invoice_description",
            type: "string",
            description: "Descrição da fatura",
            required: true,
        },
        {
            name: "capture",
            type: "boolean",
            description: "Captura da cobrança",
            required: true,
        },
        {
            name: "description",
            type: "string",
            description: "Descrição da cobrança",
            required: true,
        },
        {
            name: "payment_type",
            type: "string",
            description: "Tipo de pagamento. Ex: CREDIT_CARD | PIX | BOLETO",
            required: true,
        },
        {
            name: "pix_payment_method",
            type: "object",
            description: "Método de pagamento PIX",
            required: false,
            additionalProperties: [
                {
                    name: "expiration_time",
                    type: "number",
                    description: "Tempo de expiração do pix",
                    required: true,
                },
                {
                    name: "items",
                    type: "array",
                    description: "Itens da cobrança",
                    required: true,
                    additionalProperties: [
                        {
                            name: "description",
                            type: "string",
                            description: "Descrição do item",
                            required: true,
                        },
                        {
                            name: "unity_value",
                            type: "number",
                            description: "Valor do item",
                            required: true,
                        },
                        {
                            name: "quantity",
                            type: "number",
                            description: "Quantidade do item",
                            required: true,
                        }
                    ]
                }
            ]
        }
    ]
}


export default function CreateCharge() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Criar cobrança</h1>

            <div className="flex space-x-2 items-center">
                <h1><Post></Post></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/charges</p>
            </div>

            <div>
                <h1>Utilize este endpoint para criar uma cobrança</h1>
            </div>
            <hr />
            <Header></Header>
            <Body properties={data.properties}></Body>
        </div>
    )
}