// Everything you'd want to edit lives here. Components only render it.
// Written for three audiences at once: family & friends, fellow engineers, and recruiters.

export const profile = {
  name: 'Vaishnav Tayal',
  firstName: 'Vaishnav',
  initials: 'VT',
  role: 'Backend & Mobile App Developer',
  photo: './vaishnav-tayal.jpg',
  email: 'vaishnav.tayal2108@gmail.com',
  location: 'Bhubaneswar, India',
  resume: './Vaishnav-Tayal-Resume.pdf',
  links: {
    linkedin: 'https://linkedin.com/in/vaishnavtayal',
    github: 'https://github.com/Vaishnav2108',
    medium: 'https://medium.com/@vaishnav.tayal2108',
  },
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'How I work' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export type Stat = { end: number; decimals?: number; suffix: string; label: string; highlight?: boolean };
export const stats: Stat[] = [
  { end: 1.5, decimals: 1, suffix: '+ yrs', label: 'building software used in production', highlight: true },
  { end: 300, suffix: '+', label: 'code issues resolved to keep releases stable' },
  { end: 8.61, decimals: 2, suffix: '', label: 'CGPA, B.Tech in Information Technology' },
  { end: 1000, suffix: '+', label: 'people reached through open-source work' },
];

/* ---------- "What I do", explained for everyone ---------- */
export const whatIDo = [
  {
    icon: 'engine',
    title: 'I build the engine',
    plain: 'Every app has a part you never see — the “kitchen” behind the restaurant, where orders are taken, checked and stored. That’s where I spend most of my day.',
    tech: 'Backend services and REST APIs in C# and ASP.NET Core.',
  },
  {
    icon: 'phone',
    title: 'I build the apps',
    plain: 'The screens people tap on their phones — written once and running on Android, iPhone and Windows, even talking to physical devices over Bluetooth.',
    tech: 'Cross-platform apps in .NET MAUI and Flutter.',
  },
  {
    icon: 'bolt',
    title: 'I keep it fast and right',
    plain: 'When a business runs on software, slow screens and wrong numbers cost real money. I find out why, and fix it at the root.',
    tech: 'SQL Server design, query tuning and production debugging.',
  },
];

/* ---------- How I work: the same story, two depths ---------- */
export type Mode = 'simple' | 'tech';
export type Stage = {
  name: string;
  icon: string;
  simple: { title: string; text: string };
  tech: { title: string; text: string; tags: string[] };
  wins: { simple: string; tech: string }[];
};

export const stages: Stage[] = [
  {
    name: 'The app', icon: 'phone',
    simple: { title: 'Apps that work even without internet', text: 'People in the field don’t always have signal. I build apps that keep working offline and quietly catch up once they’re connected again.' },
    tech: { title: 'Offline-first, cross-platform mobile', text: '.NET MAUI and Flutter with MVVM, local SQLite storage, background sync and Bluetooth Low Energy device integration.', tags: ['.NET MAUI', 'Flutter', 'MVVM', 'SQLite', 'Bluetooth LE'] },
    wins: [
      { simple: 'Kept an app smooth while it loaded thousands of records in one go.', tech: 'Batched SQLite transactions off the UI thread for bulk first-sync imports.' },
      { simple: 'Made app screens and a 3D view talk to each other cleanly.', tech: 'Typed message bridge between C# and TypeScript via HybridWebView.' },
    ],
  },
  {
    name: 'The connection', icon: 'pulse',
    simple: { title: 'Secure, predictable connections', text: 'When the app asks the server for something, it should be safe, and if something goes wrong, the app should know exactly what and why.' },
    tech: { title: 'APIs with clear contracts', text: 'ASP.NET Core REST APIs with OAuth2 / OIDC, request validation and a consistent response envelope across every endpoint.', tags: ['ASP.NET Core', 'REST', 'OAuth2 + PKCE', 'OIDC', 'Validation'] },
    wins: [
      { simple: 'Set up safe sign-in for a mobile app, keeping private data encrypted on the phone.', tech: 'OAuth2 with PKCE and OpenID Connect, with an encrypted on-device cache.' },
      { simple: 'Rolled out user permissions to many organisations at once without breaking anything.', tech: 'Idempotent, re-runnable seed scripts for multi-tenant RBAC.' },
    ],
  },
  {
    name: 'The rules', icon: 'code',
    simple: { title: 'Business rules that are easy to change', text: 'Businesses change their minds. I keep the rules in one clear place so a change next month takes hours, not weeks.' },
    tech: { title: 'Layered, testable C#', text: 'Controller → Business → Repository layering, constructor injection and Unit of Work, so logic stays isolated and testable.', tags: ['C#', '.NET', 'Dependency injection', 'Unit of Work', 'Unit testing'] },
    wins: [
      { simple: 'Untangled code that was hard to test into pieces that can be checked one by one.', tech: 'Replaced service-locator lookups with constructor injection.' },
      { simple: 'Made a large production job split into batches without ever losing count.', tech: 'Deterministic batch splitting with counters inside a single transaction.' },
    ],
  },
  {
    name: 'The data', icon: 'db',
    simple: { title: 'Numbers you can trust', text: 'Reports drive decisions. I make sure the numbers are right and the screens load fast, even as the data grows.' },
    tech: { title: 'SQL Server that stays fast and correct', text: 'Schema design, stored procedures and performance tuning in SQL Server with Dapper and EF Core.', tags: ['SQL Server', 'T-SQL', 'Stored procedures', 'Dapper', 'EF Core'] },
    wins: [
      { simple: 'Found why reports were showing inflated totals — and fixed it at the source.', tech: 'Diagnosed join fan-out; pre-aggregated before joining.' },
      { simple: 'Cut thousands of back-and-forth trips to the database down to one.', tech: 'Table-valued parameters with set-based procedures.' },
    ],
  },
  {
    name: 'The release', icon: 'rocket',
    simple: { title: 'Shipped, and looked after', text: 'Building it is half the job. I work with product, testing and hardware teams to release on time — and keep the code healthy afterwards.' },
    tech: { title: 'Delivery and code health', text: 'Agile delivery, code review, static analysis with SonarQube, and App Store / Play Store releases.', tags: ['Git', 'SonarQube', 'Code review', 'Agile', 'Store releases'] },
    wins: [
      { simple: 'Fixed 300+ bugs and code issues, making every later release safer.', tech: '200+ SonarQube code smells and 100+ production defects resolved.' },
      { simple: 'Made money show the Indian way — 10,00,000 instead of 1,000,000.', tech: 'Culture-aware en-IN formatting in RDLC reports.' },
    ],
  },
];

/* ---------- Journey ---------- */
export const journey = [
  { when: '2021', title: 'Started engineering', text: 'Began a B.Tech in Information Technology at OUTR, Bhubaneswar.', tag: 'Education' },
  { when: '2023', title: 'First real-world design work', text: 'UI/UX intern at Vinirman Constructions, designing a construction-management platform.', tag: 'Internship' },
  { when: '2023', title: 'Leading on campus', text: 'Android & Flutter lead at Google Developer Student Clubs and convenor of Zairza, the university’s tech club — teaching and mentoring juniors.', tag: 'Leadership' },
  { when: '2023', title: 'Hackathons and awards', text: 'Cleared the university round of Smart India Hackathon and won 2nd prize at SensorSync.', tag: 'Achievement' },
  { when: '2024', title: 'Building for artisans', text: 'App developer intern at Sabyasha Retail Tech — a Flutter app helping artisans sell online through ONDC.', tag: 'Internship' },
  { when: '2024', title: 'Open source', text: 'Contributed to GirlScript Summer of Code, shipping improvements used by 1,000+ people.', tag: 'Community' },
  { when: '2025', title: 'Backend & mobile developer', text: 'Joined Evolutionary Algorithms as a Software Engineer, building backend systems and mobile apps used in production.', tag: 'Career', current: true },
  { when: '2025', title: 'Graduated', text: 'Finished my B.Tech with a CGPA of 8.61 / 10.', tag: 'Education' },
  { when: 'Now', title: 'Writing and exploring AI', text: 'Writing about software on Medium, and learning how to build AI into real products.', tag: 'Today' },
];

/* ---------- Why work with me (evidence, not adjectives) ---------- */
export const qualities = [
  { title: 'I ship', proof: 'Production software since 2025, released on schedule with product, QA and hardware teams.' },
  { title: 'I care about quality', proof: '300+ bugs and code issues fixed — I leave code better than I found it.' },
  { title: 'I explain things clearly', proof: 'I write on Medium, and ran technical sessions and mentored juniors at GDSC and Zairza.' },
  { title: 'I learn fast', proof: 'Deep in C# and SQL, and comfortable picking up what a problem needs — Dart for mobile, TypeScript for web, C++ for hardware.' },
];

/* ---------- Languages, by how well I know them ---------- */
export const languages = [
  { level: 'Daily', note: 'what I write every day', items: ['C#', 'SQL (T-SQL)'] },
  { level: 'Comfortable', note: 'used in real projects', items: ['Dart', 'TypeScript', 'Python'] },
  { level: 'Familiar', note: 'worked with, not my focus', items: ['C++', 'Java'] },
];

/* ---------- Toolbox ---------- */
export const toolbox = [
  { group: 'Backend', plain: 'The engine', items: ['.NET', 'ASP.NET Core', 'REST APIs', 'Node.js', 'OAuth2 / OIDC'] },
  { group: 'Data', plain: 'Where things are stored', items: ['SQL Server', 'Dapper', 'EF Core', 'SQLite', 'Firebase'] },
  { group: 'Mobile', plain: 'The apps', items: ['.NET MAUI', 'Flutter', 'MVVM', 'Bluetooth LE'] },
  { group: 'AI & data', plain: 'What I’m growing into', items: ['LLM APIs', 'Prompt design', 'Python for data', 'AI-assisted dev'] },
  { group: 'Ways of working', plain: 'How I ship', items: ['Git', 'Code review', 'SonarQube', 'Agile / Scrum', 'Figma'] },
];

/* ---------- Projects ---------- */
export const projects = [
  {
    name: 'Mr. Chemist',
    oneLiner: 'Medicine without the queue',
    problem: 'Long waits at pharmacy counters, even for routine prescriptions.',
    built: 'An ATM-style medicine dispenser paired with a phone app — scan a QR code and the machine hands you your medicine.',
    stack: ['Flutter', 'ESP32', 'Node.js', 'Maps API'],
    url: 'https://github.com/Vaishnav2108',
  },
  {
    name: 'IDentiverse',
    oneLiner: 'One ID for the internet',
    problem: 'Proving who you are online means uploading the same documents again and again.',
    built: 'A blockchain-based identity where your verified documents live once, and a single universal ID works across services.',
    stack: ['Solidity', 'Hedera', 'Flutter'],
    url: 'https://github.com/Vaishnav2108',
  },
];

export const writingTopics = ['Software engineering', 'Backend architecture', '.NET', 'Coding'];
