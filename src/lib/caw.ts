/** Two short crow calls. No file — Web Audio so the splash works offline. */
export function playCaw() {
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return;
  const ctx = new Ctor();
  const now = ctx.currentTime;

  function burst(at: number, pitch: number) {
    const dur = 0.22;
    const osc = ctx.createOscillator();
    const filt = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(pitch, at);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.45, at + dur);
    filt.type = "bandpass";
    filt.frequency.value = pitch * 1.4;
    filt.Q.value = 4;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(0.18, at + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    osc.connect(filt);
    filt.connect(gain);
    gain.connect(ctx.destination);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  burst(now + 0.08, 620);
  burst(now + 0.38, 480);
  window.setTimeout(() => void ctx.close(), 1200);
}
