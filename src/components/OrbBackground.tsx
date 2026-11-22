import { useEffect, useRef, useState } from 'react';
import { createOrbScene } from '../three/createOrbScene';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Fixed, low-opacity WebGL canvas behind the whole page. Hides itself if WebGL isn't available. */
export function OrbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    try {
      return createOrbScene(canvasRef.current, reduced);
    } catch {
      setFailed(true);
    }
  }, [reduced]);

  if (failed) return null;
  return <canvas id="scene" ref={canvasRef} aria-hidden="true" />;
}
