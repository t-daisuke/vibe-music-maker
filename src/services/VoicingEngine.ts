import { Chord, Voicing } from '@/types';

interface VoiceLeadingRule {
  maxInterval: number;
  preferredDirection: 'up' | 'down' | 'same';
}

export class VoicingEngine {
  private voiceLeadingRules: VoiceLeadingRule[];

  constructor() {
    this.voiceLeadingRules = [
      { maxInterval: 4, preferredDirection: 'same' },  // ソプラノ
      { maxInterval: 3, preferredDirection: 'same' },  // アルト
      { maxInterval: 3, preferredDirection: 'same' },  // テノール
      { maxInterval: 4, preferredDirection: 'same' },  // バス
    ];
  }

  public optimizeVoicing(current: Chord, next: Chord): Voicing {
    // 現在のボイシングと次のコードに基づいて最適なボイシングを生成
    const currentVoicing = this.generateVoicing(current, { min: 3, max: 5 });
    const nextVoicing = this.generateVoicing(next, { min: 3, max: 5 });

    // ボイスリーディングの最適化
    return this.applyVoiceLeading(currentVoicing, nextVoicing);
  }

  public generateVoicing(chord: Chord, range: { min: number; max: number }): Voicing {
    const notes: string[] = [];
    const octave = 4; // 基準オクターブ

    // コードトーンを生成
    const root = this.getNoteFromChord(chord, 'root');
    const third = this.getNoteFromChord(chord, 'third');
    const fifth = this.getNoteFromChord(chord, 'fifth');

    notes.push(root);
    notes.push(third);
    notes.push(fifth);

    // テンションを追加
    if (chord.tension) {
      chord.tension.forEach(tension => {
        const tensionNote = this.getNoteFromChord(chord, tension);
        notes.push(tensionNote);
      });
    }

    return {
      notes,
      octave,
    };
  }

  private getNoteFromChord(chord: Chord, position: string): string {
    // TODO: コードの構成音を計算するロジックを実装
    return '';
  }

  private applyVoiceLeading(current: Voicing, next: Voicing): Voicing {
    // ボイスリーディングルールに基づいて最適化
    const optimizedNotes: string[] = [];

    for (let i = 0; i < current.notes.length; i++) {
      const currentNote = current.notes[i];
      const nextNote = next.notes[i];
      const rule = this.voiceLeadingRules[i];

      // ルールに基づいて最適な音程を選択
      const optimizedNote = this.findOptimalNote(currentNote, nextNote, rule);
      optimizedNotes.push(optimizedNote);
    }

    return {
      notes: optimizedNotes,
      octave: next.octave,
    };
  }

  private findOptimalNote(current: string, next: string, rule: VoiceLeadingRule): string {
    // TODO: 最適な音程を計算するロジックを実装
    return next;
  }
} 