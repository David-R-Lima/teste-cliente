'use client'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  open: boolean
}

export function AdminSideBar({ open }: Props) {
  const path = usePathname().split('/')

  const menuItems = [
    {
      href: '/painel/admin',
      label: 'Relatórios PagBttis',
      icon: <Lock className="h-6 w-6 sidebar-icon shrink-0" />,
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
