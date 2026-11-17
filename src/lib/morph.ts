// Generates closed cubic-bezier paths that ALL share the same point count (24),
// so GSAP MorphSVG can interpolate any shape into any other without melted frames.
interface ShapeOpts {
  cx: number;
  cy: number;
  a: number;
  b: number;
  e?: number; // superellipse exponent: 2 = ellipse, 4-6 = squircle/rect, 1 = diamond
  amp?: number; // organic wobble amplitude
  k?: number; // wobble lobes
  phase?: number;
  pts?: number;
}

export function superPath({
  cx,
  cy,
  a,
  b,
  e = 2,
  amp = 0,
  k = 3,
  phase = 0,
  pts = 24,
}: ShapeOpts): string {
  const P: [number, number][] = [];
  for (let i = 0; i < pts; i++) {
    const t = (i / pts) * Math.PI * 2;
    const c = Math.abs(Math.cos(t));
    const s = Math.abs(Math.sin(t));
    const base = Math.pow(Math.pow(c / a, e) + Math.pow(s / b, e), -1 / e);
    const wob =
      1 +
      amp * Math.sin(k * t + phase) +
      amp * 0.5 * Math.sin((k + 2) * t + phase * 1.7);
    const r = base * wob;
    P.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]);
  }
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(P[0][0])} ${f(P[0][1])}`;
  for (let i = 0; i < pts; i++) {
    const p0 = P[(i - 1 + pts) % pts];
    const p1 = P[i];
    const p2 = P[(i + 1) % pts];
    const p3 = P[(i + 2) % pts];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + 'Z';
}

