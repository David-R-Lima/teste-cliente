import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
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
        name: 'id',
        type: 'string',
        description: 'true',
        required: false,
      },
      {
        name: 'client_id',
        type: 'string',
        description: 'Id do cliente',
        required: false,
      },
      {
        name: 'created_at',
        type: 'Date',
        description: 'Data de criação',
        required: false,
      },
      {
        name: 'amount',
        type: 'number',
        description: 'Valor da cobrança',
        required: false,
      },
      {
        name: 'currency',
        type: 'string',
        description: 'Moeda da cobrança. Ex: BRL | USD',
        required: false,
      },
      {
        name: 'statementDescriptor',
        type: 'string',
        description: 'Descrição da cobrança',
        required: false,
      },
      {
        name: 'description',
        type: 'string',
        description: 'Descrição da fatura',
        required: false,
      },
      {
        name: 'capture',
        type: 'boolean',
        description: 'Captura da cobrança',
        required: false,
      },
      {
        name: 'status',
        type: 'string',
        description: 'Situação da cobrança',
        required: false,
      },
      {
        name: 'paymentMethod',
        type: 'object',
        description: 'Método de pagamento',
        required: false,
        additionalProperties: [
          {
            name: 'paymentType',
            type: 'string',
            description: 'Tipo de pagamento. Ex: CREDIT_CARD',
            required: false,
          },
          {
            name: 'installments',
            type: 'number',
            description: 'Número de parcelas',
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

export default function CapturaCharge() {
  return (
    <PageFormat
      title="Capturar cobrança"
      description="Utilize este endpoint para capturar uma cobrança"
      url={`${process.env.NEXT_PUBLIC_API_URL}/charges/:charge_id/capture`}
      httpMethod={<Post></Post>}
      header={<Header></Header>}
      pathParams={<PathParams properties={data}></PathParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
