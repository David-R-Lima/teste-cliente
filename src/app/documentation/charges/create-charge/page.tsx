import { Body } from '../../components/body'
import { Header } from '../../components/header'
import { Post } from '../../components/http-methods'
import { Response } from '../../components/response'
import { BodyProps, ResponseProps } from '../../type'

const data: BodyProps[] = [
  {
    name: 'customer_id',
    type: 'string',
    description: 'id do cliente',
    required: false,
  },
  {
    name: 'value',
    type: 'number',
    description: 'Valor total da cobrança',
    required: true,
  },
  {
    name: 'invoice_description',
    type: 'string',
    description: 'Descrição da fatura',
    required: true,
  },
  {
    name: 'capture',
    type: 'boolean',
    description: 'Captura da cobrança',
    required: true,
  },
  {
    name: 'description',
    type: 'string',
    description: 'Descrição da cobrança',
    required: true,
  },
  {
    name: 'payment_type',
    type: 'string',
    description: 'Tipo de pagamento. Ex: CREDIT_CARD | PIX | BOLETO',
    required: true,
  },
  {
    name: 'pix_payment_method',
    type: 'object',
    description: 'Método de pagamento PIX',
    required: false,
    additionalProperties: [
      {
        name: 'expiration_time',
        type: 'number',
        description: 'Tempo de expiração do pix',
        required: true,
      },
      {
        name: 'items',
        type: 'array',
        description: 'Itens da cobrança',
        required: true,
        additionalProperties: [
          {
            name: 'description',
            type: 'string',
            description: 'Descrição do item',
            required: true,
          },
          {
            name: 'unity_value',
            type: 'number',
            description: 'Valor do item',
            required: true,
          },
          {
            name: 'quantity',
            type: 'number',
            description: 'Quantidade do item',
            required: true,
          },
        ],
      },
    ],
  },
  {
    name: 'card_payment_method',
    type: 'object',
    description: 'Método de pagamento Cartão',
    required: false,
    additionalProperties: [
      {
        name: 'payment_type_card',
        type: 'string',
        description: 'Tipo do cartão. Ex: CREDIT_CARD',
        required: true,
      },
      {
        name: 'installments',
        type: 'number',
        description: 'Número de parcelas',
        required: true,
      },
      {
        name: 'token',
        type: 'string',
        description: 'Cartão tokenizado',
        required: false,
      },
      {
        name: 'card_id',
        type: 'string',
        description: 'Id do cartão',
        required: false,
      },
      {
        name: 'items',
        type: 'array',
        description: 'Itens da cobrança',
        required: true,
        additionalProperties: [
          {
            name: 'description',
            type: 'string',
            description: 'Descrição do item',
            required: true,
          },
          {
            name: 'unity_value',
            type: 'number',
            description: 'Valor do item',
            required: true,
          },
          {
            name: 'quantity',
            type: 'number',
            description: 'Quantidade do item',
            required: true,
          },
        ],
      },
    ],
  },
  {
    name: 'boleto_payment_method',
    type: 'object',
    description: 'Método de pagamento Boleto',
    required: false,
    additionalProperties: [
      {
        name: 'expiration_date',
        type: 'date',
        description: 'Data de expiração do boleto',
        required: true,
      },
      {
        name: 'instructions',
        type: 'string',
        description: 'instruções',
        required: true,
      },
      {
        name: 'expiration_days_for_fees',
        type: 'number',
        description: 'Quantos dias apés o vencimento para começar a cobrar',
        required: false,
      },
      {
        name: 'fee_value_per_day',
        type: 'number',
        description: 'Valor da cobrança por dia',
        required: false,
      },
      {
        name: 'fee_percentage_per_month',
        type: 'number',
        description: 'Porcentagem do valor por mês',
        required: false,
      },
      {
        name: 'expiration_days_for_fine',
        type: 'number',
        description: 'Quantos dias apés o vencimento para começar a multar',
        required: false,
      },
      {
        name: 'fine_value',
        type: 'number',
        description: 'Valor da multa',
        required: false,
      },
      {
        name: 'fine_percentage',
        type: 'number',
        description: 'Valor da porcentagem da multa',
        required: false,
      },
      {
        name: 'items',
        type: 'array',
        description: 'Itens da cobrança',
        required: true,
        additionalProperties: [
          {
            name: 'description',
            type: 'string',
            description: 'Descrição do item',
            required: true,
          },
          {
            name: 'unity_value',
            type: 'number',
            description: 'Valor do item',
            required: true,
          },
          {
            name: 'quantity',
            type: 'number',
            description: 'Quantidade do item',
            required: true,
          },
        ],
      },
    ],
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
        required: true,
      },
      {
        name: 'email',
        type: 'string',
        description: 'Email do pagador',
        required: true,
      },
      {
        name: 'phone',
        type: 'string',
        description: 'Telefone do pagador',
        required: true,
      },
      {
        name: 'document',
        type: 'object',
        description: 'Documento do pagador',
        required: true,
        additionalProperties: [
          {
            name: 'type',
            type: 'string',
            description: 'Tipo do documento. Ex: CPF | CNPJ',
            required: true,
          },
          {
            name: 'text',
            type: 'string',
            description: 'Texto do documento',
            required: true,
          },
          {
            name: 'country',
            type: 'string',
            description: 'País do documento. EX: BR',
            required: true,
          },
        ],
      },
      {
        name: 'address',
        type: 'object',
        description: 'Endereço do pagador',
        required: true,
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
            required: true,
          },
          {
            name: 'city',
            type: 'string',
            description: 'Cidade do endereço',
            required: false,
          },
          {
            name: 'state',
            type: 'string',
            description: 'Estado do endereço',
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

export default function CreateCharge() {
  return (
    <div className="space-y-4 min-w-[50vw]">
      <h1 className="text-2xl">Criar cobrança</h1>

      <div className="flex space-x-2 items-center">
        <h1>
          <Post></Post>
        </h1>
        <p className="text-bold">
          {process.env.NEXT_PUBLIC_PAYMENT_API_URL}/api/charges
        </p>
      </div>

      <div>
        <h1>Utilize este endpoint para criar uma cobrança</h1>
      </div>
      <hr />
      <Header></Header>
      <Body properties={data}></Body>
      <Response data={responseProps}></Response>
    </div>
  )
}
