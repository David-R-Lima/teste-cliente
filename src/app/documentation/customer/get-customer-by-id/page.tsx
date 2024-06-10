import { Header } from "../../components/header";
import { Get } from "../../components/http-methods";
import { PathParams } from "../../components/parameters";
import { BodyProps } from "../../type";


const data: BodyProps = {
    properties: [
        {
            name: "id",
            type: "string",
            description: "Id do cliente",
            required: true,
        }
    ]
}


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
            <PathParams properties={data.properties}></PathParams>
        </div>
    )
}