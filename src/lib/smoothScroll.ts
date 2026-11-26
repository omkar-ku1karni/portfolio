import Lenis from 'lenis';

/**
 * Inertial page scroll (Lenis). One instance for the page; skipped entirely
 * under reduced motion or still mode, where native scrolling is used.
 */
let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -72 } });
  const raf = (t: number) => {
    lenis?.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

/** Pause page scrolling while a sheet is open, resume after. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
