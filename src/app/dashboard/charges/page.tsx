'use client'

import { TableComponent } from "@/components/table";
import { getCharges } from "@/services/charges";
import { useQuery } from "@tanstack/react-query";
import { ChargesColumns } from "./charges-columns";

export default function ChargesComponent() {
    const columns = ChargesColumns()

    const { data, isLoading} = useQuery({
        queryKey: ['tone-voices'],
        queryFn: getCharges,
        retry: 0,
    })

    const charges = data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TableComponent name={"Cobranças"} columns={columns} data={charges} />
        </div>
    );
}