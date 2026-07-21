/* ── Son Cafein ────────────────────────────────────────────────
   Un soupçon de son : sifflement d'espresso synthétisé (Web Audio,
   aucun fichier). Coupé par défaut, mémorisé dans localStorage.
   Léger : rien ne joue tant que l'utilisateur n'a pas activé le son. */

const KEY = "cafein-sound";
let enabled = false;
try {
  enabled = localStorage.getItem(KEY) === "1";
} catch {
  /* stockage indisponible (navigation privée) */
}

let ctx = null;
let lastPlay = 0;

export function isSoundOn() {
  return enabled;
}

export function setSoundOn(v) {
  enabled = !!v;
  try {
    localStorage.setItem(KEY, enabled ? "1" : "0");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("cafein-sound-change", { detail: enabled }));
  if (enabled) playHiss(); // petit retour immédiat à l'activation
}

export function toggleSound() {
  setSoundOn(!enabled);
  return enabled;
}

/* Sifflement de vapeur : bruit blanc filtré passe-bande qui monte puis
   retombe, sur ~500 ms. 100% synthétisé, ~zéro poids. */
export function playHiss() {
  if (!enabled) return;
  const now = Date.now();
  if (now - lastPlay < 180) return; // anti-spam au survol
  lastPlay = now;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();

    const t0 = ctx.currentTime;
    const dur = 0.5;

    // bruit blanc
    const frames = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;

    // filtre passe-bande qui glisse vers l'aigu → effet "psssh"
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(1200, t0);
    bp.frequency.exponentialRampToValueAtTime(5200, t0 + dur * 0.7);

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 700;

    // enveloppe douce
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.16, t0 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    src.connect(bp);
    bp.connect(hp);
    hp.connect(gain);
    gain.connect(ctx.destination);
    src.start(t0);
    src.stop(t0 + dur);
  } catch {
    /* audio bloqué : on ignore silencieusement */
  }
}
