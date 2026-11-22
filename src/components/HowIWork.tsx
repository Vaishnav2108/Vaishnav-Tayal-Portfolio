import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Mode, stages } from '../data/content';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { StageIcon } from './Icons';

/** One story told at two depths: "Everyone" for family and recruiters, "Engineers" for peers. */
export function HowIWork() {
  const [mode, setMode] = useState<Mode>('simple');
  const [current, setCurrent] = useState(0);
  const [touched, setTouched] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(panelRef, 0.4);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || touched || reduced) return;
    const id = window.setInterval(() => setCurrent((c) => (c + 1) % stages.length), 4200);
    return () => window.clearInterval(id);
  }, [inView, touched, reduced]);

  const select = (i: number) => { setTouched(true); setCurrent(i); };
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (current + d + stages.length) % stages.length;
    select(n);
    tabRefs.current[n]?.focus();
  };

  const st = stages[current];
  const copy = st[mode];

  return (
    <section id="work">
      <div className="sec-head">
        <div>
          <h2>How I work</h2>
          <p className="muted sec-sub">Follow one tap on a phone all the way through the system — and what I do at each step.</p>
        </div>
        <div className="depth-wrap">
          <span className="depth-label" id="depth-label">Explain it for</span>
          <div className={`depth-switch ${mode}`} role="group" aria-labelledby="depth-label">
            <span className="depth-thumb" aria-hidden="true" />
            <button type="button" aria-pressed={mode === 'simple'} onClick={() => setMode('simple')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2" /><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.2c2.6-.3 4.6 1.3 5 4.3" /></svg>
              Everyone
            </button>
            <button type="button" aria-pressed={mode === 'tech'} onClick={() => setMode('tech')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg>
              Engineers
            </button>
          </div>
        </div>
      </div>

      <div className="card pipe">
        <div className="pipe-track" role="tablist" aria-label="Steps of the system">
          <span className="rail" aria-hidden="true"><span className="packet" /></span>
          {stages.map((s, i) => (
            <button key={s.name} ref={(el) => (tabRefs.current[i] = el)} className="stage" role="tab" type="button"
              id={`t-${i}`} aria-controls="stage-panel" aria-selected={i === current} tabIndex={i === current ? 0 : -1}
              onClick={() => select(i)} onKeyDown={onKey}>
              <span className="node" aria-hidden="true"><StageIcon name={s.icon} /></span>
              <span className="st-name">{s.name}</span>
              <span className="st-sub">step {i + 1}</span>
            </button>
          ))}
        </div>

        <div ref={panelRef} key={`${current}-${mode}`} className="stage-panel" id="stage-panel" role="tabpanel" aria-labelledby={`t-${current}`} aria-live="polite">
          <div>
            <div className="mono">step {current + 1} of {stages.length}</div>
            <h3>{copy.title}</h3>
            <p>{copy.text}</p>
            {mode === 'tech' && (
              <div className="tags" style={{ marginTop: 20 }}>{st.tech.tags.map((t) => <span key={t}>{t}</span>)}</div>
            )}
          </div>
          <div className="fixes">
            <div className="mono" style={{ marginBottom: 12 }}>{mode === 'simple' ? 'things I’ve done here' : 'problems I solve'}</div>
            <ol className="fix-list">
              {st.wins.map((w) => (
                <li key={w.tech} className="fix win"><div className="sol">{w[mode]}</div></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
