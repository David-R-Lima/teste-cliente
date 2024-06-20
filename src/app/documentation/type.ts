export interface BodyProps {
  name: string
  description: string
  type: string
  required: boolean
  additionalProperties?: {
    name: string
    type: string
    description: string
    required: boolean
    additionalProperties?: {
      name: string
      type: string
      description: string
      required: boolean
      additionalProperties?: {
        name: string
        type: string
        description: string
        required: boolean
      }[]
    }[]
  }[]
}

export interface ResponseProps {
  code: number
  properties: BodyProps[]
}
