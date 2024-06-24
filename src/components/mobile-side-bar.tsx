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
  Webhook,
  List,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileSideBar() {
  const path = usePathname().split('/')
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-[80vw]">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">PagBttis</span>
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
            href={'/dashboard/webhooks'}
            className={`flex items-center gap-3 rounded-lg py-2 ${path[2] === 'webhooks' ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
          >
            <Webhook className="h-4 w-4" />
            Web hooks
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
