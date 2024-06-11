import { Body } from "../../components/body";
import { Header } from "../../components/header";
import { Post } from "../../components/http-methods";
import { PathParams } from "../../components/parameters";
import { BodyProps } from "../../type";

const path: BodyProps[] = [
    {
        name: "id",
        type: "string",
        description: "Id do cliente",
        required: true,
    }
]

const data: BodyProps[] = [
    {
        name: "card",
        type: "object",
        description: "Nome do cartão",
        required: true,
        additionalProperties: [
            {
                name: "token",
                type: "string",
                description: "Número do cartão",
                required: true,
            },
            {
                name: "brand",
                type: "string",
                description: "Bandeira do cartão. Ex: MASTERCARD | AMERICAN_EXPRESS | VISA | ELO",
                required: true,
            },
            {
                name: "first_six_digits",
                type: "string",
                description: "Primeiros 6 dígitos do cartão",
                required: true,
            },
            {
                name: "last_four_digits",
                type: "string",
                description: "Últimos 4 dígitos do cartão",
                required: true,
            }
        ]
    }
]


export default function CreateCreditCard() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Cadastrar cartão</h1>

            <div className="flex space-x-2 items-center">
                <h1><Post></Post></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/customers/:id/cards</p>
            </div>

            <div>
                <h1>Utilize este endpoint para cadastrar um cartão de um cliente</h1>
            </div>
            <hr />
            <Header></Header>
            <PathParams properties={path}></PathParams>
            <Body properties={data}></Body>
        </div>
    )
}