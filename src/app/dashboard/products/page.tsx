"use client"

import { TableComponent } from "@/components/table";
import { CardProducts } from "./card";
import { PlansColumns } from "./plans-columns";
import { Plans } from "@/services/products/plans/types";
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "@/services/products/plans";
import { useState } from "react";

export default function ProductsComponent() {
    const columns = PlansColumns()
    const [page, setPage] = useState<number>(1)

    const { data } = useQuery({
        queryKey: ["plans", page],
        queryFn: getPlans
    })

    if(data?.plans) {
        return (
            <div className="flex flex-col space-y-6">
                <CardProducts></CardProducts>
                <TableComponent name="Planos" columns={columns} data={data.plans} page={page} setPage={setPage}></TableComponent>
            </div>
        )
    }


}