import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useCalm } from '../../lib/motion';
import styles from './Snake.module.css';

/**
 * The molten line: a straight vertical trunk down the left margin, starting at the name, with
 * straight horizontal branches into every element marked `data-snake`, in document order.
 * Its head rides a little below the middle of the screen, so scrolling down draws it further
 * and fires each branch as it passes; scrolling up draws it back and the branches clear.
 *
 * Marking an element (no other wiring needed):
 *   data-snake="top" | "middle" | "bottom"   where on the element its branch lands
 *   data-snake-x="flush"                     land exactly on the element's left edge
 *                                            (default: 10px short of it)
 * Elements whose left edge sits past the middle of the page are skipped, so a branch never
 * has to cross the left column to reach them.
 */

interface Pt {
  x: number;
  y: number;
}
interface Geometry {
  w: number;
  h: number;
  d: string;
  stops: Pt[];
}

const HEAD_AT = 0.62; // the head rides at 62% of the viewport height

/** An element's box in document coordinates from offset layout, ignoring CSS transforms. */
function layoutBox(el: HTMLElement) {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { left, top, width: el.offsetWidth, height: el.offsetHeight };
}

function measure(): Geometry | null {
  const doc = document.documentElement;
  const sx = window.scrollX;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-snake]'));
  if (els.length < 2) return null;

  const stops: Pt[] = [];
  for (const el of els) {
    // Layout position, not on-screen position: entrance animations translate elements while they
    // play, and the line must land where they come to rest.
    const r = layoutBox(el);
    if (r.width === 0 && r.height === 0) continue;
    if (r.left - sx > window.innerWidth * 0.45) continue;
    const x = r.left - (el.dataset.snakeX === 'flush' ? 0 : 10);
    const mode = el.dataset.snake;
    const y = r.top + (mode === 'bottom' ? r.height : mode === 'middle' ? r.height / 2 : 0);
    stops.push({ x, y });
  }
  if (stops.length < 2) return null;
  stops.sort((a, b) => a.y - b.y);

  // The trunk runs just left of the leftmost element, inside the page gutter.
  const minX = Math.min(...stops.map((p) => p.x));
  const trunk = Math.max(6, minX - 18);

  // Start on the name, step out to the trunk, then for every stop: down the trunk,
  // out along a straight branch to the element, and back to the trunk.
  const f = (n: number) => n.toFixed(1);
  const [first, ...rest] = stops;
  let d = `M${f(first.x)},${f(first.y)} L${f(trunk)},${f(first.y)}`;
  rest.forEach((p, i) => {
    d += ` L${f(trunk)},${f(p.y)}`;
    if (p.x - trunk > 1) {
      d += ` L${f(p.x)},${f(p.y)}`;
      if (i < rest.length - 1) d += ` L${f(trunk)},${f(p.y)}`;
    }
  });

  return { w: doc.scrollWidth, h: doc.scrollHeight, d, stops };
}

export function Snake() {
  const calm = useCalm();
  const [geo, setGeo] = useState<Geometry | null>(null);
  const line = useRef<SVGPathElement>(null);
  const glow = useRef<SVGPathElement>(null);
  const head = useRef<SVGGElement>(null);
  const nodes = useRef<(SVGCircleElement | null)[]>([]);
  const samples = useRef<{ len: number; y: number }[]>([]);
  const total = useRef(0);
  const { scrollY } = useScroll();

  // Re-measure whenever layout can change.
  useEffect(() => {
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setGeo(measure()));
    };
    run();
    const late = window.setTimeout(run, 1600); // after the hero's entrance settles
    document.fonts?.ready.then(run);
    const ro = new ResizeObserver(run);
    ro.observe(document.body);
    window.addEventListener('resize', run);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
      ro.disconnect();
      window.removeEventListener('resize', run);
    };
  }, []);

  const update = useCallback(
    (sy: number) => {
      const path = line.current;
      if (!path || !geo || total.current === 0) return;
      const target = calm ? Infinity : sy + window.innerHeight * HEAD_AT;
      // Binary search the sampled path for the length where it reaches `target`.
      const s = samples.current;
      let lo = 0;
      let hi = s.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (s[mid].y < target) lo = mid + 1;
        else hi = mid;
      }
      const len = target >= s[s.length - 1].y ? total.current : s[lo].len;
      const offset = String(total.current - len);
      path.style.strokeDashoffset = offset;
      if (glow.current) glow.current.style.strokeDashoffset = offset;
      const p = path.getPointAtLength(len);
      if (head.current) {
        head.current.setAttribute('transform', `translate(${p.x},${p.y})`);
        head.current.style.opacity = len > 1 && len < total.current - 1 ? '1' : '0';
      }
      geo.stops.forEach((stop, i) => {
        const n = nodes.current[i];
        if (n) n.toggleAttribute('data-lit', stop.y <= p.y + 2);
      });
    },
    [geo, calm],
  );

  // After each new geometry: measure the path once and sample it.
  useLayoutEffect(() => {
    const path = line.current;
    if (!path || !geo) return;
    const L = path.getTotalLength();
    total.current = L;
    const out: { len: number; y: number }[] = [];
    let maxY = -Infinity;
    for (let len = 0; len <= L; len += 6) {
      maxY = Math.max(maxY, path.getPointAtLength(len).y);
      out.push({ len, y: maxY });
    }
    out.push({ len: L, y: Math.max(maxY, path.getPointAtLength(L).y) });
    samples.current = out;
    for (const el of [path, glow.current]) {
      if (!el) continue;
      el.style.strokeDasharray = `${L} ${L}`;
    }
    update(window.scrollY);
  }, [geo, update]);

  useMotionValueEvent(scrollY, 'change', update);

  if (!geo) return null;
  return (
    <svg className={styles.snake} width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      <defs>
        <linearGradient id="snake-heat" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1600" spreadMethod="reflect">
          <stop offset="0" stopColor="#9496e0" />
          <stop offset="0.45" stopColor="#6f71d6" />
          <stop offset="0.8" stopColor="#d47e64" />
          <stop offset="1" stopColor="#e0a993" />
        </linearGradient>
      </defs>
      <path ref={glow} d={geo.d} className={styles.glow} />
      <path ref={line} d={geo.d} className={styles.line} />
      {geo.stops.map((s, i) => (
        <circle
          key={i}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          cx={s.x}
          cy={s.y}
          r={4}
          className={styles.node}
        />
      ))}
      <g ref={head} className={styles.head}>
        <circle r={9} className={styles.headHalo} />
        <circle r={4} className={styles.headCore} />
      </g>
    </svg>
  );
}
