import { Header } from "../../components/header";
import { Get } from "../../components/http-methods";
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
        code: 200,
        properties: [
            {
                name: "customer",
                type: "object",
                description: "Dados do cliente",
                required: false,
                additionalProperties: [
                    {
                        name: "id",
                        type: "string",
                        description: "Id do cliente",
                        required: false,
                    },
                    {
                        name: "name",
                        type: "string",
                        description: "Nome do cliente",
                        required: false,
                    },
                    {
                        name: "email",
                        type: "string",
                        description: "Email do cliente",
                        required: false,
                    },
                    {
                        name: "phone",
                        type: "string",
                        description: "Telefone do cliente",
                        required: false,
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        description: "Status do cliente",
                        required: false,
                    },
                    {
                        name: "document",
                        type: "object",
                        description: "Documento do cliente",
                        required: false,
                        additionalProperties: [
                            {
                                name: "type",
                                type: "string",
                                description: "Tipo do documento. Ex: CPf | CNPJ",
                                required: false,
                            },
                            {
                                name: "text",
                                type: "string",
                                description: "Número do documento",
                                required: false,
                            },
                            {
                                name: "country",
                                type: "string",
                                description: "País do documento",
                                required: false,
                            }
                        ]
                    },
                    {
                        name: "merchant_id",
                        type: "string",
                        description: "Id do merchant",
                        required: false,
                    },
                    {
                        name: "created_at",
                        type: "Date",
                        description: "Data de criação do cliente",
                        required: false,
                    },
                    {
                        name: "updated_at",
                        type: "Date | undefined",
                        description: "Data de atualização do cliente",
                        required: false,
                    }
                ]
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

export default function GetCustomerById() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Buscar clientes pelo id</h1>

            <div className="flex space-x-2 items-center">
                <h1><Get></Get></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/customers/:id</p>
            </div>

            <div>
                <h1>Utilize este endpoint para buscar um cliente pelo id</h1>
            </div>
            <hr />
            <Header></Header>
            <PathParams properties={data}></PathParams>
            <Response data={responseProps} ></Response>
        </div>
    )
}