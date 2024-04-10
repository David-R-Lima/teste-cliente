"use client"

import { TableComponent } from "@/components/table";
import { CustomersColumns } from "./customer-columns";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customers";

export default function CustomersComponent() {
    const columns = CustomersColumns()

    const { data, isLoading} = useQuery({
        queryKey: ['tone-voices'],
        queryFn: getCustomers,
        retry: 0,
    })

    const customers = data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TableComponent name={"Clientes"} columns={columns} data={customers} />
        </div>
    );
}