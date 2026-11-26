import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

export type Collection = 'credential';

export interface OpenSheet {
  collection: Collection;
  index: number;
  /** Where the reveal starts, in viewport pixels. */
  origin: { x: number; y: number };
}

interface SheetState {
  open: OpenSheet | null;
  openSheet: (collection: Collection, index: number, from?: HTMLElement | null) => void;
  moveTo: (index: number) => void;
  close: () => void;
}

const Ctx = createContext<SheetState | null>(null);

/** Which full-screen sheet is open, and where focus goes back to when it closes. */
export function SheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<OpenSheet | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const openSheet = useCallback((collection: Collection, index: number, from?: HTMLElement | null) => {
    trigger.current = from ?? (document.activeElement as HTMLElement | null);
    const r = from?.getBoundingClientRect();
    const origin = r
      ? { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setOpen({ collection, index, origin });
  }, []);

  const moveTo = useCallback((index: number) => setOpen((o) => (o ? { ...o, index } : o)), []);

  const close = useCallback(() => {
    setOpen(null);
    const t = trigger.current;
    if (t) requestAnimationFrame(() => t.focus({ preventScroll: true }));
  }, []);

  const value = useMemo(() => ({ open, openSheet, moveTo, close }), [open, openSheet, moveTo, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSheet() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSheet must be used inside <SheetProvider>');
  return v;
}
