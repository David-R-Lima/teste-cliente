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
import { Loader2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { CreateProduct } from '@/services/products/products'
import { createOrder } from '@/services/order'

const FormSchema = z.object({
  itens: z.string().array(),
})

export type createProductFormSchema = z.infer<typeof FormSchema>

export function CreateOrderForm() {
  const [open, setOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState('')
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<createProductFormSchema>({
    resolver: zodResolver(FormSchema),
  })

  const submit = useMutation({
    mutationFn: createOrder,
    mutationKey: ['createOrderMutation'],
    onSuccess: () => {
      toast.message('Order cadastrado com sucesso!')
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
      ...data,
    })
  }

  const itens = watch('itens')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <Plus className="text-secondary" />
          <p className="text-secondary">Gerar pedido</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] min-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Gerar pedido</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar um novo pedido ao invés da
              api.
            </p>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-4 p-4 rounded-lg max-h-[80vh] overflow-auto"
        >
          <div className="space-y-4 p-4 bg-accent rounded-lg">
            <div className="flex flex-row items-start justify-center">
              <Input
                onChange={(e) => {
                  setCurrentValue(e.target.value)
                }}
                value={currentValue}
              ></Input>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  const updatedProductIds = [...itens, currentValue]
                  setValue('itens', updatedProductIds)
                }}
              >
                Adicionar
              </Button>
            </div>
            <div>
              {itens &&
                itens.length > 0 &&
                itens.map((item, index) => (
                  <div key={index} className="mb-4">
                    <p>{item}</p>
                  </div>
                ))}
            </div>
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
