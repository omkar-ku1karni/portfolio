import { useState } from 'react';
import { site } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import styles from './Capabilities.module.css';

/**
 * Skill groups as quiet columns. Pick a group (or hover one) and it lights;
 * the others dim but stay readable, never hidden.
 */
export function Capabilities() {
  const [active, setActive] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const lit = preview ?? active;
  const total = site.skills.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className={styles.section} aria-labelledby="skills">
      <div className="wrap">
        <SectionHead id="skills" title="Skills" aside={`${total} skills`} />

        <div className={styles.filters} role="group" aria-label="Highlight a skill group">
          <button type="button" aria-pressed={active === null} onClick={() => setActive(null)}>
            All
          </button>
          {site.skills.map((g) => (
            <button
              key={g.label}
              type="button"
              aria-pressed={active === g.label}
              onClick={() => setActive(active === g.label ? null : g.label)}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className={styles.grid} data-snake="top" data-snake-x="flush">
          {site.skills.map((g) => (
            <div
              key={g.label}
              className={styles.group}
              data-dim={(lit !== null && lit !== g.label) || undefined}
              data-lit={lit === g.label || undefined}
              onPointerEnter={() => setPreview(g.label)}
              onPointerLeave={() => setPreview(null)}
            >
              <h3 className={styles.groupTitle}>{g.label}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
