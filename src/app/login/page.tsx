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
import { generateCode } from '@/services/user'
import { useState } from 'react'

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

const submitFormSchema = z.object({
  code: z.string().optional(),
  user_id: z.string().optional(),
})

export type formSchemaData = z.infer<typeof formSchema>
export type submitFormSchemaData = z.infer<typeof submitFormSchema>

export default function Dashboard() {
  const router = useRouter()
  const session = useSession()
  const [sentCode, setSentCode] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchemaData>({
    resolver: zodResolver(formSchema),
  })

  const submitForm = useForm<submitFormSchemaData>({
    resolver: zodResolver(submitFormSchema),
  })

  const generateCodeMutation = useMutation({
    mutationFn: async (form: formSchemaData) => {
      return await generateCode({
        email: form.email,
        password: form.password,
      })
    },
    onSuccess: ({ data }) => {
      console.log(data)
      setSentCode(true)
      submitForm.setValue('user_id', data.user_id)
      toast.success('Código de confirmação enviado para seu email')
    },
  })

  const signInMutation = useMutation({
    mutationFn: async (form: submitFormSchemaData) => {
      return await signIn('credentials', {
        code: form.code,
        user_id: form.user_id,
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

  const handleGenerateCode = async (data: formSchemaData) => {
    await generateCodeMutation.mutateAsync(data)
  }

  const handleSumbitMutation = async (data: submitFormSchemaData) => {
    await signInMutation.mutateAsync(data)
  }

  if (session.status === 'authenticated') {
    if (session.data?.user.user_type === 'ADMIN') {
      router.replace('/painel/admin')
    } else {
      router.replace('/dashboard')
    }
  }

  console.log(submitForm.formState.errors)

  if (session.status === 'unauthenticated') {
    if (sentCode) {
      return (
        <div className="flex items-center h-[100vh]">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Insira o código
              </p>
            </div>
            <form
              className="grid gap-6"
              onSubmit={submitForm.handleSubmit(handleSumbitMutation)}
            >
              <div className="grid gap-2">
                <Input id="code" type="text" {...submitForm.register('code')} />
                {submitForm.formState.errors.code && (
                  <p className="text-red-500">
                    {submitForm.formState.errors.code.message}
                  </p>
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
    } else {
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
              onSubmit={handleSubmit(handleGenerateCode)}
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
}
