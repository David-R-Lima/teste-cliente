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
]

export default function CreateCustomer() {
  return (
    <PageFormat
      title="Buscar links de pagamento"
      description="Utilize este endpoint para buscar seus links de pagamento"
      url={`${process.env.NEXT_PUBLIC_API_URL}/payment-link`}
      httpMethod={<Get></Get>}
      header={<Header></Header>}
      queryParams={<QueryParams properties={data}></QueryParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
