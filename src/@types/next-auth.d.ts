
import { People } from '@/services/people/types'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string,
    name: string,
    email: string,
    user_type: string,
    document?: Document
    status: string
    created_at: Date,
    updated_at: Date,
  }

  interface Session {
    user: User
  }
}
