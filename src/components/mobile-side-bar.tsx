'use client'

import { Button } from './ui/button'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Menu,
  Package2,
  Home,
  Package,
  Users,
  DollarSign,
  List,
  Settings,
  Ticket,
  HandCoins,
  FileText,
  Webhook,
  Lock,
  Link2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export function MobileSideBar() {
  const path = usePathname().split('/')
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 shrink-0 xl:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-[80vw] h-[100vh]">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="size-6" />
            <span>PagBttis</span>
          </Link>
          <Link
            href={'/dashboard'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === undefined ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href={'/dashboard/customers'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'customers' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Users className="h-5 w-5" />
            Clientes
          </Link>
          <Link
            href={'/dashboard/charges'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'charges' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <DollarSign className="h-5 w-5" />
            Cobranças
          </Link>
          <Link
            href={'/dashboard/subscribers'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'subscribers' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <List className="h-5 w-5" />
            Assinantes
          </Link>
          <Link
            href={'/dashboard/plans'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'plans' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Package className="h-4 w-4" />
            Planos
          </Link>
          <Link
            href={'/dashboard/transfers'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'transfers' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <HandCoins className="h-4 w-4" />
            Transferências
          </Link>
          <Link
            href={'/dashboard/cupons'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'cupons' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Ticket className="h-4 w-4" />
            Cupons
          </Link>
          <Link
            href={'/dashboard/webhooks'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'webhooks' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Webhook className="h-4 w-4" />
            Webhooks
          </Link>
          <Link
            href={'/dashboard/relatorios'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'relatorios' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <FileText className="h-4 w-4" />
            Relatórios
          </Link>
          <Link
            href={'/dashboard/payment-links'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'payment-links' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Link2 className="h-4 w-4" />
            Links de pagamento
          </Link>
          <Link
            href={'/dashboard/settings'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'settings' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Link>
          <Link
            href={'/painel/admin'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'admin' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Lock className="h-4 w-4" />
            PagBttis area
          </Link>
        </nav>

        {/* <div className="absolute bottom-0 left-0 w-full bg-muted h-10">
          <DropdownMenu onOpenChange={handleToggle}>
            <DropdownMenuTrigger
              asChild
              className="hover:cursor-pointer w-full"
            >
              <div className="flex items-center justify-between space-x-4 px-4 rounded-lg hover:bg-secondary">
                <Label className="p-4 bg-muted rounded-lg">
                  Olá {session.data?.user?.name}
                </Label>
                {isOpen ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ThemePickerHeader />
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:cursor-pointer hover:text-primary">
                <p className="hover:cursor-pointer hover:text-primary">
                  Suporte
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <UserConfigDialog user={session.data?.user as User} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer hover:text-primary"
                onClick={() => {
                  router.push('/documentation')
                }}
              >
                <p className="hover:cursor-pointer hover:text-primary w-full">
                  Documentação
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:cursor-pointer hover:text-primary"
                onClick={async () => {
                  deleteCookie('access_token.hub')
                  deleteCookie('next-auth.callback-url')
                  deleteCookie('next-auth.csrf-token')
                  queryClient.removeQueries()
                  await signOut({ redirect: false })
                  router.push('/')
                }}
              >
                <p className="hover:cursor-pointer hover:text-primary">Sair</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </SheetContent>
    </Sheet>
  )
}
