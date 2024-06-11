import { Header } from "../../components/header";
import { Delete } from "../../components/http-methods";
import { PathParams } from "../../components/parameters";
import { Response } from "../../components/response";
import { BodyProps, ResponseProps } from "../../type";


const data: BodyProps[] = [
    {
        name: "id",
        type: "string",
        description: "Id do cliente",
        required: true,
    }
]

const responseProps: ResponseProps[] = [
    {
        code: 204,
        properties: [
            {
                name: "",
                type: "void",
                description: "",
                required: false,
            }
        ]
    },
    {
        code: 400,
        properties: [
            {
                name: "Bad request exection",
                type: "object",
                description: "",
                required: false,
                additionalProperties: [
                    {
                        name: "message",
                        type: "string",
                        description: "Mensagem de erro",
                        required: false,
                    }
                ]
            }
        ]
    },
    {
        code: 404,
        properties: [
            {
                name: "Not found execption",
                type: "object",
                description: "",
                required: false,
                additionalProperties: [
                    {
                        name: "message",
                        type: "string",
                        description: "Mensagem de erro",
                        required: false,
                    }
                ]
            }
        ]
    }
]

export default function InactivateCustomer() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Buscar clientes pelo id</h1>

            <div className="flex space-x-2 items-center">
                <h1><Delete></Delete></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/customers/:id</p>
            </div>

            <div>
                <h1>Utilize este endpoint para inativar um cliente</h1>
            </div>
            <hr />
            <Header></Header>
            <PathParams properties={data}></PathParams>
            <Response data={responseProps} ></Response>
        </div>
    )
}