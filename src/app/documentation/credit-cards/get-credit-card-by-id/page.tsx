import { Header } from '../../components/header'
import { Get } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
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
    <PageFormat
      title="Buscar cartão pelo id"
      description="Utilize este endpoint para buscar um cartão de um cliente"
      url={`${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/cards/:card_id`}
      httpMethod={<Get></Get>}
      header={<Header></Header>}
      pathParams={<PathParams properties={path}></PathParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
