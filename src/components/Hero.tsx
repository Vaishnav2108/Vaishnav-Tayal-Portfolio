import { profile, stats } from '../data/content';
import { CountUp } from './CountUp';
import { Download } from './Icons';

export function Hero({ onHire }: { onHire: () => void }) {
  return (
    <div className="bento hero" id="home">
      <div className="card intro">
        <div className="hero-grid">
        <div className="hero-copy">
          <div className="status mono"><span className="dot" aria-hidden="true" />{profile.role} · {profile.location}</div>
          <p className="hello">Hi, I’m {profile.firstName}.</p>
          <h1>
            <span className="ln"><span>I build backends</span></span>
            <span className="ln"><span>and the apps on top.</span></span>
          </h1>
          <p className="lede" style={{ marginTop: 26 }}>
            I’m a <b>backend and mobile app developer</b>. I build the systems behind the screen in <b>.NET</b> and <b>SQL Server</b>, and the apps people use every day in <b>.NET MAUI</b> and <b>Flutter</b>.
          </p>
          <div className="ctas">
            <button className="btn primary" type="button" onClick={onHire}>Get in touch</button>
            <a className="btn" href={profile.resume} download><Download />Download résumé</a>
            <a className="btn ghost" href="#work">See how I work</a>
          </div>
        </div>
        <figure className="portrait">
          <img src={profile.photo} alt={`Portrait of ${profile.name}`} width={560} height={560} />
          <figcaption><b>{profile.name}</b><span>{profile.role}</span></figcaption>
        </figure>
        </div>
      </div>

      {stats.map((s) => (
        <div key={s.label} className={`card s3 m6 stat${s.highlight ? ' blue' : ''}`}>
          <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
