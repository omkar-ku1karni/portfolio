import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { NAV } from '../Header/Header';
import { useActiveSection } from '../../lib/useActiveSection';
import styles from './ScrollRail.module.css';

const ids = NAV.map((n) => n.id);

/**
 * The right-edge rail. Molten light fills it as you scroll; each section has a mark that
 * ignites when the molten front reaches it and stays lit, like a channel catching the metal.
 */
export function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const fill = useTransform(p, (v) => `inset(0% 0% ${(1 - v) * 100}% 0%)`);
  const head = useTransform(p, [0, 1], ['0%', '100%']);
  const active = useActiveSection(ids);
  const label = NAV.find((n) => n.id === active)?.label ?? 'Intro';

  // Where each section's mark sits on the rail, as a fraction of the page's scroll range.
  const [marks, setMarks] = useState<{ id: string; at: number }[]>([]);
  useEffect(() => {
    const measure = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (range <= 0) return;
      setMarks(
        ids
          .map((id) => {
            const sec = document.getElementById(id)?.closest('section');
            if (!sec) return null;
            const top = sec.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5;
            return { id, at: Math.min(1, Math.max(0, top / range)) };
          })
          .filter(Boolean) as { id: string; at: number }[],
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const [reached, setReached] = useState(0);
  useMotionValueEvent(p, 'change', (v) => setReached(v));

  return (
    <div className={styles.rail} aria-hidden="true">
      <span className={styles.top}>Scroll</span>
      <span className={styles.track}>
        <motion.span className={styles.fill} style={{ clipPath: fill }} />
        {marks.map((m) => (
          <span
            key={m.id}
            className={styles.mark}
            data-lit={reached >= m.at - 0.002 || undefined}
            data-current={active === m.id || undefined}
            style={{ top: `${m.at * 100}%` }}
          />
        ))}
        <motion.span className={styles.knob} style={{ top: head }} />
      </span>
      <span className={styles.bottom}>{label}</span>
    </div>
  );
}
