import { RefObject, useEffect, useState } from 'react';

/** Reports whether an element is on screen (IntersectionObserver). */
export function useInView<T extends Element>(ref: RefObject<T>, threshold = 0.4): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}
