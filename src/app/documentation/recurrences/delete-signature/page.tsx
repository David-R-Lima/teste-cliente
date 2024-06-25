import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Delete } from '../../components/http-methods'
import { Response } from '../../components/response'
import { BodyProps, ResponseProps } from '../../type'

const body: BodyProps[] = [
  {
    name: 'customer_id',
    type: 'string',
    description: 'id do cliente',
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
    <div className="space-y-4 min-w-[50vw]">
      <h1 className="text-2xl">Cancelar assinatura</h1>

      <div className="flex space-x-2 items-center">
        <h1>
          <Delete></Delete>
        </h1>
        <p className="text-bold">
          {process.env.NEXT_PUBLIC_PAYMENT_API_URL}/subscriptions
        </p>
      </div>

      <div>
        <h1>
          Utilize este endpoint para cancelar uma assinatura para um cliente.
        </h1>
      </div>
      <hr />
      <Header></Header>
      <Body properties={body}></Body>
      <Response data={responseProps}></Response>
    </div>
  )
}
