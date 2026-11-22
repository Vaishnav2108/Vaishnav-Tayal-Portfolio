import { PointerEvent, useRef, useState } from 'react';
import { navItems } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Menu } from './Icons';

const sectionIds = navItems.map((n) => n.id);

export function Header({ onHire }: { onHire: () => void }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const reduced = useReducedMotion();
  const hireRef = useRef<HTMLButtonElement>(null);

  // magnetic pull: move the button ~30% of the way toward the cursor
  const onMagnet = (e: PointerEvent<HTMLButtonElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !hireRef.current) return;
    const r = hireRef.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
    hireRef.current.style.transform = `translate(${x * 0.28}px, ${y * 0.38}px)`;
  };
  const resetMagnet = () => { if (hireRef.current) hireRef.current.style.transform = ''; };

  return (
    <header className="top">
      <div className="wrap">
        <div className="bar">
          <a className="brand" href="#home">vaishnav<i>.tayal</i></a>
          <nav className={`nav${open ? ' open' : ''}`} id="nav" aria-label="Primary">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'on' : undefined} onClick={() => setOpen(false)}>{n.label}</a>
            ))}
          </nav>
          <div className="bar-actions">
            <button ref={hireRef} className="pill hire" type="button" aria-label="Get in touch — open the contact form"
              onClick={onHire} onPointerMove={onMagnet} onPointerLeave={resetMagnet}>
              <span className="live" aria-hidden="true" />
              <span className="swap" aria-hidden="true"><span>Get in touch</span><span>Say hello</span></span>
            </button>
            <button className="icon-btn" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
              <Menu />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
