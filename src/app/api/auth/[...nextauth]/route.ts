import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
// import { decode } from 'next-auth/jwt'
import { apiGateway } from '@/services/apiGateway'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@email.com',
        },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const res = await apiGateway.post('/sessions', {
          email: credentials?.email,
          password: credentials?.password,
        })

        const token = res.data.access_token
        
        cookies().set('access_token.hub', token, {
          expires: dayjs().add(3, 'day').toDate(),
        })

        const session = await apiGateway.get('/users', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })

        // const decodedToken = decode(token)

        const { user } =
          session.data

        if (user) {
          return {
            id: user.id_user,
            name: user.name,
            email: user.email,
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60 * 3, // 3 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
