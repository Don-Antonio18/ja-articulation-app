type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function Lever({ disabled = false, onClick }: Props) {
  return (
    <button
      type="button"
      className={`lever ${disabled ? 'lever--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Spin lever"
    >
      <span className="lever__handle" aria-hidden="true" />
      <span className="lever__label">Spin</span>
    </button>
  );
}
