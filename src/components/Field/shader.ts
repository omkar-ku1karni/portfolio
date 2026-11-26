export const VERT = /* glsl */ `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/**
 * Two or three broad silk ribbons: each is a band envelope filled with fine strands,
 * a brighter core, and a scatter of particles; hue runs lilac into ember along it.
 * The left of the screen stays near-void so type sits on quiet ground.
 */
export const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseOn;
uniform float uScroll;
uniform vec3 uAccent;
uniform float uFocus;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // The cursor bends the ribbons near it.
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  float dm = length(p - m);
  p.y += (p.y - m.y) * 0.25 * exp(-dm * dm * 10.0) * uMouseOn;

  float t = uTime * 0.12;
  p.y += uScroll * 0.45;

  // Muted versions of the palette's lilac and ember: rich, not neon
  vec3 lilac = vec3(0.40, 0.41, 0.82);
  vec3 ember = vec3(0.86, 0.42, 0.30);
  vec3 col = vec3(0.043, 0.051, 0.102);

  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float x = p.x;
    float centre = -0.32 + fi * 0.26 + 0.42 * x
      + 0.16 * sin(x * (1.6 + fi * 0.35) + t * (0.7 + fi * 0.15) + fi * 2.1)
      + 0.14 * (fbm(vec2(x * 1.1 + fi * 3.7, t * 0.4)) - 0.5);
    float d = p.y - centre;
    float w = 0.085 + 0.04 * sin(x * 1.9 + fi * 1.3 + t * 0.6);
    float env = exp(-(d * d) / (w * w));
    float strands = pow(1.0 - abs(sin((d / w) * 7.0 + fbm(vec2(x * 2.4, fi + t * 0.3)) * 3.0)), 5.0);
    float core = exp(-(d * d) / (w * w * 0.06));
    float grain = step(0.965, hash(floor(gl_FragCoord.xy) + fi * 17.0)) * env;

    float along = smoothstep(-0.2, 0.95, x + 0.25 * fi - 0.1);
    vec3 hue = mix(lilac, ember, along);
    hue = mix(hue, uAccent, uFocus * 0.7);
    float strength = (0.4 + 0.18 * fi) * (0.9 + 0.45 * uFocus);
    col += hue * strength * (env * strands * 0.42 + core * 0.55 + grain * 0.55 + env * 0.06);
  }

  // Quiet behind the type on the left; calmer further down the page.
  // Narrow screens put text over the ribbons, so the field steps back there (uRes is half-res).
  float narrow = mix(0.55, 1.0, smoothstep(260.0, 520.0, uRes.x));
  float mask = smoothstep(0.38, 0.72, uv.x) * narrow;
  float calm = 1.0 - 0.6 * clamp(uScroll, 0.0, 1.0);
  vec3 base = vec3(0.043, 0.051, 0.102);
  col = base + (col - base) * mask * calm;

  col += (hash(gl_FragCoord.xy + fract(uTime) * 91.7) - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`;
