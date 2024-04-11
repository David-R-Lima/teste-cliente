"use client"

import { TableComponent } from "@/components/table";
import { CardProducts } from "./card";
import { PlansColumns } from "./plans-columns";
import { Plans } from "@/services/products/plans/types";

export default function ProductsComponent() {
    const columns = PlansColumns()

    const data: Plans[] = [
        {
            id: "plan-001",
            name: "Basic Plan",
            description: "A basic plan with minimum features.",
            period_type: "monthly",
            is_test_period: true,
            test_days: 14,
            external: "basic-external-id",
            created_at: "2023-01-01T00:00:00Z",
            updated_at: "2023-01-15T00:00:00Z"
        },
        {
            id: "plan-002",
            name: "Standard Plan",
            description: "A standard plan with added features.",
            period_type: "annually",
            is_test_period: false,
            test_days: 0,
            external: "standard-external-id",
            created_at: "2023-02-01T00:00:00Z",
            updated_at: "2023-02-20T00:00:00Z"
        },
        {
            id: "plan-003",
            name: "Premium Plan",
            description: "All features included in the premium package.",
            period_type: "monthly",
            is_test_period: false,
            test_days: 0,
            external: "premium-external-id",
            created_at: "2023-03-01T00:00:00Z",
            updated_at: "2023-03-15T00:00:00Z"
        }
    ]

    return (
        <div className="flex flex-col space-y-6">
            <CardProducts></CardProducts>
            <TableComponent name="Planos" columns={columns} data={data}></TableComponent>
        </div>
    )
}