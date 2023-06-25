'use client'
import axios from "axios"
import Image from "next/image";
import Logo from '../../../public/logo_icon.svg'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useDocuments } from "@/hooks/api/useDocuments";

type DocumentType = {
  _id: string,
  title: string,
  data: object | string,
}

type documentType = {
  _id: string,
  userId: string,
  title: string,
  data: object | string,
}

export default function Dashboard() {
  const router = useRouter();

  const [session, setSession] = useState<any>()
  const { documentsData, documentsLoading } = useDocuments<DocumentType[]>()
  
  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem('session') || '{}')
    if(!sessionData) return router.push('/signin')
    setSession(sessionData)
  }, [router])

  const submit = async () => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/document`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },)
      router.push(`/document/${data.documentId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const openDocument = (id: string) => {
    router.push(`/document/${id}`)
  }

  return (
    <>
      <header className="bg-white-950 w-screen h-16">
        <div className="flex justify-between items-center max-w-5xl mx-auto h-full">
          <div className="flex items-end gap-4 h-full">
            <div className="bg-white w-20 h-20 p-[2px] rounded-full flex items-center justify-center translate-y-1/3">
              <Image src={session?.profilePicture || Logo} alt="" className="bg-white-950 rounded-full w-full h-full object-contain" />
            </div>
            <span className="text-white text-xl">{session?.name}</span>
          </div>
          <nav>
            <button onClick={submit} className="text-xl text-white font-bold hover:bg-white-800 transition-colors p-4">Novo Documento</button>
          </nav>
        </div>
      </header>
      <main className="bg-white w-screen">
        <section className="flex flex-col gap-3 max-w-5xl mx-auto py-14">
          <h3 className="text-white-950 text-lg font-bold">Recentes</h3>
          <div className="flex gap-6 flex-wrap">
            {!documentsLoading ? documentsData?.map( d => 
              <div key={d._id} onClick={() => openDocument(d._id)} className="w-40 h-52 shrink-0 border-white-300 rounded-md overflow-hidden border-[1px] text-sm flex items-end cursor-pointer">
                <span className="w-full bg-white-950 text-white p-2">{d.title || 'Documento sem nome'}</span>
              </div>
            ) : 'Loading...'}
          </div>
        </section>
      </main>
    </>
  )
}