'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.string({
    required_error: "Please enter a valid email address"
  }).email(),
  password: z.string({
    required_error: "Password must be at least 8 characters"
  }).min(8)
})

export type formSchemaData = z.infer<typeof formSchema>
  
export default function Dashboard() {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchemaData>({
    resolver: zodResolver(formSchema)
  })

  const signInMutation = useMutation({
    mutationFn: async (form: formSchemaData) => {
      await signIn("credentials", {
        email: form.email,
        password:  form.password,
        redirect: false
      })
    },
    onSuccess: () => {
      router.push('/dashboard')
    },
    onError: () => {
      toast.error("Erro ao realizar login")
    }
  })

  const handleSumbitMutation = async (data: formSchemaData) => {
    await signInMutation.mutateAsync(data)
  }

  return (
    <div className="flex items-center h-[100vh]">
      <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Faça o login para acessar o painel
            </p>
          </div>
              <form className="grid gap-6" onSubmit={handleSubmit(handleSumbitMutation)}>
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
                      {signInMutation.isPending ? <Loader2 className="animate-spin"/> : "Login"}
                  </Button>
              </form> 
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </div>
    </div>
  )
}
