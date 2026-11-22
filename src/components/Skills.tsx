import { languages, qualities, toolbox } from '../data/content';

export function Skills() {
  return (
    <section id="skills">
      <div className="bento">
        <div className="card s7">
          <div className="label mono"><span>toolbox</span></div>
          <h2 style={{ marginBottom: 24 }}>What I work with</h2>
          <div className="langs">
            <div className="tool-head"><b>Languages</b><span className="muted">honestly rated</span></div>
            {languages.map((l) => (
              <div key={l.level} className="lang-row">
                <div className="lang-level"><span className={`meter m-${l.level.toLowerCase()}`} aria-hidden="true"><i /><i /><i /></span><b>{l.level}</b><span className="muted">{l.note}</span></div>
                <div className="tags">{l.items.map((i) => <span key={i}>{i}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="toolbox">
            {toolbox.map((g) => (
              <div key={g.group} className="tool-group">
                <div className="tool-head"><b>{g.group}</b><span className="muted">{g.plain}</span></div>
                <div className="tags">{g.items.map((i) => <span key={i}>{i}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card s5 why">
          <div className="label mono"><span>in short</span></div>
          <h2 style={{ marginBottom: 24 }}>Why work with me</h2>
          <ul className="why-list">
            {qualities.map((q) => (
              <li key={q.title}><b>{q.title}</b><p>{q.proof}</p></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
