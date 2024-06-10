import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Post, Get, Patch, Delete } from "./components/http-methods";
import { ThemePickerHeader } from "@/components/theme-picker-header";
import { ThemePicker } from "@/components/theme-picker";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <div>
            <header className="flex h-[8vh] p-8 border-b-2 items-center justify-between">
                <p className="text-primary text-2xl">PagBttis</p>
                <div className="relative flex space-x-4 text-center justify-center">
                    {/* <ThemePicker  /> */}
                    <p className="hover:underline hover:text-primary"><Link href={"#"}>Suporte</Link></p>
                    <p className="hover:underline hover:text-primary"><Link href={"/documentation"}>Documentação</Link></p>
                    <p className="hover:underline hover:text-primary"><Link href={"/login"}>Acessar dashboard</Link></p>
                </div>
            </header>
        <div className="flex">

            <div className={`w-[20rem] p-4 space-y-2 border-r-2`}>
                    <div className="flex items-center justify-center space-x-2">
                        <Input></Input>
                        {/* <ChevronLeft className="hover:cursor-pointer"></ChevronLeft> */}
                    </div>
                    <div className="space-y-1">
                        <h1 className="font-bold">Customers</h1>
                        <a href="/documentation/customer/create-customer" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Post/>
                            <p className="text-sm">Criar cliente</p>
                        </a>
                        <a href="/documentation/customer/get-customer" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar cliente</p>
                        </a>
                        <a href="/documentation/customer/get-customer-by-id" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar cliente pelo id</p>
                        </a>
                        {/* <a href="/documentation/customer/get-customer-cards" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar cartões do cliente</p>
                        </a> */}
                        <a href="/documentation/customer/inactivate-customer" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Delete/>
                            <p className="text-sm">Inativar cliente</p>
                        </a>
                        <a href="/documentation/customer/update-customer" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Patch/>
                            <p className="text-sm">Atualizar cliente</p>
                        </a>
                    </div>
                    <hr />
                    <div className="space-y-1">
                        <h1 className="font-bold">Cartões</h1>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Post/>
                            <p className="text-sm">Criar cartão</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar cartão</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Delete/>
                            <p className="text-sm">Deletar cartão</p>
                        </div>
                    </div>
                    <hr />
                    <div className="space-y-1">
                        <h1 className="font-bold">Cobranças</h1>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Post/>
                            <p className="text-sm">Criar cobrança</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar cobranças</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar cobrança pelo id</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Post/>
                            <p className="text-sm">Capturar cobrança</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Post/>
                            <p className="text-sm">Estornar cobrança</p>
                        </div>
                    </div>
                    <hr />
                    <div className="space-y-1">
                        <h1 className="font-bold">Planos</h1>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Post/>
                            <p className="text-sm">Criar plano</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar plano pelo id</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar plano</p>
                        </div>
                    </div>
                    <hr />
                    <div className="space-y-1">
                        <h1 className="font-bold">Recorrência</h1>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Get/>
                            <p className="text-sm">Buscar recorrência</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Post/>
                            <p className="text-sm">Criar assinatura</p>
                        </div>
                        <div className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                            <Delete/>
                            <p className="text-sm">Deletar assinatura</p>
                        </div>
                </div>
            </div>
            <div className="p-10">
                {children}
            </div>
        </div>
        </div>
    )
}