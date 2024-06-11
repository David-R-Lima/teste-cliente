import { Header } from "../../components/header";
import { Get } from "../../components/http-methods";
import { PathParams } from "../../components/parameters";
import { BodyProps } from "../../type";

const path: BodyProps[] = [
    {
        name: "card_id",
        type: "string",
        description: "Id do cartão",
        required: true,
    }
]

export default function GetCreditCard() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Buscar cartão pelo id</h1>

            <div className="flex space-x-2 items-center">
                <h1><Get></Get></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/cards/:card_id</p>
            </div>

            <div>
                <h1>Utilize este endpoint para buscar um cartão de um cliente</h1>
            </div>
            <hr />
            <Header></Header>
            <PathParams properties={path}></PathParams>
        </div>
    )
}