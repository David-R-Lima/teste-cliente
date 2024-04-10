"use client"
import { open } from "fs";
import { Home, Package, Users, Webhook, DollarSign } from "lucide-react";
import Link from "next/link"
import { usePathname } from "next/navigation";

interface Props {
    open: boolean
}

export function SideBar({open}: Props) {
    const path = usePathname().split("/")

    if(open) {
        return (
            <div>
                <div>
                    <Link 
                        href={"/dashboard/home"} 
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2] === "home" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                    >
                        <Home className="h-6 w-6" /> 
                        Home
                    </Link>
                </div>
                <div>
                    <Link 
                        href={"/dashboard/customers"} 
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "customers" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                    >
                        <Users className="h-6 w-6" />
                        Clientes
                    </Link>
                </div>
                <div>
                    <Link 
                        href={"/dashboard/charges"} 
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "charges" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                    >
                        <DollarSign className="h-6 w-6" />
                        Cobranças
                    </Link>
                </div>
                <div>
                    <Link 
                        href={"/dashboard/products"} 
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "products" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                    >
                        <Package className="h-6 w-6" />
                        Produtos
                    </Link>
                </div>
                <div>
                    <Link 
                        href={"/dashboard/webhooks"} 
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "webhooks" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                    >
                        <Webhook className="h-6 w-6"/> 
                        Web hooks
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <div>
                <Link 
                    href={"/dashboard/home"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2] === "home" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <Home className="h-6 w-6" /> 
                </Link>
            </div>
            <div>
                <Link 
                    href={"/dashboard/customers"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "customers" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <Users className="h-6 w-6" />
                </Link>
            </div>
            <div>
                <Link 
                    href={"/dashboard/charges"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "charges" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <DollarSign className="h-6 w-6" />
                </Link>
            </div>
            <div>
                <Link 
                    href={"/dashboard/products"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "products" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <Package className="h-6 w-6" />
                </Link>
            </div>
            <div>
                <Link 
                    href={"/dashboard/webhooks"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "webhooks" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <Webhook className="h-6 w-6" /> 
                </Link>
            </div>
        </div>
    )
}