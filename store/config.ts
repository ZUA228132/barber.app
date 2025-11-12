
import { create } from 'zustand'

export type FaceShape = 'oval' | 'round' | 'square' | 'heart';
export type HairLength = 'buzz' | 'short' | 'medium' | 'long';
export type Beard = 'none' | 'stubble' | 'short' | 'full' | 'mustache';

type State = {
  face: FaceShape;
  hair: HairLength;
  beard: Beard;
  userName: string | null;
  setFace: (f: FaceShape) => void;
  setHair: (h: HairLength) => void;
  setBeard: (b: Beard) => void;
  setUserName: (n: string | null) => void;
};

export const useConfig = create<State>((set) => ({
  face: 'oval',
  hair: 'short',
  beard: 'none',
  userName: null,
  setFace: (face) => set({ face }),
  setHair: (hair) => set({ hair }),
  setBeard: (beard) => set({ beard }),
  setUserName: (userName) => set({ userName }),
}));
