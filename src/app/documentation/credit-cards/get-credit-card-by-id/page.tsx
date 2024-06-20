import { Header } from '../../components/header'
import { Get } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { BodyProps, ResponseProps } from '../../type'

const path: BodyProps[] = [
  {
    name: 'card_id',
    type: 'string',
    description: 'Id do cartão',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'card',
        type: 'object',
        description: 'Dados do cartão',
        required: false,
        additionalProperties: [
          {
            name: 'id',
            type: 'string',
            description: 'Id do cartão',
            required: true,
          },
          {
            name: 'brand',
            type: 'string',
            description:
              'Bandeira do cartão. Ex: MASTERCARD | AMERICAN_EXPRESS | VISA | ELO',
            required: true,
          },
          {
            name: 'first_six_digits',
            type: 'string',
            description: 'Primeiros 6 dígitos do cartão',
            required: true,
          },
          {
            name: 'last_four_digits',
            type: 'string',
            description: 'Últimos 4 dígitos do cartão',
            required: true,
          },
          {
            name: 'customer_id',
            type: 'string',
            description: 'Id do cliente',
            required: true,
          },
          {
            name: 'created_at',
            type: 'Date',
            description: 'Data de criação do cartão',
            required: true,
          },
          {
            name: 'updated_at',
            type: 'Date | undefined',
            description: 'Data de atualização do cartão',
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

export default function GetCreditCard() {
  return (
    <div className="space-y-4 min-w-[50vw]">
      <h1 className="text-2xl">Buscar cartão pelo id</h1>

      <div className="flex space-x-2 items-center">
        <h1>
          <Get></Get>
        </h1>
        <p className="text-bold">
          {process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/cards/:card_id
        </p>
      </div>

      <div>
        <h1>Utilize este endpoint para buscar um cartão de um cliente</h1>
      </div>
      <hr />
      <Header></Header>
      <PathParams properties={path}></PathParams>
      <Response data={responseProps}></Response>
    </div>
  )
}
