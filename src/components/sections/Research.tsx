import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { site } from '../../content/site';
import { useCalm } from '../../lib/motion';
import { RichText } from '../ui/RichText';
import { SectionHead } from '../ui/SectionHead';
import styles from './Research.module.css';

const ease = [0.16, 1, 0.3, 1] as const;

export function Research() {
  const calm = useCalm();
  const reveal = (i: number) => ({
    initial: calm ? false : ({ opacity: 0, y: 28 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0px' },
    transition: { duration: 0.9, ease, delay: i * 0.08 },
  });

  return (
    <section className={styles.section} aria-labelledby="education">
      <div className="wrap">
        <SectionHead id="education" title="Education & research" />
        <div className={styles.grid}>
          <ul className={styles.schools}>
            {site.education.map((s, i) => (
              <motion.li key={s.institution} className={styles.school} {...reveal(i + 1)}>
                <h3 className={`display ${styles.inst}`} data-snake="middle">
                  {s.institution}
                </h3>
                <p className={styles.degree}>{s.degree}</p>
                <p className={styles.credit}>
                  <span>{s.period}</span>
                  {s.location && <span>{s.location}</span>}
                  {s.status === 'in-progress' && <span className={styles.now}>In progress</span>}
                </p>
              </motion.li>
            ))}
          </ul>
          {site.publications.map((p, i) => (
            <motion.article key={p.title} className={styles.paper} {...reveal(i)}>
              <h3 className={styles.paperTitle}>{p.title}</h3>
              {p.summary && (
                <p className={styles.summary}>
                  <RichText text={p.summary} />
                </p>
              )}
              <p className={styles.authors}>{p.authors.join(', ')}</p>
              <p className={styles.credit}>
                <span>{p.venue}</span>
                <span>{p.year}</span>
              </p>
              {p.url && (
                <a className={styles.read} href={p.url} target="_blank" rel="noreferrer">
                  Read on IEEE Xplore <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </motion.article>
          ))}

        </div>
      </div>
    </section>
  );
}
