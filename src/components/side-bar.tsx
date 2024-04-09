"use client"
import { Package2, Bell, Home, ShoppingCart, Badge, Package, Users, LineChart, Webhook, DollarSign } from "lucide-react";
import Link from "next/link"
import { useParams } from "next/navigation";

export function SideBar() {
    const param = useParams()
    return (
        <div>
            <div>
                <Link href={"/dashboard/home"} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${param.item === "home" ? "text-primary" : "text-muted-foreground transition-all hover:text-primary"}`}>
                    <Home className="h-4 w-4" /> 
                    Home
                </Link>
            </div>
            <div>
                <Link href={"/dashboard/clientes"} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${param.item === "clientes" ? "text-primary" : "text-muted-foreground transition-all hover:text-primary"}`}>
                    <Users className="h-4 w-4" />
                    Clientes
                </Link>
            </div>
            <div>
                <Link href={"/dashboard/cobrancas"} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${param.item === "cobrancas" ? "text-primary" : "text-muted-foreground transition-all hover:text-primary"}`}>
                    <DollarSign className="h-4 w-4" />
                    Cobranças
                </Link>
            </div>
            <div>
                <Link href={"/dashboard/produtos"} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${param.item === "produtos" ? "text-primary" : "text-muted-foreground transition-all hover:text-primary"}`}>
                    <Package className="h-4 w-4" />
                    Produtos
                </Link>
            </div>
            <div>
                <Link href={"/dashboard/webhooks"} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${param.item === "webhooks" ? "text-primary" : "text-muted-foreground transition-all hover:text-primary"}`}>
                    <Webhook className="h-4 w-4"/> 
                    Web hooks
                </Link>
            </div>
        </div>
    )
}