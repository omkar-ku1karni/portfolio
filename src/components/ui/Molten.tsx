import { useRef, type RefObject } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useCalm } from '../../lib/motion';
import styles from './Molten.module.css';

/**
 * Scroll-linked "molten" illumination for a heading, driven by where it sits on screen:
 *  - as it rises into view, light pours down into the letters from the top
 *  - the channel (hairline) under it fills left to right and stays lit
 *  - once it passes the top of the screen the letters cool back to their normal colour
 * Scrolling back up drains it. Under reduced motion nothing pours.
 */
export function useMolten(target: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target, offset: ['start 92%', 'start 4%'] });
  const pour = useTransform(scrollYProgress, [0.04, 0.42], ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']);
  // Peaks at 85% so the molten copy blends with the plain letters instead of glaring
  const heat = useTransform(scrollYProgress, [0, 0.06, 0.72, 1], [0, 0.85, 0.85, 0]);
  const channel = useTransform(scrollYProgress, [0.04, 0.5], ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  return { pour, heat, channel };
}

/** One word of a heading: the normal letters, plus a molten copy laid exactly over them. */
export function MoltenWord({ word, pour, heat }: { word: string; pour?: MotionValue<string>; heat?: MotionValue<number> }) {
  return (
    <>
      {word}
      {pour && heat && (
        <motion.span className={styles.molten} style={{ clipPath: pour, opacity: heat }} aria-hidden="true">
          {word}
        </motion.span>
      )}
    </>
  );
}

/** The lit channel under a heading. */
export function MoltenChannel({ channel }: { channel?: MotionValue<string> }) {
  if (!channel) return null;
  return <motion.span className={styles.channel} style={{ clipPath: channel }} aria-hidden="true" />;
}

/** Convenience: refs and motion values for a heading block, or nothing when motion is calm. */
export function useMoltenHeading() {
  const calm = useCalm();
  const ref = useRef<HTMLDivElement>(null);
  const molten = useMolten(ref);
  return { ref, calm, ...(calm ? { pour: undefined, heat: undefined, channel: undefined } : molten) };
}
