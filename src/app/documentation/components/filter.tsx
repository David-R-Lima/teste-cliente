'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Delete, Get, Patch, Post } from './http-methods'
import Link from 'next/link'

interface values {
  name: string
  href: string
  httpMethod: JSX.Element
}
export function Filters() {
  const data: values[] = [
    {
      name: 'Criar cliente',
      href: '/documentation/customer/create-customer',
      httpMethod: <Post></Post>,
    },
    {
      name: 'Buscar clientes',
      href: '/documentation/customer/get-customers',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Buscar cliente pelo id',
      href: '/documentation/customer/get-customer-by-id',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Inativar customer',
      href: '/documentation/customer/inactivate-customer',
      httpMethod: <Delete></Delete>,
    },
    {
      name: 'Update customer',
      href: '/documentation/customer/update-customer',
      httpMethod: <Patch></Patch>,
    },
    {
      name: 'Criar cartão',
      href: '/documentation/credit-cards/create-credit-card',
      httpMethod: <Post></Post>,
    },
    {
      name: 'Buscar cartões pelo id',
      href: '/documentation/credit-cards/get-credit-card-by-id',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Deletar cartão',
      href: '/documentation/credit-cards/delete-credit-card',
      httpMethod: <Delete></Delete>,
    },
    {
      name: 'Buscar token de criptografia',
      href: '/documentation/credit-cards/get-encryption-key',
      httpMethod: <Get></Get>,
    },

    {
      name: 'Criar cobrança',
      href: '/documentation/charges/create-charge',
      httpMethod: <Post></Post>,
    },
    {
      name: 'Buscar cobranças',
      href: '/documentation/charges/get-charges',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Buscar cobrança pelo id',
      href: '/documentation/charges/get-charge-by-id',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Capturar cobrança',
      href: '/documentation/charges/capture-charge',
      httpMethod: <Post></Post>,
    },
    {
      name: 'Estornar cobrança',
      href: '/documentation/charges/refund-charge',
      httpMethod: <Post></Post>,
    },

    {
      name: 'Cadastrar plano',
      href: '/documentation/plans/create-plan',
      httpMethod: <Post></Post>,
    },
    {
      name: 'Buscar plano pelo id',
      href: '/documentation/plans/get-plan-by-id',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Buscar planos',
      href: '/documentation/plans/get-plans',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Criar assinatura',
      href: '/documentation/recurrences/create-signature',
      httpMethod: <Post></Post>,
    },
    {
      name: 'Buscar assinatura pelo id',
      href: '/documentation/recurrences/get-signature-by-id',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Buscar assinaturas',
      href: '/documentation/recurrences/get-signatures',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Deletar assinatura',
      href: '/documentation/recurrences/delete-signature',
      httpMethod: <Delete></Delete>,
    },
    {
      name: 'Criar link de pagamento',
      href: '/documentation/payment-links/create-payment-link',
      httpMethod: <Post></Post>,
    },
    {
      name: 'Buscar link de pagamento',
      href: '/documentation/payment-links/fetch-payment-links',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Buscar link de pagamento pelo id',
      href: '/documentation/payment-links/get-payment-link',
      httpMethod: <Get></Get>,
    },
    {
      name: 'Pagar link de pagamento',
      href: '/documentation/payment-links/pay-payment-link',
      httpMethod: <Post></Post>,
    },
  ]
  const [filteredValues, setFilteredValues] = useState<values[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    if (term === '') {
      setFilteredValues([])
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredValues(filtered)
    }
  }

  return (
    <div className="relative w-full">
      <Input
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => {
          setOpen(true)
        }}
        onBlur={() => {
          setOpen(false)
        }}
        placeholder="Pesquise..."
        className="w-full"
      />
      {open && searchTerm && (
        <div className="absolute w-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden">
          {filteredValues.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center space-x-4 py-4 px-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer text-gray-800"
              onMouseDown={(e) => {
                e.preventDefault()
              }}
            >
              <p>{item.name}</p>
              <div>{item.httpMethod}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
