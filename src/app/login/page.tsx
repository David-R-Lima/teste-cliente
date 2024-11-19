'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Insira um email válido!',
    })
    .email(),
  password: z
    .string({
      required_error: 'A senha deve ter pelo menos 8 caracteres!',
    })
    .min(8),
})

export type formSchemaData = z.infer<typeof formSchema>

export default function Dashboard() {
  const router = useRouter()
  const session = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchemaData>({
    resolver: zodResolver(formSchema),
  })

  const signInMutation = useMutation({
    mutationFn: async (form: formSchemaData) => {
      return await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: '/login',
      })
    },
    onSuccess: (res) => {
      if (res?.status === 200) {
        if (session.data?.user.user_type === 'ADMIN') {
          router.replace('/painel/admin')
        } else {
          router.replace('/dashboard')
        }
      } else if (res?.status === 401) {
        toast.error('Usuário ou senha inválidos')
      }
    },
  })

  const handleSumbitMutation = async (data: formSchemaData) => {
    await signInMutation.mutateAsync(data)
  }

  if (session.status === 'authenticated') {
    if (session.data?.user.user_type === 'ADMIN') {
      router.replace('/painel/admin')
    } else {
      router.replace('/dashboard')
    }
  }

  if (session.status === 'unauthenticated') {
    return (
      <div className="flex items-center h-[100vh]">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Faça o login para acessar o painel
            </p>
          </div>
          <form
            className="grid gap-6"
            onSubmit={handleSubmit(handleSumbitMutation)}
          >
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Input
                id="email"
                type="password"
                placeholder="********"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {signInMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
