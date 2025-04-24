import * as Tone from 'tone';

class AudioEngine {
  private synth: Tone.PolySynth;
  private volume: Tone.Volume;
  private initialized: boolean = false;

  constructor() {
    this.volume = new Tone.Volume(-6).toDestination(); // デフォルト音量を-6dBに設定
    this.synth = new Tone.PolySynth().connect(this.volume);
  }

  async initialize() {
    if (!this.initialized) {
      await Tone.start();
      this.initialized = true;
    }
  }

  playChord(notes: string[], duration: string = '4n') {
    if (!this.initialized) return;
    this.synth.triggerAttackRelease(notes, duration);
  }

  setVolume(value: number) {
    this.volume.volume.value = value;
  }

  getVolume(): number {
    return this.volume.volume.value;
  }

  // Cmaj7の和音を再生するテスト関数
  async testSound() {
    await this.initialize();
    this.playChord(['C4', 'E4', 'G4', 'B4']);
  }
}

export const audioEngine = new AudioEngine(); 