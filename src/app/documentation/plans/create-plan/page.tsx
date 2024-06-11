import { Body } from "../../components/body";
import { Header } from "../../components/header";
import { Post } from "../../components/http-methods";
import { BodyProps } from "../../type";


const data: BodyProps[] = [
    {
        name: "name",
        type: "string",
        description: "Nome do plano",
        required: true,
    },
    {
        name: "value",
        type: "number",
        description: "Valor do plano",
        required: true,
    },
    {
        name: "description",
        type: "string",
        description: "Descrição do plano",
        required: true,
    },
    {
        name: "external_id",
        type: "string",
        description: "Id externo do plano",
        required: false,
    },
    {
        name: "is_test_period",
        type: "boolean",
        description: "Status do plano",
        required: true,
    },
    {
        name: "test_days",
        type: "number",
        description: "Dias de teste do plano",
        required: false,
    },
    {
        name: "period_type",
        type: "string",
        description: "Tipo de período do plano. Ex: MENSAL | ANUAL",
        required: true,
    }
]


export default function CreatePlan() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Criar plano de assinatura</h1>

            <div className="flex space-x-2 items-center">
                <h1><Post></Post></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/plans</p>
            </div>

            <div>
                <h1>Utilize este endpoint para criar um plano de assinatura, você vai precisar de um plano criado para criar assinaturas para seus clientes</h1>
            </div>
            <hr />
            <Header></Header>
            <Body properties={data}></Body>
        </div>
    )
}