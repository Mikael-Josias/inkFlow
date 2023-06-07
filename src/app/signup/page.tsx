'use client'
import { ToastContainer, toast } from "react-toastify";
import { useSignUp } from "@/hooks/api/useSignUp";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Sign from "@/layouts/sign";
import Link from "next/link";
import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import ButtonSpinner from "@/components/buttonSpinner";

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }} = useForm();
  const { signUpAct, signUpLoading } = useSignUp();

  console.log(errors)
  const submit = async (data: any) => {
    const {
      name,
      email,
      password,
      verifyPassword,
    } = data;
    
    if (password !== verifyPassword) {
      toast('As senhas são diferentes!');
      return;
    }

    try {
      await signUpAct({name, email, password});
      router.push('/signin');
      toast('Cadastro realizado com sucesso!');
    } catch (err) {
      toast('Erro ao realizar o cadastro!');
    }
  }

  return (
    <Sign title="Primeira vez?">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-10 w-full mt-10 mb-1">
        <label className="relative">
          <input {...register("name", {required: true})} type="text" placeholder="Nome" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
          { errors?.name && <span className="text-sm text-red-500 absolute bottom-[-25px] left-0">*Nome é obrigatório</span>}
        </label>
        <label className="relative">
          <input {...register("email", {required: true})} type="email" placeholder="Email" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
          { errors?.email && <span className="text-sm text-red-500 absolute bottom-[-25px] left-0">*Email é obrigatório</span>}
        </label>
        <label className="relative">
          <input {...register("password", {required: true, minLength: 8})} type="password" placeholder="Senha"  className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
          { errors?.password?.type === "required" && <span className="text-sm text-red-500 absolute bottom-[-25px] left-0">*Senha é obrigatório</span>}
          { errors?.password?.type === "minLength" && <span className="text-sm text-red-500 absolute bottom-[-25px] left-0">*Senha deve ter pelo menos 8 caracteres</span>}
        </label>
        <label className="relative">
          <input {...register("verifyPassword", {required: true})} type="password" placeholder="Verifique a senha" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
          { errors?.verifyPassword && <span className="text-sm text-red-500 absolute bottom-[-25px] left-0">*Verificar a senha é obrigatório</span>}
        </label>

        <div className="h-8 mt-10 rounded-md relative">
          { signUpLoading && <ButtonSpinner/>}
          <input type="submit" value={signUpLoading ? "" : "CADASTRAR"} className="h-full w-full bg-blue-500 text-white font-bold rounded-md cursor-pointer hover:bg-blue-500/90 transition-colors" />
        </div>
      </form>
      <div className="w-full text-center ">
        <span className="text-white-600">Já possui uma conta? <Link href="/signin" className="text-blue-500 cursor-pointer">faça login!</Link></span>
      </div>
      <ToastContainer/>
    </Sign>
  )
}