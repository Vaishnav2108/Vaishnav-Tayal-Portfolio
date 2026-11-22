import { profile, projects, writingTopics } from '../data/content';
import { ArrowUpRight } from './Icons';

export function Projects() {
  return (
    <section id="projects">
      <div className="sec-head">
        <h2>Things I’ve built on my own</h2>
        <span className="mono">side projects</span>
      </div>
      <div className="bento">
        {projects.map((p) => (
          <a key={p.name} className="card s6 project" href={p.url} target="_blank" rel="noopener noreferrer">
            <div className="label mono"><span>{p.oneLiner}</span></div>
            <h3>{p.name}</h3>
            <dl className="pb">
              <div><dt>The problem</dt><dd>{p.problem}</dd></div>
              <div><dt>What I built</dt><dd>{p.built}</dd></div>
            </dl>
            <div className="tags">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
            <span className="go">See the code <ArrowUpRight /></span>
          </a>
        ))}

        <a className="card writing" style={{ gridColumn: '1 / -1' }} href={profile.links.medium} target="_blank" rel="noopener noreferrer">
          <div>
            <div className="label mono" style={{ marginBottom: 12 }}><span>writing · medium</span></div>
            <h3>I write about how software actually gets built</h3>
            <p className="muted" style={{ marginTop: 12, maxWidth: '38em' }}>
              Stories and articles on software engineering, backend architecture and coding — what I learn shipping real systems, written so anyone can follow along.
            </p>
            <div className="tags" style={{ marginTop: 20 }}>{writingTopics.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
          <span className="btn primary read-btn">Read my stories <ArrowUpRight /></span>
        </a>
      </div>
    </section>
  );
}
