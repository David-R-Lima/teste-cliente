import { Header } from '../../components/header'
import { Get } from '../../components/http-methods'
import { QueryParams } from '../../components/query-params'
import { Response } from '../../components/response'
import { PageFormat } from '../../pageformat'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'page',
    type: 'number',
    description: 'Número da página',
    required: false,
  },
  {
    name: 'items_per_page',
    type: 'number',
    description: 'Número de registros por página',
    required: false,
  },
]

const responseProps: ResponseProps[] = [
  {
    code: 200,
    properties: [
      {
        name: 'id',
        type: 'string',
        description: 'Charge id',
        required: false,
      },
      {
        name: 'merchant_id',
        type: 'string',
        description: 'Merchant id',
        required: false,
      },
      {
        name: 'value',
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
        name: 'provider_id',
        type: 'string',
        description: 'Id do provedor',
        required: false,
      },
      {
        name: 'description',
        type: 'string',
        description: 'Descrição da cobrança',
        required: false,
      },
      {
        name: 'situation',
        type: 'string',
        description: 'Situação da cobrança',
        required: false,
      },
      {
        name: 'charge_type',
        type: 'string',
        description: 'Tipo da cobrança. Ex: UNICA | RECORRENCIA',
        required: false,
      },
      {
        name: 'card_id',
        type: 'string',
        description: 'Id da cobrança de cartão',
        required: false,
      },
      {
        name: 'pix_id',
        type: 'string',
        description: 'Id da cobrança de pix',
        required: false,
      },
      {
        name: 'boleto_id',
        type: 'string',
        description: 'Id da cobrança de boleto',
        required: false,
      },
      {
        name: 'payment_type',
        type: 'string',
        description: 'Tipo de pagamento. Ex: CARTAO_CREDITO | PIX | BOLETO',
        required: false,
      },
      {
        name: 'nsu',
        type: 'string',
        description: 'NSU do pagamento',
        required: false,
      },
      {
        name: 'customer_id',
        type: 'string',
        description: 'Id do cliente',
        required: false,
      },
      {
        name: 'recurrence_id',
        type: 'string',
        description: 'Id da recorrência',
        required: false,
      },
      {
        name: 'payer',
        type: 'object',
        description: 'Dados do pagador',
        required: false,
        additionalProperties: [
          {
            name: 'name',
            type: 'string',
            description: 'Nome do pagador',
            required: false,
          },
          {
            name: 'email',
            type: 'string',
            description: 'Email do pagador',
            required: false,
          },
          {
            name: 'phone',
            type: 'string',
            description: 'Telefone do pagador',
            required: false,
          },
          {
            name: 'document',
            type: 'object',
            description: 'Documento do pagador',
            required: false,
            additionalProperties: [
              {
                name: 'type',
                type: 'string',
                description: 'Tipo do documento. Ex: CPF | CNPJ',
                required: false,
              },
              {
                name: 'text',
                type: 'string',
                description: 'Texto do documento',
                required: false,
              },
              {
                name: 'country',
                type: 'string',
                description: 'País do documento. EX: BR',
                required: false,
              },
            ],
          },
        ],
      },
      {
        name: 'address',
        type: 'object',
        description: 'Endereço do pagador',
        required: false,
        additionalProperties: [
          {
            name: 'street',
            type: 'string',
            description: 'Rua do endereço',
            required: false,
          },
          {
            name: 'number',
            type: 'string',
            description: 'Número do endereço',
            required: false,
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
            required: false,
          },
          {
            name: 'zip_code',
            type: 'string',
            description: 'CEP do endereço',
            required: false,
          },
          {
            name: 'state',
            type: 'string',
            description: 'Estado do endereço',
            required: false,
          },
          {
            name: 'city',
            type: 'string',
            description: 'Cidade do endereço',
            required: false,
          },
          {
            name: 'country',
            type: 'string',
            description: 'País do endereço. Ex: BR',
            required: false,
          },
          {
            name: 'city_code',
            type: 'string',
            description: 'Código da cidade',
            required: false,
          },
          {
            name: 'country_code',
            type: 'string',
            description: 'Código do país',
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

export default function GetCharges() {
  return (
    <PageFormat
      title="Buscar cobranças"
      description="Utilize este endpoint para buscar suas cobranças"
      url={`${process.env.NEXT_PUBLIC_API_URL}/charges`}
      httpMethod={<Get></Get>}
      header={<Header></Header>}
      queryParams={<QueryParams properties={data}></QueryParams>}
      response={<Response data={responseProps}></Response>}
    ></PageFormat>
  )
}
