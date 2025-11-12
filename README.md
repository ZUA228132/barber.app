
# Барбершоп · Telegram WebApp · Конфигуратор стиля (OpenAI + запись на Яндекс.Картах)

Интерактивный конфигуратор с OpenAI Images и кнопкой «Записаться», которая открывает страницу бронирования на Яндекс.Картах в новой вкладке.

## Быстрый старт
```bash
npm i
npm run dev
```

## Деплой на Vercel
- Добавьте переменную окружения `OPENAI_API_KEY` в **Vercel → Project → Settings → Environment Variables**.
- Задеплойте (Import Project или GitHub).

## OpenAI
API-роут: `/app/api/generate/route.ts` — использует модель `gpt-image-1`. Возвращает data URL PNG.
Размер можно менять (512/1024/2048).

## Кнопка «Записаться»
- Находится в `components/Configurator.tsx`
- Открывает ссылку Яндекс.Карт в **новой вкладке** через `window.open(url, "_blank")`
- При блокировке попапов — автоматически делает fallback `window.location.href = url`

## Telegram
- Имя пользователя подтягивается из `window.Telegram.WebApp.initDataUnsafe.user.first_name`
- Для работы внутри Telegram откройте WebApp из меню бота.
- Для локальной отладки есть `/telegram-debug.html`.
