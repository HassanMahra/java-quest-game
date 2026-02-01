// Sound effects manager using Web Audio API
class SoundManager {
  constructor() {
    this.sounds = {}
    this.audioContext = null
    this.masterVolume = 0.5
    this.initialized = false
  }

  async init() {
    if (this.initialized) return
    
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Define sound frequencies and types
    this.soundDefs = {
      click: { type: 'square', freq: 800, duration: 0.05, decay: 0.1 },
      hover: { type: 'sine', freq: 400, duration: 0.02, decay: 0.05 },
      success: { type: 'sine', freq: [523, 659, 784], duration: 0.15, decay: 0.3 }, // C-E-G chord
      error: { type: 'sawtooth', freq: [200, 150], duration: 0.2, decay: 0.3 },
      notification: { type: 'sine', freq: [880, 1100], duration: 0.1, decay: 0.2 },
      levelUp: { type: 'sine', freq: [523, 659, 784, 1047], duration: 0.2, decay: 0.5 },
      money: { type: 'triangle', freq: [1200, 1400, 1600], duration: 0.08, decay: 0.15 },
      typing: { type: 'square', freq: 600 + Math.random() * 200, duration: 0.02, decay: 0.02 },
      windowOpen: { type: 'sine', freq: [400, 600], duration: 0.1, decay: 0.2 },
      windowClose: { type: 'sine', freq: [600, 400], duration: 0.1, decay: 0.2 },
      deploy: { type: 'sawtooth', freq: [300, 400, 500, 600], duration: 0.1, decay: 0.4 },
    }
    
    this.initialized = true
  }

  play(soundName) {
    if (!this.initialized || !this.audioContext) {
      this.init()
      return
    }
    
    const def = this.soundDefs[soundName]
    if (!def) return
    
    const now = this.audioContext.currentTime
    const freqs = Array.isArray(def.freq) ? def.freq : [def.freq]
    
    freqs.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.type = def.type
      oscillator.frequency.setValueAtTime(freq, now + index * def.duration)
      
      gainNode.gain.setValueAtTime(this.masterVolume * 0.3, now + index * def.duration)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * def.duration + def.decay)
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.start(now + index * def.duration)
      oscillator.stop(now + index * def.duration + def.decay + 0.1)
    })
  }

  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
  }
}

// Singleton instance
export const soundManager = new SoundManager()

// Initialize on first user interaction
if (typeof window !== 'undefined') {
  const initAudio = () => {
    soundManager.init()
    document.removeEventListener('click', initAudio)
    document.removeEventListener('keydown', initAudio)
  }
  document.addEventListener('click', initAudio)
  document.addEventListener('keydown', initAudio)
}
