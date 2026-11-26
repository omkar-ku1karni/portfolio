import { motion } from 'motion/react';
import { BadgeCheck } from 'lucide-react';
import { site } from '../../content/site';
import type { Credential } from '../../content/types';
import { useCalm } from '../../lib/motion';
import { useSheet } from '../../lib/store';
import { SectionHead } from '../ui/SectionHead';
import styles from './Credentials.module.css';

const ease = [0.16, 1, 0.3, 1] as const;

/** Credentials grouped by their `group` field, keeping each item's index into site.credentials. */
const groups = site.credentials.reduce<{ name: string; items: { c: Credential; index: number }[] }[]>(
  (acc, c, index) => {
    const g = acc.find((x) => x.name === c.group);
    if (g) g.items.push({ c, index });
    else acc.push({ name: c.group, items: [{ c, index }] });
    return acc;
  },
  [],
);

/** Hover or focus turns a card over to its certificate; click opens it full screen. */
export function Credentials() {
  const calm = useCalm();
  const { openSheet } = useSheet();
  const n = site.credentials.length;

  return (
    <section className={styles.section} aria-labelledby="certifications">
      <div className="wrap">
        <SectionHead id="certifications" title="Certifications" aside={`${n} certificates`} />
        <div className={styles.groups}>
          {groups.map((g) => (
            <div key={g.name} className={styles.group}>
              <h3 className={styles.groupHead} data-snake="middle">
                {g.name}
              </h3>
              <ul className={styles.grid}>
                {g.items.map(({ c, index }, i) => (
                  <motion.li
                    key={c.name}
                    className={styles.item}
                    initial={calm ? false : { rotateY: -60, opacity: 0 }}
                    whileInView={{ rotateY: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-6% 0px' }}
                    transition={{ duration: 0.9, ease, delay: i * 0.07 }}
                  >
                    <button
                      type="button"
                      className={styles.card}
                      data-flips={c.image ? true : undefined}
                      aria-haspopup="dialog"
                      aria-label={`${c.name}, ${c.issuer}, ${c.date}. View certificate`}
                      onClick={(e) => openSheet('credential', index, e.currentTarget)}
                    >
                      <span className={styles.inner}>
                        <span className={styles.front}>
                          <span className={styles.name}>{c.name}</span>
                          <span className={styles.foot}>
                            <span>{c.issuer}</span>
                            <span>{c.date}</span>
                            {c.verifyUrl && (
                              <span className={styles.meta}>
                                <BadgeCheck size={13} aria-hidden="true" /> Verifiable
                              </span>
                            )}
                          </span>
                        </span>
                        {c.image && (
                          <span className={styles.back} aria-hidden="true">
                            <img src={c.image} alt="" loading="lazy" />
                          </span>
                        )}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
