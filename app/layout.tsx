
import './globals.css'

export const metadata = {
  title: 'Барбершоп · Конфигуратор стиля',
  description: 'Селфи-стайлинг: прическа и борода · Telegram WebApp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div style={{maxWidth:960, margin:'0 auto', padding:16}}>{children}</div>
      </body>
    </html>
  )
}
