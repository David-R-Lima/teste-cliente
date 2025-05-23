import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactQueryProvider } from '@/components/providers/react-query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'sonner'
import { NextAuthSessionProvider } from '@/components/providers/next-auth-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionValidator } from '@/components/session-validator'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pagbttis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextAuthSessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SessionValidator></SessionValidator>
              {children}
              <Toaster />
            </ThemeProvider>
          </NextAuthSessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
