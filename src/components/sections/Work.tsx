import { useRef, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { site } from '../../content/site';
import type { Project } from '../../content/types';
import { useCalm } from '../../lib/motion';
import { focusField } from '../Field/fieldState';
import { GithubIcon } from '../ui/Icons';
import { RichText } from '../ui/RichText';
import { SectionHead } from '../ui/SectionHead';
import { FlowArt } from './FlowArt';
import { ProjectPreview } from './ProjectPreview';
import { familyColor, familyLabel } from './projectMeta';
import styles from './Work.module.css';

const ease = [0.16, 1, 0.3, 1] as const;

export function Work() {
  const n = site.projects.length;
  return (
    <section className={styles.section} aria-labelledby="projects">
      <div className="wrap">
        <SectionHead id="projects" title="Projects" aside={`${n} project${n === 1 ? '' : 's'}`} />
        <ul className={styles.grid}>
          {site.projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A project: preview diagram, name, a short summary, and two ways out (code, website). */
function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const calm = useCalm();
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 22 });

  const onMove = (e: PointerEvent) => {
    if (calm || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const enter = () => focusField(familyColor(p.family));
  const leave = () => {
    px.set(0);
    py.set(0);
    focusField(null);
  };
  const links = p.links ?? {};

  return (
    <motion.li
      className={styles.cell}
      initial={calm ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 1, ease, delay: (index % 2) * 0.08 }}
    >
      <motion.article
        ref={ref}
        data-snake="top"
        data-snake-x="flush"
        className={styles.card}
        data-family={p.family}
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={onMove}
        onPointerEnter={enter}
        onPointerLeave={leave}
        onFocus={enter}
        onBlur={leave}
      >
        <div className={styles.preview}>
          {p.preview ? (
            <ProjectPreview kind={p.preview} title={p.title} className={styles.diagram} />
          ) : (
            <FlowArt seed={p.title} className={styles.diagram} />
          )}
        </div>

        <div className={styles.body}>
          <p className={styles.kind}>{familyLabel(p.family)}</p>
          <h3 className={styles.title}>{p.title}</h3>
          <p className={styles.summary}>
            <RichText text={p.summary} />
          </p>
        </div>

        {(links.repo || links.live) && (
          <div className={styles.actions}>
            {links.repo && (
              <a href={links.repo} target="_blank" rel="noreferrer" className={styles.action}>
                <GithubIcon size={15} /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
            {links.live && (
              <a href={links.live} target="_blank" rel="noreferrer" className={`${styles.action} ${styles.primary}`}>
                <Globe size={15} aria-hidden="true" /> Website <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </motion.article>
    </motion.li>
  );
}
