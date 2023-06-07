import InkFlowLogo from '../../../public/Logo.svg'
import { ReactNode } from 'react';
import Image from "next/image";

type SignProps = {
  title: string,
} & { children?: ReactNode}

export default function Sign({ title, children }: SignProps) {
  return (
    <main className="w-screen h-screen flex">
      <section className="h-screen w-1/2 bg-white-950 flex items-center justify-center">
        <Image src={InkFlowLogo} alt="Ink Flow White Logo"/>
      </section>
      <section className="h-screen w-1/2 bg-white flex items-center">
        <div className="w-[400px] m-auto">
          <h3 className="text-4xl font-bold text-white-950">{title}</h3>
          { children }
        </div>
      </section>
    </main>
  )
}