import { useEffect, useRef, useState } from 'react';
import TimerControls from '../components/TimerControls';
import { createInitialTimerState, formatTime } from '../lib/timer';

export default function TimerPage() {
  const [timer, setTimer] = useState(createInitialTimerState);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
  }, []);

  const stopInterval = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    if (timer.running || timer.secondsLeft === 0) return;
    setTimer((current) => ({ ...current, running: true, paused: false }));
    intervalRef.current = window.setInterval(() => {
      setTimer((current) => {
        if (current.secondsLeft <= 1) {
          stopInterval();
          return { secondsLeft: 0, running: false, paused: false };
        }
        return { ...current, secondsLeft: current.secondsLeft - 1 };
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (!timer.running) return;
    stopInterval();
    setTimer((current) => ({ ...current, running: false, paused: true }));
  };

  const resetTimer = () => {
    stopInterval();
    setTimer(createInitialTimerState());
  };

  return (
    <section className="page page--timer">
      <div className="hero-copy">
        <h1>Practice for one minute.</h1>
        <p className="subcopy">Start when you are ready, pause if needed, and reset when finished.</p>
      </div>

      <TimerControls
        displayTime={formatTime(timer.secondsLeft)}
        secondsLeft={timer.secondsLeft}
        running={timer.running}
        paused={timer.paused}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />
    </section>
  );
}
