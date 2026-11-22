import { FormEvent, useEffect, useRef, useState } from 'react';
import { ContactMessage, sendMessage } from '../contact';
import { Check, Close } from './Icons';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
const empty: ContactMessage = { name: '', email: '', company: '', role: '', message: '' };

function validate(m: ContactMessage): Errors {
  const e: Errors = {};
  if (!m.name.trim()) e.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) e.email = m.email.trim() ? 'Enter a valid email, like name@company.com.' : 'Enter your email so I can reply.';
  if (m.message.trim().length < 10) e.message = 'Add a short message — at least a sentence.';
  return e;
}

export function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState<ContactMessage>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | { text: string }>(null);

  // sync React state → native <dialog> (gives us focus trapping, Esc and the backdrop for free)
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setDone(null); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  const set = (k: keyof ContactMessage) => (e: { target: { value: string } }) => {
    const next = { ...form, [k]: e.target.value };
    setForm(next);
    if (triedSubmit) setErrors(validate(next));     // live re-validate after the first attempt
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTriedSubmit(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      ref.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setSending(true);
    const msg = { ...form, name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
    const result = await sendMessage(msg);
    setSending(false);
    setDone({
      text: result === 'sent'
        ? `Thanks, ${msg.name.split(' ')[0]} — I’ll reply to ${msg.email} soon.`
        : 'Your email app should open with your message filled in — just press send there.',
    });
    setForm(empty); setErrors({}); setTriedSubmit(false);
  };

  const field = (k: 'name' | 'email', label: string, type = 'text', autoComplete?: string) => (
    <div className={`field${errors[k] ? ' bad' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input id={`f-${k}`} type={type} autoComplete={autoComplete} maxLength={120} value={form[k]} onChange={set(k)}
        aria-invalid={Boolean(errors[k])} aria-describedby={`e-${k}`} />
      <span className="err" id={`e-${k}`}>{errors[k]}</span>
    </div>
  );

  return (
    <dialog ref={ref} aria-labelledby="c-title" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <div className="dlg">
        <div className="dlg-head">
          <div><h3 id="c-title">Let’s build something</h3><p>Tell me what’s on your mind. I usually reply within a day.</p></div>
          <button className="close" type="button" aria-label="Close" onClick={onClose}><Close width={18} height={18} /></button>
        </div>

        {done ? (
          <div className="sent show">
            <div className="check"><Check /></div>
            <h3 style={{ fontSize: 30 }}>Message sent</h3>
            <p className="muted">{done.text}</p>
            <button className="btn" type="button" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit}>
            <div className="fgrid">
              {field('name', 'Your name', 'text', 'name')}
              {field('email', 'Your email', 'email', 'email')}
              <div className="field"><label htmlFor="f-company">Company <small>(optional)</small></label>
                <input id="f-company" autoComplete="organization" maxLength={80} value={form.company} onChange={set('company')} /></div>
              <div className="field"><label htmlFor="f-role">Subject <small>(optional)</small></label>
                <input id="f-role" placeholder="e.g. A backend role, an app idea" maxLength={80} value={form.role} onChange={set('role')} /></div>
              <div className={`field full${errors.message ? ' bad' : ''}`}>
                <label htmlFor="f-message">Message</label>
                <textarea id="f-message" maxLength={2000} placeholder="What are you building, and where would I fit in?" value={form.message} onChange={set('message')}
                  aria-invalid={Boolean(errors.message)} aria-describedby="e-message" />
                <span className="err" id="e-message">{errors.message}</span>
              </div>
            </div>
            <div className="form-foot" style={{ marginTop: 18 }}>
              <span className="mono">Sent straight to Vaishnav’s inbox.</span>
              <button className="btn primary" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
