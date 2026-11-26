import { Fragment } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { site } from '../../content/site';
import { ReachGlyph } from '../ui/Icons';
import { MoltenWord, useMoltenHeading } from '../ui/Molten';
import styles from './Contact.module.css';

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { y: '110%' },
  shown: { y: '0%', transition: { duration: 1, ease } },
};

export function Contact() {
  const { ref: headRef, calm, pour, heat } = useMoltenHeading();
  const words = site.contact.heading.split(' ');

  return (
    <section className={styles.section} aria-labelledby="contact">
      <div className="wrap">
        <div className={styles.card} data-snake="top" data-snake-x="flush">
          <div ref={headRef}>
          <motion.h2
            id="contact"
            className={`display ${styles.heading}`}
            aria-label={site.contact.heading}
            initial={calm ? false : 'hidden'}
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ staggerChildren: 0.07 }}
          >
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className={styles.mask} aria-hidden="true">
                  <motion.span className={styles.word} variants={rise}>
                    <MoltenWord word={w} pour={pour} heat={heat} />
                  </motion.span>
                </span>{' '}
              </Fragment>
            ))}
          </motion.h2>
          </div>
          {site.contact.sub && <p className={styles.sub}>{site.contact.sub}</p>}

          <ul className={styles.links}>
            {site.reach.map((r) => (
              <li key={r.label}>
                <a
                  className={styles.link}
                  href={r.href}
                  target={r.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                >
                  <span className={styles.icon}>
                    <ReachGlyph icon={r.icon} size={18} />
                  </span>
                  <span className={styles.text}>
                    <span className={styles.label}>{r.label}</span>
                    {/* A break opportunity after "@" so a long address wraps cleanly, never mid-word */}
                    <span className={styles.value}>{r.value.replace('@', '@\u200b')}</span>
                  </span>
                  <ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.where}>
            <span className={styles.pulse} aria-hidden="true" />
            {site.profile.location}
          </p>
        </div>
      </div>

      <footer className={`wrap ${styles.footer}`}>
        <a href="#top" className="label">
          Back to top
        </a>
      </footer>
    </section>
  );
}
