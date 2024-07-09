import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Post, Get, Patch, Delete } from './components/http-methods'
import { ThemePicker } from '@/components/theme-picker'
import { MobileDocumentationSidebar } from './components/mobile-sidebar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <header className="relative flex h-[8vh] p-8 border-b-2 items-center justify-between w-full">
        <p className="hidden lg:block text-primary text-2xl">PagBttis</p>
        <div className="flex space-x-4 text-center justify-center">
          <p className="hover:underline hover:text-primary">
            <Link href={'#'}>Suporte</Link>
          </p>
          <p className="hover:underline hover:text-primary">
            <Link href={'/documentation'}>Documentação</Link>
          </p>
          <p className="hover:underline hover:text-primary">
            <Link href={'/login'}>Acessar dashboard</Link>
          </p>
        </div>
        <div className="absolute right-4 -bottom-14">
          <ThemePicker />
        </div>
      </header>
      <div className="relative flex justify-center">
        <div
          className={`hidden lg:block lg:absolute top-2 left-2 mr-[10rem] w-[20vw] p-4 space-y-2 border-r-2`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Input></Input>
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
            <Link
              href="/documentation/credit-cards/get-encryption-key"
              className="flex space-x-2 items-center p-2 hover:cursor-pointer"
            >
              <Get />
              <p className="text-sm">Buscar token de criptografia</p>
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
        <div className="absolute top-2 left-2 flex lg:hidden">
          <MobileDocumentationSidebar></MobileDocumentationSidebar>
        </div>
        <div className="mt-20 lg:mt-0 lg:ml-[20rem] xl:ml-[24rem] lg:p-10 lg:w-[80vw]">
          {children}
        </div>
      </div>
    </div>
  )
}
