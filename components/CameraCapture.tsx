
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useConfig } from '@/store/config'

export default function CameraCapture({ onCapture }: { onCapture: (file: File, dataUrl: string) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [active, setActive] = useState(false)
  const { photoDataUrl, setPhotoDataUrl } = useConfig()

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      })
      streamRef.current = stream
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play() }
      setActive(true)
    } catch (e) { alert('Разрешите доступ к камере'); console.error(e) }
  }
  function stop(){ streamRef.current?.getTracks().forEach(t=>t.stop()); streamRef.current=null; setActive(false) }
  function capture(){
    const v=videoRef.current; if(!v) return
    const c=document.createElement('canvas'); c.width=v.videoWidth; c.height=v.videoHeight
    const ctx=c.getContext('2d'); if(!ctx) return
    ctx.drawImage(v,0,0,c.width,c.height)
    c.toBlob((b)=>{ if(!b) return; const file=new File([b],'photo.png',{type:'image/png'}); const du=c.toDataURL('image/png'); setPhotoDataUrl(du); onCapture(file,du); stop() },'image/png',0.95)
  }
  useEffect(()=>()=>stop(),[])
  return(<div className="card">
    <div className="small">Фото с камеры</div>
    {!active && <div style={{display:'flex',gap:8,marginTop:8}}>
      <button className="btn btn-outline" onClick={start}>Открыть камеру</button>
      {photoDataUrl && <button className="btn btn-ghost" onClick={()=>setPhotoDataUrl(null)}>Сбросить фото</button>}
    </div>}
    {active && <div style={{marginTop:8}}>
      <video ref={videoRef} playsInline style={{width:'100%',borderRadius:12,background:'rgba(0,0,0,.4)'}}/>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className="btn btn-primary" onClick={capture}>Сделать фото</button>
        <button className="btn btn-ghost" onClick={stop}>Закрыть</button>
      </div>
    </div>}
    {photoDataUrl && !active && <div style={{marginTop:8}}>
      <div className="small" style={{marginBottom:6}}>Предпросмотр</div>
      <img src={photoDataUrl} alt="captured" style={{width:'100%',borderRadius:12}}/>
    </div>}
    <div className="small" style={{marginTop:8}}>Совет: лицо по центру, без наклона, нейтральный фон.</div>
  </div>)
}
