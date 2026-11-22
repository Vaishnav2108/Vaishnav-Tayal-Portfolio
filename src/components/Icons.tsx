import { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

export const ArrowUpRight = (p: P) => <svg {...base} strokeWidth={2} {...p}><path d="M7 17 17 7M9 7h8v8" /></svg>;
export const Copy = (p: P) => <svg {...base} {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>;
export const Send = (p: P) => <svg {...base} {...p}><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>;
export const Menu = (p: P) => <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const Close = (p: P) => <svg {...base} strokeWidth={2} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const Download = (p: P) => <svg {...base} {...p}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>;
export const Check = (p: P) => <svg {...base} strokeWidth={2.4} {...p}><path d="m5 12 5 5L20 7" /></svg>;

export const StageIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'phone': return <svg {...base}><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>;
    case 'pulse': return <svg {...base}><path d="M4 12h4l3-8 2 16 3-8h4" /></svg>;
    case 'code': return <svg {...base}><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></svg>;
    case 'db': return <svg {...base}><ellipse cx="12" cy="5.5" rx="7" ry="2.5" /><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></svg>;
    case 'rocket': return <svg {...base}><path d="M12 3c3 2 5 5.5 5 9.5L15 15H9l-2-2.5C7 8.5 9 5 12 3z" /><circle cx="12" cy="9.5" r="1.5" /><path d="M9 15l-2 4 3-1M15 15l2 4-3-1" /></svg>;
    case 'engine': return <svg {...base}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
    case 'bolt': return <svg {...base}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>;
    case 'brain': return <svg {...base}><path d="M12 3a4 4 0 0 0-4 4v1H6a3 3 0 0 0 0 6h2v1a4 4 0 0 0 8 0v-1h2a3 3 0 0 0 0-6h-2V7a4 4 0 0 0-4-4z" /><path d="M10 11h4" /></svg>;
    case 'chart': return <svg {...base}><path d="M4 19V5M4 19h16" /><path d="m7 14 4-4 3 3 5-6" /></svg>;
    case 'spark': return <svg {...base}><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4" /><circle cx="12" cy="12" r="3.5" /></svg>;
    case 'chip': return <svg {...base}><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /></svg>;
    default: return null;
  }
};
