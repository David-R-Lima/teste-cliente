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
        name: 'customers',
        type: 'object',
        description: 'Dados do cliente',
        required: false,
        additionalProperties: [
          {
            name: 'id',
            type: 'string',
            description: 'Id do cliente',
            required: false,
          },
          {
            name: 'name',
            type: 'string',
            description: 'Nome do cliente',
            required: false,
          },
          {
            name: 'email',
            type: 'string',
            description: 'Email do cliente',
            required: false,
          },
          {
            name: 'phone',
            type: 'string',
            description: 'Telefone do cliente',
            required: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            description: 'Status do cliente',
            required: false,
          },
          {
            name: 'document',
            type: 'object',
            description: 'Documento do cliente',
            required: false,
            additionalProperties: [
              {
                name: 'type',
                type: 'string',
                description: 'Tipo do documento. Ex: CPf | CNPJ',
                required: false,
              },
              {
                name: 'text',
                type: 'string',
                description: 'Número do documento',
                required: false,
              },
              {
                name: 'country',
                type: 'string',
                description: 'País do documento',
                required: false,
              },
            ],
          },
          {
            name: 'merchant_id',
            type: 'string',
            description: 'Id do merchant',
            required: false,
          },
          {
            name: 'created_at',
            type: 'Date',
            description: 'Data de criação do cliente',
            required: false,
          },
          {
            name: 'updated_at',
            type: 'Date | undefined',
            description: 'Data de atualização do cliente',
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

export default function GetCustomer() {
  return (
    <PageFormat
      title="Buscar clientes"
      description="Utilize este endpoint para buscar seus clientes"
      url={`${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/customers?page={1}`}
      httpMethod={<Get></Get>}
      header={<Header></Header>}
      queryParams={<QueryParams properties={data}></QueryParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
