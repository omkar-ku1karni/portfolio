import type { ReactNode } from 'react';
import type { ProjectPreviewKind } from '../../content/types';
import styles from './ProjectPreview.module.css';

/**
 * Card previews: a compact architecture diagram per project, drawn in the site's own
 * language. Lines carry a flowing dash that runs faster while the card is hovered.
 * Every label here comes from that project's README / project page.
 */

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  tone?: 'accent' | 'good' | 'bad' | 'muted';
}

function Node({ x, y, w, h = 34, title, sub, tone }: NodeProps) {
  return (
    <g className={styles.node} data-tone={tone}>
      <rect x={x} y={y} width={w} height={h} rx={4} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 3.5} textAnchor="middle" className={styles.title}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 9} textAnchor="middle" className={styles.sub}>
          {sub}
        </text>
      )}
    </g>
  );
}

const Edge = ({ d, accent }: { d: string; accent?: boolean }) => (
  <path d={d} className={styles.edge} data-accent={accent || undefined} markerEnd={accent ? 'url(#pv-head-acc)' : 'url(#pv-head)'} />
);

const Label = ({ x, y, children, anchor = 'start' }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end' }) => (
  <text x={x} y={y} textAnchor={anchor} className={styles.label}>
    {children}
  </text>
);

/** Experiment Decision Engine: integrity first, then inference, then a fixed decision order. */
function Pipeline() {
  return (
    <>
      <Label x={14} y={22}>Pipeline</Label>
      <Node x={14} y={32} w={78} title="Archive" sub="32,487 tests" />
      <Node x={110} y={32} w={78} title="Integrity" sub="SRM · dupes" />
      <Node x={206} y={32} w={84} title="Inference" sub="sequential" />
      <Node x={308} y={32} w={78} title="Decision" sub="reason codes" tone="accent" />
      <Edge d="M92,49 H108" />
      <Edge d="M188,49 H204" />
      <Edge d="M290,49 H306" />
      <Edge d="M347,66 V84 H52 V104" />
      <Edge d="M146,84 V104" />
      <Edge d="M240,84 V104" accent />
      <Edge d="M334,84 V104" />
      <Node x={14} y={106} w={78} h={30} title="Blocked" tone="bad" />
      <Node x={108} y={106} w={78} h={30} title="No ship" tone="bad" />
      <Node x={202} y={106} w={78} h={30} title="Ship" tone="good" />
      <Node x={296} y={106} w={90} h={30} title="Inconclusive" tone="muted" />
      <Label x={14} y={160}>Decision policy · first match wins</Label>
      <Label x={14} y={176}>Integrity before statistics, harm before any win</Label>
    </>
  );
}

/** ReelRank: retrieve, rank, rerank. */
function Funnel() {
  const stages = [
    { w: 372, label: 'Catalog', note: '10,728 videos' },
    { w: 318, label: 'Retrieve', note: 'two-tower + ALS → ~260' },
    { w: 264, label: 'Rank', note: 'LightGBM · 40 features' },
    { w: 210, label: 'Rerank', note: 'MMR → diverse top 20' },
  ];
  return (
    <>
      {stages.map((s, i) => {
        const y = 14 + i * 38;
        const x = 200 - s.w / 2;
        return (
          <g key={s.label} className={styles.node} data-tone={i === 3 ? 'accent' : undefined}>
            <rect x={x} y={y} width={s.w} height={28} rx={4} />
            <text x={x + 12} y={y + 18} className={styles.title}>
              {s.label}
            </text>
            <text x={x + s.w - 12} y={y + 18} textAnchor="end" className={styles.sub}>
              {s.note}
            </text>
            {i < 3 && <Edge d={`M200,${y + 28} V${y + 37}`} accent={i === 2} />}
          </g>
        );
      })}
      <Label x={200} y={180} anchor="middle">
        p95 5.9 ms for the full funnel
      </Label>
    </>
  );
}

/** Fieldnote: one encoder per modality, fused by rank, answered from pixels. */
function Fusion() {
  return (
    <>
      <Node x={14} y={16} w={96} title="Manuals" sub="ColSmol pages" />
      <Node x={14} y={70} w={96} title="Job photos" sub="SigLIP2" />
      <Node x={14} y={124} w={96} title="Support calls" sub="Whisper · bge" />
      <Edge d="M110,33 C140,33 140,87 158,87" />
      <Edge d="M110,87 H158" />
      <Edge d="M110,141 C140,141 140,87 158,87" />
      <Node x={160} y={70} w={86} title="RRF fusion" sub="two-level" />
      <Edge d="M246,87 H262" accent />
      <Node x={264} y={70} w={122} title="Vision LLM" sub="answers from pixels" tone="accent" />
      <Edge d="M325,104 V122" accent />
      <Node x={264} y={124} w={122} title="Cited answer" sub="crop · clip · photo" tone="good" />
      <Label x={14} y={182}>Every claim links to evidence a technician can check</Label>
    </>
  );
}

/** Casefile: a pure-code supervisor, three specialists, two locks on money. */
function Agents() {
  return (
    <>
      <Node x={14} y={62} w={92} h={44} title="Supervisor" sub="pure-code router" tone="accent" />
      <Node x={140} y={12} w={96} h={30} title="Extractor" />
      <Node x={140} y={54} w={96} h={30} title="Investigator" />
      <Node x={140} y={96} w={96} h={30} title="Recommend" />
      <Node x={140} y={138} w={96} h={30} title="Reviewer" />
      <Edge d="M106,74 L138,30" />
      <Edge d="M106,80 L138,69" />
      <Edge d="M106,88 L138,108" />
      <Edge d="M106,96 L138,150" />
      <Edge d="M236,153 H252 V84 H264" accent />
      <Node x={266} y={66} w={120} h={36} title="Human gate" sub="adjuster approves" tone="good" />
      <Edge d="M326,102 V120" accent />
      <Node x={266} y={122} w={120} h={30} title="Write-back" sub="DB trigger" />
      <Label x={266} y={182}>No approval, no payout</Label>
    </>
  );
}

const DIAGRAMS: Record<ProjectPreviewKind, () => ReactNode> = {
  pipeline: Pipeline,
  funnel: Funnel,
  fusion: Fusion,
  agents: Agents,
};

export function ProjectPreview({ kind, title, className }: { kind: ProjectPreviewKind; title: string; className?: string }) {
  const Diagram = DIAGRAMS[kind];
  return (
    <svg className={`${styles.preview} ${className ?? ''}`} viewBox="0 0 400 192" role="img" aria-label={`${title} architecture diagram`}>
      <defs>
        <marker id="pv-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className={styles.head} />
        </marker>
        <marker id="pv-head-acc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className={styles.headAcc} />
        </marker>
      </defs>
      <Diagram />
    </svg>
  );
}
