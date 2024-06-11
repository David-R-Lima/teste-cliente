import { Header } from "../../components/header";
import { Get } from "../../components/http-methods";
import { QueryParams } from "../../components/query-params";
import { BodyProps } from "../../type";


const data: BodyProps[] = [
    {
        name: "page",
        type: "number",
        description: "Número da página",
        required: true,
    },
]

export default function GetPlans() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Buscar planos</h1>

            <div className="flex space-x-2 items-center">
                <h1><Get></Get></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/plans</p>
            </div>

            <div>
                <h1>Utilize este endpoint para buscar seus planos</h1>
            </div>
            <hr />
            <Header></Header>
            <QueryParams properties={data}></QueryParams>
        </div>
    )
}