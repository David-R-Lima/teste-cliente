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
            <header className="relative flex h-[8vh] p-8 border-b-2 items-center justify-between">
                <p className="text-primary text-2xl">PagBttis</p>
                <div className="flex space-x-4 text-center justify-center">
                    <p className="hover:underline hover:text-primary"><Link href={"#"}>Suporte</Link></p>
                    <p className="hover:underline hover:text-primary"><Link href={"/documentation"}>Documentação</Link></p>
                    <p className="hover:underline hover:text-primary"><Link href={"/login"}>Acessar dashboard</Link></p>
                </div>
                <div className="absolute right-4 -bottom-14">
                    <ThemePicker/>    
                </div>
            </header>
            <div className="flex">

                <div className={`w-[20rem] p-4 space-y-2 border-r-2`}>
                        <div className="flex items-center justify-center space-x-2">
                            <Input></Input>
                            {/* <ChevronLeft className="hover:cursor-pointer"></ChevronLeft> */}
                        </div>
                        <div className="space-y-1">
                            <h1 className="font-bold">Clientes</h1>
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
                            <a href="/documentation/credit-cards/create-credit-card" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Post/>
                                <p className="text-sm">Criar cartão</p>
                            </a>
                            <a href="/documentation/credit-cards/get-credit-card-by-id" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Get/>
                                <p className="text-sm">Buscar cartão</p>
                            </a>
                            <a href="/documentation/credit-cards/delete-credit-card" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Delete/>
                                <p className="text-sm">Deletar cartão</p>
                            </a>
                        </div>
                        <hr />
                        <div className="space-y-1">
                            <h1 className="font-bold">Cobranças</h1>
                            <a href="/documentation/charges/create-charge" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Post/>
                                <p className="text-sm">Criar cobrança</p>
                            </a>
                            <a href="/documentation/charges/get-charges" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Get/>
                                <p className="text-sm">Buscar cobranças</p>
                            </a>
                            <a href="/documentation/charges/get-charge-by-id" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Get/>
                                <p className="text-sm">Buscar cobrança pelo id</p>
                            </a>
                            <a href="/documentation/charges/capture-charge" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Post/>
                                <p className="text-sm">Capturar cobrança</p>
                            </a>
                            <a href="/documentation/charges/refund-charge" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Post/>
                                <p className="text-sm">Estornar cobrança</p>
                            </a>
                        </div>
                        <hr />
                        <div className="space-y-1">
                            <h1 className="font-bold">Planos</h1>
                            <a href="/documentation/plans/create-plan" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Post/>
                                <p className="text-sm">Criar plano</p>
                            </a>
                            <a href="/documentation/plans/get-plan-by-id" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Get/>
                                <p className="text-sm">Buscar plano pelo id</p>
                            </a>
                            <a href="/documentation/plans/get-plans" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Get/>
                                <p className="text-sm">Buscar planos</p>
                            </a>
                        </div>
                        <hr />
                        <div className="space-y-1">
                            <h1 className="font-bold">Recorrência</h1>
                            <a href="/documentation/recurrences/create-signature" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Post/>
                                <p className="text-sm">Criar assinatura</p>
                            </a>
                            <a href="/documentation/recurrences/get-signature-by-id" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Get/>
                                <p className="text-sm">Buscar recorrência pelo id</p>
                            </a>
                            <a href="/documentation/recurrences/get-signatures" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Get/>
                                <p className="text-sm">Buscar recorrências</p>
                            </a>
                            <a href="/documentation/recurrences/delete-signature" className="flex space-x-2 items-center p-2 hover:cursor-pointer">
                                <Delete/>
                                <p className="text-sm">Deletar assinatura</p>
                            </a>
                    </div>
                </div>
                <div className="p-10">
                    {children}
                </div>
            </div>
        </div>
    )
}