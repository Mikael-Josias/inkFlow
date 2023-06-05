import './globals.css'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({ weight: ['300', '400', '700'], subsets: ['latin'], style: ['normal']})

export const metadata = {
  title: 'Ink Flow',
  description: 'Seu editor de texto!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={robotoCondensed.className}>{children}</body>
    </html>
  )
}
