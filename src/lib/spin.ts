import { Category, TOPICS } from '../data/topics';

export type SpinState = {
  top: string;
  center: string;
  bottom: string;
  spinning: boolean;
  durationMs: number;
};

const MIN_DURATION = 1400;
const MAX_DURATION = 2400;

export function buildInitialSpinState(category: Category): SpinState {
  const topics = TOPICS[category];
  return {
    top: topics[0],
    center: topics[1] ?? topics[0],
    bottom: topics[2] ?? topics[1] ?? topics[0],
    spinning: false,
    durationMs: MIN_DURATION,
  };
}

export function createSpinOutcome(category: Category, random = Math.random()) {
  const topics = TOPICS[category];
  const durationMs = Math.round(MIN_DURATION + random * (MAX_DURATION - MIN_DURATION));
  const centerIndex = Math.floor(random * topics.length) % topics.length;
  const topIndex = (centerIndex - 1 + topics.length) % topics.length;
  const bottomIndex = (centerIndex + 1) % topics.length;

  return {
    top: topics[topIndex],
    center: topics[centerIndex],
    bottom: topics[bottomIndex],
    durationMs,
  };
}
