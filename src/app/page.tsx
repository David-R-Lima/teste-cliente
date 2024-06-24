import Link from 'next/link'
import { FaWhatsapp, FaRegClock } from 'react-icons/fa'
import { CiMail } from 'react-icons/ci'
import { FaLocationDot } from 'react-icons/fa6'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function Home() {
  return (
    <main>
      <header className="flex h-[8vh] p-8 border-b-2 items-center justify-between">
        <p className="text-primary text-2xl">PagBttis</p>
        <div className="flex space-x-4">
          <p className="hover:underline hover:text-primary">
            <Link href={'#'}>Suporte</Link>
          </p>
          <p className="hover:underline hover:text-primary">
            <Link href={'#'}>Documentação</Link>
          </p>
          <p className="hover:underline hover:text-primary">
            <Link href={'/login'}>Acessar dashboard</Link>
          </p>
        </div>
      </header>
      <div className="flex-col justify-center items-center min-h-[80vh] w-full">
        <div className="h-[100vh]"></div>
        <div className="flex items-center justify-center p-2 w-full ">
          <h1 className="text-primary text-2xl italic">Opiniões de usuários</h1>
        </div>

        <div className="flex items-center justify-center p-10 w-full">
          <div className="flex justify-around p-6 space-x-4">
            <div className="border-2 p-4 w-[12rem] space-y-2 rounded-lg ">
              <h1 className="text-primary">David</h1>
              <p className="italic">&quot;Gostei mt&quot;</p>
            </div>
            <div className="border-2 p-4 w-[12rem] space-y-2 rounded-lg">
              <h1 className="text-primary">Marcos</h1>
              <p className="italic">
                &quot;Melhor plataforma de pagamento do mercado&quot;
              </p>
            </div>
            <div className="border-2 p-4 w-[12rem] space-y-2 rounded-lg">
              <h1 className="text-primary">Maria</h1>
              <p className="italic">
                &quot;Fiquei surpreso com a simplicidade de tudo!&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <h1 className="text-primary text-2xl italic">Ficou com interesse?</h1>
        </div>
        <div className="flex items-center justify-center w-full mt-2">
          <h1 className="text-xl italic">
            Entre em contato conosco para saber mais!
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <form className="flex-col items-center justify-center p-8 w-[30%]">
            <div className="border-2 p-8 space-y-4 rounded-lg w-full">
              <h1 className="text-primary">Nome da empresa</h1>
              <Input></Input>
              <h1 className="text-primary">Cnpj</h1>
              <Input></Input>
              <h1 className="text-primary">Telefone</h1>
              <Input></Input>
              <h1 className="text-primary">Email</h1>
              <Input></Input>
              <hr />
              <h1 className="text-primary">Algo mais que queira nós falar?</h1>
              <Textarea />
              <Button>Enviar</Button>
            </div>
          </form>
        </div>
      </div>
      <footer className="relative flex-col items-center justify-center p-8 h-[30vh] border-t-2 w-full">
        <div className="flex space-x-[8rem]">
          <div className="space-y-4 space-x-2">
            <h1 className="text-primary">Contato</h1>
            <div className="flex space-x-2 items-center">
              <FaWhatsapp size={25} /> <p>+55 33 99847-9333</p>
            </div>
            <div className="flex space-x-2 items-center">
              <CiMail size={25} />
              <p>atendimento@bttis.com</p>
            </div>
            <div className="flex space-x-2 items-center">
              <FaLocationDot size={25} />
              <p>
                Av Engenheiro Roberto Lassance, 1605, Loja, Vila Isa, Gov.
                Valadares/MG
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <FaRegClock size={25} />
              <div>
                <p>Seg a Sex: 8:00 às 18:00</p>
                <p>Sáb: 8:00 às 12:00</p>
              </div>
            </div>
          </div>
          <div>
            <div className=" space-y-4 space-x-2">
              <h1 className="text-primary">Acesse</h1>
              <div>
                <Link
                  href={'/'}
                  className="hover:text-primary hover:cursor-pointer hover:underline"
                >
                  Suporte
                </Link>
              </div>
              <div>
                <Link
                  href={'/'}
                  className="hover:text-primary hover:cursor-pointer hover:underline"
                >
                  Documentação
                </Link>
              </div>
              <div>
                <Link
                  href={'/login'}
                  className="hover:text-primary hover:cursor-pointer hover:underline"
                >
                  Acesse o dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="text-primary my-6">
            PagBttis é desenvolvido pela Bttis - Copyright 2024 - Todos os
            direitos reservados. CNPJ 33.657.781/0001-40
          </p>
        </div>
      </footer>
    </main>
  )
}
