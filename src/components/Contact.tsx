import { profile } from '../data/content';
import { Download } from './Icons';

export function Contact({ onOpenForm, onCopyEmail }: { onOpenForm: () => void; onCopyEmail: () => void }) {
  const { links, email, name, resume } = profile;
  return (
    <section id="contact">
      <div className="bento">
        <div className="card contact" style={{ gridColumn: '1 / -1' }}>
          <span className="mono">questions, ideas or opportunities?</span>
          <button type="button" className="big" onClick={onOpenForm}>Let’s talk.</button>
          <p className="muted" style={{ maxWidth: '36em', fontSize: 18 }}>
            Whether it’s about backend systems, a mobile app idea, or something you’d like to build together — send a message and I’ll reply within a day.
          </p>
          <div className="row">
            <button className="btn primary" type="button" onClick={onOpenForm}>Send a message</button>
            <a className="btn" href={resume} download><Download />Résumé</a>
            <button className="btn" type="button" onClick={onCopyEmail}>Copy email</button>
            <a className="btn" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a className="btn" href={links.medium} target="_blank" rel="noopener noreferrer">Medium ↗</a>
            <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
      </div>
      <footer>
        <span className="mono">© {new Date().getFullYear()} {name} · {email}</span>
        <button className="linkbtn" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>back to top ↑</button>
      </footer>
    </section>
  );
}
