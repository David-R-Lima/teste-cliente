'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { BadgeCheck, Check, Loader2 } from 'lucide-react'
import { alterPassword, alterPasswordGenerateCode } from '@/services/user'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Insira um email válido!',
    })
    .email(),
})

const submitFormSchema = z.object({
  email: z
    .string({
      required_error: 'Insira um email válido!',
    })
    .email(),
  code: z.string().min(6),
  password: z
    .string({
      required_error: 'A senha deve ter pelo menos 8 caracteres!',
    })
    .min(8),
  passwordConfirmation: z
    .string({
      required_error: 'A senha deve ter pelo menos 8 caracteres!',
    })
    .min(8),
})

export type formSchemaData = z.infer<typeof formSchema>
export type submitFormSchemaData = z.infer<typeof submitFormSchema>

export default function Dashboard() {
  const router = useRouter()
  const [sentCode, setSentCode] = useState(false)
  const [updated, setUpdated] = useState(false)

  const [seconds, setSeconds] = useState(30)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (seconds > 0 && isDisabled) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
    } else if (seconds === 0) {
      if (interval) {
        clearInterval(interval)
      }
      setIsDisabled(false)
      setSeconds(30)
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval)
      }
    }
  }, [seconds, isDisabled])

  const handleRegenerateCodeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleGenerateCode(getValues())
    setIsDisabled(true)
    setSeconds(30)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<formSchemaData>({
    resolver: zodResolver(formSchema),
  })

  const submitForm = useForm<submitFormSchemaData>({
    resolver: zodResolver(submitFormSchema),
  })

  const generateCodeMutation = useMutation({
    mutationFn: async (form: formSchemaData) => {
      return await alterPasswordGenerateCode({
        email: form.email,
      })
    },
    onSuccess: () => {
      setSentCode(true)
      toast.success('Código de confirmação enviado para seu email')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const signInMutation = useMutation({
    mutationFn: alterPassword,
    onSuccess: () => {
      setUpdated(true)
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const handleGenerateCode = async (data: formSchemaData) => {
    await generateCodeMutation.mutateAsync(data)
  }

  const handleSumbitMutation = async (data: submitFormSchemaData) => {
    await signInMutation.mutateAsync(data)
  }

  if (updated) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center justify-evenly w-[80%] lg:w-[30%] h-[50%] rounded-lg">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="font-extrabold text-xl">
              Senha alterado com sucesso!
            </h1>
            <div>
              <BadgeCheck size={124} />
            </div>
          </div>
          <Button
            variant={'default'}
            className="text-xl"
            onClick={() => {
              router.push('/login')
            }}
          >
            {' '}
            Login
          </Button>
        </div>
      </div>
    )
  }

  if (sentCode) {
    return (
      <div className="flex items-center h-[100vh]">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Recuperação de conta</h1>
          </div>
          <form
            className="grid gap-6"
            onSubmit={submitForm.handleSubmit(handleSumbitMutation)}
          >
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                value={submitForm.watch('email')}
                {...submitForm.register('email')}
              />
              {submitForm.formState.errors.email && (
                <p className="text-red-500">
                  {submitForm.formState.errors.email.message}
                </p>
              )}
              <Input
                id="code"
                type="text"
                placeholder="Código de recuperação"
                value={submitForm.watch('code')}
                {...submitForm.register('code')}
              />
              {submitForm.formState.errors.code && (
                <p className="text-red-500">
                  {submitForm.formState.errors.code.message}
                </p>
              )}
              <Input
                id="password"
                type="password"
                placeholder="Nova senha"
                value={submitForm.watch('password')}
                {...submitForm.register('password')}
              />
              {submitForm.formState.errors.password && (
                <p className="text-red-500">
                  {submitForm.formState.errors.password.message}
                </p>
              )}
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="Confirme sua senha"
                value={submitForm.watch('passwordConfirmation')}
                {...submitForm.register('passwordConfirmation')}
              />
              {submitForm.formState.errors.passwordConfirmation && (
                <p className="text-red-500">
                  {submitForm.formState.errors.passwordConfirmation.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {signInMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Alterar'
              )}
            </Button>
            <div className="flex flex-col items-center">
              <Button
                variant={'link'}
                onClick={handleRegenerateCodeClick}
                disabled={isDisabled}
              >
                Re-envie o código
              </Button>
              {isDisabled && (
                <p className="text-gray-500">
                  Reenvie novamente em {seconds} segundos...
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex items-center h-[100vh]">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Recuperação</h1>
            <p className="text-balance text-muted-foreground">
              Insira o e-mail da conta
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
            <Button type="submit" className="w-full">
              {signInMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Continuar'
              )}
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
