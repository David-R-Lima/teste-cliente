"use client"

import { TableComponent } from "@/components/table";
import { CustomersColumns } from "./customer-columns";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customers";
import { useState } from "react";

export default function CustomersComponent() {
    const columns = CustomersColumns()
    const [page, setPage] = useState<number>(1)

    const { data, isLoading} = useQuery({
        queryKey: ['customers', page],
        queryFn: getCustomers,
        retry: 0,
    })

    const customers = data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TableComponent name={"Clientes"} columns={columns} data={customers} page={page} setPage={setPage}/>
        </div>
    );
}