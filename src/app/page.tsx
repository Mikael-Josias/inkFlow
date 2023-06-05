import Image from "next/image";
import InkFlowLogo from "../../public/Logo.svg";

export default function Home() {
  return (
    <main className="w-screen h-screen flex">
      <section className="h-screen w-1/2 bg-white-950 flex items-center justify-center">
        <Image src={InkFlowLogo} alt="Ink Flow White Logo"/>
      </section>
      <section className="h-screen w-1/2 bg-white flex items-center">
        <div className="w-[400px] my-auto ml-20">
          <h3 className="text-4xl font-bold text-white-950">Primeira vez?</h3>
          <form className="flex flex-col gap-10 w-full mt-10 mb-1">
            <label>
              <input type="text" placeholder="Nome" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
            </label>
            <label>
              <input type="email" placeholder="Email" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
            </label>
            <label>
              <input type="password" placeholder="Senha" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
            </label>
            <label>
              <input type="password" placeholder="Verifique a senha" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
            </label>

            <input type="submit" value="CADASTRAR" className="h-8 bg-blue-500 mt-10 text-white font-bold rounded-l cursor-pointer hover:bg-blue-500/90 transition-colors" />
          </form>
          <div className="w-full text-center ">
            <span className="text-white-600">Já possui uma conta? <a href="#Ola" className="text-blue-500 cursor-pointer">faça login!</a></span>
          </div>
        </div>
      </section>
    </main>
  )
}
