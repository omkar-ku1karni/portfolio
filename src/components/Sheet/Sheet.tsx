import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, X } from 'lucide-react';
import { site } from '../../content/site';
import type { Credential } from '../../content/types';
import { useCalm } from '../../lib/motion';
import { lockScroll } from '../../lib/smoothScroll';
import { useSheet, type Collection } from '../../lib/store';
import styles from './Sheet.module.css';

const ease = [0.16, 1, 0.3, 1] as const;
// Only certifications open in a sheet now; `collection` stays so another kind can be added.
const items = (_c: Collection) => site.credentials;
const nameOf = (_c: Collection, i: number) => site.credentials[i].name;

/** Full-screen sheet. It dissolves open from the card that launched it; arrows page, Esc returns. */
export function Sheet() {
  const { open, close, moveTo } = useSheet();
  const calm = useCalm();

  useEffect(() => {
    lockScroll(!!open);
    return () => lockScroll(false);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <Panel
          key="sheet"
          collection={open.collection}
          index={open.index}
          origin={open.origin}
          calm={calm}
          onClose={close}
          onMove={moveTo}
        />
      )}
    </AnimatePresence>
  );
}

interface PanelProps {
  collection: Collection;
  index: number;
  origin: { x: number; y: number };
  calm: boolean;
  onClose: () => void;
  onMove: (i: number) => void;
}

function Panel({ collection, index, origin, calm, onClose, onMove }: PanelProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(1);
  const list = items(collection);
  const prev = (index - 1 + list.length) % list.length;
  const next = (index + 1) % list.length;

  useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
  }, []);

  const go = useCallback(
    (i: number, d: number) => {
      setDir(d);
      onMove(i);
      dialog.current?.scrollTo({ top: 0 });
    },
    [onMove],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(next, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(prev, -1);
    } else if (e.key === 'Tab' && dialog.current) {
      const f = dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const w = window.innerWidth;
  const h = window.innerHeight;
  const r = Math.hypot(Math.max(origin.x, w - origin.x), Math.max(origin.y, h - origin.y)) + 40;
  const at = `at ${origin.x}px ${origin.y}px`;
  const kindLabel = 'Certification';

  return (
    <motion.div
      ref={dialog}
      className={styles.sheet}
      data-family="analytics"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-labelledby="sheet-title"
      onKeyDown={onKeyDown}
      initial={calm ? { opacity: 0 } : { clipPath: `circle(0px ${at})` }}
      animate={calm ? { opacity: 1 } : { clipPath: `circle(${r}px ${at})` }}
      exit={calm ? { opacity: 0 } : { clipPath: `circle(0px ${at})` }}
      transition={{ duration: calm ? 0.15 : 0.8, ease }}
    >
      <div className={`wrap ${styles.bar}`}>
        <p className="label">
          {kindLabel} · {index + 1} / {list.length}
        </p>
        <nav className={styles.controls} aria-label="Sheet navigation">
          <button type="button" className={styles.ctrl} onClick={() => go(prev, -1)} aria-label={`Previous: ${nameOf(collection, prev)}`}>
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <button type="button" className={styles.ctrl} onClick={() => go(next, 1)} aria-label={`Next: ${nameOf(collection, next)}`}>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button ref={closeBtn} type="button" className={`${styles.ctrl} ${styles.close}`} onClick={onClose}>
            Close <X size={15} aria-hidden="true" />
          </button>
        </nav>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={`${collection}-${index}`}
          className={`wrap ${styles.body}`}
          initial={calm ? { opacity: 0 } : { opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease, delay: 0.05 } }}
          exit={calm ? { opacity: 0 } : { opacity: 0, x: dir * -28, transition: { duration: 0.18 } }}
        >
          <CredentialBody c={site.credentials[index]} />
        </motion.article>
      </AnimatePresence>
    </motion.div>
  );
}

function CredentialBody({ c }: { c: Credential }) {
  return (
    <>
      <div className={styles.lead}>
        <h2 id="sheet-title" className={`display ${styles.title}`}>
          {c.name}
        </h2>
        <p className={styles.meta}>
          <span className="label">{c.issuer}</span>
          <span className="label">{c.date}</span>
        </p>
      </div>
      <div className={styles.content}>
        {c.image ? (
          <figure className={styles.cert}>
            <img src={c.image} alt={`${c.name} certificate issued by ${c.issuer}`} />
          </figure>
        ) : (
          <p className={styles.lede}>Issued by {c.issuer}, {c.date}.</p>
        )}
        {c.verifyUrl && (
          <div className={styles.actions}>
            <a className={styles.action} href={c.verifyUrl} target="_blank" rel="noreferrer">
              <BadgeCheck size={16} aria-hidden="true" /> Verify credential <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </>
  );
}
