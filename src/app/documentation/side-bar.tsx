import { Input } from "@/components/ui/input";
import Link from "next/link";

export function SideBar() {
    return (
        <div>
            <div className="space-y-4">
                <Input></Input>
                <Link href={'/documentation/introduction'}></Link>
            </div>
            <div>
                <h1>Clientes</h1>
            </div>
        </div>
    )
}