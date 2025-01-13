import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BodyProps, ResponseProps } from '../type'

interface Props {
  data: ResponseProps[]
}

export function Response({ data }: Props) {
  const renderProperties = (properties: BodyProps[], level: number) => {
    const bgClass = level % 2 !== 0 ? 'bg-muted' : 'bg-accent/40'

    const borderClass = level > 0 ? 'border-2' : ''

    return properties.map((property, index) => (
      <div
        key={index}
        className={`space-y-2 p-4 rounded-lg my-4 ${bgClass} ${borderClass}`}
      >
        <div className="flex space-x-2">
          <h1 className="text-bold">
            <strong>{property.name}</strong>
          </h1>
          <p className="italic">{property.type}</p>
        </div>
        <p>{property.description}</p>
        {property.additionalProperties && (
          <div className="ml-4">
            {renderProperties(property.additionalProperties, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>RESPONSE</AccordionTrigger>
        <AccordionContent>
          {data.map((property, index) => {
            const colorClass =
              property.code >= 200 && property.code < 300
                ? 'text-green-500'
                : property.code >= 400 && property.code < 500
                  ? 'text-red-500'
                  : ''

            return (
              <div
                key={index}
                className="space-y-2 bg-muted/40 p-4 rounded-lg my-4"
              >
                <div className="flex space-x-2">
                  <h1 className={`text-bold ${colorClass}`}>
                    <strong>{property.code}</strong>
                  </h1>
                </div>
                {renderProperties(property.properties, 0)}
              </div>
            )
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
