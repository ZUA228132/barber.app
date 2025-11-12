
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import AvatarCanvas from './AvatarCanvas'
import CameraCapture from './CameraCapture'
import { useConfig, FaceShape, HairLength, Beard } from '@/store/config'
import { getTelegramUser, readyAndExpandUi } from '@/lib/telegram'

export default function Configurator(){
  const { face, hair, beard, setFace, setHair, setBeard, userName, setUserName, photoDataUrl, setPhotoDataUrl } = useConfig()
  const [generating, setGenerating] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  useEffect(()=>{
    readyAndExpandUi()
    const u = getTelegramUser()
    if (u?.first_name) setUserName(u.first_name)
  },[setUserName])

  const canGenerate = useMemo(()=>true,[face,hair,beard,photoDataUrl])

  async function onGenerate(){
    setGenerating(true); setResultUrl(null)
    try{
      if(photoFile){
        const fd = new FormData()
        fd.append('face', face); fd.append('hair', hair); fd.append('beard', beard)
        fd.append('photo', photoFile)
        const res = await fetch('/api/generate', { method:'POST', body: fd })
        const data = await res.json()
        if(data.error) throw new Error(data.error)
        setResultUrl(data.url)
      }else{
        const res = await fetch('/api/generate', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ face, hair, beard })
        })
        const data = await res.json()
        if(data.error) throw new Error(data.error)
        setResultUrl(data.url)
      }
    }catch(e:any){
      alert('Ошибка генерации: '+(e?.message||''))
      console.error(e)
    }finally{ setGenerating(false) }
  }

  function onCapture(file: File, du: string){ setPhotoFile(file); setPhotoDataUrl(du) }

  function onBook(){
    const url = 'https://yandex.com/maps/org/object/135163282786/?booking%5Bpage%5D=menu&booking%5Bpermalink%5D=135163282786&ll=39.648286%2C47.201480&z=17'
    const w = window.open(url, "_blank")
    if (!w) window.location.href = url
  }

  return (
    <div className="grid" style={{gap:16}}>
      <div className="gradient"><div className="inner">
        <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}>
          <div>
            <h1 style={{margin:'0 0 4px 0'}}>Выбери свой стиль</h1>
            <div className="small">{userName ? <>Привет, <span style={{color:'var(--gold)'}}>{userName}</span>!</> : 'Войдите через Telegram для персонализации.'}</div>
          </div>
          <button className="btn btn-ghost" onClick={()=>location.reload()}>Сброс</button>
        </div>

        <div className="grid two" style={{marginTop:16}}>
          <div className="card">
            <div className="small" style={{marginBottom:8}}>Превью</div>
            {photoDataUrl ? <img src={photoDataUrl} alt="photo" style={{width:'100%',borderRadius:12}}/> : <AvatarCanvas/>}
          </div>

          <div className="grid">
            <CameraCapture onCapture={onCapture}/>

            <div className="card">
              <div className="small" style={{marginBottom:8}}>Форма лица</div>
              {(['oval','round','square','heart'] as FaceShape[]).map(v => (
                <button key={v} className={`pill ${face===v?'active':''}`} onClick={()=>setFace(v)}>
                  {({oval:'Овал',round:'Круг',square:'Квадрат',heart:'Сердце'} as any)[v]}
                </button>
              ))}
            </div>

            <div className="card">
              <div className="small" style={{marginBottom:8}}>Длина волос</div>
              {(['buzz','short','medium','long'] as HairLength[]).map(v => (
                <button key={v} className={`pill ${hair===v?'active':''}`} onClick={()=>setHair(v)}>
                  {({buzz:'Ежик',short:'Короткие',medium:'Средние',long:'Длинные'} as any)[v]}
                </button>
              ))}
            </div>

            <div className="card">
              <div className="small" style={{marginBottom:8}}>Борода</div>
              {(['none','stubble','short','full','mustache'] as Beard[]).map(v => (
                <button key={v} className={`pill ${beard===v?'active':''}`} onClick={()=>setBeard(v)}>
                  {({none:'Нет',stubble:'Щетина',short:'Короткая',full:'Полная',mustache:'Усы'} as any)[v]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:'flex',gap:12,marginTop:12,flexWrap:'wrap'}}>
          <button className="btn btn-primary" disabled={!canGenerate||generating} onClick={onGenerate}>
            {generating ? 'Генерация…' : (photoDataUrl ? 'Стилизовать моё фото (AI)' : 'Сгенерировать визуал (AI)')}
          </button>
          <button className="btn btn-ghost" onClick={onBook}>Записаться</button>
        </div>

        {resultUrl && <div style={{marginTop:12}}>
          <div className="small" style={{marginBottom:6}}>Результат</div>
          <img src={resultUrl} alt="result" style={{width:'100%',borderRadius:12}}/>
        </div>}
      </div></div>

      <div className="small" style={{textAlign:'center'}}>Камера работает на https/локалхост. В Telegram WebView доступ к камере запрашивается автоматически.</div>
    </div>
  )
}
