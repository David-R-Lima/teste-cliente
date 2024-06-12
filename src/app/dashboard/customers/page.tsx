"use client"

import { TableComponent, TableComponentError, TableComponentSkeleton } from "@/components/table";
import { CustomersColumns } from "./customer-columns";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customers";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";

export default function CustomersComponent() {
    const columns = CustomersColumns()
    const [page, setPage] = useState<number>(1)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['customers', page],
        queryFn: getCustomers,
        retry: 0,
    })

    const customers = data ?? [];

    if(isLoading) return <TableComponentSkeleton />

    if(isError) return <TableComponentError />

    return (
        <div className="space-y-4">
            <div className="flex space-x-4">
                <Button className="space-x-2"><Filter /><p>Filtros</p></Button>
                <Button className="space-x-2"><Plus/><p>Cliente</p></Button>
            </div>
            <TableComponent name={"Clientes"} columns={columns} data={customers} page={page} setPage={setPage}/>
        </div>
    );
}