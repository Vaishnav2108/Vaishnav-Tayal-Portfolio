import { whatIDo } from '../data/content';
import { StageIcon } from './Icons';

export function About() {
  return (
    <section id="about">
      <div className="sec-head">
        <h2>What I do</h2>
      </div>
      <div className="bento">
        {whatIDo.map((w) => (
          <article key={w.title} className="card s4 what">
            <span className="what-ico" aria-hidden="true"><StageIcon name={w.icon} /></span>
            <h3>{w.title}</h3>
            <p>{w.plain}</p>
            <p className="mono what-tech">{w.tech}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
