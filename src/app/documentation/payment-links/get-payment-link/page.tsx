import { Header } from '../../components/header'
import { Get } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'id',
    type: 'string',
    description: 'Id do link de pagamento',
    required: false,
  },
]
const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'links',
        type: 'array',
        description: 'Links',
        required: false,
        additionalProperties: [
          {
            name: 'id',
            type: 'string',
            description: 'id do link.',
            required: false,
          },
          {
            name: 'url',
            type: 'string',
            description: 'url do link.',
            required: false,
          },
          {
            name: 'name',
            type: 'string',
            description: 'Nome do link.',
            required: false,
          },
          {
            name: 'description',
            type: 'string',
            description: 'Descrição do link.',
            required: false,
          },
          {
            name: 'endDate',
            type: 'string',
            description: 'Descrição do link.',
            required: false,
          },
          {
            name: 'value',
            type: 'number',
            description: 'Valor do link.',
            required: false,
          },
          {
            name: 'billingType',
            type: 'string',
            description: 'Billing type',
            required: false,
          },
          {
            name: 'chargeType',
            type: 'string',
            description: 'charge Type',
            required: false,
          },
          {
            name: 'dueDateLimitDays',
            type: 'string',
            description: 'Dias para expiração',
            required: false,
          },
          {
            name: 'maxInstallmentCount',
            type: 'string',
            description: 'Numero maximo de parcelas',
            required: false,
          },
          {
            name: 'merchantId',
            type: 'string',
            description: 'Id do merchant',
            required: false,
          },
          {
            name: 'recurrenceId',
            type: 'string',
            description: 'Id da recorrencia',
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
]

export default function CreateCustomer() {
  return (
    <PageFormat
      title="Buscar link de pagamento pelo id"
      description="Utilize este endpoint para buscar um link de pagemento pelo id"
      url={`${process.env.NEXT_PUBLIC_API_URL}/payment-link/:id`}
      httpMethod={<Get></Get>}
      header={<Header></Header>}
      pathParams={<PathParams properties={data}></PathParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
