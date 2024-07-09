import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Patch } from '../../components/http-methods'
import { PathParams } from '../../components/parameters'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const path: BodyProps[] = [
  {
    name: 'id',
    type: 'string',
    description: 'Id do cliente',
    required: true,
  },
]

const data: BodyProps[] = [
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
    name: 'address',
    type: 'object',
    description: 'Endereço do cliente',
    required: false,
    additionalProperties: [
      {
        name: 'street',
        type: 'string',
        description: 'Rua do endereço',
        required: true,
      },
      {
        name: 'number',
        type: 'string',
        description: 'Número do endereço',
        required: true,
      },
      {
        name: 'complement',
        type: 'string',
        description: 'Complemento do endereço',
        required: false,
      },
      {
        name: 'neighborhood',
        type: 'string',
        description: 'Bairro do endereço',
        required: true,
      },
      {
        name: 'zip_code',
        type: 'string',
        description: 'CEP do endereço',
        required: true,
      },
      {
        name: 'city',
        type: 'string',
        description: 'Cidade do endereço',
        required: true,
      },
      {
        name: 'state',
        type: 'string',
        description: 'Estado do endereço',
        required: true,
      },
      {
        name: 'country',
        type: 'string',
        description: 'País do endereço. Ex: BR',
        required: true,
      },
    ],
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'customer',
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

export default function UpdateCustomer() {
  return (
    <PageFormat
      title="Atualizar um cliente"
      description="Utilize este endpoint para atualizar os dados de um cliente"
      url={`${process.env.NEXT_PUBLIC_API_URL}/customers/:id`}
      httpMethod={<Patch></Patch>}
      pathParams={<PathParams properties={path}></PathParams>}
      bodyParams={<Body properties={data}></Body>}
      header={<Header></Header>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
