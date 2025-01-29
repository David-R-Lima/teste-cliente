import { Header } from '../../components/header'
import { Patch } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'id',
    type: 'string',
    description: 'Id do cupom',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'cupom',
        type: 'object',
        description: 'Cupom',
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

export default function CreateCreditCard() {
  return (
    <PageFormat
      title="Inativar cupom"
      description="Utilize este endpoint para ativar um cupom"
      url={`${process.env.NEXT_PUBLIC_API_URL}/cupons/:id/activate`}
      httpMethod={<Patch></Patch>}
      header={<Header></Header>}
      pathParams={<PathParams properties={data}></PathParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
