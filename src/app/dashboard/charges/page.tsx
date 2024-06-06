'use client'

import { TableComponent } from "@/components/table";
import { getCharges } from "@/services/charges";
import { useQuery } from "@tanstack/react-query";
import { ChargesColumns } from "./charges-columns";
import { useEffect, useState } from "react";

export default function ChargesComponent() {
    const columns = ChargesColumns()
    const [page, setPage] = useState<number>(1)

    const { data, isLoading} = useQuery({
        queryKey: ['charges', page],
        queryFn: getCharges,
        retry: 0,
    })

    const charges = data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TableComponent name={"Cobranças"} columns={columns} data={charges} page={page} setPage={setPage}/>
        </div>
    );
}