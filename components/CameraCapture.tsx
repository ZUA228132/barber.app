
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useConfig } from '@/store/config'

export default function CameraCapture({ onCapture }: { onCapture: (file: File, dataUrl: string) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [active, setActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { photoDataUrl, setPhotoDataUrl } = useConfig()

  async function start() {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'user' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      })
      streamRef.current = stream
      const v = videoRef.current
      if (v) {
        v.srcObject = stream
        v.muted = true
        v.setAttribute('playsinline', 'true')
        await v.play().catch(()=>{})
      }
      setActive(true)
    } catch (e:any) {
      setError('Камера недоступна в этом окружении. Загрузите файл вручную.')
    }
  }
  function stop(){ streamRef.current?.getTracks().forEach(t=>t.stop()); streamRef.current=null; setActive(false) }
  function capture(){
    const v = videoRef.current; if(!v) return
    const c = document.createElement('canvas'); c.width = v.videoWidth||1280; c.height=v.videoHeight||720
    const ctx = c.getContext('2d'); if(!ctx) return
    ctx.drawImage(v,0,0,c.width,c.height)
    c.toBlob((b)=>{ if(!b) return; const file=new File([b],'photo.png',{type:'image/png'}); const du=c.toDataURL('image/png'); setPhotoDataUrl(du); onCapture(file,du); stop() },'image/png',0.95)
  }
  function onFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0]; if(!f) return
    const reader = new FileReader()
    reader.onload = () => { const du = String(reader.result||''); setPhotoDataUrl(du); onCapture(f,du) }
    reader.readAsDataURL(f)
  }
  useEffect(()=>()=>stop(),[])

  return (
    <div className="card">
      <div className="small" style={{marginBottom:8}}>Фото</div>
      {!active && <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <button className="btn btn-outline" onClick={start}>Открыть камеру</button>
        <button className="btn btn-ghost" onClick={()=>inputRef.current?.click()}>Загрузить из файла</button>
        <input ref={inputRef} type="file" accept="image/*" capture="user" hidden onChange={onFile} />
      </div>}
      {error && <div className="small" style={{color:'#ff9b9b',marginTop:8}}>{error}</div>}
      {active && <div style={{marginTop:8}}>
        <video ref={videoRef} playsInline autoPlay muted style={{width:'100%',borderRadius:14,background:'rgba(0,0,0,.4)'}}/>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn btn-primary" onClick={capture}>Сделать фото</button>
          <button className="btn btn-ghost" onClick={stop}>Закрыть</button>
        </div>
      </div>}
      {photoDataUrl && !active && <div style={{marginTop:8}}>
        <div className="small" style={{marginBottom:6}}>Предпросмотр</div>
        <img src={photoDataUrl} alt="captured" className="preview-img"/>
      </div>}
    </div>
  )
}
