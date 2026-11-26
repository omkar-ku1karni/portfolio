import { motion } from 'motion/react';
import { MoltenChannel, MoltenWord, useMoltenHeading } from './Molten';
import styles from './SectionHead.module.css';

interface Props {
  id: string;
  title: string;
  /** Small aside on the right, e.g. a count. */
  aside?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { y: '110%' },
  shown: { y: '0%', transition: { duration: 1, ease } },
};

/**
 * Section heading. Words rise out of their masks as the heading enters, then molten light
 * pours into the letters and fills the channel beneath (see ui/Molten.tsx).
 */
export function SectionHead({ id, title, aside }: Props) {
  const { ref, calm, pour, heat, channel } = useMoltenHeading();
  return (
    <div ref={ref} className={styles.head} data-snake="bottom" data-snake-x="flush">
      {/* The heading watches the viewport; its words are clipped by their masks and can't. */}
      <motion.h2
        id={id}
        className={`display ${styles.title}`}
        aria-label={title}
        initial={calm ? false : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ staggerChildren: 0.07 }}
      >
        {title.split(' ').map((w, i) => (
          <span key={i} className={styles.mask} aria-hidden="true">
            <motion.span className={styles.word} variants={rise}>
              <MoltenWord word={w} pour={pour} heat={heat} />
            </motion.span>
          </span>
        ))}
      </motion.h2>
      {aside && <span className="label">{aside}</span>}
      <MoltenChannel channel={channel} />
    </div>
  );
}
