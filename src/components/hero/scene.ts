import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// The hero scene: a faceted glass "sensor core" surrounded by drifting particles.
// Holding down pulls the particles into the core and shifts them from amber (radon
// present) to green (filtered). Loaded on demand so three.js never blocks first paint.

type Options = {
  reducedMotion: boolean;
  onPurify?: (value: number) => void;
};

export type SceneHandle = {
  setHold: (holding: boolean) => void;
  dispose: () => void;
};

const WARN = new THREE.Color("#ffb547");
const SIGNAL = new THREE.Color("#c5f25c");

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPurify;
  uniform float uPixelRatio;
  attribute float aPhase;
  attribute float aWeight;
  attribute float aSize;
  varying float vMix;
  varying float vFade;

  void main() {
    vec3 p = position;
    // idle drift
    p.x += sin(uTime * 0.35 + aPhase) * 0.25;
    p.y += cos(uTime * 0.28 + aPhase * 1.3) * 0.3;
    p.z += sin(uTime * 0.22 + aPhase * 0.7) * 0.25;

    // staggered pull toward the core surface
    float pull = smoothstep(aWeight * 0.6, aWeight * 0.6 + 0.4, uPurify);
    vec3 target = normalize(position) * (1.05 + aWeight * 0.35);
    float a = uTime * 1.6 + aPhase;
    target.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * target.xz;
    p = mix(p, target, pull);

    vMix = pull;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = smoothstep(-16.0, -4.0, mv.z);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z) * (1.0 - pull * 0.45);
  }
`;

const particleFragment = /* glsl */ `
  uniform vec3 uWarn;
  uniform vec3 uSignal;
  varying float vMix;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uWarn, uSignal, vMix);
    gl_FragColor = vec4(color, alpha * vFade * 0.9);
  }
`;

export function createScene(container: HTMLElement, { reducedMotion, onPurify }: Options): SceneHandle {
  const isSmall = window.matchMedia("(max-width: 720px)").matches;
  const renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: true, powerPreference: "high-performance" });
  const pixelRatio = Math.min(window.devicePixelRatio, isSmall ? 1.5 : 1.75);
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const rig = new THREE.Group();
  scene.add(rig);

  // Glass core
  const coreGeo = new THREE.IcosahedronGeometry(1.35, 0);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.08,
    transmission: 1,
    thickness: 1.4,
    ior: 1.45,
    iridescence: 0.6,
    iridescenceIOR: 1.3,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.2,
    transparent: true,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  rig.add(core);

  // Glowing nucleus seen through the glass
  const nucleusMat = new THREE.MeshBasicMaterial({ color: WARN.clone() });
  const nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 2), nucleusMat);
  rig.add(nucleus);

  // Wire shell
  const shellGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.95, 1));
  const shellMat = new THREE.LineBasicMaterial({ color: 0xecebe4, transparent: true, opacity: 0.14 });
  const shell = new THREE.LineSegments(shellGeo, shellMat);
  rig.add(shell);

  // Orbit rings
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xecebe4, transparent: true, opacity: 0.22 });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.006, 8, 160), ringMat);
  ringA.rotation.set(Math.PI / 2.4, 0.2, 0);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.006, 8, 160), ringMat);
  ringB.rotation.set(Math.PI / 1.8, -0.5, 0.3);
  rig.add(ringA, ringB);

  // Particles
  const count = isSmall ? 900 : 1800;
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const weights = new Float32Array(count);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 2.4 + Math.pow(Math.random(), 0.7) * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.4;
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.8;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    phases[i] = Math.random() * Math.PI * 2;
    weights[i] = Math.random();
    sizes[i] = 6 + Math.random() * 14;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  particleGeo.setAttribute("aWeight", new THREE.BufferAttribute(weights, 1));
  particleGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  const particleMat = new THREE.ShaderMaterial({
    vertexShader: particleVertex,
    fragmentShader: particleFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPurify: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uWarn: { value: WARN },
      uSignal: { value: SIGNAL },
    },
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Interaction state
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let holdTarget = 0;
  let purify = 0;
  let lastReported = -1;

  const onPointerMove = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the core comfortably framed on narrow screens
    camera.position.z = w < 720 ? 13 : 10;
    // sit the core right of centre on wide screens, above the copy on narrow ones
    rig.position.x = w >= 880 ? 1.6 : 0;
    rig.position.y = w >= 880 ? 0.35 : 1.1;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // Only render while the hero is on screen and the tab is visible
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  });
  io.observe(container);
  const onVisibility = () => {
    if (!document.hidden) start();
  };
  document.addEventListener("visibilitychange", onVisibility);

  const clock = new THREE.Clock();
  let raf = 0;
  let running = false;
  let time = 0;

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!reducedMotion) time += dt;

    purify += (holdTarget - purify) * Math.min(1, dt * (holdTarget > purify ? 1.4 : 2.2));
    if (Math.abs(purify - lastReported) > 0.004) {
      lastReported = purify;
      onPurify?.(purify);
    }

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;

    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);

    rig.rotation.y = time * 0.15 + pointer.x * 0.5;
    rig.rotation.x = pointer.y * 0.3;
    core.rotation.set(time * 0.12, time * 0.18 + purify * 1.5, 0);
    shell.rotation.y = -time * 0.08;
    ringA.rotation.z = time * 0.2;
    ringB.rotation.z = -time * 0.14;
    const s = 1 + purify * 0.08;
    core.scale.setScalar(s);
    nucleus.scale.setScalar(1 + purify * 0.5 + Math.sin(time * 2) * 0.04);
    nucleusMat.color.copy(WARN).lerp(SIGNAL, purify);
    shellMat.opacity = 0.14 + purify * 0.18;

    particles.rotation.y = time * 0.03 + pointer.x * 0.15;
    particles.position.x = rig.position.x * 0.6;
    particles.position.y = rig.position.y * 0.6;
    particleMat.uniforms.uTime.value = time;
    particleMat.uniforms.uPurify.value = purify;

    camera.position.y = -scroll * 1.5;
    camera.lookAt(0, -scroll * 1.5, 0);

    renderer.render(scene, camera);

    const settled = Math.abs(holdTarget - purify) < 0.002;
    if (!visible || document.hidden || (reducedMotion && settled)) {
      running = false;
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    clock.getDelta();
    raf = requestAnimationFrame(frame);
  }
  start();

  return {
    setHold(holding) {
      holdTarget = holding ? 1 : 0;
      start();
    },
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
