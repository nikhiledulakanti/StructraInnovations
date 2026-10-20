import { FOUNDER_INPUT } from "@/content/site";

// Renders copy and highlights any "[Founder input required]" marker so gaps stay visible.
export function Txt({ text }: { text: string }) {
  if (!text.includes(FOUNDER_INPUT)) return <>{text}</>;
  const parts = text.split(FOUNDER_INPUT);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="placeholder">{FOUNDER_INPUT}</span>}
        </span>
      ))}
    </>
  );
}
