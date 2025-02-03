'use client'

import { ApiKeys } from '@/components/api-keys'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { getMerchantBalanceReport } from '@/services/reports/merchant/get-balance-report'
import Header from '@/components/header'
import { getCookie } from 'cookies-next'
import { SideBar } from '@/components/side-bar'
interface Props {
  children: JSX.Element
}
interface IbalanceResponseProps {
  balance: {
    balanceCurrent: string
  }
}

export default function DashboardLayout({ children }: Props) {
  const [isExpired, setIsExpired] = useState(false)
  const session = useSession()

  useEffect(() => {
    if (session.status === 'authenticated') {
      const token = getCookie('access_token.hub')
      if (token) {
        let payload
        const parts = token.split('.')
        try {
          payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'))
        } catch (e) {
          setIsExpired(true)
          return
        }
        // Buscar o saldo
        // const fetchBalance = async () => {
        //   const response: IbalanceResponseProps | null =
        //     await getMerchantBalanceReport()

        //   if (response) {
        //     setBalance(response.balance.balanceCurrent)
        //   }
        // }
        // fetchBalance()

        const expiryTime = payload.exp * 1000 // Ensure the timestamp is in milliseconds
        const now = Date.now()
        const timeRemaining = expiryTime - now

        if (timeRemaining <= 0) {
          setIsExpired(true)
        } else {
          const timeoutId = setTimeout(() => {
            setIsExpired(true)
          }, timeRemaining)

          return () => clearTimeout(timeoutId)
        }
      }
    }
  }, [session, session.status])

  return (
    <div className="flex flex-col min-h-screen">
      {isExpired && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>A sua sessão expirou!</AlertDialogTitle>
              <AlertDialogDescription>
                Para continuar usando o dashboard, porfavor realize o login
                novamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => signOut()}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Header></Header>
      <div className="flex mt-[4rem]">
        <div className="w-[15vw]">
          <SideBar open={true}></SideBar>
        </div>
        <div className="flex flex-col flex-1">
          {/* <div className="gap-4 p-4 lg:gap-6 lg:p-6">
            <ApiKeys />
          </div> */}
          <hr />
          <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
