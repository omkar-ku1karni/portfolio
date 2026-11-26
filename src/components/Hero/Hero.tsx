import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { site } from '../../content/site';
import { useCalm } from '../../lib/motion';
import styles from './Hero.module.css';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const calm = useCalm();
  const { profile } = site;
  const school = site.education.find((s) => s.status === 'in-progress');
  const roles = site.experience.filter((r) => /present/i.test(r.period));
  const resume = site.reach.find((r) => r.icon === 'resume');
  const rise = (i: number) =>
    calm
      ? {}
      : {
          initial: { y: '105%' },
          animate: { y: '0%' },
          transition: { duration: 1.2, ease, delay: 0.15 + i * 0.12 },
        };
  const fade = (d: number) =>
    calm ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay: d } };

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-name">
      <div className={`wrap ${styles.inner}`}>
        {/* Name and actions. On wide screens this is one column; below that it dissolves into the grid */}
        <div className={styles.lead}>
        <h1 id="hero-name" className={`display ${styles.name}`} aria-label={profile.name} data-snake="middle">
            {profile.name.split(' ').map((w, i) => (
              <span key={w} className={styles.mask} aria-hidden="true">
                <motion.span className={styles.line} {...rise(i)}>
                  {w}
                </motion.span>
              </span>
            ))}
        </h1>

        <motion.div className={styles.actions} {...fade(0.7)}>
            <a href="#experience" className={styles.primary}>
              Explore <ArrowDown size={16} aria-hidden="true" />
            </a>
            {resume && (
              <a href={resume.href} target="_blank" className={styles.secondary}>
                Resume <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
        </motion.div>
        </div>

        {/* The portrait develops in from below, like a print surfacing in the tray */}
        <motion.figure
          className={styles.portrait}
          initial={calm ? false : { clipPath: 'inset(100% 0 0 0)', opacity: 0.4 }}
          animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.35 }}
        >
          <img src={profile.headshot} alt={`Portrait of ${profile.name}`} width={960} height={1200} fetchPriority="high" />
        </motion.figure>

        {/* Tagline and the Currently readout, beside the photo on wide screens */}
        <div className={styles.side}>
        <motion.p className={styles.tagline} {...fade(0.55)}>
          {profile.tagline}
        </motion.p>

        <motion.div className={styles.status} {...fade(0.9)}>
          <span className={styles.pulse} aria-hidden="true" />
          <div className={styles.now}>
            <p className="label">Currently</p>
            {roles.map((r) => (
              <p key={r.company} className={styles.statusMain}>
                {r.title}, {r.company}
                {r.location && (
                  <span className={styles.statusSub}>
                    {/* City, plus "Part-time" when the role is: the hybrid detail lives in Experience */}
                    {r.location
                      .split(' · ')
                      .filter((part, i) => i === 0 || /part-time/i.test(part))
                      .join(' · ')}
                  </span>
                )}
              </p>
            ))}
            {school && (
              <p className={styles.statusMain}>
                {school.degree.replace(' in ', ', ')}, {school.institution}
                {school.location && <span className={styles.statusSub}>{school.location}</span>}
              </p>
            )}
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
