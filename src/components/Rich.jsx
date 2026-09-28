/**
 * Renders a string where text wrapped in *asterisks* becomes
 * an italic serif accent (disabled visually in Arabic via CSS).
 */
export default function Rich({ text }) {
  const parts = String(text ?? '').split('*');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="seg-i">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
