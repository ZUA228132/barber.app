
import { create } from 'zustand'
export type FaceShape='oval'|'round'|'square'|'heart'
export type HairLength='buzz'|'short'|'medium'|'long'
export type Beard='none'|'stubble'|'short'|'full'|'mustache'

type S = {
  face: FaceShape; hair: HairLength; beard: Beard;
  userName: string|null; photoDataUrl: string|null;
  setFace:(v:FaceShape)=>void; setHair:(v:HairLength)=>void; setBeard:(v:Beard)=>void;
  setUserName:(v:string|null)=>void; setPhotoDataUrl:(v:string|null)=>void;
}
export const useConfig = create<S>((set)=> ({
  face:'oval', hair:'short', beard:'none',
  userName:null, photoDataUrl:null,
  setFace:(face)=>set({face}), setHair:(hair)=>set({hair}), setBeard:(beard)=>set({beard}),
  setUserName:(userName)=>set({userName}), setPhotoDataUrl:(photoDataUrl)=>set({photoDataUrl})
}))
