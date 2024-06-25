import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { Response } from '../../components/response'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'name',
    type: 'string',
    description: 'Nome do cliente',
    required: true,
  },
  {
    name: 'email',
    type: 'string',
    description: 'Email do cliente',
    required: true,
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
    required: true,
    additionalProperties: [
      {
        name: 'type',
        type: 'string',
        description: 'Tipo do documento. Ex: CPf | CNPJ',
        required: true,
      },
      {
        name: 'text',
        type: 'string',
        description: 'Número do documento',
        required: true,
      },
      {
        name: 'country',
        type: 'string',
        description: 'País do documento',
        required: true,
      },
    ],
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
    <div className="space-y-4 min-w-[50vw]">
      <h1 className="text-2xl">Criar cliente</h1>

      <div className="flex space-x-2 items-center">
        <h1>
          <Post></Post>
        </h1>
        <p className="truncate text-bold max-w-[80vw]">
          {process.env.NEXT_PUBLIC_PAYMENT_API_URL}/customers
        </p>
      </div>

      <div>
        <h1>
          Utilize este endpoint para criar um cliente, você vai precisar de um
          cliente cadastrado para criar cartões e assinaturas
        </h1>
      </div>
      <hr />
      <Header></Header>
      <Body properties={data}></Body>
      <Response data={responseProps}></Response>
    </div>
  )
}
