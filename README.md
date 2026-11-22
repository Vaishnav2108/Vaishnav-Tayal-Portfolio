# vaishnav.tayal — portfolio (React)

Personal portfolio of **Vaishnav Tayal**, Software Engineer — backend (.NET, SQL Server) and cross-platform mobile (.NET MAUI, Flutter).

Built with **React 18 + TypeScript + Vite**, with a **Three.js** liquid-chrome orb in the background.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Project structure

```
public/Vaishnav-Tayal-Resume.pdf   ← replace this file to update the downloadable résumé
src/
├── data/content.ts      ← ALL text, links, journey, skills, projects. Edit this, not the components.
├── components/
│   ├── Header.tsx       nav, active-section highlight, magnetic "Hire me" button
│   ├── Hero.tsx         intro, Hire me / résumé buttons, animated stats
│   ├── About.tsx        "What I do, in plain words" — written for non-engineers
│   ├── HowIWork.tsx     the system step by step, with an Everyone / Engineers detail toggle
│   ├── Skills.tsx       toolbox + "Why work with me" (for recruiters)
│   ├── Journey.tsx      timeline from 2021 to today
│   ├── Projects.tsx     side projects (problem → what I built) + Medium
│   ├── Contact.tsx      contact section and footer
│   ├── ContactDialog.tsx, OrbBackground.tsx, CountUp.tsx, Icons.tsx, Toast.tsx
├── three/               3D orb scene + GPU shaders (framework-free)
├── hooks/               useInView, useActiveSection, useReducedMotion
├── contact.ts           send strategy: Web3Forms → mailto fallback, with timeout
├── styles.css           design tokens (:root) + all styles
├── App.tsx, main.tsx
```

## Contact form → your Gmail (free)

1. Get a free access key at https://web3forms.com using `vaishnav.tayal2108@gmail.com`.
2. Locally: copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=...`
3. On GitHub: repo → Settings → Secrets and variables → Actions → New secret `VITE_WEB3FORMS_KEY`.

Without a key the form still works: it opens the visitor's email app with the message pre-filled.

## Deploy to GitHub Pages (free, automatic)

1. Push this project to a GitHub repo (e.g. `portfolio`) on the `main` branch.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Every push to `main` now builds and deploys via `.github/workflows/deploy.yml`.
   Live at `https://vaishnav2108.github.io/portfolio/`.

Cloudflare Pages / Netlify / Vercel also work: build command `npm run build`, output directory `dist`, and add `VITE_WEB3FORMS_KEY` as an environment variable.

## Custom domain

Add the domain in Settings → Pages → Custom domain, create the DNS records GitHub shows, then enable **Enforce HTTPS**.

## Accessibility & performance

- Respects `prefers-reduced-motion` (no auto-cycling, still 3D frame, no counters).
- Keyboard: arrow keys move between pipeline tabs; the dialog traps focus and closes on Esc.
- The 3D scene is lazy-loaded, pauses in background tabs, caps pixel ratio at 2×, and is skipped entirely if WebGL is unavailable.
