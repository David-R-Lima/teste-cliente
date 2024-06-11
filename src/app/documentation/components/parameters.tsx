import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { BodyProps } from "../type"
  
interface Props {
    properties: BodyProps[]
}
export function PathParams({properties}: Props) {
    return (
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger>PATH PARAMS</AccordionTrigger>
            <AccordionContent>
            {properties.map((property, index) => {
                return (
                    <div key={index} className="space-y-2 bg-muted p-4 rounded-lg my-4">
                        <div className="flex space-x-2">
                            <h1 className="text-bold"><strong>{property.name}</strong></h1>
                            <p className="italic">{property.type}</p>
                            {property.required && (
                                <p className="text-primary">Obrigatório!</p>
                            )}
                        </div>
                        <p>{property.description}</p>
                    </div>
                )
            })}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
    )
}