type Props = {
  displayTime: string;
  secondsLeft: number;
  running: boolean;
  paused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export default function TimerControls({
  displayTime,
  secondsLeft,
  running,
  paused,
  onStart,
  onPause,
  onReset,
}: Props) {
  return (
    <section className={`timer-panel ${paused ? 'timer-panel--paused' : ''}`} aria-label="Timer controls">
      <div className="timer-panel__clock" aria-live="polite">{displayTime}</div>
      <div className="timer-panel__buttons">
        <button type="button" className="button button--primary" onClick={onStart} disabled={running}>
          Start
        </button>
        <button type="button" className="button" onClick={onPause} disabled={!running}>
          Pause
        </button>
        <button type="button" className="button" onClick={onReset} disabled={secondsLeft === 60 && !running && !paused}>
          Reset
        </button>
      </div>
    </section>
  );
}
