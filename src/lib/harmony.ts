export type ChordType = 'maj' | 'min' | 'maj7' | 'min7' | 'dom7' | 'dim';

export interface Chord {
  root: string;
  type: ChordType;
}

export class HarmonyEngine {
  private readonly diatonicChords: Record<string, Chord[]> = {
    'C': [
      { root: 'C', type: 'maj' },
      { root: 'D', type: 'min' },
      { root: 'E', type: 'min' },
      { root: 'F', type: 'maj' },
      { root: 'G', type: 'maj' },
      { root: 'A', type: 'min' },
      { root: 'B', type: 'dim' }
    ]
  };

  private currentKey: string = 'C';

  setKey(key: string) {
    this.currentKey = key;
  }

  getChord(degree: number): Chord {
    const chords = this.diatonicChords[this.currentKey];
    return chords[(degree - 1) % 7];
  }

  getChordNotes(chord: Chord): string[] {
    const root = chord.root;
    switch (chord.type) {
      case 'maj':
        return [`${root}4`, `${root}5`, `${root}6`];
      case 'min':
        return [`${root}4`, `${root}5`, `${root}6`];
      case 'maj7':
        return [`${root}4`, `${root}5`, `${root}6`, `${root}7`];
      case 'min7':
        return [`${root}4`, `${root}5`, `${root}6`, `${root}7`];
      case 'dom7':
        return [`${root}4`, `${root}5`, `${root}6`, `${root}7`];
      case 'dim':
        return [`${root}4`, `${root}5`, `${root}6`];
      default:
        return [`${root}4`, `${root}5`, `${root}6`];
    }
  }
}

export const harmonyEngine = new HarmonyEngine(); 