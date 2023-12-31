import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/footer'
import Nav from './components/nav'
import TestNav from './components/test-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Nav/>
      <div className='bg-white'>
      {children}
      </div>
       
      <Footer/>
      </body>
    </html>
  )
}
