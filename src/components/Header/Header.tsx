import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { site } from '../../content/site';
import { useActiveSection } from '../../lib/useActiveSection';
import styles from './Header.module.css';

/** Nav order matches the page order in App.tsx. */
export const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];
const ids = NAV.map((n) => n.id);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);
  const resume = site.reach.find((r) => r.icon === 'resume');

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#top" className={styles.mark}>
          {site.profile.name}
        </a>
        <span className={styles.rule} aria-hidden="true" />
        <nav aria-label="Sections" className={styles.nav}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={styles.link} aria-current={active === n.id ? 'true' : undefined}>
              {active === n.id && (
                <motion.span layoutId="nav-dot" className={styles.dot} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
              )}
              {n.label}
            </a>
          ))}
        </nav>
        {resume && (
          <a href={resume.href} target="_blank" className={styles.resume}>
            Resume <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </header>
  );
}
