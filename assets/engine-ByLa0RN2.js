const N=`
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
`,U=`
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
`;function k(e){let o=e>>>0;return()=>(o=o*1664525+1013904223>>>0,o/4294967296)}function j(e){const o=k(7),t=new Float32Array(e*3),l=new Float32Array(e*3),y=new Float32Array(e),L=new Float32Array(e),A=new Float32Array(e),f=Math.PI*2,P=7;let d=0;const g=(r,n,i,u,m)=>{if(d>=e)return;t.set([r,n,i],d*3);const p=o()*f,h=Math.acos(2*o()-1),M=Math.hypot(r,n)>.01?.6:0;l.set([Math.sin(h)*Math.cos(p)+r/(Math.hypot(r,n)||1)*M,Math.sin(h)*Math.sin(p)+n/(Math.hypot(r,n)||1)*M,Math.cos(h)],d*3),y[d]=o(),L[d]=u*(.7+o()*.6),A[d]=m,d++},b=r=>Math.floor(e*r),z=b(.3);for(let r=0;r<z;r++){const n=o()*f,i=-.55+Math.floor(o()*6)*.2+(o()-.5)*.02,u=1+(o()-.5)*.015+(i>.4?-.04:0);g(Math.cos(n)*u,Math.sin(n)*u,i,3.2,i>.4?.85:.08)}const D=b(.32),E=.36;for(let r=0;r<D;r++){const n=Math.floor(o()*P),i=o(),u=n/P*f,m=u+Math.PI/P,p=u+i*1.25+Math.sin(i*Math.PI)*.18,h=E+(.92-E)*i,M=o()<.7,R=M?0:o()*.11;g(Math.cos(p-R)*h,Math.sin(p-R)*h,.15+i*.06,M?3.4:2.4,M?.55:.2),r%9===0&&g(Math.cos(m)*E,Math.sin(m)*E,.15,3.6,1)}const _=b(.1);for(let r=0;r<_;r++){const n=o()*f,i=Math.sqrt(o())*.34,u=n>2.2&&n<3.1&&i>.22?1:.15;g(Math.cos(n)*i,Math.sin(n)*i,.58+i*-.12,2.6,u)}const S=b(.2),T=1.75,a=1.3,x=.45;for(let r=0;r<S;r++){const n=Math.floor(o()*4),i=n%2===0?-1:1,u=n<2?1:-1,m=o()*x,p=o()<.5,h=p?i*(T-m):i*T,M=p?u*a:u*(a-m);g(h+(o()-.5)*.012,M+(o()-.5)*.012,-.1,3,.92)}for(;d<e;){const r=o()*f,n=1.15+o()*1.4;g(Math.cos(r)*n,Math.sin(r)*n*.7,(o()-.5)*1.6,1.6,o()<.15?.7:0)}return{target:t,dir:l,seed:y,size:L,warm:A}}function C(e,o,t){const l=e.createShader(o);if(e.shaderSource(l,t),e.compileShader(l),!e.getShaderParameter(l,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(l)??"shader compile failed");return l}function H(e,o){const t=e.getContext("webgl",{antialias:!1,alpha:!0,premultipliedAlpha:!0,powerPreference:"low-power"});if(!t)throw new Error("WebGL unavailable");const l=t.createProgram();if(t.attachShader(l,C(t,t.VERTEX_SHADER,N)),t.attachShader(l,C(t,t.FRAGMENT_SHADER,U)),t.linkProgram(l),!t.getProgramParameter(l,t.LINK_STATUS))throw new Error("program link failed");t.useProgram(l);const y=j(o.count),L=[],A=(c,s,w)=>{const v=t.createBuffer();L.push(v),t.bindBuffer(t.ARRAY_BUFFER,v),t.bufferData(t.ARRAY_BUFFER,s,t.STATIC_DRAW);const F=t.getAttribLocation(l,c);t.enableVertexAttribArray(F),t.vertexAttribPointer(F,w,t.FLOAT,!1,0,0)};A("aTarget",y.target,3),A("aDir",y.dir,3),A("aSeed",y.seed,1),A("aSize",y.size,1),A("aWarm",y.warm,1);const f=c=>t.getUniformLocation(l,c),P=f("uTime"),d=f("uScatter"),g=f("uAspect"),b=f("uScale"),z=f("uDpr"),D=f("uRot"),E=f("uMouse"),_=f("uMouseOn");t.disable(t.DEPTH_TEST),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.clearColor(0,0,0,0);let S=0,T=0;const a={x:0,y:0,tx:0,ty:0,on:0,ton:0};let x={x:0,y:0,t:0},r=0,n=!1,i=1;const u=performance.now();let m=u;const p=()=>{i=Math.min(window.devicePixelRatio||1,o.maxDpr);const c=Math.max(1,Math.round(e.clientWidth*i)),s=Math.max(1,Math.round(e.clientHeight*i));(e.width!==c||e.height!==s)&&(e.width=c,e.height=s,t.viewport(0,0,c,s))},h=new ResizeObserver(p);h.observe(e),p();const M=c=>{const s=e.getBoundingClientRect();return{x:(c.clientX-s.left)/s.width*2-1,y:-((c.clientY-s.top)/s.height*2-1)}},R=c=>{const s=M(c),w=performance.now(),v=Math.max(16,w-x.t),F=Math.hypot(s.x-x.x,s.y-x.y)/v;x.t&&(S=Math.min(1,S+F*(c.pointerType==="mouse"?9:4))),x={x:s.x,y:s.y,t:w},a.tx=s.x,a.ty=s.y,a.ton=1},W=()=>{a.ton=0,x.t=0},B=c=>{R(c),c.pointerType!=="mouse"&&(S=1)};e.addEventListener("pointermove",R,{passive:!0}),e.addEventListener("pointerdown",B,{passive:!0}),e.addEventListener("pointerleave",W,{passive:!0});const O=c=>{r=requestAnimationFrame(O);const s=Math.min(.05,(c-m)/1e3);m=c;const w=(c-u)/1e3;S*=Math.pow(.18,s),T+=(S-T)*Math.min(1,s*3.2),a.x+=(a.tx-a.x)*Math.min(1,s*8),a.y+=(a.ty-a.y)*Math.min(1,s*8),a.on+=(a.ton-a.on)*Math.min(1,s*4);const v=e.width/e.height,F=v<1.2?.58*Math.min(v,1)+.02:Math.min(.6,.42+v*.05);t.clear(t.COLOR_BUFFER_BIT),t.uniform1f(P,w),t.uniform1f(d,T),t.uniform1f(g,v),t.uniform1f(b,F),t.uniform1f(z,i),t.uniform2f(D,Math.sin(w*.18)*.55+a.x*.25*a.on,-.18+a.y*.15*a.on),t.uniform2f(E,a.x,a.y),t.uniform1f(_,a.on),t.drawArrays(t.POINTS,0,o.count)},I=()=>{document.hidden?cancelAnimationFrame(r):n&&(m=performance.now(),r=requestAnimationFrame(O))};return document.addEventListener("visibilitychange",I),{start(){n||(n=!0,m=performance.now(),r=requestAnimationFrame(O))},stop(){n=!1,cancelAnimationFrame(r)},destroy(){n=!1,cancelAnimationFrame(r),h.disconnect(),document.removeEventListener("visibilitychange",I),e.removeEventListener("pointermove",R),e.removeEventListener("pointerdown",B),e.removeEventListener("pointerleave",W),L.forEach(c=>t.deleteBuffer(c)),t.deleteProgram(l)}}}export{H as createEngine};
