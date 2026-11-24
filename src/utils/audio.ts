// Web Audio API procedural audio synthesizer
// Guarantees zero 404 network errors, completely offline, high quality

class SoundController {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  
  private currentBgmType: string | null = null;
  private bgmTimer: number | null = null;
  private isBgmRunning = false;
  
  public bgmMuted: boolean = false;
  public sfxMuted: boolean = false;
  public volume: number = 0.8;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.bgmMuted ? 0 : 0.25, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxMuted ? 0 : 0.4, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setBgmMuted(muted: boolean) {
    this.bgmMuted = muted;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setTargetAtTime(muted ? 0 : 0.25, this.ctx.currentTime, 0.05);
    }
  }

  public setSfxMuted(muted: boolean) {
    this.sfxMuted = muted;
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setTargetAtTime(muted ? 0 : 0.4, this.ctx.currentTime, 0.05);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  // --- Sound Effects ---

  public playClick() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  public playTypewriter() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const freq = 450 + Math.random() * 80;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.02);
  }

  public playCorrect() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major arpeggio)
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.07);

      gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx!.currentTime + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.07 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(this.ctx!.currentTime + i * 0.07);
      osc.stop(this.ctx!.currentTime + i * 0.07 + 0.45);
    });
  }

  public playIncorrect() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(207.65, this.ctx.currentTime); // minor dissonance

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.35);
    osc2.stop(this.ctx.currentTime + 0.35);
  }

  public playGlitchSound() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(200 + Math.random() * 1200, this.ctx.currentTime + i * 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.04 + 0.03);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(this.ctx.currentTime + i * 0.04);
      osc.stop(this.ctx.currentTime + i * 0.04 + 0.04);
    }
  }

  public playLevelUp() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const chords = [
      [523.25, 659.25], // C - E
      [587.33, 698.46], // D - F
      [659.25, 783.99], // E - G
      [783.99, 1046.50] // G - C
    ];

    chords.forEach((chord, step) => {
      chord.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + step * 0.1);

        gain.gain.setValueAtTime(0, this.ctx!.currentTime + step * 0.1);
        gain.gain.linearRampToValueAtTime(0.18, this.ctx!.currentTime + step * 0.1 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + step * 0.1 + 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(this.ctx!.currentTime + step * 0.1);
        osc.stop(this.ctx!.currentTime + step * 0.1 + 0.55);
      });
    });
  }

  public playTimerBell() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const bellFrequencies = [880, 1760, 2640];
    bellFrequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      const amp = 0.2 / (idx + 1);
      gain.gain.setValueAtTime(amp, this.ctx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start();
      osc.stop(this.ctx!.currentTime + 1.25);
    });
  }

  public playCountdownTick() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // --- Procedural BGM Generation ---

  public playBGM(type: 'menu' | 'prologue' | 'swot' | 'smart' | 'victory') {
    this.initContext();
    if (this.currentBgmType === type && this.isBgmRunning) return;
    this.stopBGM();

    this.currentBgmType = type;
    this.isBgmRunning = true;

    // Pattern loop based on type
    const intervals: Record<string, { scale: number[]; tempo: number }> = {
      menu: { scale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], tempo: 350 }, // C Pentatonic Chill
      prologue: { scale: [220.00, 261.63, 293.66, 329.63, 392.00], tempo: 420 }, // A Minor Lo-fi
      swot: { scale: [196.00, 233.08, 261.63, 293.66, 349.23, 392.00], tempo: 240 }, // Strategic electro
      smart: { scale: [293.66, 329.63, 369.99, 440.00, 493.88, 587.33], tempo: 280 }, // Bright Mint Uplifting D Major
      victory: { scale: [329.63, 392.00, 440.00, 493.88, 587.33, 659.25], tempo: 220 } // Triumphant
    };

    const config = intervals[type] || intervals.menu;
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isBgmRunning || !this.ctx || !this.bgmGain) return;
      if (!this.bgmMuted) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const freq = config.scale[noteIdx % config.scale.length];
        osc.type = type === 'swot' ? 'sawtooth' : type === 'smart' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const duration = (config.tempo / 1000) * 0.9;
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.bgmGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      }

      noteIdx = (noteIdx + 1 + (Math.random() > 0.7 ? 2 : 1)) % config.scale.length;
      this.bgmTimer = window.setTimeout(playNextNote, config.tempo);
    };

    playNextNote();
  }

  public stopBGM() {
    this.isBgmRunning = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

export const soundManager = new SoundController();
