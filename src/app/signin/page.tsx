'use client'
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Sign from "@/layouts/sign";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ButtonSpinner from "@/components/buttonSpinner";
import { useSignIn } from "@/hooks/api/useSignIn";
import { ToastContainer, toast } from "react-toastify";
import decode from 'jwt-decode';

export default function SignIn() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { signInAct, signInLoading} = useSignIn();

    const [showPassword, setShowPassword] = useState(false);

    const submit = async (data: any) => {
        const {
          email,
          password,
        } = data;
        try {
          const data = await signInAct({email, password});
          const user = decode(data);
          localStorage.setItem('session', JSON.stringify(user));
          router.push("dashboard");
        } catch (error) {
          toast('Erro ao realizar o login!');
        }
    }
    
    return (
        <Sign title="Bem Vindo!">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-10 w-full mt-10 mb-1">
              <label className="relative">
                <input {...register("email", {required: true})} type="email" placeholder="Email" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
                { errors?.email && <span className="text-sm text-red-500 absolute bottom-[-25px] left-0">*Email é obrigatório</span>}
              </label>
              <label className="relative">
                <input {...register("password", {required: true, minLength: 8})} type={showPassword ? "text" : "password"} placeholder="Senha" className="w-[400px] h-[30px] text-white-600 border-white-600 border-b-[1px] outline-none"/>
                {showPassword ?
                  <Eye className="text-white-400 h-4 absolute right-0 top-1/4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/>
                  :
                  <EyeOff className="text-white-400 h-4 absolute right-0 top-1/4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/>
                }
                { errors?.password?.type === "required" && <span className="text-sm text-red-500 absolute bottom-[-25px] left-0">*Senha é obrigatório</span>}
                { errors?.password?.type === "minLength" && <span className="text-sm text-red-500 absolute bottom-[-25px] left-0">*Senha deve ter pelo menos 8 caracteres</span>}
              </label>

              <div className="h-8 mt-10 rounded-md overflow-hidden relative">
                { signInLoading && <ButtonSpinner/>}
                <input type="submit" value={signInLoading ? "" : "ENTRAR"} className="h-full w-full bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-500/90 transition-colors" />
              </div>
            </form>
            <div className="w-full text-center ">
              <span className="text-white-600">Primeira vez? <Link href="/signup" className="text-blue-500 cursor-pointer">crie sua conta!</Link></span>
            </div>
            <ToastContainer/>
        </Sign>
    );
}