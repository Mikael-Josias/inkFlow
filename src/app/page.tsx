'use client'
import Image from "next/image";
import InkFlowLogo from "../../public/Logo.svg";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit, formState: { errors }} = useForm();

  return (
      <main className="w-screen h-screen flex">
        <section className="h-screen w-1/2 bg-white-950 flex items-center justify-center">
          <Image src={InkFlowLogo} alt="Ink Flow White Logo"/>
        </section>
        <section className="h-screen w-1/2 bg-white flex items-center">
          <div className="w-[400px] m-auto">
            <h3 className="text-4xl font-bold text-white-950">Primeira vez?</h3>
            <form className="flex flex-col gap-10 w-full mt-10 mb-1">
              <label>
                <input {...register("name", {required: true})} type="text" placeholder="Nome" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
              </label>
              <label>
                <input {...register("email", {required: true})} type="email" placeholder="Email" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
              </label>
              <label>
                <input {...register("password", {required: true})} type="password" placeholder="Senha"  className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
              </label>
              <label>
                <input {...register("verifyPassword", {required: true})} type="password" placeholder="Verifique a senha" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
              </label>

              <input type="submit" value="CADASTRAR" className="h-8 bg-blue-500 mt-10 text-white font-bold rounded-md cursor-pointer hover:bg-blue-500/90 transition-colors" />
            </form>
            <div className="w-full text-center ">
              <span className="text-white-600">Já possui uma conta? <a href="#Ola" className="text-blue-500 cursor-pointer">faça login!</a></span>
            </div>
          </div>
        </section>
      </main>
  )
}
