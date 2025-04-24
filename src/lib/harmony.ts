export type ChordType = 'maj' | 'min' | 'maj7' | 'min7' | 'dom7' | 'dim' | 'sus4' | 'add9';
export type ScaleType = 'major' | 'minor' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'locrian';

export interface Chord {
  root: string;
  type: ChordType;
}

export class HarmonyEngine {
  private readonly notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  private readonly scalePatterns: Record<ScaleType, number[]> = {
    'major': [0, 2, 4, 5, 7, 9, 11],
    'minor': [0, 2, 3, 5, 7, 8, 10],
    'dorian': [0, 2, 3, 5, 7, 9, 10],
    'phrygian': [0, 1, 3, 5, 7, 8, 10],
    'lydian': [0, 2, 4, 6, 7, 9, 11],
    'mixolydian': [0, 2, 4, 5, 7, 9, 10],
    'locrian': [0, 1, 3, 5, 6, 8, 10]
  };

  private currentKey: string = 'C';
  private currentScale: ScaleType = 'major';

  setKey(key: string) {
    this.currentKey = key;
  }

  setScale(scale: ScaleType) {
    this.currentScale = scale;
  }

  getScaleNotes(): string[] {
    const rootIndex = this.notes.indexOf(this.currentKey);
    return this.scalePatterns[this.currentScale].map(interval => 
      this.notes[(rootIndex + interval) % 12]
    );
  }

  getChord(degree: number): Chord {
    const scaleNotes = this.getScaleNotes();
    const root = scaleNotes[(degree - 1) % 7];
    
    // ダイアトニックコードのタイプを決定
    let type: ChordType;
    switch (this.currentScale) {
      case 'major':
        type = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'][(degree - 1) % 7] as ChordType;
        break;
      case 'minor':
        type = ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'][(degree - 1) % 7] as ChordType;
        break;
      default:
        type = 'maj';
    }

    return { root, type };
  }

  getChordNotes(chord: Chord): string[] {
    const root = chord.root;
    const rootIndex = this.notes.indexOf(root);
    
    switch (chord.type) {
      case 'maj':
        return [`${root}4`, `${this.notes[(rootIndex + 4) % 12]}4`, `${this.notes[(rootIndex + 7) % 12]}4`];
      case 'min':
        return [`${root}4`, `${this.notes[(rootIndex + 3) % 12]}4`, `${this.notes[(rootIndex + 7) % 12]}4`];
      case 'maj7':
        return [`${root}4`, `${this.notes[(rootIndex + 4) % 12]}4`, `${this.notes[(rootIndex + 7) % 12]}4`, `${this.notes[(rootIndex + 11) % 12]}4`];
      case 'min7':
        return [`${root}4`, `${this.notes[(rootIndex + 3) % 12]}4`, `${this.notes[(rootIndex + 7) % 12]}4`, `${this.notes[(rootIndex + 10) % 12]}4`];
      case 'dom7':
        return [`${root}4`, `${this.notes[(rootIndex + 4) % 12]}4`, `${this.notes[(rootIndex + 7) % 12]}4`, `${this.notes[(rootIndex + 10) % 12]}4`];
      case 'dim':
        return [`${root}4`, `${this.notes[(rootIndex + 3) % 12]}4`, `${this.notes[(rootIndex + 6) % 12]}4`];
      case 'sus4':
        return [`${root}4`, `${this.notes[(rootIndex + 5) % 12]}4`, `${this.notes[(rootIndex + 7) % 12]}4`];
      case 'add9':
        return [`${root}4`, `${this.notes[(rootIndex + 4) % 12]}4`, `${this.notes[(rootIndex + 7) % 12]}4`, `${this.notes[(rootIndex + 2) % 12]}5`];
      default:
        return [`${root}4`, `${this.notes[(rootIndex + 4) % 12]}4`, `${this.notes[(rootIndex + 7) % 12]}4`];
    }
  }
}

export const harmonyEngine = new HarmonyEngine(); 