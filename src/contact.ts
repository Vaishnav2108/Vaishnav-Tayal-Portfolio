import { profile } from './data/content';

export type ContactMessage = { name: string; email: string; company: string; role: string; message: string };
export type SendResult = 'sent' | 'mailto';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([p, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))]);
}

async function sendViaWeb3Forms(m: ContactMessage): Promise<boolean> {
  if (!WEB3FORMS_KEY) return false;
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Portfolio: ${m.role || 'new message'}${m.company ? ' · ' + m.company : ''}`,
      from_name: 'Portfolio contact form',
      ...m,
      botcheck: '',
    }),
  });
  const data = await res.json().catch(() => ({}));
  return res.ok && Boolean((data as { success?: boolean }).success);
}

function openMailto(m: ContactMessage) {
  const body = `Hi Vaishnav,\n\n${m.message}\n\n— ${m.name}${m.role ? `\nSubject: ${m.role}` : ''}${m.company ? `\nCompany: ${m.company}` : ''}\nEmail: ${m.email}`;
  const subject = `Hello from your portfolio${m.role ? ': ' + m.role : ''}`;
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Strategy chain: Web3Forms (→ your Gmail), else open the visitor's mail app pre-filled. */
export async function sendMessage(m: ContactMessage): Promise<SendResult> {
  try {
    if (await withTimeout(sendViaWeb3Forms(m), 10_000, false)) return 'sent';
  } catch { /* fall through */ }
  openMailto(m);
  return 'mailto';
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { /* ignore */ }
    ta.remove();
    return ok;
  }
}
