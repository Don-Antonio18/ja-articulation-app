import type { CSSProperties } from 'react';

type Props = {
  top: string;
  center: string;
  bottom: string;
  spinning: boolean;
  durationMs: number;
};

export default function TopicStack({ top, center, bottom, spinning, durationMs }: Props) {
  return (
    <section className={`topic-stack ${spinning ? 'topic-stack--spinning' : ''}`} aria-label="Topic display">
      <div
        className="topic-stack__track"
        style={{ '--spin-duration': `${durationMs}ms` } as CSSProperties}
      >
        <div className="topic-slot topic-slot--faded">{top}</div>
        <div className="topic-slot topic-slot--center">{center}</div>
        <div className="topic-slot topic-slot--faded">{bottom}</div>
      </div>
    </section>
  );
}
