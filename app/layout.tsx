
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Барбершоп · Конфигуратор стиля',
  description: 'Интерактивный конфигуратор прически и бороды в Telegram WebApp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </body>
    </html>
  )
}
