import { useEffect, useState } from 'react';

/** Returns the id of the section currently in the middle band of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id)?.closest('section'))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.querySelector('h2')?.id ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}
