import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { UpdateProduct } from '@/services/products/products'
import { Product } from '@/services/products/products/types'

const FormSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .max(50, {
      message: 'Name must be less than 50 caracters',
    })
    .min(1, {
      message: 'Name must have at least one character',
    }),
  value: z.coerce
    .number({
      required_error: 'Value is required',
    })
    .min(1, {
      message: 'Value must have at least 1 character',
    }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .max(50, {
      message: 'Description must be less than 50 caracters',
    })
    .min(1, {
      message: 'Description must have at least one character',
    }),
  image_url: z.string().optional(),
})

export type createProductFormSchema = z.infer<typeof FormSchema>

interface Props {
  product: Product
}

export function UpdateProductForm({ product }: Props) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createProductFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: product.name ?? '',
      value: product.value ? product.value / 100 : 0,
      description: product.description ?? '',
      image_url: product.image_url ?? '',
    },
  })

  const submit = useMutation({
    mutationFn: UpdateProduct,
    mutationKey: ['updateProductMutation'],
    onSuccess: () => {
      toast.message('Produto atualizado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: createProductFormSchema) => {
    await submit.mutateAsync({
      id: product.id ?? '',
      data,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <p className="text-secondary">Atualizar Produto</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Cadastrar plano</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar um novo plano de assinatura
              ao invés da api.
            </p>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 p-4 rounded-lg max-h-[80vh] overflow-auto"
        >
          <div className="space-y-4 p-4 bg-accent rounded-lg">
            <Input {...register('name')} placeholder="Nome *"></Input>
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
            <Input
              type="number"
              step={'0.001'}
              min={1}
              placeholder="Valor *"
              {...register('value')}
            ></Input>
            {errors.value && (
              <span className="text-xs text-red-500">
                {errors.value.message}
              </span>
            )}
            <Input
              {...register('description')}
              placeholder="Descrição *"
            ></Input>
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
            <Input {...register('image_url')} placeholder="Img url *"></Input>
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.image_url?.message}
              </span>
            )}
          </div>
          <hr />

          <Button>
            {submit.isPending ? (
              <Loader2 className="animate-spin"></Loader2>
            ) : (
              'Cadastrar'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
