/**
 * Shared, render-free state the shader reads every frame.
 * Components write to it (e.g. on hover) without triggering React renders.
 */
export const LILAC: [number, number, number] = [0.4, 0.41, 0.82];
export const EMBER: [number, number, number] = [0.86, 0.42, 0.3];

export const fieldState = {
  /** Colour the field leans toward while something is hovered. */
  accent: LILAC as [number, number, number],
  /** 0 = resting field, 1 = fully leaning toward `accent`. */
  focus: 0,
};

export function focusField(color: 'lilac' | 'ember' | null) {
  if (color === null) {
    fieldState.focus = 0;
    return;
  }
  fieldState.accent = color === 'ember' ? EMBER : LILAC;
  fieldState.focus = 1;
}
