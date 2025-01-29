import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'name',
    type: 'string',
    description: 'Nome do link de pagamento.',
    required: true,
  },
  {
    name: 'description',
    type: 'string',
    description: 'Descrição do link de pagamento',
    required: false,
  },
  {
    name: 'endDate',
    type: 'date',
    description: 'Data de expiração do link de pagamento',
    required: false,
  },
  {
    name: 'value',
    type: 'number',
    description: 'Valor do link de pagamento',
    required: false,
  },
  {
    name: 'billingType',
    type: 'string // ver os enums dps',
    description: 'Billing Type',
    required: false,
  },
  {
    name: 'chargeType',
    type: 'string // ver os enums dps',
    description: 'Charge Type',
    required: false,
  },
  {
    name: 'dueDateLimitDays',
    type: 'dias para expirar',
    description: 'Quantidade de dias para expirar',
    required: false,
  },
  {
    name: 'maxInstallmentCount',
    type: 'number',
    description: 'Quantidade maxima de parcelas',
    required: false,
  },
  {
    name: 'notificationEnabled',
    type: 'boolean',
    description: 'Habilitar notificações',
    required: false,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'link',
        type: 'string',
        description: 'Link',
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
    code: 409,
    properties: [
      {
        name: 'Resource already exists',
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

export default function CreateCustomer() {
  return (
    <PageFormat
      title="Criar link de pagamento"
      description="Utilize este endpoint para criar um link de pagamento"
      url={`${process.env.NEXT_PUBLIC_API_URL}/payment-link`}
      httpMethod={<Post></Post>}
      header={<Header></Header>}
      bodyParams={<Body properties={data}></Body>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
