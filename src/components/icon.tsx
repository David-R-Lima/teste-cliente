import { CreditCard } from 'lucide-react'
import Mastercard from '../card-icons/mastercard.svg'
import Visa from '../card-icons/visa.svg'
import AmericanExpress from '../card-icons/amex.svg'
import Elo from '../card-icons/elo.svg'
import { Brand } from '@/services/cards/types'

interface Props {
  brand: Brand
}

export function CardIcon({ brand }: Props) {
  switch (brand) {
    case Brand.VISA:
      return (
        <div className="flex size-10">
          <Visa />
        </div>
      )
    case Brand.MASTERCARD:
      return (
        <div className="flex size-10">
          <Mastercard></Mastercard>
        </div>
      )
    case Brand.ELO:
      return (
        <div className="flex size-10">
          <Elo />
        </div>
      )
    case Brand.AMERICAN_EXPRESS:
      return (
        <div className="flex size-10">
          <AmericanExpress />
        </div>
      )
    default:
      return (
        <div className="flex size-10">
          <CreditCard></CreditCard>
        </div>
      )
  }
}
