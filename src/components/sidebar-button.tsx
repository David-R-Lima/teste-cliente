'use client'

import Link from 'next/link'

interface Props {
  href: string
  icon: JSX.Element
  label: string
}

export function SidebarButton({ href, icon, label }: Props) {
  return (
    <Link
      key={href}
      href={href}
      className={`flex items-center px-[2.5rem] bg-primary-foreground text-secondary w-full h-[3rem] space-x-4 hover:bg-white text-sm`}
    >
      {icon}
      <span className="font-bold">{label}</span>
    </Link>
  )
}
