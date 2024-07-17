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
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Country, DocumentType } from '@/services/customers/types'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useHookFormMask } from 'use-mask-input'
import { fetchAddress } from '@/lib/viacep'
import { createCustomer } from '@/services/customers'
import { toast } from 'sonner'

const FormSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório!',
    })
    .min(2, {
      message: 'Nome é obrigatório!',
    })
    .max(100, {
      message: 'Nome não pode ter mais que 100 caracteres',
    }),
  email: z
    .string({
      required_error: 'Email é obrigatório!',
    })
    .email({
      message: 'Email é inválido!',
    })
    .max(100, {
      message: 'Email não pode ter mais que 100 caracteres!',
    }),
  phone: z
    .string()
    .min(13, {
      message: 'Telefone é inválido!',
    })
    .max(15, {
      message: 'Máximo de 15 caracteres!',
    })
    .refine(
      (value) => {
        const regex = /^\d{12,15}$/
        return regex.test(value)
      },
      {
        message:
          'Telefone é inválido! Deve ter pelo menos 12 caracteres e no máximo 15.',
      },
    )
    .optional(),
  is_active: z.boolean().optional().default(true),
  document: z.object({
    type: z.nativeEnum(DocumentType, {
      required_error: 'Tipo do documento é obrigatório! ',
    }),
    text: z
      .string({
        required_error: 'Documento é obrigatório!',
      })
      .refine(
        (value) => {
          const regex = value.length === 11 ? /^\d{11}$/ : /^\d{14}$/

          return regex.test(value)
        },
        {
          message: 'Número de documento inválido. Deve conter apenas números',
        },
      ),
    country: z.nativeEnum(Country, {
      required_error: 'País é obrigatório',
    }),
  }),
  address: z
    .object({
      street: z
        .string({
          required_error: 'Rua é obrigatória!',
        })
        .max(200, {
          message: 'Rua pode ter no máximo 100 caracteres',
        }),
      number: z
        .string({
          required_error: 'Número é obrigatório!',
        })
        .min(1, {
          message: 'Número é obrigatório!',
        })
        .max(10, {
          message: 'Número pode ter no máximo 10 caracteres!',
        }),
      complement: z
        .string()
        .max(50, {
          message: 'Complemento pode ter no máximo 50 caracteres!',
        })
        .optional(),
      neighborhood: z
        .string({
          required_error: 'Bairro é obrigatório!',
        })
        .max(50, {
          message: 'Bairro pode ter no máximo 50 caracteres!',
        }),
      zip_code: z
        .string({
          required_error: 'Cep é obrigatório!',
        })
        .max(8, {
          message: 'Cep deve ter no máximo 8 caracteres!',
        })
        .refine(
          (value) => {
            const regex = /^[\d-]+$/

            return regex.test(value)
          },
          {
            message: 'Cep é inválido! Deve conter apenas números!',
          },
        ),
      state: z
        .string({
          required_error: 'Estado é obrigatório!',
        })
        .max(2, {
          message: 'Estado pode ter no máximo 2 caracteres!',
        }),
      city: z.string().max(50, {
        message: 'Cidade pode ter no máximo 50 caracteres!',
      }),
      country: z.enum(['BR'], {
        required_error: 'País é obrigatório!',
      }),
    })
    .optional(),
})

export type formSchema = z.infer<typeof FormSchema>

export function CreateCustomerForm() {
  const [inputAddressOpen, setInputAddressOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      document: {
        type: DocumentType.CPF,
        country: Country.BR,
      },
      address: {
        country: Country.BR,
      },
    },
  })

  const registerWithMask = useHookFormMask(register)

  const address = useMutation({
    mutationFn: fetchAddress,
    mutationKey: ['fetchAddress'],
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      return error
    },
  })

  const handleAddressMutation = async (cep: string) => {
    const data = await address.mutateAsync(cep)
    setValue('address.street', data.logradouro)
    setValue('address.neighborhood', data.bairro)
    setValue('address.city', data.localidade)
    setValue('address.state', data.uf)
  }

  const submit = useMutation({
    mutationFn: createCustomer,
    mutationKey: ['createCustomerMutation'],
    onSuccess: () => {
      toast.message('Cliente cadastrado com sucesso!')

      queryClient.invalidateQueries({
        queryKey: ['customers'],
      })
      setOpen(false)
      reset()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSumbitMutation = async (data: formSchema) => {
    await submit.mutateAsync({ ...data })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <Plus />
          <p>Cliente</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[80vw] h-[90vh]">
        <DialogHeader>
          <DialogTitle>Cadastrar cliente</DialogTitle>
          <DialogDescription>
            <p>
              Utilize este formulário para cadastrar um novo cliente ao invés da
              api.
            </p>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSumbitMutation)}
          className="space-y-8 p-4 rounded-lg max-h-[80vh] overflow-auto"
        >
          <div className="space-y-4 p-4 bg-accent rounded-lg">
            <Input {...register('name')} placeholder="Nome *"></Input>
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
            <Input {...register('email')} placeholder="E-mail *"></Input>
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
            <Input
              {...registerWithMask('phone', '+99 99 9 9999-9999', {
                autoUnmask: true,
              })}
              placeholder="Telefone *"
            ></Input>
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}
            <RadioGroup defaultValue={watch('document.type')} className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="CPF"
                  id="cpf"
                  onClick={(e) => {
                    setValue('document.text', '')
                    setValue(
                      'document.type',
                      e.currentTarget.value as DocumentType,
                    )
                  }}
                />
                <Label htmlFor="cpf">Cpf</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="CNPJ"
                  id="cnpj"
                  onClick={(e) => {
                    setValue('document.text', '')
                    setValue(
                      'document.type',
                      e.currentTarget.value as DocumentType,
                    )
                  }}
                />
                <Label htmlFor="cnpj">Cnpj</Label>
              </div>
            </RadioGroup>

            {watch('document.type') === DocumentType.CPF ? (
              <div>
                <Input
                  {...registerWithMask('document.text', '999.999.999-99', {
                    autoUnmask: true,
                  })}
                  placeholder="Cpf *"
                ></Input>
              </div>
            ) : (
              <div>
                <Input
                  {...registerWithMask('document.text', '99.999.999/9999-99', {
                    autoUnmask: true,
                  })}
                  placeholder="Cnpj *"
                ></Input>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-4 p-4 bg-accent rounded-lg">
            <h1>
              <strong>Endereço*</strong>
            </h1>
            <div className="flex flex-col space-y-4 xl:min-w-[30rem]">
              <Input
                placeholder="CEP"
                {...registerWithMask('address.zip_code', '99999-999', {
                  autoUnmask: true,
                })}
                onChange={async (e) => {
                  if (e.target.value.length !== 8) return
                  handleAddressMutation(e.currentTarget.value)
                }}
              ></Input>
              {errors.address?.zip_code && (
                <span className="text-xs text-red-500">
                  {errors.address.zip_code.message}
                </span>
              )}
              <div
                className="flex justify-end"
                onClick={() => {
                  setInputAddressOpen(!inputAddressOpen)
                }}
              >
                <p className="text-secondary-foreground text-sm text-gray-500 underline hover:cursor-pointer">
                  Não sei o cep
                </p>
              </div>
              {inputAddressOpen ? (
                <div className="space-y-2">
                  <div className="flex justify-around space-x-8 xl:justify-start">
                    <Input
                      placeholder="Estado"
                      {...register('address.state')}
                      className="max-w-[15%]"
                    ></Input>
                    <Input
                      placeholder="Cidade"
                      {...register('address.city')}
                    ></Input>
                  </div>
                  <Input
                    placeholder="Bairro"
                    {...register('address.neighborhood')}
                  ></Input>
                  <Input
                    placeholder="Rua"
                    {...register('address.street')}
                  ></Input>
                </div>
              ) : watch('address.street') ? (
                <p className="text-secondary-foreground text-sm px-2 xl:max-w-[28rem]">{`${watch('address.street')}, ${watch('address.neighborhood')} - ${watch('address.city')}, ${watch('address.state')}`}</p>
              ) : (
                <p className="text-secondary-foreground lg:truncate text-sm px-2 xl:max-w-[28rem] text-gray-500">
                  Ex: Rua Edson Nogueira, Porto das Cachoeiras - Central de
                  Minas, Minas Gerais
                </p>
              )}
              <Input
                placeholder="Número"
                {...register('address.number')}
                className="placeholder:text-zinc-500"
              ></Input>
              <Input
                placeholder="Complemento"
                {...register('address.complement')}
                className="placeholder:text-zinc-500"
              ></Input>
            </div>
          </div>
          <Button>Cadastrar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
