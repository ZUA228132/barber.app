
import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Барбершоп · Конфигуратор стиля',
  description: 'Luxury-стиль: селфи-стайлинг прически и бороды · Telegram WebApp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  )
}
