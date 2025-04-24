import * as Tone from 'tone';
import { Voicing } from '@/types';

export class AudioEngine {
  private synth: Tone.PolySynth;
  private reverb: Tone.Reverb;
  private delay: Tone.FeedbackDelay;
  private chorus: Tone.Chorus;

  constructor() {
    this.initializeAudio();
  }

  private async initializeAudio(): Promise<void> {
    // Tone.jsの初期化
    await Tone.start();
    
    // エフェクトの設定
    this.reverb = new Tone.Reverb(3.5).toDestination();
    this.delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
    this.chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();

    // シンセの設定
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).chain(this.reverb, this.delay, this.chorus);
  }

  public playVoicing(voicing: Voicing): void {
    const notes = voicing.notes.map(note => `${note}${voicing.octave}`);
    this.synth.triggerAttackRelease(notes, "8n");
  }

  public setReverb(amount: number): void {
    this.reverb.wet.value = amount;
  }

  public setDelay(amount: number): void {
    this.delay.wet.value = amount;
  }

  public setChorus(amount: number): void {
    this.chorus.wet.value = amount;
  }

  public async start(): Promise<void> {
    await Tone.start();
    Tone.Transport.start();
  }

  public stop(): void {
    Tone.Transport.stop();
    this.synth.releaseAll();
  }
} 