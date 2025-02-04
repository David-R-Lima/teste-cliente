import { LogOut } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from './ui/alert-dialog'
import { deleteCookie } from 'cookies-next'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

export function ExitComponent() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center px-[2.5rem] bg-primary-foreground text-secondary w-full h-[3rem] space-x-4 hover:bg-white">
        <LogOut className="h-6 w-6 sidebar-icon shrink-0" />
        <p className="font-bold">Sair</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col">
        <h1 className="font-bold text-secondary">Realmente deseja sair?</h1>
        <div className="space-x-4 self-end">
          <AlertDialogAction asChild>
            <button
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-secondary"
              onClick={async () => {
                deleteCookie('access_token.hub')
                deleteCookie('next-auth.callback-url')
                deleteCookie('next-auth.csrf-token')
                queryClient.removeQueries()
                await signOut({ redirect: false })
                router.push('/')
              }}
            >
              Sim
            </button>
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <button className="px-4 py-2 text-secondary hover:text-primary">
              Não
            </button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
