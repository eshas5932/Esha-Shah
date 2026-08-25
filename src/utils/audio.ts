// Web Audio API Synthesizer for Authentic Internet Museum Soundscapes

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // Check saved mute preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('internet_museum_muted');
      if (saved !== null) {
        this.muted = saved === 'true';
      }
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('internet_museum_muted', String(muted));
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // Generic Retro Click
  public playClick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Memory Unlock Fanfare
  public playUnlock() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const startTime = this.ctx!.currentTime + i * 0.08;
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.26);
    });
  }

  // MSN Messenger Incoming Message "Ta-da!"
  public playMsnMessage() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, t); // D5
    gain1.gain.setValueAtTime(0.15, t);
    gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.13);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, t + 0.12); // A5
    gain2.gain.setValueAtTime(0.2, t + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t + 0.12);
    osc2.stop(t + 0.42);
  }

  // MSN Nudge Screen Shake Vibration Sound
  public playMsnNudge() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Low frequency buzzing rumble
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(75, t);
    osc.frequency.setValueAtTime(65, t + 0.1);
    osc.frequency.setValueAtTime(85, t + 0.25);
    osc.frequency.setValueAtTime(60, t + 0.4);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.6);
  }

  // Windows 95/98 Boot Chime Sound Chord
  public playWinChime() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const chords = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major chord
    chords.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.06);
      gain.gain.setValueAtTime(0.1, t + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t + idx * 0.06);
      osc.stop(t + 1.3);
    });
  }

  // Dial-up Modem Handshake Simulation (Dual-tones + squeals + white noise burst)
  public playDialupSequence(onProgress?: (step: string) => void) {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Step 1: Dialing DTMF tones (0 - 1.2s)
    onProgress?.('Dialing access number 555-0199...');
    const dtmfTones = [697, 770, 852, 941, 1209, 1336, 1477];
    for (let i = 0; i < 7; i++) {
      const dTime = t + i * 0.12;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(dtmfTones[i % dtmfTones.length], dTime);
      gain.gain.setValueAtTime(0.12, dTime);
      gain.gain.exponentialRampToValueAtTime(0.01, dTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(dTime);
      osc.stop(dTime + 0.09);
    }

    // Step 2: Ringing & Answer Tone (1.4s - 2.8s)
    setTimeout(() => onProgress?.('Connecting to ISP server... Handshaking at 56,000 bps'), 1200);
    const ansOsc = this.ctx.createOscillator();
    const ansGain = this.ctx.createGain();
    ansOsc.type = 'sine';
    ansOsc.frequency.setValueAtTime(2100, t + 1.4); // Standard V.25 answer tone 2100Hz
    ansGain.gain.setValueAtTime(0.1, t + 1.4);
    ansGain.gain.exponentialRampToValueAtTime(0.01, t + 2.4);
    ansOsc.connect(ansGain);
    ansGain.connect(this.ctx.destination);
    ansOsc.start(t + 1.4);
    ansOsc.stop(t + 2.5);

    // Step 3: Screeching Modem White Noise / FSK phase (2.5s - 4.5s)
    setTimeout(() => onProgress?.('Negotiating protocol: V.90 / K56flex...'), 2400);
    const bufferSize = this.ctx.sampleRate * 2.0;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to sound like a 90s telephone line bandpass
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, t + 2.5);
    filter.Q.setValueAtTime(2.5, t + 2.5);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, t + 2.5);
    noiseGain.gain.linearRampToValueAtTime(0.2, t + 3.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 4.5);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(t + 2.5);
    noise.stop(t + 4.6);

    // Step 4: Final Connected Chime
    setTimeout(() => {
      onProgress?.('CONNECTED AT 56,667 BPS! Welcome to the World Wide Web.');
      this.playUnlock();
    }, 4500);
  }

  // Camera Shutter for Retro Instagram
  public playCameraShutter() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);

    // Second click
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(400, t + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(60, t + 0.18);
    gain2.gain.setValueAtTime(0.15, t + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t + 0.1);
    osc2.stop(t + 0.19);
  }

  // Vine Boom Sound (Deep pitch drop with reverberation)
  public playVineBoom() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 0.6);
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.85);
  }
}

export const retroAudio = new RetroAudioEngine();
