import { Header } from "../../components/header";
import { Get } from "../../components/http-methods";

export default function GetSignatures() {
    return (
        <div className="space-y-4 min-w-[50vw]">
            <h1 className="text-2xl">Buscar assinatura pelo id</h1>

            <div className="flex space-x-2 items-center">
                <h1><Get></Get></h1>
                <p className="text-bold">{process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/subscriptions</p>
            </div>

            <div>
                <h1>Utilize este endpoint para buscar todos seus assinantes</h1>
            </div>
            <hr />
            <Header></Header>
        </div>
    )
}