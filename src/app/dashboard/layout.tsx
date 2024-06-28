'use client'
import Link from 'next/link'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Package2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ApiKeys } from '@/components/api-keys'
import { SideBar } from '@/components/side-bar'
import { MobileSideBar } from '@/components/mobile-side-bar'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { ThemePickerHeader } from '@/components/theme-picker-header'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { UserConfigDialog } from '@/components/user-config-dialog'
import { User } from '@/services/user/types'
import { deleteCookie } from 'cookies-next'
import { useQueryClient } from '@tanstack/react-query'
interface Props {
  children: JSX.Element
}

export default function DashboardLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const session = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSideBarOpen = () => {
    setSideBarOpen(!sideBarOpen)
  }

  return (
    <div className="flex min-h-screen">
      <div
        className={`hidden xl:block transition-all duration-500 ${sideBarOpen ? 'w-64' : 'w-16'} bg-muted/40 border-r flex flex-col sidebar`}
      >
        <div className="flex items-center justify-between h-14 px-4 lg:h-16">
          <Link
            href="/"
            className={`flex items-center gap-2 font-semibold hover:text-primary ${!sideBarOpen && 'hidden'}`}
          >
            <Package2 className="h-6 w-6" />
            <span>PagBttis</span>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-8 w-8 hover:border-2 hover:border-primary hover:text-primary"
            onClick={handleSideBarOpen}
          >
            {sideBarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        <SideBar open={sideBarOpen} />
      </div>
      <div className="flex flex-col flex-1">
        <header className="relative flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-16 lg:px-6">
          <MobileSideBar />
          <DropdownMenu onOpenChange={handleToggle}>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
              <div className="flex items-center space-x-4 px-4 rounded-lg hover:bg-secondary">
                <Label className="p-4">Olá {session.data?.user?.name}</Label>
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
                Suporte
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
                Documentação
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
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="gap-4 p-4 lg:gap-6 lg:p-6">
          <ApiKeys />
        </div>
        <hr />
        <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
