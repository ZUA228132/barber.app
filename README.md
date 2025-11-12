
# Barbershop · Telegram WebApp (Camera + OpenAI image edits)

Features
- Camera selfie in WebView → image-to-image styling with OpenAI (`gpt-image-1`)
- Fallback: generate portrait from params if no photo provided
- "Book" opens your Yandex.Maps booking page in a new browser tab

Deploy
1) Set `OPENAI_API_KEY` in Vercel Project → Settings → Environment Variables
2) Deploy. Use BotFather → Menu Button → Add Web App with your Vercel URL.

Security
- Your OpenAI key never goes to client — only `app/api/generate/route.ts` uses it.
