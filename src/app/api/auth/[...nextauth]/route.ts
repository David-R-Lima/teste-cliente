import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import { apiGateway } from '@/services/apiGateway'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        code: {
          label: 'Code',
          type: 'text',
          placeholder: 'XXXXXX',
        },
        user_id: { label: 'user_id', type: 'text' },
      },

      async authorize(credentials) {
        let res

        try {
          res = await apiGateway.post('/verification-code/validate', {
            code: credentials?.code,
            user_id: credentials?.user_id,
          })
        } catch (error) {
          throw new Error('Error loging in')
        }

        const token = res.data.access_token

        const cookieStore = await cookies()

        cookieStore.set('access_token.hub', token, {
          expires: dayjs().add(3, 'day').toDate(),
        })

        const session = await apiGateway.get('/users', {
          headers: {
            authorization: 'Bearer ' + token,
            'client-key': process.env.CLIENT_KEY,
          },
        })

        const user = session.data

        const pubKey = await apiGateway.get('/credit-card-key?id=' + user.id, {
          headers: {
            authorization: 'Bearer ' + token,
            'client-key': process.env.CLIENT_KEY,
          },
        })

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            user_type: user.user_type,
            document: user.document,
            status: user.status,
            created_at: user.created_at,
            updated_at: user.updated_at,
            access_token: token,
            pub_key: pubKey?.data?.key,
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 2, // 2 hours
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
