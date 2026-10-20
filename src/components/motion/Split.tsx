import { Fragment, type ElementType } from "react";

// Renders a heading as word spans so <Motion> can animate each word. The full text
// stays on the element as its accessible name; the spans are hidden from assistive tech.
export function Split({
  as: Tag = "h2",
  text,
  className,
  id,
}: {
  as?: ElementType;
  text: string;
  className?: string;
  id?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} id={id} data-split aria-label={text}>
      {words.map((word, i) => (
        // the space sits between the inline-blocks; inside them it would collapse
        <Fragment key={i}>
          <span className="split-word" aria-hidden="true">
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
