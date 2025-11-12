
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import AvatarCanvas from './AvatarCanvas'
import { useConfig, FaceShape, HairLength, Beard } from '@/store/config'
import { getTelegramUser, readyAndExpandUi } from '@/lib/telegram'

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="card">
    <div className="mb-3 text-sm text-[var(--tg-muted)]">{title}</div>
    {children}
  </div>
)

const Pill: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-full text-sm border transition ${active ? 'bg-[var(--brand-gold)] text-black border-transparent' : 'border-white/15 hover:border-white/30'}`}>
    {children}
  </button>
)

export default function Configurator() {
  const { face, hair, beard, setFace, setHair, setBeard, userName, setUserName } = useConfig()
  const [generating, setGenerating] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  useEffect(() => {
    readyAndExpandUi()
    const tgUser = getTelegramUser()
    if (tgUser?.first_name) setUserName(tgUser.first_name)
  }, [setUserName])

  const canGenerate = useMemo(() => true, [face, hair, beard])

  async function onGenerate() {
    setGenerating(true)
    setResultUrl(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ face, hair, beard })
      })
      const data = await res.json()
      setResultUrl(data.url)
    } catch (e) {
      console.error(e)
      alert('Ошибка генерации. Проверьте серверные логи.')
    } finally {
      setGenerating(false)
    }
  }

  function onBook() {
    const url = 'https://yandex.com/maps/org/object/135163282786/?booking%5Bpage%5D=menu&booking%5Bpermalink%5D=135163282786&ll=39.648286%2C47.201480&z=17'
    // По требованию: открываем в новой вкладке
    const w = window.open(url, "_blank")
    if (!w) {
      // На случай блокировки попапа — graceful fallback
      window.location.href = url
    }
  }

  return (
    <div className="space-y-4">
      <div className="gradient-border">
        <div className="inner p-4 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">Выбери свой стиль</h1>
              <p className="text-sm text-[var(--tg-muted)]">
                {userName ? <>Привет, <span className="text-[var(--brand-gold)]">{userName}</span>!</> : 'Войдите через Telegram для персонализации.'}
              </p>
            </div>
            <button className="btn btn-ghost" onClick={() => location.reload()}>Сброс</button>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <Section title="Превью">
              <AvatarCanvas />
            </Section>

            <div className="space-y-4">
              <Section title="Форма лица">
                <div className="flex flex-wrap gap-2">
                  {(['oval','round','square','heart'] as FaceShape[]).map(v => (
                    <Pill key={v} active={face===v} onClick={() => setFace(v)}>
                      {({oval:'Овал',round:'Круг',square:'Квадрат',heart:'Сердце'} as any)[v]}
                    </Pill>
                  ))}
                </div>
              </Section>

              <Section title="Длина волос">
                <div className="flex flex-wrap gap-2">
                  {(['buzz','short','medium','long'] as HairLength[]).map(v => (
                    <Pill key={v} active={hair===v} onClick={() => setHair(v)}>
                      {({buzz:'Ежик',short:'Короткие',medium:'Средние',long:'Длинные'} as any)[v]}
                    </Pill>
                  ))}
                </div>
              </Section>

              <Section title="Борода">
                <div className="flex flex-wrap gap-2">
                  {(['none','stubble','short','full','mustache'] as Beard[]).map(v => (
                    <Pill key={v} active={beard===v} onClick={() => setBeard(v)}>
                      {({none:'Нет',stubble:'Щетина',short:'Короткая',full:'Полная',mustache:'Усы'} as any)[v]}
                    </Pill>
                  ))}
                </div>
              </Section>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <button className="btn btn-primary" disabled={!canGenerate || generating} onClick={onGenerate}>
              {generating ? 'Генерация…' : 'Сгенерировать визуал (AI)'}
            </button>
            <button className="btn btn-ghost" onClick={onBook}>Записаться</button>
          </div>

          {resultUrl && (
            <div className="mt-4">
              <div className="text-sm text-[var(--tg-muted)] mb-2">Результат генерации</div>
              <img src={resultUrl} alt="result" className="w-full rounded-xl" />
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-[var(--tg-muted)] text-center">
        Барбершоп · Telegram WebApp · Демо. Подключите ваш AI-провайдер в <code>/app/api/generate/route.ts</code>.
      </div>
    </div>
  )
}
