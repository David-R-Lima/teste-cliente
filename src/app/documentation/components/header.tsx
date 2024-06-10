import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  

export function Header() {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger >HEADERS</AccordionTrigger>
                <AccordionContent>
                <div className="space-y-2 bg-muted p-4 rounded-lg">
                    <h1 className="text-bold"><strong>Authorization</strong></h1>
                    <p>Token de autenticação. Deve ser enviado no formato: Bearer &lt;Token&gt;</p>
                </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}