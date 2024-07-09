import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Delete } from '../../components/http-methods'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const body: BodyProps[] = [
  {
    name: 'customer_id',
    type: 'string',
    description: 'id do cliente',
    required: true,
  },
  {
    name: 'recurrence_id',
    type: 'string',
    description: 'id da assinatura',
    required: true,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: '',
        type: 'boolean',
        description: 'true',
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

export default function DeleteSignature() {
  return (
    <PageFormat
      title="Cancelar assinatura"
      description="Utilize este endpoint para cancelar uma assinatura para um cliente."
      url={`${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/subscriptions`}
      httpMethod={<Delete></Delete>}
      header={<Header></Header>}
      bodyParams={<Body properties={body}></Body>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
