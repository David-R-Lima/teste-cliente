"use client"

import { SubscribersColumns } from "./subscribers-columns";
import { TableComponent } from "@/components/table";
import { getSubscriptions } from "@/services/subscribers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function CustomersComponent() {

    const columns = SubscribersColumns()
    const [page, setPage] = useState<number>(1)

    const { data, isLoading} = useQuery({
        queryKey: ["subscriber", page],
        queryFn: getSubscriptions,
        retry: 0,
    })

    const subscribers = data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <TableComponent name="Assinantes" columns={columns} data={subscribers} page={page} setPage={setPage}></TableComponent>
    );
}