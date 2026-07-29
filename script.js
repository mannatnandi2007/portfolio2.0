/* =========================================================
   PORTFOLIO 2.0 - RETRO GAME & SPRITE INTERACTION ENGINE
   ========================================================= */

// Audio Sound Effects Generator using Web Audio API
class RetroSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playCameraShutter() {
    if (!this.enabled) return;
    this.init();
    // Noise + Tone burst for camera shutter
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    noise.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  playWinkChime() {
    if (!this.enabled) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.05);
      osc.stop(this.ctx.currentTime + idx * 0.05 + 0.12);
    });
  }
}

const sfx = new RetroSoundEngine();

// Sprite Poses Map
const SPRITE_POSES = {
  idle: {
    src: 'assets/sprite_idle.png',
    msg: "Welcome to my Quest! Click my action buttons or scroll down! 👇"
  },
  wink: {
    src: 'assets/sprite_wink.png',
    msg: "Winking at ya! Ready to create magic! 😉✨"
  },
  point: {
    src: 'assets/sprite_point.png',
    msg: "Point down! Scroll to inspect active missions! 👇🎮"
  },
  camera: {
    src: 'assets/sprite_camera.png',
    msg: "SMILE! 📸 Capturing creative moments!"
  }
};

let currentActionTimeout = null;

// Trigger Sprite Animations & Poses
function triggerSpriteAction(actionType) {
  const spriteImg = document.getElementById('characterSpriteImg');
  const spriteBox = document.getElementById('characterSpriteBox');
  const speechBubble = document.getElementById('speechBubble');
  const flashOverlay = document.getElementById('cameraFlashOverlay');

  if (!spriteImg || !SPRITE_POSES[actionType] && actionType !== 'crazy') return;

  if (currentActionTimeout) clearTimeout(currentActionTimeout);

  if (actionType === 'crazy') {
    sfx.playWinkChime();
    let steps = ['wink', 'point', 'camera', 'idle'];
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setSpriteState(steps[stepIdx]);
        stepIdx++;
      } else {
        clearInterval(interval);
      }
    }, 450);
    return;
  }

  setSpriteState(actionType);

  if (actionType === 'camera') {
    sfx.playCameraShutter();
    flashOverlay.classList.add('flash-active');
    setTimeout(() => flashOverlay.classList.remove('flash-active'), 400);
  } else if (actionType === 'wink') {
    sfx.playWinkChime();
  } else if (actionType === 'point') {
    sfx.playClick();
  }

  // Return to idle after 4 seconds if not clicked again
  currentActionTimeout = setTimeout(() => {
    setSpriteState('idle');
  }, 4000);
}

function setSpriteState(stateKey) {
  const spriteImg = document.getElementById('characterSpriteImg');
  const spriteBox = document.getElementById('characterSpriteBox');
  const speechBubble = document.getElementById('speechBubble');

  const pose = SPRITE_POSES[stateKey];
  if (!pose) return;

  spriteImg.src = pose.src;
  speechBubble.textContent = pose.msg;

  // Reset animations
  spriteBox.classList.remove('sprite-pop-out', 'sprite-bounce');
  spriteImg.classList.remove('sprite-wink-anim');

  // Add specific animation
  if (stateKey === 'point') {
    spriteBox.classList.add('sprite-pop-out');
  } else if (stateKey === 'wink') {
    spriteImg.classList.add('sprite-wink-anim');
  } else if (stateKey === 'camera') {
    spriteBox.classList.add('sprite-bounce');
  }
}

// Scroll Trigger: Make sprite point down when top of screen leaves viewport
window.addEventListener('scroll', () => {
  const heroSection = document.getElementById('start');
  if (!heroSection) return;

  const heroBottom = heroSection.getBoundingClientRect().bottom;
  if (heroBottom < 300 && heroBottom > -500) {
    // Sprite points down while user scrolls past hero
    const spriteImg = document.getElementById('characterSpriteImg');
    if (spriteImg && !spriteImg.src.includes('sprite_point.png')) {
      setSpriteState('point');
    }
  }
});

// Toggle SFX
document.addEventListener('DOMContentLoaded', () => {
  const sfxBtn = document.getElementById('sfxToggleBtn');
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      sfxBtn.innerHTML = sfx.enabled 
        ? '<i class="fa-solid fa-volume-high"></i> SFX: ON' 
        : '<i class="fa-solid fa-volume-xmark"></i> SFX: OFF';
      if (sfx.enabled) sfx.playClick();
    });
  }

  // Add sound to all comic buttons
  document.querySelectorAll('.comic-btn, .comic-social-btn').forEach(btn => {
    btn.addEventListener('click', () => sfx.playClick());
  });
});
