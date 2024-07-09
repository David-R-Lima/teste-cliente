import { Header } from '../../components/header'
import { Get } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const body: BodyProps[] = [
  {
    name: 'id',
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

export default function GetSignatureById() {
  return (
    <PageFormat
      title="Buscar assinatura pelo id"
      description="Utilize este endpoint para buscar uma assinatura para um cliente."
      url={`${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/subscriptions/:id`}
      httpMethod={<Get></Get>}
      header={<Header></Header>}
      pathParams={<PathParams properties={body}></PathParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
