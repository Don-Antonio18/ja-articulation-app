import { useEffect, useMemo, useRef, useState } from 'react';
import Lever from '../components/Lever';
import TopicStack from '../components/TopicStack';
import { CATEGORIES, Category, getTopicsForCategory } from '../data/topics';
import { buildInitialSpinState, createSpinOutcome } from '../lib/spin';

export default function SpinPage() {
  const [category, setCategory] = useState<Category>('General');
  const [state, setState] = useState(() => buildInitialSpinState('General'));
  const timeoutRef = useRef<number | null>(null);

  const topics = useMemo(() => getTopicsForCategory(category), [category]);

  const handleSpin = () => {
    if (state.spinning) return;
    const outcome = createSpinOutcome(category);
    setState((current) => ({
      ...current,
      spinning: true,
      durationMs: outcome.durationMs,
    }));

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setState({
        top: outcome.top,
        center: outcome.center,
        bottom: outcome.bottom,
        spinning: false,
        durationMs: outcome.durationMs,
      });
      timeoutRef.current = null;
    }, outcome.durationMs);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  return (
    <section className="page page--spin">
      <div className="hero-copy">
        <h1>Pick a category and pull the lever.</h1>
        <p className="subcopy">Practice impromptu speaking by spinning for a topic and talking for 1 minute.</p>
      </div>

      <div className="spin-layout">
        <div className="control-card">
          <label className="field-label" htmlFor="category-select">Category</label>
          <select
            id="category-select"
            className="select"
            value={category}
            onChange={(event) => {
              const next = event.target.value as Category;
              setCategory(next);
              setState(buildInitialSpinState(next));
            }}
            disabled={state.spinning}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <div className="spin-layout__controls">
            <TopicStack
              top={state.top}
              center={state.center}
              bottom={state.bottom}
              spinning={state.spinning}
              durationMs={state.durationMs}
            />
            <div className="lever-column">
              <p className="lever-hint">Press to spin</p>
              <Lever disabled={state.spinning} onClick={handleSpin} />
            </div>
          </div>
        </div>

        <aside className="detail-card" aria-label="Selected category prompts">
          <h2>{category}</h2>
          <ul className="topic-list">
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
