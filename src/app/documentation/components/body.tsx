import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { BodyProps } from "../type"

export function Body({properties}: BodyProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>BODY</AccordionTrigger>
                <AccordionContent>
                {properties.map((property, index) => {
                    if(property.type === "object" && property.additionalProperties) {
                        return  <div key={index} className="space-y-2 bg-muted p-4 rounded-lg my-4">
                                <div className="flex space-x-2">
                                    <h1 className="text-bold"><strong>{property.name}</strong></h1>
                                    <p className="italic">{property.type}</p>
                                    {property.required && (
                                        <p className="text-primary">Obrigatório!</p>
                                    )}
                                </div>
                                <p>{property.description}</p>
                                <div>
                                {property.additionalProperties.map((property, index) => {
                                    return (
                                        <div key={index} className="space-y-2 bg-accent p-4 rounded-lg my-4 border-2">
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
                                </div>
                        </div>

                    } else {
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
                    }

                })}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}