import * as THREE from 'three';
import { fragmentShader, vertexShader } from './shaders';

/**
 * Builds the background scene and returns a small controller.
 * Kept framework-free on purpose: React only mounts and disposes it.
 */
export function createOrbScene(canvas: HTMLCanvasElement, reducedMotion: boolean) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));   // cap cost on high-DPI phones

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  // the orb: a dense sphere + custom shaders
  const uniforms = { uTime: { value: 0 }, uAmp: { value: 0.32 } };
  const orbGeo = new THREE.IcosahedronGeometry(1.45, 48);
  const orbMat = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
  const holder = new THREE.Group();
  holder.add(new THREE.Mesh(orbGeo, orbMat));
  scene.add(holder);

  // the orbiting particle ring
  const ringCount = 900;
  const ringPositions = new Float32Array(ringCount * 3);
  const seeds = Array.from({ length: ringCount }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: 2.25 + (Math.random() - 0.5) * 0.55 + Math.pow(Math.random(), 3) * 0.6,
    height: (Math.random() - 0.5) * 0.08,
    speed: 0.05 + Math.random() * 0.12,
  }));
  const ringGeo = new THREE.BufferGeometry();
  ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
  const ringMat = new THREE.PointsMaterial({ color: 0x8fb6ff, size: 0.022, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
  const tilt = new THREE.Group();
  tilt.add(new THREE.Points(ringGeo, ringMat));
  tilt.rotation.set(1.15, 0, -0.35);
  scene.add(tilt);

  const updateRing = (t: number) => {
    seeds.forEach((s, i) => {
      const a = s.angle + t * s.speed;
      ringPositions[i * 3] = Math.cos(a) * s.radius;
      ringPositions[i * 3 + 1] = Math.sin(a) * s.radius;
      ringPositions[i * 3 + 2] = s.height;
    });
    ringGeo.attributes.position.needsUpdate = true;
  };

  // layout: orb to the right on desktop, centred on phones
  let baseX = 0, baseY = 0;
  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const wide = w > 900;
    camera.position.z = wide ? 7.2 : 9.5;
    baseX = wide ? 2.1 : 0;
    baseY = wide ? -0.1 : 0.6;
    camera.updateProjectionMatrix();
  };

  // input: drift toward the cursor, spin a little on scroll
  let tx = 0, ty = 0, mx = 0, my = 0, rotY = 0, scrollVel = 0, lastScroll = window.scrollY;
  const onPointer = (e: PointerEvent) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; };
  const onScroll = () => { const y = window.scrollY; scrollVel += (y - lastScroll) * 0.0006; lastScroll = y; };

  const place = (t: number) => {
    holder.position.set(baseX + mx * 0.35, baseY - my * 0.25 + Math.sin(t * 0.8) * 0.06, 0);
    tilt.position.copy(holder.position);
  };

  // render loop
  const clock = new THREE.Clock();
  let frameId = 0;
  const frame = () => {
    if (document.hidden) { frameId = 0; return; }        // pause in background tabs
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    scrollVel *= 0.92;
    rotY += 0.003 + scrollVel;
    holder.rotation.set(0.2 + my * 0.4, rotY + mx * 0.5, 0);
    tilt.rotation.z = -0.35 + Math.sin(t * 0.3) * 0.05;
    place(t);
    updateRing(t);
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(frame);
  };
  const resume = () => { if (!frameId && !reducedMotion) frameId = requestAnimationFrame(frame); };

  resize();
  window.addEventListener('resize', resize);
  if (reducedMotion) {
    uniforms.uTime.value = 2;          // one still frame
    place(0); updateRing(0);
    renderer.render(scene, camera);
  } else {
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', resume);
    resume();
  }

  // cleanup — called when the React component unmounts
  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('visibilitychange', resume);
    orbGeo.dispose(); orbMat.dispose(); ringGeo.dispose(); ringMat.dispose();
    renderer.dispose();
  };
}
