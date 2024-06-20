import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { Response } from '../../components/response'
import { BodyProps, ResponseProps } from '../../type'

const body: BodyProps[] = [
  {
    name: 'plan_id',
    type: 'string',
    description: 'Id do plano',
    required: true,
  },
  {
    name: 'customer_id',
    type: 'string',
    description: 'Id do cliente',
    required: true,
  },
  {
    name: 'payment_type',
    type: 'string',
    description: 'Tipo de pagamento. Ex: CARTAO_CREDITO | PIX | BOLETO',
    required: true,
  },
  {
    name: 'currency',
    type: 'string',
    description: 'Moeda. Ex: BRL | USD',
    required: true,
  },
  {
    name: 'invoice_description',
    type: 'string',
    description: 'Descrição da fatura',
    required: true,
  },
  {
    name: 'capture',
    type: 'boolean',
    description: 'Captura da cobrança',
    required: true,
  },
  {
    name: 'provider_id',
    type: 'string',
    description: 'Id do provedor',
    required: false,
  },
  {
    name: 'description',
    type: 'string',
    description: 'Descrição da cobrança',
    required: false,
  },
  {
    name: 'card_payment_method',
    type: 'object',
    description: 'Método de pagamento Cartão',
    required: false,
    additionalProperties: [
      {
        name: 'payment_type_card',
        type: 'string',
        description: 'Tipo do cartão. Ex: CREDIT_CARD',
        required: true,
      },
      {
        name: 'installments',
        type: 'number',
        description: 'Número de parcelas',
        required: true,
      },
      {
        name: 'token',
        type: 'string',
        description: 'Cartão tokenizado',
        required: true,
      },
      {
        name: 'card_id',
        type: 'string',
        description: 'Id do cartão',
        required: true,
      },
      {
        name: 'items',
        type: 'array',
        description: 'Itens da cobrança',
        required: true,
        additionalProperties: [
          {
            name: 'description',
            type: 'string',
            description: 'Descrição do item',
            required: true,
          },
          {
            name: 'unity_value',
            type: 'number',
            description: 'Valor do item',
            required: true,
          },
          {
            name: 'quantity',
            type: 'number',
            description: 'Quantidade do item',
            required: true,
          },
        ],
      },
    ],
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 201,
    properties: [
      {
        name: 'recurrence',
        type: 'object',
        description: 'Dados da assinatura',
        required: false,
        additionalProperties: [
          {
            name: 'id',
            type: 'string',
            description: 'Id da assinatura',
            required: true,
          },
          {
            name: 'customer_id',
            type: 'string',
            description: 'Id do cliente',
            required: true,
          },
          {
            name: 'first_charge',
            type: 'string',
            description: 'Data da primeira cobrança',
            required: true,
          },
          {
            name: 'next_charge',
            type: 'string',
            description: 'Data da próxima cobrança',
            required: true,
          },
          {
            name: 'last_charge',
            type: 'string',
            description: 'Data da ultima cobrança',
            required: true,
          },
          {
            name: 'payment_type',
            type: 'string',
            description: 'Tipo de pagamento. Ex: CARTAO_CREDITO | PIX | BOLETO',
            required: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            description: 'Boolean indicando o status do plano',
            required: true,
          },
          {
            name: 'plan_id',
            type: 'string',
            description: 'Id do plano',
            required: true,
          },
        ],
      },
    ],
  },
  {
    code: 400,
    properties: [
      {
        name: 'Bad request exection',
        type: 'object',
        description: '',
        required: false,
        additionalProperties: [
          {
            name: 'message',
            type: 'string',
            description: 'Mensagem de erro',
            required: false,
          },
        ],
      },
    ],
  },
  {
    code: 404,
    properties: [
      {
        name: 'Not found exection',
        type: 'object',
        description: '',
        required: false,
        additionalProperties: [
          {
            name: 'message',
            type: 'string',
            description: 'Mensagem de erro',
            required: false,
          },
        ],
      },
    ],
  },
]

export default function CreateSignature() {
  return (
    <div className="space-y-4 min-w-[50vw]">
      <h1 className="text-2xl">Criar assinatura</h1>

      <div className="flex space-x-2 items-center">
        <h1>
          <Post></Post>
        </h1>
        <p className="text-bold">
          {process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/subscriptions
        </p>
      </div>

      <div>
        <h1>
          Utilize este endpoint para criar uma assinatura para um cliente.
        </h1>
      </div>
      <hr />
      <Header></Header>
      <Body properties={body}></Body>
      <Response data={responseProps}></Response>
    </div>
  )
}
