import { journey } from '../data/content';

export function Journey() {
  return (
    <section id="journey">
      <div className="sec-head">
        <h2>My journey so far</h2>
        <span className="mono">2021 → today</span>
      </div>
      <div className="card journey">
        <ol className="tl">
          {journey.map((j, i) => (
            <li key={i} className={`tl-item${j.current ? ' current' : ''}`}>
              <div className="tl-when">{j.when}</div>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-body">
                <span className="tl-tag mono">{j.tag}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
