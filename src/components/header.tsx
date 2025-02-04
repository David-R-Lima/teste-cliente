'use client'

import { ChevronDown, ChevronUp, Package2 } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { signOut, useSession } from 'next-auth/react'
import { SendMail } from './send-mail-dialog'
import { UserConfigDialog } from './user-config-dialog'
import { useRouter } from 'next/navigation'
import { User } from '@/services/user/types'
import { deleteCookie } from 'cookies-next'
import { useQueryClient } from '@tanstack/react-query'
import { MobileSideBar } from './mobile-side-bar'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const session = useSession()

  const router = useRouter()

  const queryClient = useQueryClient()

  return (
    <header className="fixed w-full items-center flex justify-between px-10 py-2 bg-primary h-[4rem] z-50">
      <MobileSideBar></MobileSideBar>
      <Link
        href="/"
        className={`flex items-center gap-2 font-semibold text-secondary ml-6 md:ml-0`}
      >
        <Package2 className="h-6 w-6" />
        <span className="font-bold">PagBttis</span>
      </Link>

      <DropdownMenu onOpenChange={handleToggle}>
        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
          <div className="flex items-center space-x-4 px-4 rounded-lg">
            <Label className="hover:cursor-pointer text-secondary">
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
          <DropdownMenuSeparator />
          <SendMail merchantId={session.data?.user.id ?? ''}>
            <DropdownMenuItem
              className="hover:cursor-pointer hover:text-primary"
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              <p className="hover:cursor-pointer hover:text-primary">Suporte</p>
            </DropdownMenuItem>
          </SendMail>
          <DropdownMenuItem>
            <Link href={'/status'}>
              <p className="hover:cursor-pointer hover:text-primary w-full">
                Serviços
              </p>
            </Link>
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
    </header>
  )
}
