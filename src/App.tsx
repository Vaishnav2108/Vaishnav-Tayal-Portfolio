import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { profile } from './data/content';
import { copyText } from './contact';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HowIWork } from './components/HowIWork';
import { Skills } from './components/Skills';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ContactDialog } from './components/ContactDialog';
import { useToast } from './components/Toast';

// Three.js is ~460 kB — load it after the page text so the site appears instantly.
const OrbBackground = lazy(() => import('./components/OrbBackground').then((m) => ({ default: m.OrbBackground })));

export default function App() {
  const [formOpen, setFormOpen] = useState(false);
  const toast = useToast();
  const openForm = useCallback(() => setFormOpen(true), []);

  const copyEmail = useCallback(async () => {
    toast((await copyText(profile.email)) ? 'Email copied' : `Couldn’t copy — it’s ${profile.email}`);
  }, [toast]);

  // soft blue spotlight that follows the cursor inside any card
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.('.card') as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <Suspense fallback={null}><OrbBackground /></Suspense>
      <Header onHire={openForm} />
      <main className="wrap">
        <Hero onHire={openForm} />
        <About />
        <HowIWork />
        <Skills />
        <Journey />
        <Projects />
        <Contact onOpenForm={openForm} onCopyEmail={copyEmail} />
      </main>
      <ContactDialog open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
