/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    user_type: string
    document?: Document
    status: string
    created_at: Date
    updated_at: Date
    access_token: string
  }

  interface Session {
    user: User
  }
}
