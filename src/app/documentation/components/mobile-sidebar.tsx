import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Post, Get, Patch, Delete } from '../components/http-methods'

export function MobileDocumentationSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <div className={`p-4 space-y-2 overflow-auto max-h-[100%]`}>
          <div className="flex items-center justify-center space-x-2 max-w-[18rem] overflow-auto">
            <Input className="max-w-[20rem]"></Input>
            {/* <ChevronLeft className="hover:cursor-pointer"></ChevronLeft> */}
          </div>
          <div className="space-y-1">
            <h1 className="font-bold">Clientes</h1>
            <Link
              href="/documentation/customer/create-customer"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Post />
              <p className="text-sm">Criar cliente</p>
            </Link>
            <Link
              href="/documentation/customer/get-customers"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar clientes</p>
            </Link>
            <Link
              href="/documentation/customer/get-customer-by-id"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar cliente pelo id</p>
            </Link>
            <Link
              href="/documentation/customer/inactivate-customer"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Delete />
              <p className="text-sm">Inativar cliente</p>
            </Link>
            <Link
              href="/documentation/customer/update-customer"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Patch />
              <p className="text-sm">Atualizar cliente</p>
            </Link>
          </div>
          <hr />
          <div className="space-y-1">
            <h1 className="font-bold">Cartões</h1>
            <Link
              href="/documentation/credit-cards/create-credit-card"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Post />
              <p className="text-sm">Criar cartão</p>
            </Link>
            <Link
              href="/documentation/credit-cards/get-credit-card-by-id"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar cartão</p>
            </Link>
            <Link
              href="/documentation/credit-cards/delete-credit-card"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Delete />
              <p className="text-sm">Deletar cartão</p>
            </Link>
          </div>
          <hr />
          <div className="space-y-1">
            <h1 className="font-bold">Cobranças</h1>
            <Link
              href="/documentation/charges/create-charge"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Post />
              <p className="text-sm">Criar cobrança</p>
            </Link>
            <Link
              href="/documentation/charges/get-charges"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar cobranças</p>
            </Link>
            <Link
              href="/documentation/charges/get-charge-by-id"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar cobrança pelo id</p>
            </Link>
            <Link
              href="/documentation/charges/capture-charge"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Post />
              <p className="text-sm">Capturar cobrança</p>
            </Link>
            <Link
              href="/documentation/charges/refund-charge"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Post />
              <p className="text-sm">Estornar cobrança</p>
            </Link>
          </div>
          <hr />
          <div className="space-y-1">
            <h1 className="font-bold">Planos</h1>
            <Link
              href="/documentation/plans/create-plan"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Post />
              <p className="text-sm">Criar plano</p>
            </Link>
            <Link
              href="/documentation/plans/get-plan-by-id"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar plano pelo id</p>
            </Link>
            <Link
              href="/documentation/plans/get-plans"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar planos</p>
            </Link>
          </div>
          <hr />
          <div className="space-y-1">
            <h1 className="font-bold">Recorrência</h1>
            <Link
              href="/documentation/recurrences/create-signature"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Post />
              <p className="text-sm">Criar assinatura</p>
            </Link>
            <Link
              href="/documentation/recurrences/get-signature-by-id"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar recorrência pelo id</p>
            </Link>
            <Link
              href="/documentation/recurrences/get-signatures"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar recorrências</p>
            </Link>
            <Link
              href="/documentation/recurrences/delete-signature"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Delete />
              <p className="text-sm">Deletar assinatura</p>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
