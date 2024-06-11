import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { BodyProps } from "../type"

interface Props {
    properties: BodyProps[]
    level?: number
}

export function Body({ properties, level = 0 }: Props) {
    const renderProperties = (properties: BodyProps[], level: number) => {

            const bgClass = level % 2 !== 0 ? "bg-muted" : "bg-accent";
            const borderClass = level > 0 ? "border-2" : "";

        return properties.map((property, index) => (
            <div key={index} className={`space-y-2 p-4 rounded-lg my-4 ${bgClass} ${borderClass}`}>
                <div className="flex space-x-2">
                    <h1 className="text-bold"><strong>{property.name}</strong></h1>
                    <p className="italic">{property.type}</p>
                    {property.required && (
                        <p className="text-primary">Obrigatório!</p>
                    )}
                </div>
                <p>{property.description}</p>
                {property.additionalProperties && (
                    <div className="ml-4">
                        {renderProperties(property.additionalProperties, level + 1 )}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>BODY</AccordionTrigger>
                <AccordionContent>
                    {renderProperties(properties, level + 1)}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}