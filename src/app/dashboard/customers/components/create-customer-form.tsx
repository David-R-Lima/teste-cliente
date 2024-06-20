import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Country, DocumentType } from "@/services/customers/types"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useHookFormMask } from 'use-mask-input'
import { fetchAddress } from "@/lib/viacep"
import { createCustomer } from "@/services/customers"
import { toast } from "sonner"

const FormSchema = z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .max(100, {
        message: 'Name must have at most 100 characters',
      }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Email is invalid',
      })
      .max(100, {
        message: 'Email must have at most 100 characters',
      }),
    phone: z
      .string()
      .min(13, {
        message: 'Phone is invalid',
      })
      .max(15, {
        message: 'Phone is invalid',
      })
      .refine(
        (value) => {
          const regex = /^\d{12,15}$/;
          return regex.test(value);
        },
        {
          message:
            'Phone is invalid. It must have only numbers and at least 12 characters and at most 15 characters',
        },
      )
      .optional(),
    is_active: z.boolean().optional().default(true),
    document: z.object({
      type: z.nativeEnum(DocumentType, {
        required_error: 'Document type is required',
      }),
      text: z
        .string({
          required_error: 'Document text is required',
        })
        .refine(
          (value) => {
            const regex = value.length === 11 ? /^\d{11}$/ : /^\d{14}$/;
  
            return regex.test(value);
          },
          {
            message: 'Document is invalid. It must have only numbers',
          },
        ),
      country: z.nativeEnum(Country, {
        required_error: 'Country is required',
      }),
    }),
    address: z
      .object({
        street: z
          .string({
            required_error: 'Street is required',
          })
          .max(200, {
            message: 'Street must have at most 100 characters',
          }),
        number: z
          .string({
            required_error: 'Number is required',
          })
          .max(10, {
            message: 'Number must have at most 10 characters',
          }),
        complement: z
          .string()
          .max(50, {
            message: 'Complement must have at most 50 characters',
          })
          .optional(),
        neighborhood: z
          .string({
            required_error: 'Neighborhood is required',
          })
          .max(50, {
            message: 'Neighborhood must have at most 50 characters',
          }),
        zip_code: z
          .string({
            required_error: 'Zip code is required',
          })
          .max(8, {
            message: 'Zip code must have at most 8 characters',
          })
          .refine(
            (value) => {
              const regex = /^\d{8}$/;
  
              return regex.test(value);
            },
            {
              message: 'Zip code is invalid. Must have only numbers',
            },
          ),
        state: z
          .string({
            required_error: 'State is required',
          })
          .max(2, {
            message: 'State must have at most 2 characters',
          }),
        city: z.string().max(50, {
          message: 'City must have at most 50 characters',
        }),
        country: z.enum(['BR'], {
          required_error: 'Country is required',
        }),
      })
      .optional(),
  });

export type formSchema = z.infer<typeof FormSchema>

export function CreateCustomerForm() {
    const [ inputAddressOpen, setInputAddressOpen] = useState<boolean>(false)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<formSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            document: {
                type: DocumentType.CPF,
                country: Country.BR,
            },
            address: {
              country: Country.BR,
            }
        }
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
          toast.message('Assinatura realizada com sucesso!')
        },
        onError: (error) => {
          console.log('error: ', error);
          toast.error(error.message)
        },
      })

      const handleSumbitMutation = async (data: formSchema) => {
    
        await submit.mutateAsync({...data})
      }
  

    return (
        <Dialog>
            <DialogTrigger asChild><Button className="space-x-2"><Plus/><p>Cliente</p></Button></DialogTrigger>
            <DialogContent className="flex flex-col min-w-[80vw] h-[90vh] overflow-auto">
                <DialogHeader>
                <DialogTitle>Cadastrar cliente</DialogTitle>
                <DialogDescription>
                    <p>Utilize este formulário para cadastrar um novo cliente ao invés da api.</p>
                </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSumbitMutation)}className="space-y-4 p-4 bg-muted rounded-lg">
                    <h1><strong>Dados</strong></h1>
                    <div className="space-y-2">
                        <h2>Nome</h2>
                        <Input {...register('name')}></Input>
                        {errors.name && (
                            <span className="text-xs text-red-500">
                            {errors.name.message}
                            </span>
                        )}
                        <h2>E-mail</h2>
                        <Input {...register('email')}></Input>
                        {errors.email && (
                            <span className="text-xs text-red-500">
                            {errors.email.message}
                            </span>
                        )}
                        <h2>Telefone</h2>
                        <Input {...registerWithMask('phone', "+99 99 9 9999-9999", {
                          autoUnmask: true
                        })}></Input>
                        {errors.phone && (
                            <span className="text-xs text-red-500">
                              {errors.phone.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                            <RadioGroup defaultValue={watch('document.type')} className="flex">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="CPF" id="cpf" onClick={(e) => {
                                        setValue("document.text", "")
                                        setValue("document.type", e.currentTarget.value as DocumentType)
                                    }}/>
                                    <Label htmlFor="cpf">Cpf</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="CNPJ" id="cnpj" onClick={(e) => {
                                      setValue("document.text", "")
                                        setValue("document.type", e.currentTarget.value as DocumentType)
                                    }}/>
                                    <Label htmlFor="cnpj">Cnpj</Label>
                                </div>
                            </RadioGroup>

                            {watch('document.type') === DocumentType.CPF ? (
                                <div>
                                    <h2>Cpf</h2>
                                    <Input {...registerWithMask('document.text', '999.999.999-99', {
                                    autoUnmask: true,
                                    })}></Input>
                                </div>
                            ) : (
                                <div>
                                    <h2>Cnpj</h2>
                                    <Input {...registerWithMask('document.text', '99.999.999/9999-99', {
                                    autoUnmask: true,
                                    })}></Input>
                                </div>
                            )}
                        </div>

                    <h1><strong>Endereço</strong></h1>
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
                            <p className="text-sm text-gray-500 underline hover:cursor-pointer">
                            Não sei o cep
                            </p>
                        </div>
                        {inputAddressOpen ? (
                            <div className="space-y-2">
                            <div className="flex justify-around space-x-8 xl:justify-start">
                                <Input
                                placeholder="Estado"
                                {...register('address.state')}
                                className="max-w-[10%]"
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
                            <p className="text-sm px-2 xl:max-w-[28rem]">{`${watch('address.street')}, ${watch('address.neighborhood')} - ${watch('address.city')}, ${watch('address.state')}`}</p>
                        ) : (
                            <p className="lg:truncate text-sm px-2 xl:max-w-[28rem] text-gray-500">
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
                    <Button>Cadastrar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}