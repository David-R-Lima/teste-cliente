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
} from 'lucide-react'
import { SidebarButton } from './sidebar-button'
import { ExitComponent } from './exit-component'

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
      href: '/dashboard/payment-links',
      label: 'Links de pagamento',
      icon: <Link2 className="h-6 w-6 sidebar-icon shrink-0" />,
    },
    {
      href: '/dashboard/cupons',
      label: 'Cupons',
      icon: <Ticket className="h-6 w-6 sidebar-icon shrink-0" />,
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
        {groupThree.map((item, index) => (
          <SidebarButton
            href={item.href}
            icon={item.icon}
            label={item.label}
            key={index}
          ></SidebarButton>
        ))}
        <ExitComponent></ExitComponent>
      </div>
    </div>
  )
}
