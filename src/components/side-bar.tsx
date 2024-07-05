'use client'
import {
  Home,
  Package,
  Users,
  Webhook,
  DollarSign,
  List,
  HandCoins,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  open: boolean
}

export function SideBar({ open }: Props) {
  const path = usePathname().split('/')

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: <Home className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/customers',
      label: 'Clientes',
      icon: <Users className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/charges',
      label: 'Cobranças',
      icon: <DollarSign className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/subscribers',
      label: 'Assinantes',
      icon: <List className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/plans',
      label: 'Planos',
      icon: <Package className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/transfers',
      label: 'Transferências',
      icon: <HandCoins className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/webhooks',
      label: 'Web hooks',
      icon: <Webhook className="h-6 w-6 sidebar-icon shrink-0" />,
    },
  ]

  return (
    <div
      className={`flex flex-col ml-1 sidebar ${open ? 'sidebar-open' : ''}  `}
    >
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2] === item.href.split('/').pop() ? 'text-primary text-lg' : 'text-muted-foreground transition-all hover:text-primary'}`}
        >
          {item.icon}
          <span className={`sidebar-text ${open ? 'block' : 'hidden'}`}>
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  )
}
