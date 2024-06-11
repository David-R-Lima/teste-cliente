import { Header } from "../../components/header";
import { Delete } from "../../components/http-methods";
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

export default function DeleteCreditCard() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Deletar cartão</h1>

            <div className="flex space-x-2 items-center">
                <h1><Delete></Delete></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/cards/:card_id</p>
            </div>

            <div>
                <h1>Utilize este endpoint para deletar um cartão de um cliente</h1>
            </div>
            <hr />
            <Header></Header>
            <PathParams properties={path.properties}></PathParams>
        </div>
    )
}