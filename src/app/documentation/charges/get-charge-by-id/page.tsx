import { Header } from "../../components/header";
import { Get, Post } from "../../components/http-methods";
import { PathParams } from "../../components/parameters";
import { BodyProps } from "../../type";

const data: BodyProps[] = [
    {
        name: "charge_id",
        type: "string",
        description: "Id da cobrança",
        required: true,
    }
]


export default function GetChargeById() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Buscar cobrança por id</h1>

            <div className="flex space-x-2 items-center">
                <h1><Get></Get></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/charges/:charge_id</p>
            </div>

            <div>
                <h1>Utilize este endpoint para buscar uma cobrança</h1>
            </div>
            <hr />
            <Header></Header>
            <PathParams properties={data}></PathParams>
        </div>
    )
}