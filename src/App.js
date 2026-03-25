import { useEffect, useState } from 'react';
import './App.css';
import lpHero from './assets/lp-diverse/hero.jpg';
import lpWhy from './assets/lp-diverse/why.jpg';
import lpCta from './assets/lp-diverse/cta.jpg';
import lpFeatTraining from './assets/lp-diverse/training.jpg';
import lpFeatProgress from './assets/lp-diverse/progress.jpg';
import lpFeatActivities from './assets/lp-diverse/activities.jpg';
import lpFeatGuides from './assets/lp-diverse/guides.jpg';
import lpFeatMessaging from './assets/lp-diverse/messaging.jpg';
import lpFeatReports from './assets/lp-diverse/reports.jpg';
import lpRoleTeacher from './assets/lp-diverse/role-teacher.jpg';
import lpRoleParent from './assets/lp-diverse/role-parent.jpg';
import lpRoleChild from './assets/lp-diverse/role-child.jpg';
import lpRoleAdmin from './assets/lp-diverse/role-admin.jpg';
import lpDashboardStrip from './assets/lp-diverse/dashboard.jpg';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { apiFetch } from './api/client';

const Icon = ({ name, size = 20, color = 'currentColor' }) => {
  const icons = {
    home: <path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />,
    graduation: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
    chart: <><path d="M18 20V10M12 20V4M6 20v-6" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>,
    message: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    play: <><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    puzzle: <><path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" /></>,
    send: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
    arrow_left: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    smile: <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></>,
    award: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    bar_chart: <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>,
    child: <><circle cx="12" cy="6" r="3" /><path d="M9 12h6l1 8H8l1-8z" /></>,
    arrow_right: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// Landing photos: bundled JPEGs in src/assets/lp-diverse (Pexels — replace with your own)
const LP_PHOTOS = {
  hero: lpHero,
  why: lpWhy,
  cta: lpCta,
  training: lpFeatTraining,
  progress: lpFeatProgress,
  activities: lpFeatActivities,
  guides: lpFeatGuides,
  messaging: lpFeatMessaging,
  reports: lpFeatReports,
  roleTeacher: lpRoleTeacher,
  roleParent: lpRoleParent,
  roleChild: lpRoleChild,
  roleAdmin: lpRoleAdmin,
  dashboardCard: lpDashboardStrip,
};

const LI = ({ d, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const SEED_USERS = [
  { id: 1, name: 'Uwase Diane', email: 'uwase@gmail.com', password: 'pass123', role: 'teacher', status: 'Active' },
  { id: 2, name: 'Habimana Jean', email: 'habimana@gmail.com', password: 'pass123', role: 'parent', status: 'Active' },
  { id: 3, name: 'School Admin', email: 'admin@inklukids.rw', password: 'admin123', role: 'admin', status: 'Active' },
  { id: 4, name: 'Amani', email: 'amani@child.rw', password: 'child123', role: 'child', status: 'Active' },
];

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(SEED_USERS);
  const [accessToken, setAccessToken] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New training module: Sensory Strategies', time: '2 hours ago', read: false },
    { id: 2, text: 'Amani completed 3 activities this week', time: '5 hours ago', read: false },
    { id: 3, text: 'New message from Ms. Uwase', time: 'Yesterday', read: true },
    { id: 4, text: 'Parent guidelines updated', time: '2 days ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markRead = (id) => setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(p => p.map(n => ({ ...n, read: true })));

  // Try refreshing access token on boot (uses refresh cookie if present)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch('/api/auth/refresh', { method: 'POST' });
        if (cancelled) return;
        if (data?.accessToken) {
          setAccessToken(data.accessToken);
          const me = await apiFetch('/api/auth/me', { accessToken: data.accessToken });
          if (cancelled) return;
          if (me?.user?.role) {
            setUser(me.user);
            setPage(me.user.role + '-dashboard');
          }
        }
      } catch {
        // not logged in; ignore
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleAuth = (u, isNew) => {
    if (isNew) setUsers(p => [...p, u]);
    setUser(u);
    setPage(u.role + '-dashboard');
  };
  const handleLogout = async () => {
    try { await apiFetch('/api/auth/logout', { method: 'POST' }); } catch {}
    setAccessToken(null);
    setUser(null);
    setPage('home');
  };
  const notifProps = { notifications, unreadCount, markRead, markAllRead };

  if (page === 'home') return <LandingPage go={setPage} />;
  if (page === 'login') return <AuthPage mode="login" go={setPage} users={users} onAuth={handleAuth} setAccessToken={setAccessToken} />;
  if (page === 'register') return <AuthPage mode="register" go={setPage} users={users} onAuth={handleAuth} setAccessToken={setAccessToken} />;
  if (page === 'teacher-dashboard') return <TeacherDashboard user={user} onLogout={handleLogout} {...notifProps} />;
  if (page === 'parent-dashboard') return <ParentDashboard user={user} onLogout={handleLogout} {...notifProps} />;
  if (page === 'admin-dashboard') return <AdminDashboard user={user} onLogout={handleLogout} users={users} setUsers={setUsers} {...notifProps} />;
  if (page === 'child-dashboard') return <ChildDashboard user={user} onLogout={handleLogout} accessToken={accessToken} />;
  return <LandingPage go={setPage} />;
}

/* ─────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────── */
function LandingPage({ go }) {
  const features = [
    { photo: LP_PHOTOS.training, photoAlt: 'Diverse children learning together in a classroom', d: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>, title: 'Teacher Training', desc: 'Six professional development modules on autism inclusion, sensory strategies, and classroom communication.' },
    { photo: LP_PHOTOS.progress, photoAlt: 'Mixed group of students participating in a school lesson', d: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>, title: 'Child Progress', desc: "Track each child's development across communication, social skills, and learning over time." },
    { photo: LP_PHOTOS.activities, photoAlt: 'Teen students of different backgrounds studying together', d: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, title: 'Structured Activities', desc: 'Curated learning activities tailored for autistic children, designed for both school and home.' },
    { photo: LP_PHOTOS.guides, photoAlt: 'Parent reading with a child at home', d: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>, title: 'Parent Guides', desc: "Practical resources and video tutorials to help parents support their child's growth at home." },
    { photo: LP_PHOTOS.messaging, photoAlt: 'Colleagues collaborating in a meeting', d: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>, title: 'Direct Messaging', desc: 'Secure communication between teachers and parents, no third-party apps needed.' },
    { photo: LP_PHOTOS.reports, photoAlt: 'Students studying and working in a library', d: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>, title: 'School Reports', desc: 'Administrators can monitor usage, training completion, and generate school-wide reports.' },
  ];

  const roles = [
    { photo: LP_PHOTOS.roleTeacher, photoAlt: 'Teacher with a diverse group of young students', label: 'Teachers', d: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>, desc: 'Access training modules, monitor student progress, and communicate with parents.' },
    { photo: LP_PHOTOS.roleParent, photoAlt: 'Family spending time together at home', label: 'Parents', d: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>, desc: "See your child's activities and progress, and stay in touch with their teacher." },
    { photo: LP_PHOTOS.roleChild, photoAlt: 'Children painting and learning together', label: 'Children', d: <><circle cx="12" cy="6" r="3"/><path d="M9 12h6l1 8H8l1-8z"/></>, desc: 'Complete fun activities and earn points in a safe, simple learning space.' },
    { photo: LP_PHOTOS.roleAdmin, photoAlt: 'Team planning in an office', label: 'School Admins', d: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>, desc: 'Manage all accounts, view platform-wide data, and generate school reports.' },
  ];

  const heroStyle = { '--lp-hero-photo': `url(${LP_PHOTOS.hero})` };
  const whyStyle = { '--lp-why-photo': `url(${LP_PHOTOS.why})` };
  const ctaStyle = { '--lp-cta-photo': `url(${LP_PHOTOS.cta})` };

  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">InkluKids</div>
        <div className="nav-right">
          <button className="nav-signin" onClick={() => go('login')}>Sign In</button>
          <button className="nav-start" onClick={() => go('register')}>Get Started</button>
        </div>
      </nav>

      <div className="lp-hero lp-hero-creative" style={heroStyle}>
        <div className="lp-hero-text">
          <span className="lp-tag">Autism Inclusion · Rwanda</span>
          <h1>
            Tools that help<br />
            every child<br />
            <em>thrive at school.</em>
          </h1>
          <p>
            InkluKids gives Rwandan teachers structured training, parents practical guidance,
            and children a place to learn and grow, all in one platform.
          </p>
          <div className="lp-hero-btns">
            <button type="button" className="lp-btn-primary lp-btn-pill" onClick={() => go('register')}>Create Free Account</button>
            <button type="button" className="lp-btn-secondary lp-btn-pill-outline" onClick={() => go('login')}>Sign In</button>
          </div>
        </div>

        <div className="lp-hero-visual">
          <div className="lp-dashboard-preview">
            <div className="ldp-header">
              <span className="ldp-logo-sm">InkluKids</span>
              <div className="ldp-header-right">
                <div className="ldp-dot active" />
                <span className="ldp-user-name">Ms. Uwase</span>
              </div>
            </div>
            <div className="ldp-module-banner">
              <img
                className="ldp-module-banner-img"
                src={LP_PHOTOS.dashboardCard}
                alt="Diverse group of children learning together in a classroom"
                width={360}
                height={120}
                decoding="async"
              />
              <div className="ldp-module-banner-shade" />
            </div>
            <div className="ldp-body">
              <div className="ldp-label">Training progress</div>
              <div className="ldp-progress-row">
                <span>Module 3 of 6</span>
                <span className="ldp-pct">50%</span>
              </div>
              <div className="ldp-bar"><div className="ldp-bar-fill" style={{ width: '50%' }} /></div>
              <div className="ldp-divider" />
              <div className="ldp-label">Students</div>
              <div className="ldp-students">
                {[['A', 'Amani', 'ok'], ['B', 'Blaise', 'warn'], ['C', 'Clarisse', 'ok'], ['D', 'David', 'ok']].map(([initial, name, status]) => (
                  <div className="ldp-student" key={name}>
                    <div className="ldp-av">{initial}</div>
                    <span className="ldp-sname">{name}</span>
                    <span className={`ldp-status ${status}`}>{status === 'ok' ? 'On track' : 'Check in'}</span>
                  </div>
                ))}
              </div>
              <div className="ldp-divider" />
              <div className="ldp-next">Next: Visual Communication strategies</div>
              <button type="button" className="ldp-resume" onClick={() => go('login')}>Resume Module 3</button>
            </div>
          </div>
          <div className="lp-preview-shadow" />
        </div>
      </div>

      <div className="lp-numbers">
        {[['500+', 'Teachers trained'], ['1,200+', 'Children supported'], ['80+', 'Schools enrolled'], ['6', 'Training modules']].map(([n, l]) => (
          <div className="lp-num-item" key={n}>
            <div className="lp-num">{n}</div>
            <div className="lp-num-label">{l}</div>
          </div>
        ))}
      </div>

      <section className="lp-features">
        <div className="lp-section-head">
          <div className="lp-eyebrow">WHAT YOU GET</div>
          <h2>Everything in one place</h2>
          <p>A complete platform built around the needs of Rwanda&apos;s inclusive education community.</p>
        </div>
        <div className="lp-feat-grid">
          {features.map((f, i) => (
            <div className="lp-feat" key={i}>
              <div
                className="lp-feat-photo"
                style={{ backgroundImage: `url(${f.photo})` }}
                role="img"
                aria-label={f.photoAlt}
              />
              <div className="lp-feat-icon"><LI d={f.d} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="lp-why lp-why-creative" style={whyStyle}>
        <div className="lp-why-left">
          <div className="lp-eyebrow">WHY INKLUKIDS</div>
          <h2>Built for Rwanda&apos;s classrooms</h2>
          <p>Most inclusive education tools are designed for the West. InkluKids is built with Rwandan teachers, families, and schools at the centre.</p>
          <ul className="lp-why-list">
            {[
              'Training grounded in Rwandan school realities',
              'Available in English and Kinyarwanda',
              'Designed for low-bandwidth environments',
              'Backed by African Leadership University research',
              'Free to access for all teachers and parents',
            ].map((item, i) => (
              <li key={i}>
                <div className="lp-check">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lp-why-right">
          {[
            { q: 'InkluKids gave me a clear structure for teaching students with autism. The training is practical and easy to follow.', who: 'Primary school teacher', loc: 'Kigali', initial: 'U' },
            { q: 'I finally understand how to support my son at home. The activities fit perfectly into our daily routine.', who: 'Parent', loc: 'Musanze', initial: 'H' },
          ].map((t, i) => (
            <div className="lp-testimonial" key={i}>
              <span className="lp-quote-mark">&ldquo;</span>
              <p>{t.q}</p>
              <footer>
                <div className="lp-t-av">{t.initial}</div>
                <div>
                  <strong>{t.who}</strong>
                  <span>{t.loc}, Rwanda</span>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>

      <section className="lp-roles">
        <div className="lp-section-head">
          <div className="lp-eyebrow">WHO IT&apos;S FOR</div>
          <h2>One platform, four roles</h2>
          <p>Each user type gets a tailored dashboard designed for how they use the platform.</p>
        </div>
        <div className="lp-roles-grid">
          {roles.map((r, i) => (
            <div className="lp-role-card" key={i} onClick={() => go('register')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && go('register')}>
              <div
                className="lp-role-photo"
                style={{ backgroundImage: `url(${r.photo})` }}
                role="img"
                aria-label={r.photoAlt}
              />
              <div className="lp-role-icon"><LI d={r.d} size={20} /></div>
              <h3>{r.label}</h3>
              <p>{r.desc}</p>
              <button type="button" className="lp-role-btn">Get started</button>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-cta lp-cta-creative" style={ctaStyle}>
        <h2>Ready to build a more inclusive classroom?</h2>
        <p>Join hundreds of Rwandan educators and families<br/> Free to get started.</p>
        <div className="lp-cta-btns">
          <button type="button" className="lp-cta-main lp-btn-pill" onClick={() => go('register')}>Create your free account</button>
          <button type="button" className="lp-cta-ghost lp-btn-pill-outline-light" onClick={() => go('login')}>Sign In</button>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">InkluKids</div>
          <p>Supporting autism inclusion in Rwandan schools.</p>
          <p className="lp-footer-copy">© 2025 InkluKids · African Leadership University</p>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────
   AUTH PAGE
───────────────────────────────────────── */
function AuthPage({ mode, go, users, onAuth, setAccessToken }) {
  const isLogin = mode === 'login';
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'teacher' });
  const [children, setChildren] = useState([{ name: '', age: '', diagnosis: '', school: '', notes: '' }]);
  const [error, setError] = useState('');

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError(''); };
  const setChild = (i, k, v) => setChildren(p => p.map((c, idx) => idx === i ? { ...c, [k]: v } : c));
  const addChild = () => setChildren(p => [...p, { name: '', age: '', diagnosis: '', school: '', notes: '' }]);
  const removeChild = (i) => setChildren(p => p.filter((_, idx) => idx !== i));

  const normalizedEmail = (form.email || '').trim().toLowerCase();
  const normalizedPassword = (form.password || '').trim();
  const normalizedConfirm = (form.confirm || '').trim();
  const normalizedName = (form.name || '').trim();

  const handleStep1 = () => {
    if (!normalizedName || !normalizedEmail || !normalizedPassword || !normalizedConfirm) { setError('Please fill in all fields.'); return; }
    if (!normalizedEmail.includes('@') || normalizedEmail.split('@')[1]?.includes('.') !== true) { setError('Please enter a valid email.'); return; }
    if (normalizedPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (normalizedPassword !== normalizedConfirm) { setError('Passwords do not match.'); return; }
    if (users.find(u => (u.email || '').toLowerCase() === normalizedEmail)) { setError('An account with this email already exists.'); return; }
    if (form.role === 'parent') { setError(''); setStep(2); }
    else {
      apiFetch('/api/auth/register', {
        method: 'POST',
        body: { name: normalizedName, email: normalizedEmail, password: normalizedPassword, role: form.role },
      })
        .then((data) => {
          setAccessToken?.(data.accessToken);
          onAuth({ ...data.user }, true);
        })
        .catch((e) => setError(e.message || 'Registration failed'));
    }
  };
  const handleStep2 = () => {
    if (children.some(c => !c.name.trim())) { setError('Please enter a name for each child.'); return; }
    apiFetch('/api/auth/register', {
      method: 'POST',
      body: { name: normalizedName, email: normalizedEmail, password: normalizedPassword, role: form.role, children },
    })
      .then((data) => {
        setAccessToken?.(data.accessToken);
        onAuth({ ...data.user }, true);
      })
      .catch((e) => setError(e.message || 'Registration failed'));
  };
  const handleLogin = () => {
    if (!normalizedEmail || !normalizedPassword) { setError('Please fill in all fields.'); return; }
    apiFetch('/api/auth/login', {
      method: 'POST',
      body: { email: normalizedEmail, password: normalizedPassword },
    })
      .then((data) => {
        setAccessToken?.(data.accessToken);
        onAuth({ ...data.user }, false);
      })
      .catch((e) => setError(e.message || 'Incorrect email or password.'));
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <button className="auth-back" onClick={() => step === 2 ? setStep(1) : go('home')}>
          <Icon name="arrow_left" size={14} /> {step === 2 ? 'Back' : 'Back to home'}
        </button>
        <div className="auth-brand">InkluKids</div>

        {isLogin && (
          <>
            <h2>Welcome back</h2>
            <p className="auth-sub">Sign in to your account.</p>
            <div className="auth-field"><label>Email</label><input type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div className="auth-field"><label>Password</label><input type="password" placeholder="Your password" value={form.password} onChange={e => set('password', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} /></div>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-submit" onClick={handleLogin}>Sign In</button>
            <p className="auth-switch">No account? <span onClick={() => go('register')}>Create one</span></p>
            <div className="auth-demo">
              <div className="auth-demo-title">Demo accounts</div>
              <div>Teacher: uwase@gmail.com / pass123</div>
              <div>Parent: habimana@gmail.com / pass123</div>
              <div>Child: amani@child.rw / child123</div>
              <div>Admin: admin@inklukids.rw / admin123</div>
              <div style={{ marginTop: 8, lineHeight: 1.6 }}>
                Tip: you can type the email in any case (e.g. UWASE@GMAIL.COM) and it will still work.
              </div>
            </div>
          </>
        )}

        {!isLogin && step === 1 && (
          <>
            <h2>Create your account</h2>
            <p className="auth-sub">Free to join. No credit card needed.</p>
            <div className="auth-field"><label>Full Name</label><input type="text" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} /></div>
            <div className="auth-field"><label>Email</label><input type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div className="auth-field">
              <label>I am a</label>
              <div className="auth-roles">
                {[{ v: 'teacher', l: 'Teacher' }, { v: 'parent', l: 'Parent' }, { v: 'child', l: 'Child' }, { v: 'admin', l: 'Admin' }].map(r => (
                  <button key={r.v} className={`auth-role-btn ${form.role === r.v ? 'active' : ''}`} onClick={() => set('role', r.v)}>{r.l}</button>
                ))}
              </div>
            </div>
            <div className="auth-field"><label>Password</label><input type="password" placeholder="At least 6 characters" value={form.password} onChange={e => set('password', e.target.value)} /></div>
            <div className="auth-field"><label>Confirm Password</label><input type="password" placeholder="Repeat your password" value={form.confirm} onChange={e => set('confirm', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleStep1()} /></div>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-submit" onClick={handleStep1}>{form.role === 'parent' ? 'Next — Add child info' : 'Create Account'}</button>
            <p className="auth-switch">Already have an account? <span onClick={() => go('login')}>Sign in</span></p>
          </>
        )}

        {!isLogin && step === 2 && (
          <>
            <h2>About your child</h2>
            <p className="auth-sub">This helps us personalise activities for your family.</p>
            <div className="auth-steps">
              <span className="auth-step done">1. Account</span>
              <span className="auth-step-arrow">→</span>
              <span className="auth-step active">2. Child info</span>
            </div>
            {children.map((child, i) => (
              <div className="auth-child-block" key={i}>
                <div className="auth-child-header">
                  <span>Child {i + 1}</span>
                  {children.length > 1 && <button className="auth-child-remove" onClick={() => removeChild(i)}>Remove</button>}
                </div>
                <div className="auth-field-row">
                  <div className="auth-field"><label>Name *</label><input type="text" placeholder="e.g. Amani" value={child.name} onChange={e => setChild(i, 'name', e.target.value)} /></div>
                  <div className="auth-field"><label>Age</label><input type="number" placeholder="e.g. 7" min="2" max="18" value={child.age} onChange={e => setChild(i, 'age', e.target.value)} /></div>
                </div>
                <div className="auth-field"><label>School</label><input type="text" placeholder="e.g. Kigali Primary School" value={child.school} onChange={e => setChild(i, 'school', e.target.value)} /></div>
                <div className="auth-field">
                  <label>Support needs</label>
                  <div className="auth-checks">
                    {['Autism Spectrum', 'ADHD', 'Speech Delay', 'Sensory Processing', 'Other'].map(d => (
                      <label key={d} className="auth-check-label">
                        <input type="checkbox" checked={child.diagnosis?.includes(d)} onChange={e => {
                          const cur = child.diagnosis ? child.diagnosis.split(', ').filter(Boolean) : [];
                          setChild(i, 'diagnosis', (e.target.checked ? [...cur, d] : cur.filter(x => x !== d)).join(', '));
                        }} />{d}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="auth-field">
                  <label>Notes <span className="auth-optional">(optional)</span></label>
                  <textarea placeholder="e.g. prefers visual instructions, sensitive to noise…" value={child.notes} onChange={e => setChild(i, 'notes', e.target.value)} rows={3} />
                </div>
              </div>
            ))}
            <button className="auth-add-child" onClick={addChild}>+ Add another child</button>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-submit" onClick={handleStep2}>Complete Registration</button>
          </>
        )}
      </div>

      <div className="auth-right">
        <div className="auth-right-content">
          <h2 className="ar-headline">Helping every child find their place in the classroom.</h2>
          <div className="ar-stats-row">
            {[['500+', 'Teachers trained'], ['1,200+', 'Children supported'], ['80+', 'Schools']].map(([n, l]) => (
              <div key={n} className="ar-stat">
                <div className="ar-stat-n">{n}</div>
                <div className="ar-stat-l">{l}</div>
              </div>
            ))}
          </div>
          <div className="ar-divider" />
          <div className="ar-quotes">
            {[
              { q: 'InkluKids gave me a clear structure for teaching students with autism. The training is practical and easy to follow.', who: 'Teacher · Kigali' },
              { q: 'I finally understand how to support my son at home. The activities are perfect for him.', who: 'Parent · Musanze' },
            ].map((t, i) => (
              <div key={i} className="ar-quote">
                <p>"{t.q}"</p>
                <span className="ar-quote-by">— {t.who}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NOTIFICATION PANEL
───────────────────────────────────────── */
function NotifPanel({ notifications, markRead, markAllRead, onClose }) {
  return (
    <div className="notif-panel">
      <div className="notif-header">
        <span>Notifications</span>
        <button onClick={markAllRead}>Mark all read</button>
      </div>
      {notifications.map(n => (
        <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`} onClick={() => { markRead(n.id); onClose(); }}>
          <div className="notif-dot" style={{ visibility: n.read ? 'hidden' : 'visible' }} />
          <div>
            <div className="notif-text">{n.text}</div>
            <div className="notif-time">{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   DASHBOARD SHELL
───────────────────────────────────────── */
function Shell({ user, onLogout, notifications, unreadCount, markRead, markAllRead, navItems, activeTab, setActiveTab, children }) {
  const [showNotif, setShowNotif] = useState(false);
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">InkluKids</div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
              <Icon name={item.icon} size={17} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="s-av">{user?.name?.charAt(0)}</div>
            <div>
              <div className="s-name">{user?.name}</div>
              <div className="s-role">{user?.role}</div>
            </div>
          </div>
          <button className="s-logout" onClick={onLogout} title="Log out"><Icon name="logout" size={16} /></button>
        </div>
      </aside>
      <div className="main-wrap">
        <header className="topbar">
          <div className="topbar-title">{navItems.find(n => n.id === activeTab)?.label}</div>
          <div className="topbar-right">
            <div className="topbar-search">
              <input placeholder="Search modules, resources, messages..." />
            </div>
            <div className="notif-wrap">
              <button className="icon-btn" onClick={() => setShowNotif(p => !p)}>
                <Icon name="bell" size={19} />
                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
              </button>
              {showNotif && <NotifPanel notifications={notifications} markRead={markRead} markAllRead={markAllRead} onClose={() => setShowNotif(false)} />}
            </div>
            <div className="topbar-user">
              <div className="topbar-user-av">{user?.name?.charAt(0)}</div>
              <div>
                <div className="topbar-user-name">{user?.name}</div>
                <div className="topbar-user-role">{user?.role === 'admin' ? 'School Admin' : user?.role}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SHARED DASHBOARD COMPONENTS
───────────────────────────────────────── */
const StatCard = ({ label, value, icon, color }) => (
  <div className="stat-card" style={{ background: color }}>
    <div className="stat-icon"><Icon name={icon} size={19} /></div>
    <div className="stat-val">{value}</div>
    <div className="stat-lbl">{label}</div>
  </div>
);

const ProgressBar = ({ value, color = 'var(--brand)' }) => (
  <div className="pbar-track"><div className="pbar-fill" style={{ width: `${value}%`, background: color }} /></div>
);

const Badge = ({ label, type = 'blue' }) => <span className={`badge ${type}`}>{label}</span>;

/* ─────────────────────────────────────────
   TEACHER DASHBOARD
───────────────────────────────────────── */
function TeacherDashboard({ user, onLogout, ...notifProps }) {
  const [tab, setTab] = useState('home');
  const [trainingOpenTitle, setTrainingOpenTitle] = useState(null);
  const nav = [
    { id: 'home', label: 'Dashboard', icon: 'home' },
    { id: 'training', label: 'Training Modules', icon: 'graduation' },
    { id: 'students', label: 'Progress Tracking', icon: 'chart' },
    { id: 'resources', label: 'Resources', icon: 'book' },
    { id: 'messages', label: 'Messages', icon: 'message' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  return (
    <Shell user={user} onLogout={onLogout} {...notifProps} navItems={nav} activeTab={tab} setActiveTab={setTab}>
      {tab === 'home' && (
        <TeacherHome
          user={user}
          onOpenTraining={(title) => { setTrainingOpenTitle(title); setTab('training'); }}
        />
      )}
      {tab === 'training' && <TrainingTab openModuleTitle={trainingOpenTitle} onModuleOpened={() => setTrainingOpenTitle(null)} />}
      {tab === 'students' && <StudentsTab />}
      {tab === 'resources' && <ResourcesTab />}
      {tab === 'messages' && <MessagesTab />}
      {tab === 'settings' && <SettingsWorkspace user={user} />}
    </Shell>
  );
}

function TeacherHome({ user, onOpenTraining }) {
  return (
    <div className="page">
      <div className="page-head">
        <h1>Good morning, {user?.name?.split(' ')[0]}</h1>
        <p>Here is what's happening with your students today.</p>
      </div>
      <div className="stats-row">
        <StatCard label="Students" value="12" icon="users" color="var(--blue-tint)" />
        <StatCard label="Training" value="68%" icon="graduation" color="var(--green-tint)" />
        <StatCard label="Pending" value="3" icon="calendar" color="var(--amber-tint)" />
        <StatCard label="Messages" value="2" icon="message" color="var(--peach-tint)" />
      </div>
      <div className="two-col">
        <div className="card">
          <div className="card-title">Continue Training</div>
          {[{ title: 'Module 3: Visual Communication', pct: 60 }, { title: 'Module 4: Sensory Strategies', pct: 0 }].map((m, i) => (
            <div className="list-item" key={i}>
              <div className="li-body">
                <div className="li-title">{m.title}</div>
                <ProgressBar value={m.pct} />
                <div className="li-sub">{m.pct > 0 ? `${m.pct}% complete` : 'Not started'}</div>
              </div>
              <button className="btn-sm" onClick={() => onOpenTraining?.(m.title)}>{m.pct > 0 ? 'Resume' : 'Start'}</button>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Student Highlights</div>
          {[
            { name: 'Amani K.', note: 'Great week — completed 4 activities', t: 'green' },
            { name: 'Blaise M.', note: 'Needs check-in — missed 2 sessions', t: 'amber' },
            { name: 'Clarisse N.', note: 'Excellent participation today', t: 'green' },
          ].map((s, i) => (
            <div className="list-item" key={i}>
              <div className="li-av">{s.name.charAt(0)}</div>
              <div className="li-body">
                <div className="li-title">{s.name}</div>
                <div className="li-sub">{s.note}</div>
              </div>
              <Badge label={s.t === 'green' ? 'On Track' : 'Check In'} type={s.t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrainingTab({ openModuleTitle, onModuleOpened }) {
  const [filter, setFilter] = useState('All');
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setModules] = useState([
    { title: 'Understanding Autism', desc: 'Foundations of autism and inclusive education.', pct: 100, status: 'Completed', duration: '45 mins' },
    { title: 'Inclusive Classroom Setup', desc: 'Design a classroom that works for every learner.', pct: 100, status: 'Completed', duration: '40 mins' },
    { title: 'Visual Communication', desc: 'Using visual cues, schedules, and picture cards.', pct: 60, status: 'In Progress', duration: '35 mins' },
    { title: 'Sensory Strategies', desc: 'Managing sensory sensitivities in the classroom.', pct: 0, status: 'Not Started', duration: '30 mins' },
    { title: 'Behavior Support', desc: 'Positive behavior strategies for autistic children.', pct: 0, status: 'Not Started', duration: '50 mins' },
    { title: 'Parent Collaboration', desc: 'Building strong home-school connections.', pct: 0, status: 'Not Started', duration: '25 mins' },
  ]);

  const markCompleted = (title) => {
    setModules(p =>
      p.map(m => m.title === title ? { ...m, pct: 100, status: 'Completed' } : m)
    );
    setSelectedModule(null);
    setFilter('All');
  };
  const visible = filter === 'All' ? modules : modules.filter(m => m.status === filter);

  useEffect(() => {
    if (!openModuleTitle) return;
    const m = modules.find(x => x.title === openModuleTitle);
    if (m) setSelectedModule(m);
    onModuleOpened?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModuleTitle]);
  return (
    <div className="page">
      <div className="page-head"><h1>Training Modules</h1><p>Complete all 6 modules to earn your inclusive education certificate.</p></div>
      <div className="filter-row">
        {['All', 'In Progress', 'Completed'].map(tab => (
          <button
            key={tab}
            className={`filter-chip ${filter === tab ? 'active' : ''}`}
            onClick={() => { setFilter(tab); setSelectedModule(null); }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="module-grid">
        {visible.map((m, i) => (
          <div className="res-card module-card" key={i}>
            <div className="res-top"><Badge label={m.status} type={m.status === 'Completed' ? 'green' : m.status === 'In Progress' ? 'blue' : 'gray'} /><span className="res-cat">{m.duration}</span></div>
            <div className="res-title">{m.title}</div>
            <div className="res-desc">{m.desc}</div>
            <ProgressBar value={m.pct} />
            <button className="btn-sm" onClick={() => setSelectedModule(m)}>{m.pct > 0 ? 'Continue' : 'Start'}</button>
          </div>
        ))}
      </div>
      {selectedModule && (
        <div className="card" style={{ marginTop: 18 }}>
          <div className="card-title-row">
            <div className="card-title">{selectedModule.title} - Lesson Detail</div>
            <div className="card-title-actions">
              <button className="btn-sm" onClick={() => setSelectedModule(null)}>Close</button>
            </div>
          </div>
          <div className="video-placeholder">Video embed placeholder</div>
          <ol className="lesson-steps">
            <li>Watch introduction video</li>
            <li>Read key guidance points</li>
            <li>Apply one strategy in class</li>
            <li>Mark lesson step as complete</li>
          </ol>
          {selectedModule.status !== 'Completed' ? (
            <div className="lesson-actions">
              <button className="btn-complete" onClick={() => markCompleted(selectedModule.title)}>
                <span className="btn-complete-dot" aria-hidden><Icon name="check" size={12} color="#fff" /></span>
                Mark as complete
              </button>
            </div>
          ) : (
            <div className="lesson-actions">
              <span className="badge green">Completed</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StudentsTab() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const students = [
    { name: 'Amani Kagabo', age: 8, activities: 12, attendance: '90%', status: 'On Track', help: 'Taking turns during group activities' },
    { name: 'Blaise Mugisha', age: 7, activities: 7, attendance: '70%', status: 'Needs Support', help: 'Following visual schedule and staying on task' },
    { name: 'Clarisse Nziza', age: 9, activities: 15, attendance: '95%', status: 'On Track', help: 'Asking for help using words or picture cards' },
    { name: 'Dieudonne Habu', age: 8, activities: 9, attendance: '80%', status: 'On Track', help: 'Managing noise and transitions between tasks' },
  ];

  const visible = students.filter(s => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || s.name.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="page">
      <div className="page-head"><h1>Students</h1><p>Monitor each child's development and participation.</p></div>

      <div className="filter-row">
        <input
          className="filter-search"
          placeholder="Search students..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {['All', 'On Track', 'Needs Support'].map(s => (
          <button
            key={s}
            className={`filter-chip ${statusFilter === s ? 'active' : ''}`}
            onClick={() => { setStatusFilter(s); setSelectedStudent(null); }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="table-card">
        <div className="t-head"><span>Student</span><span>Age</span><span>Activities</span><span>Attendance</span><span>Status</span><span>Needs help with</span><span>Action</span></div>
        {visible.map((s, i) => (
          <div className="t-row" key={i}>
            <span className="t-name"><div className="t-av">{s.name.charAt(0)}</div>{s.name}</span>
            <span>{s.age}</span><span>{s.activities}</span><span>{s.attendance}</span>
            <span><Badge label={s.status} type={s.status === 'On Track' ? 'green' : 'amber'} /></span>
            <span className="t-muted">{s.help}</span>
            <span><button className="btn-sm" onClick={() => setSelectedStudent(s)}>View</button></span>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <div className="card" style={{ marginTop: 18 }}>
          <div className="card-title-row">
            <div className="card-title">{selectedStudent.name} — Overview</div>
            <button className="btn-sm" onClick={() => setSelectedStudent(null)}>Close</button>
          </div>
          <div className="student-detail-grid">
            <div className="student-detail-item">
              <div className="student-detail-k">Attendance</div>
              <div className="student-detail-v">{selectedStudent.attendance}</div>
            </div>
            <div className="student-detail-item">
              <div className="student-detail-k">Activities completed</div>
              <div className="student-detail-v">{selectedStudent.activities}</div>
            </div>
            <div className="student-detail-item">
              <div className="student-detail-k">Status</div>
              <div className="student-detail-v">
                <Badge label={selectedStudent.status} type={selectedStudent.status === 'On Track' ? 'green' : 'amber'} />
              </div>
            </div>
            <div className="student-detail-item student-detail-wide">
              <div className="student-detail-k">Needs help with</div>
              <div className="student-detail-v">{selectedStudent.help}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResourcesTab() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([]);
  const list = [
    { type: 'Guides', title: 'Visual Schedule Templates', cat: 'Classroom', desc: 'Printable daily schedule cards for autistic learners.' },
    { type: 'Videos', title: 'Communication Strategies', cat: 'Training', desc: 'Step-by-step video on using AAC devices in class.' },
    { type: 'Visual Aids', title: 'Sensory Checklist', cat: 'Assessment', desc: 'Identify sensory sensitivities in your students.' },
    { type: 'Lesson Plans', title: 'Inclusive Lesson Plan', cat: 'Classroom', desc: 'Lesson plan template for mixed-ability classrooms.' },
    { type: 'Videos', title: 'Positive Behavior Support', cat: 'Training', desc: 'Practical strategies for managing behavior.' },
    { type: 'Guides', title: 'Parent Communication Guide', cat: 'Communication', desc: 'Tips for effective home-school collaboration.' },
  ];
  const visible = list.filter(r => (filter === 'All' || r.type === filter) && r.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page">
      <div className="page-head"><h1>Resources</h1><p>Visual aids, lesson plans, and guides for your teaching.</p></div>
      <div className="filter-row">
        <input className="filter-search" placeholder="Search resources..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filter-row">
        {['All', 'Videos', 'Guides', 'Lesson Plans', 'Visual Aids'].map(t => (
          <button key={t} className={`filter-chip ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>
      <div className="res-grid">
        {visible.map((r, i) => (
          <div className="res-card" key={i}>
            <div className="res-top"><Badge label={r.type} type={r.type === 'Videos' ? 'blue' : r.type === 'Guides' ? 'green' : 'gray'} /><span className="res-cat">{r.cat}</span></div>
            <div className="res-title">{r.title}</div>
            <div className="res-desc">{r.desc}</div>
            <div className="res-actions">
              <button className="btn-sm" onClick={() => setSelected(r)}><Icon name={r.type === 'Videos' ? 'play' : 'download'} size={13} /> {r.type === 'Videos' ? 'View' : 'Download'}</button>
              <button className="btn-sm" onClick={() => setSaved(p => p.includes(r.title) ? p : [...p, r.title])}>
                <Icon name="star" size={13} /> {saved.includes(r.title) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="card" style={{ marginTop: 18 }}>
          <div className="card-title-row">
            <div className="card-title">{selected.title}</div>
            <div className="card-title-actions">
              <button className="btn-sm" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
          <div className="res-detail-meta">
            <Badge label={selected.type} type={selected.type === 'Videos' ? 'blue' : selected.type === 'Guides' ? 'green' : 'gray'} />
            <span className="res-cat">{selected.cat}</span>
            {saved.includes(selected.title) && <Badge label="Saved" type="green" />}
          </div>
          <p className="res-detail-desc">{selected.desc}</p>

          {selected.type === 'Videos' ? (
            <div className="video-placeholder">Video preview placeholder</div>
          ) : (
            <div className="res-download-box">
              <div className="res-download-title">Download ready</div>
              <div className="res-download-sub">This is a placeholder file in the demo.</div>
              <a
                className="btn-primary"
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${selected.title}\n\nCategory: ${selected.cat}\nType: ${selected.type}\n\n${selected.desc}\n`)}`}
                download={`${selected.title.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.txt`}
              >
                <Icon name="download" size={16} /> Download
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MessagesTab() {
  const [msg, setMsg] = useState('');
  const [activeConversation, setActiveConversation] = useState('Parent (Amani)');
  const [threads, setThreads] = useState({
    'Parent (Amani)': [
      { from: 'Teacher', text: 'Amani had a great session — engaged well with the visual schedule.', time: '9:15 AM', mine: false },
      { from: 'You', text: 'Thank you! Could you share what visuals you used?', time: '6:30 PM', mine: true },
      { from: 'Teacher', text: "Of course! I'll send over the picture cards. He loved the colour-coded routine board.", time: '7:02 PM', mine: false },
    ],
    'Parent Group': [
      { from: 'Parent', text: 'Is there a simple way to support sensory breaks at home?', time: 'Yesterday', mine: false },
    ],
    'School Admin': [
      { from: 'Admin', text: 'Reminder: please complete Module 4 by Friday.', time: 'Mon', mine: false },
    ],
  });

  const msgs = threads[activeConversation] || [];
  const send = () => {
    if (!msg.trim()) return;
    setThreads(p => ({
      ...p,
      [activeConversation]: [...(p[activeConversation] || []), { from: 'You', text: msg, time: 'Now', mine: true }],
    }));
    setMsg('');
  };

  const conversations = Object.keys(threads).map(name => {
    const last = threads[name][threads[name].length - 1];
    return { name, lastText: last?.text || '', lastTime: last?.time || '' };
  });
  return (
    <div className="page">
      <div className="page-head"><h1>Messages</h1><p>Communicate securely with parents and teachers.</p></div>
      <div className="chat-layout">
        <div className="chat-list">
          {conversations.map((c) => (
            <button key={c.name} className={`chat-list-item ${activeConversation === c.name ? 'active' : ''}`} onClick={() => setActiveConversation(c.name)}>
              <div className="chat-list-avatar">{c.name.charAt(0)}</div>
              <div className="chat-list-meta">
                <div className="chat-list-top">
                  <div className="li-title">{c.name}</div>
                  <div className="chat-list-time">{c.lastTime}</div>
                </div>
                <div className="li-sub chat-list-preview">{c.lastText}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="chat-shell">
          <div className="chat-header">
            <div className="chat-header-title">{activeConversation}</div>
            <div className="chat-header-sub">Secure messaging</div>
          </div>
          <div className="chat-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`bwrap ${m.mine ? 'right' : 'left'}`}>
                {!m.mine && <div className="bname">{m.from}</div>}
                <div className={`bubble ${m.mine ? 'bmine' : 'btheirs'}`}>{m.text}</div>
                <div className="btime">{m.time}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." />
            <button className="btn-primary" onClick={send}><Icon name="send" size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackTab() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="page"><div className="feedback-done">
      <Icon name="check" size={44} color="var(--green)" />
      <h2>Thank you for your feedback!</h2>
      <p>Your input helps us improve InkluKids for everyone.</p>
      <button className="btn-primary" onClick={() => { setDone(false); setRating(0); setText(''); }}>Submit Another</button>
    </div></div>
  );
  return (
    <div className="page">
      <div className="page-head"><h1>Give Feedback</h1><p>Help us improve the platform for everyone.</p></div>
      <div className="feedback-card">
        <div className="fb-section">
          <label>How would you rate InkluKids?</label>
          <div className="stars">{[1, 2, 3, 4, 5].map(s => (
            <button key={s} className="star-btn" onClick={() => setRating(s)}>
              <Icon name="star" size={30} color={rating >= s ? '#f59e0b' : '#e5e7eb'} />
            </button>
          ))}</div>
        </div>
        <div className="fb-section">
          <label>What could we improve?</label>
          <textarea placeholder="Share your thoughts, suggestions, or issues..." value={text} onChange={e => setText(e.target.value)} rows={5} />
        </div>
        <button className="btn-primary" onClick={() => { if (rating === 0) return; setDone(true); }}>Submit Feedback</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PARENT DASHBOARD
───────────────────────────────────────── */
function ParentDashboard({ user, onLogout, ...notifProps }) {
  const [tab, setTab] = useState('home');
  const [activityOpenTitle, setActivityOpenTitle] = useState(null);
  const nav = [
    { id: 'home', label: 'Dashboard', icon: 'home' },
    { id: 'activities', label: 'Activities', icon: 'calendar' },
    { id: 'progress', label: 'Progress Tracking', icon: 'chart' },
    { id: 'resources', label: 'Resource Library', icon: 'book' },
    { id: 'messages', label: 'Messages', icon: 'message' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  return (
    <Shell user={user} onLogout={onLogout} {...notifProps} navItems={nav} activeTab={tab} setActiveTab={setTab}>
      {tab === 'home' && (
        <ParentHome
          user={user}
          onGoActivities={() => setTab('activities')}
          onGoProgress={() => setTab('progress')}
          onGoResources={() => setTab('resources')}
          onGoMessages={() => setTab('messages')}
          onOpenActivity={(title) => { setActivityOpenTitle(title); setTab('activities'); }}
        />
      )}
      {tab === 'activities' && <ActivitiesTab openActivityTitle={activityOpenTitle} onActivityOpened={() => setActivityOpenTitle(null)} />}
      {tab === 'progress' && <ProgressTab />}
      {tab === 'resources' && <ResourcesTab />}
      {tab === 'messages' && <MessagesTab />}
      {tab === 'settings' && <SettingsWorkspace user={user} />}
    </Shell>
  );
}

function ParentHome({ user, onGoActivities, onGoProgress, onGoResources, onGoMessages, onOpenActivity }) {
  return (
    <div className="page">
      <div className="page-head">
        <h1>Hello, {user?.name?.split(' ')[0]}</h1>
        <p>Here is your child's latest update.</p>
      </div>
      <div className="quick-actions">
        <button className="btn-sm" onClick={onGoActivities}><Icon name="calendar" size={14} /> Activities</button>
        <button className="btn-sm" onClick={onGoProgress}><Icon name="chart" size={14} /> Progress</button>
        <button className="btn-sm" onClick={onGoResources}><Icon name="book" size={14} /> Resources</button>
        <button className="btn-sm" onClick={onGoMessages}><Icon name="message" size={14} /> Messages</button>
      </div>
      <div className="stats-row">
        <StatCard label="Activities Done" value="8" icon="check" color="var(--green-tint)" />
        <StatCard label="This Week" value="3" icon="calendar" color="var(--blue-tint)" />
        <StatCard label="School Progress" value="Good" icon="chart" color="var(--amber-tint)" />
        <StatCard label="New Resources" value="4" icon="book" color="var(--peach-tint)" />
      </div>
      <div className="two-col">
        <div className="card">
          <div className="card-title">Today's Activities</div>
          {[
            { title: 'Matching Colors Game', time: '10 min', done: true },
            { title: 'Story Time with Pictures', time: '15 min', done: true },
            { title: 'Emotions Card Exercise', time: '10 min', done: false },
          ].map((a, i) => (
            <div className="list-item" key={i}>
              <div className={`act-check ${a.done ? 'done' : ''}`}>
                <Icon name="check" size={13} color={a.done ? '#fff' : 'transparent'} />
              </div>
              <div className="li-body">
                <div className="li-title">{a.title}</div>
                <div className="li-sub">{a.time}</div>
              </div>
              {!a.done && <button className="btn-sm" onClick={() => onOpenActivity?.(a.title)}>Start</button>}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title-row">
            <div className="card-title">Latest from Teacher</div>
            <button className="btn-sm" onClick={onGoMessages}>Message</button>
          </div>
          <div className="teacher-note">
            <div className="tn-av">U</div>
            <div>
              <div className="tn-name">Ms. Uwase</div>
              <p className="tn-text">"Your child had a wonderful week. Engagement with visual activities has improved significantly."</p>
              <div className="tn-time">Yesterday at 4:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivitiesTab({ openActivityTitle, onActivityOpened }) {
  const [activeActivity, setActiveActivity] = useState(null);
  const list = [
    { title: 'Matching Colors Game', cat: 'Interactive', time: '10 min', diff: 'Easy', desc: 'Match colored objects to their corresponding color cards.' },
    { title: 'Story Time with Pictures', cat: 'Reading', time: '15 min', diff: 'Easy', desc: 'Read illustrated stories and discuss the pictures together.' },
    { title: 'Emotions Card Exercise', cat: 'Visual', time: '10 min', diff: 'Easy', desc: 'Use emotion cards to identify and name feelings.' },
    { title: 'Daily Routine Practice', cat: 'Visual', time: '20 min', diff: 'Medium', desc: 'Practice routines using visual step-by-step guides.' },
    { title: 'Counting with Objects', cat: 'Interactive', time: '15 min', diff: 'Easy', desc: 'Use everyday objects to practice counting and basic math.' },
    { title: 'Sensory Play', cat: 'Interactive', time: '20 min', diff: 'Easy', desc: 'Safe sensory activities using sand, water, or playdough.' },
  ];
  useEffect(() => {
    if (!openActivityTitle) return;
    const a = list.find(x => x.title === openActivityTitle);
    if (a) setActiveActivity(a);
    onActivityOpened?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openActivityTitle]);
  return (
    <div className="page">
      <div className="page-head"><h1>Home Activities</h1><p>Fun, inclusive activities for your child to do at home.</p></div>
      <div className="res-grid">
        {list.map((a, i) => (
          <div className="res-card" key={i}>
            <div className="res-top"><Badge label={a.cat} type="blue" /><span className="res-cat">{a.time} · {a.diff}</span></div>
            <div className="res-title">{a.title}</div>
            <div className="res-desc">{a.desc}</div>
            <button className="btn-sm" onClick={() => setActiveActivity(a)}>Start Activity</button>
          </div>
        ))}
      </div>
      {activeActivity && (
        <div className="card" style={{ marginTop: 18 }}>
          <div className="card-title-row">
            <div className="card-title">{activeActivity.title} - Step by Step</div>
            <button className="btn-sm" onClick={() => setActiveActivity(null)}>Close</button>
          </div>
          <ol className="lesson-steps">
            <li>Prepare materials and visual aids.</li>
            <li>Demonstrate the activity once.</li>
            <li>Let the child complete with guidance.</li>
            <li>Encourage and mark activity as done.</li>
          </ol>
        </div>
      )}
    </div>
  );
}

function ProgressTab() {
  const weeklyProgress = [
    { week: 'W1', score: 45 },
    { week: 'W2', score: 56 },
    { week: 'W3', score: 63 },
    { week: 'W4', score: 72 },
  ];
  const activities = [
    { name: 'Visual cards', done: 8 },
    { name: 'Reading', done: 5 },
    { name: 'Interactive', done: 7 },
  ];
  const reportText =
    `Progress Report\n\nWeekly Progress Score:\n` +
    weeklyProgress.map(w => `- ${w.week}: ${w.score}%`).join('\n') +
    `\n\nActivities Completed:\n` +
    activities.map(a => `- ${a.name}: ${a.done}`).join('\n') +
    `\n`;
  return (
    <div className="page">
      <div className="page-head"><h1>Progress Tracking</h1><p>Monitor your child's recent progress trends and completed activities.</p></div>
      <div className="prog-grid">
        <div className="prog-card">
          <div className="pc-head"><h3>Weekly Progress Score</h3><span className="pc-pct">72%</span></div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(136,146,176,0.25)" />
                <XAxis dataKey="week" stroke="#8892b0" />
                <YAxis stroke="#8892b0" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="prog-card">
          <div className="pc-head"><h3>Activities Completed</h3><span className="pc-pct">20</span></div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={activities}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(136,146,176,0.25)" />
                <XAxis dataKey="name" stroke="#8892b0" />
                <YAxis stroke="#8892b0" />
                <Tooltip />
                <Bar dataKey="done" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <a
        className="btn-primary"
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(reportText)}`}
        download="progress_report.txt"
      >
        Download Report
      </a>
    </div>
  );
}

function SettingsWorkspace({ user }) {
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileSaved, setProfileSaved] = useState(false);

  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNext, setPwNext] = useState('');
  const [pwSaved, setPwSaved] = useState(false);

  const [prefs, setPrefs] = useState({
    messages: true,
    progress: true,
    resources: true,
  });
  const [prefsSaved, setPrefsSaved] = useState(false);

  const [language, setLanguage] = useState('english');
  const [langSaved, setLangSaved] = useState(false);

  return (
    <div className="page">
      <div className="page-head"><h1>Settings</h1><p>Manage your profile, notifications, and preferences.</p></div>
      <div className="two-col">
        <div className="card">
          <div className="card-title-row">
            <div className="card-title">Profile</div>
            {profileSaved && <Badge label="Saved" type="green" />}
          </div>
          <div className="auth-field"><label>Full Name</label><input value={profileName} onChange={(e) => { setProfileName(e.target.value); setProfileSaved(false); }} /></div>
          <div className="auth-field"><label>Email</label><input value={profileEmail} onChange={(e) => { setProfileEmail(e.target.value); setProfileSaved(false); }} /></div>
          <button className="btn-sm" onClick={() => setProfileSaved(true)}>Save Profile</button>
        </div>
        <div className="card">
          <div className="card-title-row">
            <div className="card-title">Change Password</div>
            {pwSaved && <Badge label="Updated" type="green" />}
          </div>
          <div className="auth-field"><label>Current Password</label><input value={pwCurrent} onChange={(e) => { setPwCurrent(e.target.value); setPwSaved(false); }} type="password" placeholder="Current password" /></div>
          <div className="auth-field"><label>New Password</label><input value={pwNext} onChange={(e) => { setPwNext(e.target.value); setPwSaved(false); }} type="password" placeholder="New password" /></div>
          <button
            className="btn-sm"
            onClick={() => {
              if (!pwCurrent.trim() || !pwNext.trim()) return;
              setPwCurrent('');
              setPwNext('');
              setPwSaved(true);
            }}
          >
            Update Password
          </button>
        </div>
      </div>
      <div className="two-col" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="card-title-row">
            <div className="card-title">Notification Preferences</div>
            {prefsSaved && <Badge label="Saved" type="green" />}
          </div>
          <label className="toggle-row">
            <span className="toggle-body">
              <span className="toggle-title">Messages</span>
              <span className="toggle-sub">Email and in-app alerts</span>
            </span>
            <input type="checkbox" checked={prefs.messages} onChange={() => { setPrefs(p => ({ ...p, messages: !p.messages })); setPrefsSaved(false); }} />
          </label>
          <label className="toggle-row">
            <span className="toggle-body">
              <span className="toggle-title">Progress Updates</span>
              <span className="toggle-sub">Student updates and reminders</span>
            </span>
            <input type="checkbox" checked={prefs.progress} onChange={() => { setPrefs(p => ({ ...p, progress: !p.progress })); setPrefsSaved(false); }} />
          </label>
          <label className="toggle-row">
            <span className="toggle-body">
              <span className="toggle-title">Resource Alerts</span>
              <span className="toggle-sub">New guides and lesson plans</span>
            </span>
            <input type="checkbox" checked={prefs.resources} onChange={() => { setPrefs(p => ({ ...p, resources: !p.resources })); setPrefsSaved(false); }} />
          </label>
          <button className="btn-sm" onClick={() => setPrefsSaved(true)}>Save Preferences</button>
        </div>
        <div className="card">
          <div className="card-title-row">
            <div className="card-title">Language</div>
            {langSaved && <Badge label="Saved" type="green" />}
          </div>
          <div className="auth-field">
            <label>Preferred Language</label>
            <select value={language} onChange={(e) => { setLanguage(e.target.value); setLangSaved(false); }}>
              <option value="english">English</option>
              <option value="kinyarwanda">Kinyarwanda (Coming soon)</option>
            </select>
          </div>
          <button className="btn-sm" onClick={() => setLangSaved(true)}>Save Language</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CHILD DASHBOARD
───────────────────────────────────────── */
function ChildDashboard({ user, onLogout, accessToken }) {
  const [tab, setTab] = useState('play');
  const [done, setDone] = useState([]);
  const [active, setActive] = useState(null);
  const [sound, setSound] = useState(true);
  const [bigText, setBigText] = useState(false);
  const [childPoints, setChildPoints] = useState(0);
  const [activities, setActivities] = useState([
    { id: 'seed-1', title: 'Color Match', desc: 'Match the colors!', icon: 'puzzle', color: '#fef9c3' },
    { id: 'seed-2', title: 'How Do I Feel?', desc: 'Name your feelings', icon: 'smile', color: '#dcfce7' },
    { id: 'seed-3', title: 'Count with Me', desc: 'Count fun objects', icon: 'star', color: '#dbeafe' },
    { id: 'seed-4', title: 'My Daily Routine', desc: "What's your routine?", icon: 'calendar', color: '#fce7f3' },
    { id: 'seed-5', title: 'Story Time', desc: 'Read a picture story', icon: 'book', color: '#ede9fe' },
    { id: 'seed-6', title: 'Move Your Body', desc: 'Fun exercises!', icon: 'activity', color: '#ffedd5' },
  ]);

  useEffect(() => {
    let cancelled = false;
    apiFetch('/api/activities', { accessToken })
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data?.activities) && data.activities.length) {
          setActivities(data.activities.map(a => ({
            id: a.id,
            title: a.title,
            desc: a.description,
            icon: a.icon,
            color: a.color,
            steps: a.steps || [],
          })));
        }
      })
      .catch(() => {
        // keep seeded activities if backend not available yet
      })
    return () => { cancelled = true; };
  }, [accessToken]);

  useEffect(() => {
    let cancelled = false;
    if (!accessToken) return () => { cancelled = true; };
    apiFetch('/api/progress/me', { accessToken })
      .then((data) => {
        if (cancelled) return;
        const ids = data?.progress?.completedActivityIds || [];
        const pts = data?.progress?.points || 0;
        setDone(Array.isArray(ids) ? ids : []);
        setChildPoints(Number.isFinite(pts) ? pts : 0);
      })
      .catch(() => {
        // keep local demo progress if backend not available
      });
    return () => { cancelled = true; };
  }, [accessToken]);

  const pts = childPoints || 0;
  const complete = (id) => { if (!done.includes(id)) setDone(p => [...p, id]); };
  const open = (a) => { setActive(a); setTab('activity'); };
  const markDone = (id) => {
    if (accessToken) {
      apiFetch('/api/progress/complete', { method: 'POST', accessToken, body: { activityId: id, pointsAwarded: 10 } })
        .then((data) => {
          const ids = data?.progress?.completedActivityIds || [];
          const ptsNext = data?.progress?.points || 0;
          setDone(Array.isArray(ids) ? ids : []);
          setChildPoints(Number.isFinite(ptsNext) ? ptsNext : 0);
        })
        .catch(() => {
          // fallback to local if backend fails
          complete(id);
          setChildPoints(p => p + (done.includes(id) ? 0 : 10));
        });
    } else {
      complete(id);
      setChildPoints(p => p + (done.includes(id) ? 0 : 10));
    }
    setActive(null);
    setTab('play');
    if (sound) {
      try { window.navigator.vibrate?.(40); } catch {}
    }
  };

  return (
    <div className={`child-app ${bigText ? 'child-big' : ''}`}>
      <header className="child-topbar">
        <div className="child-brand">InkluKids</div>
        <div className="child-top-right">
          <div className="pts-pill"><Icon name="star" size={15} color="#f59e0b" /> {pts} pts</div>
          <button className="child-logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>
      <div className="child-hero">
        <h1>Hi, {user?.name?.split(' ')[0]}!</h1>
        <p>What would you like to do today?</p>
      </div>
      <div className="child-nav">
        {['play', 'progress', 'awards', 'settings'].map(t => (
          <button key={t} className={`child-nav-btn ${tab === t ? 'active' : ''}`} onClick={() => { setTab(t); setActive(null); }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {tab === 'activity' && active && (
        <div className="child-activity-page">
          <div className="child-activity-wrap">
            <div className="child-activity-head">
              <button className="btn-sm" onClick={() => { setTab('play'); setActive(null); }}>
                <Icon name="arrow_left" size={14} /> Back
              </button>
              <div className="child-activity-title">
                <div className="cat">{active.title}</div>
                <div className="t-muted">{active.desc}</div>
              </div>
              <div className="pts-pill"><Icon name="star" size={15} color="#f59e0b" /> {pts} pts</div>
            </div>

            <div className="child-activity-card" style={{ '--acc': active.color }}>
              <div className="cc-icon"><Icon name={active.icon} size={44} /></div>
              <div className="cc-title">{active.title}</div>
              <div className="cc-desc">{active.desc}</div>
            </div>

            <div className="card">
              <div className="card-title">Steps</div>
              <ol className="lesson-steps">
                {(active.steps?.length ? active.steps : [
                  'Get ready and look at the pictures.',
                  'Try the activity once with help.',
                  'Try again by yourself.',
                  'When you finish, mark it as done.',
                ]).map((s, i) => <li key={i}>{s}</li>)}
              </ol>
              <div className="lesson-actions">
                <button className="btn-complete" onClick={() => markDone(active.id)}>
                  <span className="btn-complete-dot" aria-hidden><Icon name="check" size={12} color="#fff" /></span>
                  Mark done (+10 pts)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === 'play' && (
        <>
          <div className="child-grid">
            {activities.map(a => (
              <div key={a.id} className={`child-card ${done.includes(a.id) ? 'child-done' : ''}`} style={{ '--acc': a.color }}>
                <div className="cc-icon"><Icon name={a.icon} size={36} /></div>
                <div className="cc-title">{a.title}</div>
                <div className="cc-desc">{a.desc}</div>
                {done.includes(a.id)
                  ? <div className="cc-done-label"><Icon name="check" size={14} /> Done!</div>
                  : <button className="cc-btn" onClick={() => open(a)}>Let's Go!</button>}
              </div>
            ))}
          </div>

        </>
      )}
      {tab === 'progress' && (
        <div className="child-prog-view">
          <div className="cp-stats">
            <div className="cp-stat"><div className="cp-val">{done.length}</div><div className="cp-lbl">Completed</div></div>
            <div className="cp-stat"><div className="cp-val">{pts}</div><div className="cp-lbl">Points</div></div>
            <div className="cp-stat"><div className="cp-val">{activities.length - done.length}</div><div className="cp-lbl">Remaining</div></div>
          </div>
          <div className="cp-bar-section">
            <div className="cp-bar-lbl">Overall Progress — {Math.round((done.length / activities.length) * 100)}%</div>
            <ProgressBar value={Math.round((done.length / activities.length) * 100)} color="#f59e0b" />
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <div className="card-title">Completed activities</div>
            {done.length === 0 ? (
              <div className="li-sub">No activities completed yet. Go to Play to start.</div>
            ) : (
              <div className="res-grid child-done-grid">
                {activities.filter(a => done.includes(a.id)).map(a => (
                  <div key={a.id} className="res-card" style={{ background: 'var(--bg-card)' }}>
                    <div className="res-top"><Badge label="Done" type="green" /></div>
                    <div className="res-title">{a.title}</div>
                    <div className="res-desc">{a.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {tab === 'awards' && (
        <div className="awards-grid">
          {[
            { title: 'First Step', desc: 'Complete your first activity', earned: done.length >= 1 },
            { title: 'Getting Started', desc: 'Complete 3 activities', earned: done.length >= 3 },
            { title: 'Star Learner', desc: 'Complete all activities', earned: done.length >= 6 },
          ].map((a, i) => (
            <div key={i} className={`award-card ${a.earned ? 'earned' : ''}`}>
              <Icon name="award" size={42} color={a.earned ? '#f59e0b' : '#d1d5db'} />
              <div className="aw-title">{a.title}</div>
              <div className="aw-desc">{a.desc}</div>
              <Badge label={a.earned ? 'Earned!' : 'Locked'} type={a.earned ? 'green' : 'gray'} />
            </div>
          ))}
        </div>
      )}
      {tab === 'settings' && (
        <div className="child-prog-view">
          <div className="card">
            <div className="card-title">My settings</div>
            <label className="toggle-row">
              <span className="toggle-body">
                <span className="toggle-title">Sound & haptics</span>
                <span className="toggle-sub">Small feedback when you finish an activity</span>
              </span>
              <input type="checkbox" checked={sound} onChange={() => setSound(p => !p)} />
            </label>
            <label className="toggle-row">
              <span className="toggle-body">
                <span className="toggle-title">Big text</span>
                <span className="toggle-sub">Make text larger and easier to read</span>
              </span>
              <input type="checkbox" checked={bigText} onChange={() => setBigText(p => !p)} />
            </label>
            <div className="lesson-actions">
              <button
                className="btn-sm"
                onClick={() => {
                  setDone([]);
                  setChildPoints(0);
                  setActive(null);
                  if (accessToken) {
                    apiFetch('/api/progress/reset', { method: 'POST', accessToken }).catch(() => {});
                  }
                }}
              >
                Reset progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   ADMIN DASHBOARD
───────────────────────────────────────── */
function AdminDashboard({ user, onLogout, users, setUsers, ...notifProps }) {
  const [tab, setTab] = useState('overview');
  const nav = [
    { id: 'overview', label: 'Overview', icon: 'grid' },
    { id: 'users', label: 'Users', icon: 'users' },
    { id: 'reports', label: 'Reports', icon: 'bar_chart' },
    { id: 'feedback', label: 'Feedback', icon: 'star' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  return (
    <Shell user={user} onLogout={onLogout} {...notifProps} navItems={nav} activeTab={tab} setActiveTab={setTab}>
      {tab === 'overview' && <AdminOverview />}
      {tab === 'users' && <UsersTab users={users} setUsers={setUsers} />}
      {tab === 'reports' && <ReportsTab />}
      {tab === 'feedback' && <FeedbackTab />}
      {tab === 'settings' && <SettingsTab />}
    </Shell>
  );
}

function AdminOverview() {
  return (
    <div className="page">
      <div className="page-head"><h1>School Overview</h1><p>Monitor platform usage across your school.</p></div>
      <div className="stats-row">
        <StatCard label="Teachers" value="24" icon="graduation" color="var(--blue-tint)" />
        <StatCard label="Parents" value="87" icon="users" color="var(--green-tint)" />
        <StatCard label="Children" value="63" icon="child" color="var(--peach-tint)" />
        <StatCard label="Active This Week" value="41" icon="activity" color="var(--amber-tint)" />
      </div>
      <div className="card">
        <div className="card-title">Training Completion by Teacher</div>
        {[
          { name: 'Uwase Diane', done: 6, total: 6 },
          { name: 'Nkurunziza Pierre', done: 4, total: 6 },
          { name: 'Mutesi Grace', done: 3, total: 6 },
          { name: 'Bizimana Eric', done: 1, total: 6 },
        ].map((t, i) => (
          <div className="list-item" key={i}>
            <div className="li-av">{t.name.charAt(0)}</div>
            <div className="li-body">
              <div className="li-title">{t.name}</div>
              <ProgressBar value={Math.round((t.done / t.total) * 100)} />
            </div>
            <span className="li-sub">{t.done}/{t.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersTab({ users, setUsers }) {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ name: '', email: '', role: 'teacher', status: 'Active' });
  const [toast, setToast] = useState('');

  const showToast = (t) => {
    setToast(t);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(''), 1800);
  };

  const toggle = (id) => setUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  const remove = (id) => {
    const u = users.find(x => x.id === id);
    setUsers(p => p.filter(x => x.id !== id));
    setSelected(null);
    showToast(`Deleted ${u?.name || 'user'}`);
  };
  const saveSelected = () => {
    if (!selected) return;
    setUsers(p => p.map(u => u.id === selected.id ? selected : u));
    showToast('Saved changes');
  };
  const addUser = () => {
    if (!draft.name.trim() || !draft.email.trim()) return;
    const id = Math.max(0, ...users.map(u => u.id || 0)) + 1;
    setUsers(p => [{ id, ...draft }, ...p]);
    setDraft({ name: '', email: '', role: 'teacher', status: 'Active' });
    setShowAdd(false);
    showToast('User added');
  };

  const visible = users.filter(u => {
    const q = query.trim().toLowerCase();
    const matchesQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = role === 'All' || u.role === role;
    return matchesQ && matchesRole;
  });

  return (
    <div className="page">
      <div className="page-head"><h1>User Management</h1><p>Manage all accounts on the platform.</p></div>
      <div className="filter-row">
        <input className="filter-search" placeholder="Search name or email..." value={query} onChange={(e) => setQuery(e.target.value)} />
        {['All', 'teacher', 'parent', 'child', 'admin'].map(r => (
          <button key={r} className={`filter-chip ${role === r ? 'active' : ''}`} onClick={() => setRole(r)}>{r === 'All' ? 'All' : r}</button>
        ))}
        <button className="btn-primary" onClick={() => setShowAdd(true)}><Icon name="plus" size={16} /> Add user</button>
      </div>
      <div className="table-card">
        <div className="t-head" style={{ gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr' }}>
          <span>Name</span><span>Role</span><span>Email</span><span>Status</span><span>Action</span>
        </div>
        {visible.map(u => (
          <div className="t-row" key={u.id} style={{ gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr' }}>
            <span className="t-name"><div className="t-av">{u.name.charAt(0)}</div>{u.name}</span>
            <span><Badge label={u.role} type={u.role === 'teacher' ? 'blue' : u.role === 'parent' ? 'green' : u.role === 'child' ? 'amber' : 'gray'} /></span>
            <span className="t-email">{u.email}</span>
            <span><Badge label={u.status || 'Active'} type={(u.status || 'Active') === 'Active' ? 'green' : 'gray'} /></span>
            <span className="t-actions">
              <button className="btn-sm" onClick={() => setSelected({ ...u })}>View</button>
              <button className="btn-sm" onClick={() => toggle(u.id)}>{(u.status || 'Active') === 'Active' ? 'Deactivate' : 'Activate'}</button>
            </span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="card" style={{ marginTop: 18 }}>
          <div className="card-title-row">
            <div className="card-title">Edit user</div>
            <div className="card-title-actions">
              <button className="btn-sm" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
          <div className="two-col" style={{ gap: 12 }}>
            <div className="auth-field"><label>Full Name</label><input value={selected.name} onChange={(e) => setSelected(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="auth-field"><label>Email</label><input value={selected.email} onChange={(e) => setSelected(p => ({ ...p, email: e.target.value }))} /></div>
          </div>
          <div className="two-col" style={{ gap: 12, marginTop: 8 }}>
            <div className="auth-field">
              <label>Role</label>
              <select value={selected.role} onChange={(e) => setSelected(p => ({ ...p, role: e.target.value }))}>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="auth-field">
              <label>Status</label>
              <select value={selected.status || 'Active'} onChange={(e) => setSelected(p => ({ ...p, status: e.target.value }))}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="res-actions" style={{ justifyContent: 'space-between', marginTop: 10 }}>
            <button className="btn-sm" onClick={() => remove(selected.id)}><Icon name="trash" size={13} /> Delete</button>
            <div className="res-actions">
              <button className="btn-sm" onClick={() => toggle(selected.id)}>{(selected.status || 'Active') === 'Active' ? 'Deactivate' : 'Activate'}</button>
              <button className="btn-primary" onClick={saveSelected}><Icon name="check" size={16} /> Save</button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="card" style={{ marginTop: 18 }}>
          <div className="card-title-row">
            <div className="card-title">Add user</div>
            <div className="card-title-actions">
              <button className="btn-sm" onClick={() => setShowAdd(false)}>Close</button>
            </div>
          </div>
          <div className="two-col" style={{ gap: 12 }}>
            <div className="auth-field"><label>Full Name</label><input value={draft.name} onChange={(e) => setDraft(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Uwase Diane" /></div>
            <div className="auth-field"><label>Email</label><input value={draft.email} onChange={(e) => setDraft(p => ({ ...p, email: e.target.value }))} placeholder="e.g. teacher@school.rw" /></div>
          </div>
          <div className="two-col" style={{ gap: 12, marginTop: 8 }}>
            <div className="auth-field">
              <label>Role</label>
              <select value={draft.role} onChange={(e) => setDraft(p => ({ ...p, role: e.target.value }))}>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="auth-field">
              <label>Status</label>
              <select value={draft.status} onChange={(e) => setDraft(p => ({ ...p, status: e.target.value }))}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="lesson-actions">
            <button className="btn-primary" onClick={addUser}><Icon name="plus" size={16} /> Add user</button>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" role="status" aria-live="polite">{toast}</div>
      )}
    </div>
  );
}

function ReportsTab() {
  const reports = [
    { title: 'Training Completion Report', type: 'CSV' },
    { title: 'Student Progress Report', type: 'CSV' },
    { title: 'Parent Engagement Report', type: 'CSV' },
    { title: 'Platform Usage Report', type: 'CSV' },
  ];
  const makeCsv = (title) => {
    const rows = [
      ['Report', title],
      ['Generated', new Date().toLocaleString()],
      [],
      ['Metric', 'Value'],
      ['Teachers trained', '24'],
      ['Parents active', '41'],
      ['Children supported', '63'],
      ['Modules completed', '128'],
    ];
    return rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n');
  };
  return (
    <div className="page">
      <div className="page-head"><h1>Reports</h1><p>Generate and download platform usage reports.</p></div>
      <div className="res-grid">
        {reports.map((r, i) => (
          <div className="res-card" key={i}>
            <div className="res-top"><Badge label="Report" type="gray" /></div>
            <div className="res-title">{r.title}</div>
            <div className="res-desc">Download the latest data as PDF or CSV.</div>
            <a
              className="btn-sm"
              href={`data:text/csv;charset=utf-8,${encodeURIComponent(makeCsv(r.title))}`}
              download={`${r.title.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.csv`}
            >
              <Icon name="download" size={13} /> Download CSV
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [platformName, setPlatformName] = useState('InkluKids');
  const [school, setSchool] = useState('Rwanda Inclusive School Network');
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  return (
    <div className="page">
      <div className="page-head"><h1>Settings</h1><p>Manage platform configuration.</p></div>
      <div className="card">
        <div className="card-title-row">
          <div className="card-title">Platform configuration</div>
          {saved && <Badge label="Saved" type="green" />}
        </div>
        <div className="two-col" style={{ gap: 12 }}>
          <div className="auth-field">
            <label>Platform Name</label>
            <input value={platformName} onChange={(e) => { setPlatformName(e.target.value); setSaved(false); }} />
          </div>
          <div className="auth-field">
            <label>School</label>
            <input value={school} onChange={(e) => { setSchool(e.target.value); setSaved(false); }} />
          </div>
        </div>
        <div className="two-col" style={{ gap: 12, marginTop: 8 }}>
          <div className="auth-field">
            <label>Language</label>
            <select value={language} onChange={(e) => { setLanguage(e.target.value); setSaved(false); }}>
              <option value="English">English</option>
              <option value="Kinyarwanda">Kinyarwanda</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="auth-field">
            <label>Notifications</label>
            <label className="toggle-row" style={{ marginBottom: 0 }}>
              <span className="toggle-body">
                <span className="toggle-title">{notifications ? 'Enabled' : 'Disabled'}</span>
                <span className="toggle-sub">In-app alerts and emails</span>
              </span>
              <input type="checkbox" checked={notifications} onChange={() => { setNotifications(p => !p); setSaved(false); }} />
            </label>
          </div>
        </div>
        <div className="lesson-actions">
          <button className="btn-primary" onClick={() => setSaved(true)}><Icon name="check" size={16} /> Save settings</button>
        </div>
      </div>
    </div>
  );
}

export default App;