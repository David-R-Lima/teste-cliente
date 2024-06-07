import Link from "next/link";
import { SideBar } from "./side-bar";

export default function Documentation() {
    return (
        <div>
            <header className="flex h-[8vh] p-8 border-b-2 items-center justify-between">
                <p className="text-primary text-2xl">PagBttis</p>
                <div className="flex space-x-4">
                    <p className="hover:underline hover:text-primary"><Link href={"#"}>Suporte</Link></p>
                    <p className="hover:underline hover:text-primary"><Link href={"#"}>Documentação</Link></p>
                    <p className="hover:underline hover:text-primary"><Link href={"/login"}>Acessar dashboard</Link></p>
                </div>
            </header>
            <div className="w-[10vw] h-full">
            <SideBar></SideBar>
            </div>
        </div>
    )
}