import { Fragment, type ReactNode } from 'react';
import styles from './RichText.module.css';

/**
 * Numbers in running text ("95%", "~60%", "32,487", "5.0 s", "45 of 45").
 * Not matched inside words or identifiers such as A2A, p95 or SigLIP2.
 */
const NUM = /(?<![\w.@/-])(~?[+-]?\d[\d,]*(?:\.\d+)?(?:\/\d[\d,]*)?(?:\s?%|\s?ms\b|\s?s\b|k\b|M\b)?)(?![\w%])/g;

function withNumbers(text: string, key: string): ReactNode[] {
  return text.split(NUM).map((part, i) =>
    i % 2 === 1 ? (
      <span key={`${key}-${i}`} className={styles.num}>
        {part}
      </span>
    ) : (
      <Fragment key={`${key}-${i}`}>{part}</Fragment>
    ),
  );
}

/**
 * Renders a string where **double asterisks** mark bold text.
 * Numbers are tinted so they stand out within the sentence, never as a separate headline.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{withNumbers(part.slice(2, -2), `b${i}`)}</strong>
        ) : (
          <Fragment key={i}>{withNumbers(part, `t${i}`)}</Fragment>
        ),
      )}
    </>
  );
}

/** Same text with the markers removed, for aria-labels and meta tags. */
export const plain = (text: string) => text.replace(/\*\*/g, '');
