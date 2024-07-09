import process from 'process'
import { Header } from '../../components/header'
import { Delete } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'id',
    type: 'string',
    description: 'Id do cliente',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 204,
    properties: [
      {
        name: '',
        type: 'void',
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
        name: 'Not found execption',
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

export default function InactivateCustomer() {
  return (
    <PageFormat
      title="Inativar cliente"
      description="Utilize este endpoint para inativar um cliente"
      url={`${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/customers?page={1}`}
      httpMethod={<Delete></Delete>}
      pathParams={<PathParams properties={data}></PathParams>}
      header={<Header></Header>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
