import axios from 'axios'

interface viacepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export const fetchAddress = async (cep: string) => {
  const res = await axios.get<viacepResponse>(
    `https://viacep.com.br/ws/${cep}/json`,
  )

  return res.data
}
