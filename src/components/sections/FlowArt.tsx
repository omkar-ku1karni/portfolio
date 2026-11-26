import { useMemo } from 'react';

/** Deterministic pseudo-random numbers from a string seed. */
function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * A field of flowing lines unique to each project (seeded by its title),
 * the card-sized echo of the page's shader. Drawn in the card's accent colour.
 */
export function FlowArt({ seed, className }: { seed: string; className?: string }) {
  const paths = useMemo(() => {
    const r = rng(seed);
    const W = 400, H = 160, N = 26;
    const f1 = 1.2 + r() * 1.6, f2 = 2.4 + r() * 2.2, amp = 18 + r() * 26, tilt = (r() - 0.5) * 60, ph = r() * 6.28;
    return Array.from({ length: N }, (_, i) => {
      const k = i / (N - 1);
      const pts: string[] = [];
      for (let x = -20; x <= W + 20; x += 10) {
        const u = x / W;
        const y =
          H * 0.5 +
          tilt * (u - 0.5) +
          Math.sin(u * Math.PI * f1 + ph + k * 1.4) * amp * (0.6 + k) +
          Math.sin(u * Math.PI * f2 - ph * 0.7 + k * 3) * amp * 0.35 +
          (k - 0.5) * 46;
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return { d: `M${pts.join(' L')}`, o: 0.18 + 0.7 * Math.sin(k * Math.PI) ** 2 };
    });
  }, [seed]);

  return (
    <svg className={className} viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="var(--accent)" strokeWidth="0.8" vectorEffect="non-scaling-stroke">
        {paths.map((p, i) => (
          <path key={i} d={p.d} strokeOpacity={p.o} />
        ))}
      </g>
    </svg>
  );
}
