import { Header } from '../../components/header'
import { Delete } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const path: BodyProps[] = [
  {
    name: 'id',
    type: 'string',
    description: 'Id do cliente',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'deleted',
        type: 'boolean',
        description: '',
        required: false,
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

export default function DeleteCreditCard() {
  return (
    <PageFormat
      title="Deletar cartão"
      description="Utilize este endpoint para deletar um cartão de um cliente"
      url={`${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/cards/:card_id`}
      httpMethod={<Delete></Delete>}
      header={<Header></Header>}
      pathParams={<PathParams properties={path}></PathParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
