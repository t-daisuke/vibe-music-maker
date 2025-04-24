import { Chord, Key, Mode } from '@/types';

export class HarmonyEngine {
  private diatonicChords: Map<string, Chord>;
  private secondaryDominants: Map<string, Chord>;
  private modalInterchange: Map<string, Chord>;

  constructor() {
    this.diatonicChords = new Map();
    this.secondaryDominants = new Map();
    this.modalInterchange = new Map();
    this.initializeChords();
  }

  private initializeChords(): void {
    // ダイアトニックコードの初期化
    const qualities = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'];
    qualities.forEach((quality, index) => {
      this.diatonicChords.set(`I${index + 1}`, { root: '', quality });
    });

    // セカンダリードミナントの初期化
    this.secondaryDominants.set('V/ii', { root: '', quality: 'dom7' });
    this.secondaryDominants.set('V/iii', { root: '', quality: 'dom7' });
    this.secondaryDominants.set('V/IV', { root: '', quality: 'dom7' });
    this.secondaryDominants.set('V/V', { root: '', quality: 'dom7' });
    this.secondaryDominants.set('V/vi', { root: '', quality: 'dom7' });

    // モーダルインターチェンジの初期化
    this.modalInterchange.set('bVIImaj7', { root: '', quality: 'maj7' });
    this.modalInterchange.set('bVImaj7', { root: '', quality: 'maj7' });
    this.modalInterchange.set('bIIImaj7', { root: '', quality: 'maj7' });
  }

  public generateChord(degree: number, tension: string[] = []): Chord {
    const baseChord = this.diatonicChords.get(`I${degree}`);
    if (!baseChord) {
      throw new Error(`Invalid degree: ${degree}`);
    }

    return {
      ...baseChord,
      tension,
    };
  }

  public getSecondaryDominant(target: number): Chord {
    const dominant = this.secondaryDominants.get(`V/${target}`);
    if (!dominant) {
      throw new Error(`Invalid target: ${target}`);
    }

    return dominant;
  }

  public getModalInterchange(chordSymbol: string): Chord {
    const chord = this.modalInterchange.get(chordSymbol);
    if (!chord) {
      throw new Error(`Invalid chord symbol: ${chordSymbol}`);
    }

    return chord;
  }

  public updateKey(key: Key, mode: Mode): void {
    // キーとモードに基づいてコードを更新
    this.initializeChords();
    // TODO: キーとモードに応じたコードの更新ロジックを実装
  }
} 