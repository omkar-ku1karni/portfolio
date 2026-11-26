import { useEffect, useRef } from 'react';
import { useCalm } from '../../lib/motion';
import { fieldState } from './fieldState';
import { FRAG, VERT } from './shader';
import styles from './ShaderField.module.css';

/** Renders at a fraction of screen resolution; the field is soft by nature. */
const SCALE = 0.5;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
  return s;
}

/**
 * The living ground of the page: one full-screen fragment shader behind everything.
 * Falls back to a static CSS field when WebGL is unavailable; freezes under reduced motion.
 */
export function ShaderField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const calm = useCalm();

  useEffect(() => {
    const el = canvas.current;
    const gl = el?.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!el || !gl) {
      el?.setAttribute('data-fallback', '');
      return;
    }

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      gl.useProgram(prog);
    } catch {
      el.setAttribute('data-fallback', '');
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes'), uTime = u('uTime'), uMouse = u('uMouse'), uMouseOn = u('uMouseOn');
    const uScroll = u('uScroll'), uAccent = u('uAccent'), uFocus = u('uFocus');

    const resize = () => {
      const w = Math.max(1, Math.round(window.innerWidth * SCALE));
      const h = Math.max(1, Math.round(window.innerHeight * SCALE));
      el.width = w;
      el.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    // Smoothed inputs so every change eases rather than jumps.
    const mouse = { x: el.width * 0.7, y: el.height * 0.5, tx: el.width * 0.7, ty: el.height * 0.5, on: 0, ton: 0 };
    const acc = { r: fieldState.accent[0], g: fieldState.accent[1], b: fieldState.accent[2], f: 0 };
    let scroll = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mouse.tx = e.clientX * SCALE;
      mouse.ty = (window.innerHeight - e.clientY) * SCALE;
      mouse.ton = 1;
    };
    const onLeave = () => (mouse.ton = 0);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const k = 0.06;
      mouse.x += (mouse.tx - mouse.x) * k;
      mouse.y += (mouse.ty - mouse.y) * k;
      mouse.on += (mouse.ton - mouse.on) * 0.04;
      acc.r += (fieldState.accent[0] - acc.r) * 0.05;
      acc.g += (fieldState.accent[1] - acc.g) * 0.05;
      acc.b += (fieldState.accent[2] - acc.b) * 0.05;
      acc.f += (fieldState.focus - acc.f) * 0.05;
      const target = window.scrollY / Math.max(1, window.innerHeight * 3);
      scroll += (target - scroll) * 0.08;

      gl.uniform1f(uTime, calm ? 40 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseOn, calm ? 0 : mouse.on);
      gl.uniform1f(uScroll, scroll);
      gl.uniform3f(uAccent, acc.r, acc.g, acc.b);
      gl.uniform1f(uFocus, acc.f);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!calm) raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !calm) raf = requestAnimationFrame(frame);
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (calm) {
      // One settled frame, then redraw only when scrolled or resized.
      const still = () => requestAnimationFrame(frame);
      still();
      window.addEventListener('scroll', still, { passive: true });
      window.addEventListener('resize', still);
      return () => {
        window.removeEventListener('scroll', still);
        window.removeEventListener('resize', still);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [calm]);

  return <canvas ref={canvas} className={styles.field} aria-hidden="true" />;
}
