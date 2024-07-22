'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Documentation() {
  return (
    <div className="">
      <h1 className="italic text-xl">
        <strong>
          Navegue pela documentação para se situar nas funcionalidades da API
        </strong>
      </h1>
      <div className="mt-4 flex items-center">
        <p className="italic">
          Ou veja as requisições na nossa collection do postman
        </p>
        <Button variant={'link'} className="italic" asChild>
          <Link href={'https://www.postman.com/pagbttis/workspace/pagbttis'}>
            Postman collection
          </Link>
        </Button>
      </div>
    </div>
  )
}
