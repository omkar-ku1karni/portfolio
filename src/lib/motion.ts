import { useReducedMotion } from 'motion/react';

/**
 * True for automated browsers (screenshot tools, crawlers) or when the URL has ?still.
 * They get the settled page with no entrance motion, same as reduced-motion visitors.
 */
export const STILL =
  typeof window !== 'undefined' &&
  (navigator.webdriver || new URLSearchParams(window.location.search).has('still'));

if (STILL) document.documentElement.dataset.still = '';

/** Use instead of motion's useReducedMotion: also honours STILL. */
export function useCalm() {
  return useReducedMotion() || STILL;
}
