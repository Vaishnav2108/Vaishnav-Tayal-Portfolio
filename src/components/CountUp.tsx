import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Props = { end: number; decimals?: number; prefix?: string; suffix?: string };

/** Counts from 0 to `end` the first time it scrolls into view. */
export function CountUp({ end, decimals = 0, prefix = '', suffix = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.6);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(end);
  const played = useRef(false);

  useEffect(() => {
    if (!inView || played.current || reduced) return;
    played.current = true;
    let frame = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setValue(end * (1 - Math.pow(1 - p, 3)));      // ease-out cubic
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, end]);

  const shown = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US');
  return <b ref={ref}>{prefix}{shown}{suffix}</b>;
}
