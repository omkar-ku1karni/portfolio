import { motion } from 'motion/react';
import { site } from '../../content/site';
import { useCalm } from '../../lib/motion';
import { RichText } from '../ui/RichText';
import { SectionHead } from '../ui/SectionHead';
import styles from './Experience.module.css';

const ease = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  const calm = useCalm();

  return (
    <section className={styles.section} aria-labelledby="experience">
      <div className="wrap">
        <SectionHead id="experience" title="Experience" aside={`${site.experience.length} roles`} />
        <div className={styles.list}>
          <ol className={styles.roles}>
            {site.experience.map((r, i) => {
              const current = /present/i.test(r.period);
              return (
                <motion.li
                  key={r.company + r.title}
                  className={styles.role}
                  initial={calm ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-12% 0px' }}
                  transition={{ duration: 0.9, ease, delay: i * 0.04 }}
                >
                  <div className={styles.side}>
                    <h3 className={`display ${styles.title}`} data-snake="middle">
                      {r.title}
                    </h3>
                    <p className={styles.company}>{r.company}</p>
                    <p className={styles.credit}>
                      <span>{r.period}</span>
                      {r.location && <span>{r.location}</span>}
                      {current && <span className={styles.now}>Current</span>}
                    </p>
                  </div>
                  <ul className={styles.points}>
                    {r.achievements.map((a) => (
                      <li key={a}>
                        <RichText text={a} />
                      </li>
                    ))}
                  </ul>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
