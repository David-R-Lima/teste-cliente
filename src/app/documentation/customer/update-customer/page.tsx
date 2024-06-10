import { Body } from "../../components/body";
import { Header } from "../../components/header";
import { Patch } from "../../components/http-methods";
import { PathParams } from "../../components/parameters";
import { BodyProps } from "../../type";

const path: BodyProps = {
    properties: [
        {
            name: "id",
            type: "string",
            description: "Id do cliente",
            required: true,
        }
    ]
}

const data: BodyProps = {
    properties: [
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
            name: "address",
            type: "object",
            description: "Endereço do cliente",
            required: false,
            additionalProperties: [
                {
                    name: "street",
                    type: "string",
                    description: "Rua do endereço",
                    required: true,
                },
                {
                    name: "number",
                    type: "string",
                    description: "Número do endereço",
                    required: true,
                },
                {
                    name: "complement",
                    type: "string",
                    description: "Complemento do endereço",
                    required: false,
                },
                {
                    name: "neighborhood",
                    type: "string",
                    description: "Bairro do endereço",
                    required: true,
                },
                {
                    name: "zip_code",
                    type: "string",
                    description: "CEP do endereço",
                    required: true,
                },
                {
                    name: "city",
                    type: "string",
                    description: "Cidade do endereço",
                    required: true,
                },
                {
                    name: "state",
                    type: "string",
                    description: "Estado do endereço",
                    required: true,
                },
                {
                    name: "country",
                    type: "string",
                    description: "País do endereço. Ex: BR",
                    required: true,
                }
            ]
        }
    ]
}


export default function CreateCustomer() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Criar cliente</h1>

            <div className="flex space-x-2 items-center">
                <h1><Patch></Patch></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/customers/:id</p>
            </div>

            <div>
                <h1>Utilize este endpoint para atualizar os dados de um cliente</h1>
            </div>
            <hr />
            <Header></Header>
            <PathParams properties={path.properties}></PathParams>
            <Body properties={data.properties}></Body>
        </div>
    )
}