/**
 * Liquid sculpture engine — dependency-free WebGL point cloud.
 *
 * The sculpture is a CINELANE lens: barrel rings, a 7-blade aperture, a front element
 * and viewfinder brackets. Every point carries a scatter direction; pointer motion
 * injects "energy" that dissolves the form into drifting particles, which then flow
 * back to their targets. All motion runs in the vertex shader (one draw call/frame).
 */

export type EngineOptions = {
  count: number;
  maxDpr: number;
};

export type Engine = {
  start(): void;
  stop(): void;
  destroy(): void;
};

const VERT = `
attribute vec3 aTarget;
attribute vec3 aDir;
attribute float aSeed;
attribute float aSize;
attribute float aWarm;
uniform float uTime;
uniform float uScatter;
uniform float uAspect;
uniform float uScale;
uniform float uDpr;
uniform vec2 uRot;
uniform vec2 uMouse;
uniform float uMouseOn;
varying float vAlpha;
varying float vWarm;

void main() {
  vec3 p = aTarget;
  p += aDir * 0.012 * sin(uTime * 1.3 + aSeed * 6.2831);

  float s = clamp(uScatter * 1.5 - aSeed * 0.5, 0.0, 1.0);
  s = s * s * (3.0 - 2.0 * s);
  vec3 drift = vec3(
    sin(uTime * 0.55 + aSeed * 11.0),
    cos(uTime * 0.47 + aSeed * 7.0),
    sin(uTime * 0.39 + aSeed * 5.0)
  ) * 0.35;
  vec3 scattered = aTarget + aDir * (0.9 + aSeed * 1.6) + drift;
  p = mix(p, scattered, s);

  float cy = cos(uRot.x), sy = sin(uRot.x);
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  float cx = cos(uRot.y), sx = sin(uRot.y);
  p = vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);

  float camZ = 4.4;
  float persp = 2.6 / (camZ - p.z);
  vec2 proj = p.xy * persp * uScale;

  vec2 d = vec2(proj.x / uAspect, proj.y) - uMouse;
  float fall = exp(-dot(d, d) * 18.0) * uMouseOn;
  proj += normalize(d + 1e-5) * fall * 0.16 * vec2(uAspect, 1.0);

  gl_Position = vec4(proj.x / uAspect, proj.y, 0.0, 1.0);
  gl_PointSize = aSize * uDpr * persp * (1.0 + s * 0.6);
  vAlpha = clamp(0.35 + (p.z + 1.2) * 0.32, 0.12, 1.0) * (1.0 - s * 0.35);
  vWarm = aWarm;
}
`;

const FRAG = `
precision mediump float;
varying float vAlpha;
varying float vWarm;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d);
  vec3 cream = vec3(0.941, 0.933, 0.902);
  vec3 terra = vec3(0.851, 0.467, 0.341);
  gl_FragColor = vec4(mix(cream, terra, vWarm) * a * vAlpha, a * vAlpha);
}
`;

function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Sample the lens sculpture into flat attribute arrays. */
function buildGeometry(count: number) {
  const r = rand(7);
  const target = new Float32Array(count * 3);
  const dir = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const size = new Float32Array(count);
  const warm = new Float32Array(count);
  const TAU = Math.PI * 2;
  const BLADES = 7;
  let i = 0;

  const put = (x: number, y: number, z: number, sz: number, w: number) => {
    if (i >= count) return;
    target.set([x, y, z], i * 3);
    // random unit vector, biased outward from the sculpture centre
    const th = r() * TAU;
    const ph = Math.acos(2 * r() - 1);
    const out = Math.hypot(x, y) > 0.01 ? 0.6 : 0;
    dir.set(
      [
        Math.sin(ph) * Math.cos(th) + (x / (Math.hypot(x, y) || 1)) * out,
        Math.sin(ph) * Math.sin(th) + (y / (Math.hypot(x, y) || 1)) * out,
        Math.cos(ph),
      ],
      i * 3,
    );
    seed[i] = r();
    size[i] = sz * (0.7 + r() * 0.6);
    warm[i] = w;
    i++;
  };

  const n = (share: number) => Math.floor(count * share);

  // 1. Barrel: stacked rings, outer shell
  const barrel = n(0.3);
  for (let k = 0; k < barrel; k++) {
    const a = r() * TAU;
    const z = -0.55 + Math.floor(r() * 6) * 0.2 + (r() - 0.5) * 0.02;
    const rad = 1.0 + (r() - 0.5) * 0.015 + (z > 0.4 ? -0.04 : 0);
    put(Math.cos(a) * rad, Math.sin(a) * rad, z, 3.2, z > 0.4 ? 0.85 : 0.08);
  }

  // 2. Aperture blades: curved edges converging to a heptagonal opening
  const blades = n(0.32);
  const open = 0.36;
  for (let k = 0; k < blades; k++) {
    const b = Math.floor(r() * BLADES);
    const t = r();
    const a0 = (b / BLADES) * TAU;
    const inner = a0 + Math.PI / BLADES;
    const ang = a0 + t * 1.25 + Math.sin(t * Math.PI) * 0.18;
    const rad = open + (0.92 - open) * t;
    const edge = r() < 0.7;
    const spread = edge ? 0 : r() * 0.11;
    put(Math.cos(ang - spread) * rad, Math.sin(ang - spread) * rad, 0.15 + t * 0.06, edge ? 3.4 : 2.4, edge ? 0.55 : 0.2);
    if (k % 9 === 0) put(Math.cos(inner) * open, Math.sin(inner) * open, 0.15, 3.6, 1);
  }

  // 3. Front element: sparse glass disc with a warm highlight arc
  const glass = n(0.1);
  for (let k = 0; k < glass; k++) {
    const a = r() * TAU;
    const rad = Math.sqrt(r()) * 0.34;
    const hl = a > 2.2 && a < 3.1 && rad > 0.22 ? 1 : 0.15;
    put(Math.cos(a) * rad, Math.sin(a) * rad, 0.58 + rad * -0.12, 2.6, hl);
  }

  // 4. Viewfinder brackets framing the lens
  const brackets = n(0.2);
  const W = 1.75;
  const H = 1.3;
  const L = 0.45;
  for (let k = 0; k < brackets; k++) {
    const c = Math.floor(r() * 4);
    const sx = c % 2 === 0 ? -1 : 1;
    const sy = c < 2 ? 1 : -1;
    const t = r() * L;
    const horizontal = r() < 0.5;
    const x = horizontal ? sx * (W - t) : sx * W;
    const y = horizontal ? sy * H : sy * (H - t);
    put(x + (r() - 0.5) * 0.012, y + (r() - 0.5) * 0.012, -0.1, 3.0, 0.92);
  }

  // 5. Ambient dust to fill the remaining budget
  while (i < count) {
    const a = r() * TAU;
    const rad = 1.15 + r() * 1.4;
    put(Math.cos(a) * rad, Math.sin(a) * rad * 0.7, (r() - 0.5) * 1.6, 1.6, r() < 0.15 ? 0.7 : 0);
  }

  return { target, dir, seed, size, warm };
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(sh) ?? "shader compile failed");
  }
  return sh;
}

export function createEngine(canvas: HTMLCanvasElement, opts: EngineOptions): Engine {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "low-power" });
  if (!gl) throw new Error("WebGL unavailable");

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("program link failed");
  gl.useProgram(prog);

  const geo = buildGeometry(opts.count);
  const buffers: WebGLBuffer[] = [];
  const attr = (name: string, data: Float32Array, size: number) => {
    const buf = gl.createBuffer()!;
    buffers.push(buf);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };
  attr("aTarget", geo.target, 3);
  attr("aDir", geo.dir, 3);
  attr("aSeed", geo.seed, 1);
  attr("aSize", geo.size, 1);
  attr("aWarm", geo.warm, 1);

  const u = (name: string) => gl.getUniformLocation(prog, name);
  const uTime = u("uTime");
  const uScatter = u("uScatter");
  const uAspect = u("uAspect");
  const uScale = u("uScale");
  const uDpr = u("uDpr");
  const uRot = u("uRot");
  const uMouse = u("uMouse");
  const uMouseOn = u("uMouseOn");

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  // Interaction state (eased toward targets each frame)
  let energy = 0;
  let scatter = 0;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, on: 0, ton: 0 };
  let last = { x: 0, y: 0, t: 0 };
  let raf = 0;
  let running = false;
  let dpr = 1;
  const t0 = performance.now();
  let prev = t0;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, opts.maxDpr);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const toNdc = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    };
  };
  const onMove = (e: PointerEvent) => {
    const p = toNdc(e);
    const now = performance.now();
    const dt = Math.max(16, now - last.t);
    const speed = Math.hypot(p.x - last.x, p.y - last.y) / dt;
    if (last.t) energy = Math.min(1, energy + speed * (e.pointerType === "mouse" ? 9 : 4));
    last = { x: p.x, y: p.y, t: now };
    mouse.tx = p.x;
    mouse.ty = p.y;
    mouse.ton = 1;
  };
  const onLeave = () => {
    mouse.ton = 0;
    last.t = 0;
  };
  const onDown = (e: PointerEvent) => {
    onMove(e);
    if (e.pointerType !== "mouse") energy = 1;
  };
  canvas.addEventListener("pointermove", onMove, { passive: true });
  canvas.addEventListener("pointerdown", onDown, { passive: true });
  canvas.addEventListener("pointerleave", onLeave, { passive: true });

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    const t = (now - t0) / 1000;

    energy *= Math.pow(0.18, dt); // decays → sculpture reforms
    scatter += (energy - scatter) * Math.min(1, dt * 3.2);
    mouse.x += (mouse.tx - mouse.x) * Math.min(1, dt * 8);
    mouse.y += (mouse.ty - mouse.y) * Math.min(1, dt * 8);
    mouse.on += (mouse.ton - mouse.on) * Math.min(1, dt * 4);

    const aspect = canvas.width / canvas.height;
    const scale = aspect < 1.2 ? 0.58 * Math.min(aspect, 1) + 0.02 : Math.min(0.6, 0.42 + aspect * 0.05);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, t);
    gl.uniform1f(uScatter, scatter);
    gl.uniform1f(uAspect, aspect);
    gl.uniform1f(uScale, scale);
    gl.uniform1f(uDpr, dpr);
    gl.uniform2f(uRot, Math.sin(t * 0.18) * 0.55 + mouse.x * 0.25 * mouse.on, -0.18 + mouse.y * 0.15 * mouse.on);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uMouseOn, mouse.on);
    gl.drawArrays(gl.POINTS, 0, opts.count);
  };

  const onVisibility = () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (running) {
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  return {
    start() {
      if (running) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerleave", onLeave);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteProgram(prog);
    },
  };
}
