import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import { TopNavbar } from '@/components/layout/TopNavbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BC AI Dashboard - แดชบอร์ดธุรกิจ SMEs',
  description: 'แดชบอร์ด AI สำหรับติดตามธุรกิจ SMEs ของไทย พร้อมที่ปรึกษาอัจฉริยะ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BC AI Dashboard - แดชบอร์ดธุรกิจ SMEs ไทย พร้อม AI ที่ปรึกษาและเสียงพูดไทย" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <TopNavbar />
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}