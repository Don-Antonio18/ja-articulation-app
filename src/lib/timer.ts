export const TIMER_START_SECONDS = 60;

export type TimerState = {
  secondsLeft: number;
  running: boolean;
  paused: boolean;
};

export function createInitialTimerState(): TimerState {
  return {
    secondsLeft: TIMER_START_SECONDS,
    running: false,
    paused: false,
  };
}

export function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
