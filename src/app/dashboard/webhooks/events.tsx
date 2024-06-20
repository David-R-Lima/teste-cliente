'use client'

import { Label } from '@radix-ui/react-dropdown-menu'
import { X, ChevronUp, ChevronDown, CircleCheck, Circle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Elements {
  label: string
  value: string
}

const languages = [
  { label: 'Cobrança', value: 'en' },
  { label: 'Assinatura', value: 'fr' },
  { label: 'Estorno', value: 'de' },
  { label: 'Teste', value: 'd5' },
] as const

export function WebHookEvents() {
  const [eventsOpen, setEventsOpen] = useState(false)
  const div = useRef<HTMLDivElement | null>(null)
  const [elements, setElements] = useState<Elements[]>([])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element

      if (div.current && target) {
        if (!div.current.contains(target)) {
          setEventsOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div
      ref={div}
      className="relative flex items-center justify-between w-full h-10 border rounded-lg hover:cursor-pointer"
      onClick={(e) => {
        setEventsOpen(!eventsOpen)
      }}
    >
      <div
        className="flex items-center p-2 space-x-2"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {elements.map((element) => {
          return (
            <div
              key={element.value}
              className="flex items-center h-6 rounded-lg border border-primary hover:bg-secondary"
              onClick={() => {
                setElements(elements.filter((e) => e.value !== element.value))
              }}
            >
              <Label className="p-3">{element.label}</Label>
              <X className="w-4 h-4 mr-2"></X>
            </div>
          )
        })}
      </div>
      <div
        className="mr-2"
        onClick={() => {
          setEventsOpen(!eventsOpen)
        }}
      >
        {eventsOpen ? (
          <ChevronUp className="w-4 h-4"></ChevronUp>
        ) : (
          <ChevronDown className="w-4 h-4"></ChevronDown>
        )}
      </div>
      <div
        className={`${eventsOpen ? 'absolute' : 'hidden'} w-full max-h-[200px] top-10 bg-accent p-2 rounded-lg overflow-y-scroll`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {languages.map((language) => (
          <div
            key={language.value}
            className="flex w-full items-center p-2 hover:bg-primary rounded-lg hover:cursor-pointer"
            onClick={() => {
              if (
                elements.find((element) => element.value === language.value)
              ) {
                setElements(
                  elements.filter(
                    (element) => element.value !== language.value,
                  ),
                )
              } else {
                setElements([...elements, language])
              }
            }}
          >
            <div>
              {elements.find((element) => element.value === language.value) ? (
                <CircleCheck />
              ) : (
                <Circle />
              )}
            </div>
            <div className="flex items-center space-x-4 p-2 rounded-lg">
              <Label>{language.label}</Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
