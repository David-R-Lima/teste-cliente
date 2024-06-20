import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'charge_id',
    type: 'string',
    description: 'Id da cobrança',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'id',
        type: 'string',
        description: 'true',
        required: false,
      },
      {
        name: 'client_id',
        type: 'string',
        description: 'Id do cliente',
        required: false,
      },
      {
        name: 'created_at',
        type: 'Date',
        description: 'Data de criação',
        required: false,
      },
      {
        name: 'amount',
        type: 'number',
        description: 'Valor da cobrança',
        required: false,
      },
      {
        name: 'currency',
        type: 'string',
        description: 'Moeda da cobrança. Ex: BRL | USD',
        required: false,
      },
      {
        name: 'statementDescriptor',
        type: 'string',
        description: 'Descrição da cobrança',
        required: false,
      },
      {
        name: 'description',
        type: 'string',
        description: 'Descrição da fatura',
        required: false,
      },
      {
        name: 'capture',
        type: 'boolean',
        description: 'Captura da cobrança',
        required: false,
      },
      {
        name: 'status',
        type: 'string',
        description: 'Situação da cobrança',
        required: false,
      },
      {
        name: 'paymentMethod',
        type: 'object',
        description: 'Método de pagamento',
        required: false,
        additionalProperties: [
          {
            name: 'paymentType',
            type: 'string',
            description: 'Tipo de pagamento. Ex: CREDIT_CARD',
            required: false,
          },
          {
            name: 'installments',
            type: 'number',
            description: 'Número de parcelas',
            required: false,
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

export default function CapturaCharge() {
  return (
    <div className="space-y-4 min-w-[50vw]">
      <h1 className="text-2xl">Capturar cobrança</h1>

      <div className="flex space-x-2 items-center">
        <h1>
          <Post></Post>
        </h1>
        <p className="text-bold">
          {process.env.NEXT_PUBLIC_PAYMENT_API_URL}
          /api/charges/:charge_id/capture
        </p>
      </div>

      <div>
        <h1>Utilize este endpoint para capturar uma cobrança</h1>
      </div>
      <hr />
      <Header></Header>
      <PathParams properties={data}></PathParams>
      <Response data={responseProps}></Response>
    </div>
  )
}
