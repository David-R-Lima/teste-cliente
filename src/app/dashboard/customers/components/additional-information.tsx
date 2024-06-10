import { Customers } from "@/services/customers/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import dayjs from "dayjs";
  

interface Props {
 customer: Customers
}

export function AdditionalInformation({ customer }: Props) {
    return (
        <Dialog>
            <DialogTrigger>Info</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Informação adicional</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <div className="space-y-2">
                        <p>Nome: {customer.name}</p>
                        <p>Email: {customer.email}</p>
                        <p>Cpf: {customer.document?.text}</p>
                    </div>
                    <hr />
                    <div>
                        <p>Data de criação: {dayjs(customer.created_at).format("DD/MM/YYYY")}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}