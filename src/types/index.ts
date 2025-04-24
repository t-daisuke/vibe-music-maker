export type Key = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type Mode = 'major' | 'minor' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'locrian';

export interface Chord {
  root: string;
  quality: string;
  tension?: string[];
  inversion?: number;
}

export interface Voicing {
  notes: string[];
  octave: number;
}

export interface GridCell {
  id: string;
  chord: Chord;
  voicing: Voicing;
  isActive: boolean;
}

export interface SessionState {
  key: Key;
  mode: Mode;
  tempo: number;
  gridLayout: GridCell[][];
  loopLength: number;
  quantization: number;
}

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  activeVoices: Voice[];
  effects: EffectChain;
}

export interface Voice {
  note: string;
  startTime: number;
  duration: number;
}

export interface EffectChain {
  reverb: number;
  delay: number;
  chorus: number;
} 