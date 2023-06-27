'use client'
import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Logo from '../../../../public/logo_icon.svg'
import { Socket, io } from 'socket.io-client'
import 'quill/dist/quill.snow.css'
import Image from 'next/image'
import Link from 'next/link'
import Quill from 'quill'

const SAVE_INTERVAL_MS = 2000 //2sec

export default function Document () {
  const router = useRouter()

  const {id: documentId} = useParams()
  if (!documentId) router.push('/dashboard')
  
  const session = JSON.parse(localStorage.getItem('session') || '{}')

  const [documentTitle, setDocumentTitle] = useState('Documento')
  const [socket, setSocket] = useState<Socket>()
  const [quill, setQuill] = useState<Quill>()

  useEffect(() => {
    const s = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`)
    setSocket(s)
    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket === null || quill === null) return

    const interval = setInterval(() => {
      socket?.emit('save-document', {id: documentId, title: documentTitle, data: quill?.getContents()})

    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill, documentId, documentTitle])

  useEffect(() => {
    if (socket === null || quill === null) return

    socket?.once('load-document', document => {
      quill?.setContents(document.data)
      setDocumentTitle(document.title)
      quill?.enable()
    })

    socket?.emit('get-document', documentId)
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket === null || quill === null) return
    
    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== 'user') return
      socket?.emit('send-changes', delta)
    }

    quill?.on('text-change', handler)
    return () => {
      quill?.off('text-change', handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket === null || quill === null) return
    
    const handler = (delta: any) => {
      quill?.updateContents(delta)
    }

    socket?.on('receive-changes', handler)
    return () => {
      socket?.off('receive-changes', handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (wrapper == null) return

    wrapper.innerHTML = ''
    console.log(wrapper.innerHTML)
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor, {theme: 'snow', modules: {
      toolbar: '#toolbar'
    }})
    q.disable()
    setQuill(q)
  }, [])

  return (
    <div className='w-screen h-screen flex'>
      <aside className='h-full w-80 bg-white-950 p-2'>
        <div className='flex gap-3 mb-5 pb-5 p-2 border-b-[1px] border-white-900'>
          <Link href={`/dashboard`} className='shrink-0'>
            <Image src={Logo} alt='Logo Ink Flow' width={35} />
          </Link>
          <div className='flex items-end'>
            <input type='text' onChange={(e) => setDocumentTitle(e.target.value)} value={documentTitle || 'Documento'} className='bg-transparent text-white text-2xl w-full focus-within:outline-none text-ellipsis'/>
          </div>
        </div>
        <div id='toolbar'>
          <select id='header-picker' className="ql-header"></select>
          <select id='font-picker' className='ql-font'></select>
          <select id='size-picker' className="ql-size text-white"></select>
          <div className='w-full flex flex-col gap-3 bg-[#1b1b1b] rounded-[5px] p-2 flex-wrap'>
            <div className='w-full flex justify-around flex-wrap border-b-[1px] border-white-900 pb-3'>
              <button className="ql-align" value=""></button>
              <button className="ql-align" value="center"></button>
              <button className="ql-align" value="right"></button>
              <button className="ql-align" value="justify"></button>
            </div>
            <div className='w-full flex justify-around flex-wrap'>
              <button className="ql-bold"></button>
              <button className="ql-italic"></button>
              <select className="ql-color"></select>
              <select className="ql-background"></select>
            </div>
            <div className='w-full flex justify-around flex-wrap'>
              <button className="ql-underline"></button>
              <button className="ql-strike"></button>
              <button className="ql-script" value="sub"></button>
              <button className="ql-script" value="super"></button>
            </div>
            <div className='w-full flex justify-around flex-wrap border-t-[1px] border-white-900 pt-3'>
              <button className="ql-list" value="ordered"></button>
              <button className="ql-list" value="bullet"></button>
              <button className="ql-indent" value="+1"></button>
              <button className="ql-indent" value="-1"></button>
            </div>
          </div>
        </div>
      </aside>
      <section id='container' className='h-full flex grow justify-center bg-white-50 overflow-y-scroll pt-20' ref={wrapperRef}>
      </section>
    </div>
  )
}