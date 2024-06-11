import { Body } from "../../components/body";
import { Header } from "../../components/header";
import { Delete } from "../../components/http-methods";
import { BodyProps } from "../../type";


const body: BodyProps[] = [
    {
        name: "customer_id",
        type: "string",
        description: "id do cliente",
        required: true,
    }
]

export default function DeleteSignature() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Cancelar assinatura</h1>

            <div className="flex space-x-2 items-center">
                <h1><Delete></Delete></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/subscriptions</p>
            </div>

            <div>
                <h1>Utilize este endpoint para cancelar uma assinatura para um cliente.</h1>
            </div>
            <hr />
            <Header></Header>
            <Body properties={body}></Body>
        </div>
    )
}