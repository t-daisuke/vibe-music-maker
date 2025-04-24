import { create } from 'zustand';
import { SessionState, GridCell } from '@/types';

const initialState: SessionState = {
  key: 'C',
  mode: 'major',
  tempo: 120,
  gridLayout: Array(8).fill(null).map(() => 
    Array(8).fill(null).map((_, index) => ({
      id: `cell-${index}`,
      chord: { root: '', quality: 'maj' },
      voicing: { notes: [], octave: 4 },
      isActive: false
    }))
  ),
  loopLength: 8,
  quantization: 4
};

export const useSessionStore = create<SessionState>((set) => ({
  ...initialState,
  
  setKey: (key: string) => set({ key }),
  
  setMode: (mode: string) => set({ mode }),
  
  setTempo: (tempo: number) => set({ tempo }),
  
  updateGridCell: (row: number, col: number, cell: Partial<GridCell>) => 
    set((state) => {
      const newGrid = [...state.gridLayout];
      newGrid[row][col] = { ...newGrid[row][col], ...cell };
      return { gridLayout: newGrid };
    }),
  
  setLoopLength: (length: number) => set({ loopLength: length }),
  
  setQuantization: (value: number) => set({ quantization: value }),
  
  reset: () => set(initialState)
})); 