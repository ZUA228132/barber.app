
export type TgUser = { id: number; first_name?: string; last_name?: string; username?: string; photo_url?: string }
declare global { interface Window { Telegram?: any } }

export function getTelegramUser(): TgUser | null {
  if (typeof window === 'undefined') return null
  const tg = window.Telegram?.WebApp
  const user = tg?.initDataUnsafe?.user
  return user || null
}
export function readyAndExpandUi() {
  if (typeof window === 'undefined') return
  const tg = window.Telegram?.WebApp
  try { tg?.ready?.(); tg?.expand?.() } catch {}
}
