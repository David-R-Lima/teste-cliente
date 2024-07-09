import { Header } from '../../components/header'
import { Get } from '../../components/http-methods'
import { QueryParams } from '../../components/query-params'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'page',
    type: 'string',
    description: 'Número da página',
    required: false,
  },
  {
    name: 'itemsPerPage',
    type: 'string',
    description: 'Número de items por página',
    required: false,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'recurrence',
        type: 'array of objects',
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
export default function GetSignatures() {
  return (
    <PageFormat
      title="Buscar assinaturas"
      description="Utilize este endpoint para buscar todos seus assinantes"
      url={`${process.env.NEXT_PUBLIC_API_URL}/subscriptions`}
      httpMethod={<Get></Get>}
      header={<Header></Header>}
      queryParams={<QueryParams properties={data}></QueryParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
