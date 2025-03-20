'use client'
import {
  Home,
  Users,
  Webhook,
  DollarSign,
  List,
  Ticket,
  FileText,
  Link2,
  User,
  SlidersHorizontal,
  ArrowLeftRight,
  ClipboardList,
  Apple,
} from 'lucide-react'
import { SidebarButton } from './sidebar-button'
import { ExitComponent } from './exit-component'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Link from 'next/link'
import { Button } from './ui/button'

export function SideBar() {
  const groupOne = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: <Home className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/minha-conta',
      label: 'Minha Conta',
      icon: <User className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/transfers',
      label: 'Transferências',
      icon: <ArrowLeftRight className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/relatorios',
      label: 'Relatórios',
      icon: <FileText className="h-6 w-6 sidebar-icon shrink-0" />,
    },
  ]

  const groupTwo = [
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
      icon: <ClipboardList className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/order',
      label: 'Pedidos',
      icon: <Link2 className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/cupons',
      label: 'Cupons',
      icon: <Ticket className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/products',
      label: 'Produtos',
      icon: <Apple className="h-6 w-6 sidebar-icon shrink-0" />,
    },
  ]

  const groupThree = [
    {
      href: '/dashboard/webhooks',
      label: 'Webhooks',
      icon: <Webhook className="h-6 w-6 sidebar-icon shrink-0" />,
    },

    {
      href: '/dashboard/settings',
      label: 'Configurações',
      icon: <SlidersHorizontal className="h-6 w-6 sidebar-icon shrink-0" />,
    },
  ]

  return (
    <div
      className={`flex flex-col pt-4 bg-primary-foreground w-full h-[100vh] z-50`}
    >
      <div className="my-4 w-full">
        {groupOne.map((item, index) => (
          <SidebarButton
            href={item.href}
            icon={item.icon}
            label={item.label}
            key={index}
          ></SidebarButton>
        ))}
      </div>
      <div className="px-4">
        <hr />
      </div>
      <div className="my-4">
        {groupTwo.map((item, index) => (
          <SidebarButton
            href={item.href}
            icon={item.icon}
            label={item.label}
            key={index}
          ></SidebarButton>
        ))}
      </div>
      <div className="px-4">
        <hr />
      </div>
      <div className="my-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={`flex justify-start px-[2.5rem] bg-primary-foreground text-secondary w-full h-[3rem] space-x-4 hover:bg-white text-sm rounded-none`}
            >
              <SlidersHorizontal className="h-6 w-6 sidebar-icon shrink-0" />
              <span className="font-bold text-">Configurações</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white w-full">
            <Link
              href={'/dashboard/webhooks'}
              className={`flex items-center px-[2.5rem] hover:bg-primary-foreground text-secondary w-full h-[3rem] space-x-4 hover:bg-white`}
            >
              <Webhook className="h-6 w-6 sidebar-icon shrink-0" />
              <span className="font-bold">Webhooks</span>
            </Link>
            <Link
              href={'/dashboard/settings'}
              className={`flex items-center px-[2.5rem] hover:bg-primary-foreground text-secondary w-full h-[3rem] space-x-4 hover:bg-white`}
            >
              <SlidersHorizontal className="h-6 w-6 sidebar-icon shrink-0" />
              <span className="font-bold">Parâmetros</span>
            </Link>
          </PopoverContent>
        </Popover>
        <ExitComponent></ExitComponent>
      </div>
    </div>
  )
}
