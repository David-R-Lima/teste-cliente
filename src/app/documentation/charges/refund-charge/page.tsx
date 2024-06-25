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
        name: 'provider_id',
        type: 'string',
        description: 'true',
        required: false,
      },
      {
        name: 'referenceId',
        type: 'string',
        description: 'true',
        required: false,
      },
      {
        name: 'status',
        type: 'string',
        description: 'true',
        required: false,
      },
      {
        name: 'createdAt',
        type: 'Date',
        description: 'true',
        required: false,
      },
      {
        name: 'paidAt',
        type: 'Date',
        description: 'true',
        required: false,
      },
      {
        name: 'description',
        type: 'string',
        description: 'true',
        required: false,
      },
      {
        name: 'amount',
        type: 'object',
        description: 'true',
        required: false,
        additionalProperties: [
          {
            name: 'value',
            type: 'number',
            description: 'true',
            required: false,
          },
          {
            name: 'currency',
            type: 'string',
            description: 'true',
            required: false,
          },
          {
            name: 'summary',
            type: 'object',
            description: 'true',
            required: false,
            additionalProperties: [
              {
                name: 'total',
                type: 'number',
                description: 'true',
                required: false,
              },
              {
                name: 'paid',
                type: 'number',
                description: 'true',
                required: false,
              },
              {
                name: 'refunded',
                type: 'number',
                description: 'true',
                required: false,
              },
            ],
          },
        ],
      },
      {
        name: 'details',
        type: 'object',
        description: 'true',
        required: false,
        additionalProperties: [
          {
            name: 'type',
            type: 'string',
            description: 'true',
            required: false,
          },
          {
            name: 'capture',
            type: 'boolean',
            description: 'true',
            required: false,
          },
          {
            name: 'installments',
            type: 'number',
            description: 'true',
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

export default function RefundCharge() {
  return (
    <div className="space-y-4 min-w-[50vw]">
      <h1 className="text-2xl">Estonar uma cobranças</h1>

      <div className="flex space-x-2 items-center">
        <h1>
          <Post></Post>
        </h1>
        <p className="text-bold">
          {process.env.NEXT_PUBLIC_PAYMENT_API_URL}/charges/:charge_id/void
        </p>
      </div>

      <div>
        <h1>Utilize este endpoint para estornar uma cobrança</h1>
      </div>
      <hr />
      <Header></Header>
      <PathParams properties={data}></PathParams>
      <Response data={responseProps}></Response>
    </div>
  )
}
