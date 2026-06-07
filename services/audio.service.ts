type AudioState = {
  instance: HTMLAudioElement;
  name: string;
};

const AUDIO_CONFIG: Record<string, { loop: boolean; volume: number }> = {
  silence: { loop: false, volume: 0 },
  light_ambient: { loop: true, volume: 0.25 },
  soft_ambient: { loop: true, volume: 0.2 },
  crowd_low: { loop: true, volume: 0.3 },
  crowd_soft: { loop: true, volume: 0.35 },
  crowd_building: { loop: true, volume: 0.45 },
  crowd_explosion: { loop: false, volume: 0.6 },
  heartbeat: { loop: true, volume: 0.4 },
  heartbeat_soft: { loop: true, volume: 0.3 },
  heartbeat_fast: { loop: true, volume: 0.5 },
  heartbeat_stop: { loop: false, volume: 0.5 },
  gunshot: { loop: false, volume: 0.7 },
  steps_fast: { loop: true, volume: 0.35 },
  wind: { loop: true, volume: 0.3 },
  wind_stronger: { loop: true, volume: 0.45 },
  distorted_wind: { loop: true, volume: 0.4 },
  uplifting: { loop: false, volume: 0.4 },
  low_heartbeat: { loop: true, volume: 0.3 },
};

const DEFAULT_CONFIG = { loop: false, volume: 0.3 };
const FADE_DURATION = 800;

class AudioService {
  private current: AudioState | null = null;

  private getConfig(name: string) {
    return AUDIO_CONFIG[name] ?? DEFAULT_CONFIG;
  }

  private fadeOut(audio: HTMLAudioElement, duration: number): Promise<void> {
    return new Promise((resolve) => {
      const startVolume = audio.volume;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        audio.volume = startVolume * (1 - progress);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          audio.pause();
          audio.currentTime = 0;
          resolve();
        }
      };

      requestAnimationFrame(tick);
    });
  }

  private fadeIn(audio: HTMLAudioElement, targetVolume: number, duration: number) {
    audio.volume = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audio.volume = targetVolume * progress;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  async play(name: string) {
    if (name === "silence" || !name) {
      await this.stop();
      return;
    }

    if (this.current?.name === name) return;

    const config = this.getConfig(name);

    // fade out del anterior sin await — no bloqueamos
    // pero marcamos current como null inmediatamente
    if (this.current) {
      const prev = this.current.instance;
      this.current = null;
      this.fadeOut(prev, FADE_DURATION / 2); // sin await
    }

    // pequeña pausa para que el fade out arranque
    await new Promise(r => setTimeout(r, 80));

    // si mientras esperabamos ya se pidió otro audio, cancelar
    if (this.current !== null) return;

    const audio = new Audio(`/audio/${name}.mp3`);
    audio.loop = config.loop;
    audio.volume = 0;

    try {
      await audio.play();
      this.current = { instance: audio, name };
      this.fadeIn(audio, config.volume, FADE_DURATION);
    } catch {
      // autoplay bloqueado
    }
  }

  async stop() {
    if (!this.current) return;
    const prev = this.current.instance;
    this.current = null;
    await this.fadeOut(prev, FADE_DURATION);
  }

  pause() {
    this.current?.instance.pause();
  }

  resume() {
    this.current?.instance.play().catch(() => {});
  }
}

export const audioService = new AudioService();
