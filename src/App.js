import { useState } from 'react';
import './App.css';

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

// Inline SVG for landing page icons (same style)
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
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New training module: Sensory Strategies', time: '2 hours ago', read: false },
    { id: 2, text: 'Amani completed 3 activities this week', time: '5 hours ago', read: false },
    { id: 3, text: 'New message from Ms. Uwase', time: 'Yesterday', read: true },
    { id: 4, text: 'Parent guidelines updated', time: '2 days ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markRead = (id) => setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(p => p.map(n => ({ ...n, read: true })));

  const handleAuth = (u, isNew) => {
    if (isNew) setUsers(p => [...p, u]);
    setUser(u);
    setPage(u.role + '-dashboard');
  };
  const handleLogout = () => { setUser(null); setPage('home'); };
  const notifProps = { notifications, unreadCount, markRead, markAllRead };

  if (page === 'home') return <LandingPage go={setPage} />;
  if (page === 'login') return <AuthPage mode="login" go={setPage} users={users} onAuth={handleAuth} />;
  if (page === 'register') return <AuthPage mode="register" go={setPage} users={users} onAuth={handleAuth} />;
  if (page === 'teacher-dashboard') return <TeacherDashboard user={user} onLogout={handleLogout} {...notifProps} />;
  if (page === 'parent-dashboard') return <ParentDashboard user={user} onLogout={handleLogout} {...notifProps} />;
  if (page === 'admin-dashboard') return <AdminDashboard user={user} onLogout={handleLogout} users={users} setUsers={setUsers} {...notifProps} />;
  if (page === 'child-dashboard') return <ChildDashboard user={user} onLogout={handleLogout} />;
  return <LandingPage go={setPage} />;
}

/* ─────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────── */
function LandingPage({ go }) {
  const features = [
    { d: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>, title: 'Teacher Training', desc: 'Six professional development modules on autism inclusion, sensory strategies, and classroom communication.' },
    { d: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>, title: 'Child Progress', desc: "Track each child's development across communication, social skills, and learning over time." },
    { d: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, title: 'Structured Activities', desc: 'Curated learning activities tailored for autistic children, designed for both school and home.' },
    { d: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>, title: 'Parent Guides', desc: "Practical resources and video tutorials to help parents support their child's growth at home." },
    { d: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>, title: 'Direct Messaging', desc: 'Secure communication between teachers and parents — no third-party apps needed.' },
    { d: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>, title: 'School Reports', desc: 'Administrators can monitor usage, training completion, and generate school-wide reports.' },
  ];

  const roles = [
    { label: 'Teachers', d: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>, desc: 'Access training modules, monitor student progress, and communicate with parents.' },
    { label: 'Parents', d: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>, desc: "See your child's activities and progress, and stay in touch with their teacher." },
    { label: 'Children', d: <><circle cx="12" cy="6" r="3"/><path d="M9 12h6l1 8H8l1-8z"/></>, desc: 'Complete fun activities and earn points in a safe, simple learning space.' },
    { label: 'School Admins', d: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>, desc: 'Manage all accounts, view platform-wide data, and generate school reports.' },
  ];

  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">InkluKids</div>
        <div className="nav-right">
          <button className="nav-signin" onClick={() => go('login')}>Sign In</button>
          <button className="nav-start" onClick={() => go('register')}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="lp-hero">
        <div className="lp-hero-text">
          <span className="lp-tag">Autism Inclusion · Rwanda</span>
          <h1>
            Tools that help<br />
            every child<br />
            <em>thrive at school.</em>
          </h1>
          <p>
            InkluKids gives Rwandan teachers structured training, parents practical guidance,
            and children a place to learn and grow — all in one platform.
          </p>
          <div className="lp-hero-btns">
            <button className="lp-btn-primary" onClick={() => go('register')}>Create Free Account</button>
            <button className="lp-btn-secondary" onClick={() => go('login')}>Sign In</button>
          </div>
        </div>

        {/* Dashboard preview panel */}
        <div className="lp-hero-visual">
          <div className="lp-dashboard-preview">
            <div className="ldp-header">
              <span className="ldp-logo-sm">InkluKids</span>
              <div className="ldp-header-right">
                <div className="ldp-dot active" />
                <span className="ldp-user-name">Ms. Uwase</span>
              </div>
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
              <button className="ldp-resume">Resume Module 3</button>
            </div>
          </div>
          <div className="lp-preview-shadow" />
        </div>
      </div>

      {/* NUMBERS BAR */}
      <div className="lp-numbers">
        {[['500+', 'Teachers trained'], ['1,200+', 'Children supported'], ['80+', 'Schools enrolled'], ['6', 'Training modules']].map(([n, l]) => (
          <div className="lp-num-item" key={n}>
            <div className="lp-num">{n}</div>
            <div className="lp-num-label">{l}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="lp-features">
        <div className="lp-section-head">
          <div className="lp-eyebrow">WHAT YOU GET</div>
          <h2>Everything in one place</h2>
          <p>A complete platform built around the needs of Rwanda's inclusive education community.</p>
        </div>
        <div className="lp-feat-grid">
          {features.map((f, i) => (
            <div className="lp-feat" key={i}>
              <div className="lp-feat-icon"><LI d={f.d} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY / TESTIMONIALS */}
      <div className="lp-why">
        <div className="lp-why-left">
          <div className="lp-eyebrow">WHY INKLUKIDS</div>
          <h2>Built for Rwanda's classrooms</h2>
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
              <span className="lp-quote-mark">"</span>
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

      {/* ROLES */}
      <section className="lp-roles">
        <div className="lp-section-head">
          <div className="lp-eyebrow">WHO IT'S FOR</div>
          <h2>One platform, four roles</h2>
          <p>Each user type gets a tailored dashboard designed for how they use the platform.</p>
        </div>
        <div className="lp-roles-grid">
          {roles.map((r, i) => (
            <div className="lp-role-card" key={i} onClick={() => go('register')}>
              <div className="lp-role-icon"><LI d={r.d} size={20} /></div>
              <h3>{r.label}</h3>
              <p>{r.desc}</p>
              <button className="lp-role-btn">Get started</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <h2>Ready to build a more inclusive classroom?</h2>
        <p>Join hundreds of Rwandan educators and families — free to get started.</p>
        <div className="lp-cta-btns">
          <button className="lp-cta-main" onClick={() => go('register')}>Create your free account</button>
          <button className="lp-cta-ghost" onClick={() => go('login')}>Sign In</button>
        </div>
      </section>

      {/* FOOTER */}
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
function AuthPage({ mode, go, users, onAuth }) {
  const isLogin = mode === 'login';
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'teacher' });
  const [children, setChildren] = useState([{ name: '', age: '', diagnosis: '', school: '', notes: '' }]);
  const [error, setError] = useState('');

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError(''); };
  const setChild = (i, k, v) => setChildren(p => p.map((c, idx) => idx === i ? { ...c, [k]: v } : c));
  const addChild = () => setChildren(p => [...p, { name: '', age: '', diagnosis: '', school: '', notes: '' }]);
  const removeChild = (i) => setChildren(p => p.filter((_, idx) => idx !== i));

  const handleStep1 = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) { setError('Please fill in all fields.'); return; }
    if (!form.email.includes('@')) { setError('Please enter a valid email.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (users.find(u => u.email === form.email)) { setError('An account with this email already exists.'); return; }
    if (form.role === 'parent') { setError(''); setStep(2); }
    else { onAuth({ id: Date.now(), name: form.name, email: form.email, password: form.password, role: form.role, status: 'Active' }, true); }
  };
  const handleStep2 = () => {
    if (children.some(c => !c.name.trim())) { setError('Please enter a name for each child.'); return; }
    onAuth({ id: Date.now(), name: form.name, email: form.email, password: form.password, role: form.role, status: 'Active', children }, true);
  };
  const handleLogin = () => {
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    const found = users.find(u => u.email === form.email && u.password === form.password);
    if (!found) { setError('Incorrect email or password.'); return; }
    onAuth(found, false);
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
            <div className="notif-wrap">
              <button className="icon-btn" onClick={() => setShowNotif(p => !p)}>
                <Icon name="bell" size={19} />
                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
              </button>
              {showNotif && <NotifPanel notifications={notifications} markRead={markRead} markAllRead={markAllRead} onClose={() => setShowNotif(false)} />}
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
  const nav = [
    { id: 'home', label: 'Overview', icon: 'home' },
    { id: 'training', label: 'Training', icon: 'graduation' },
    { id: 'students', label: 'Students', icon: 'users' },
    { id: 'resources', label: 'Resources', icon: 'book' },
    { id: 'messages', label: 'Messages', icon: 'message' },
    { id: 'feedback', label: 'Feedback', icon: 'star' },
  ];
  return (
    <Shell user={user} onLogout={onLogout} {...notifProps} navItems={nav} activeTab={tab} setActiveTab={setTab}>
      {tab === 'home' && <TeacherHome user={user} />}
      {tab === 'training' && <TrainingTab />}
      {tab === 'students' && <StudentsTab />}
      {tab === 'resources' && <ResourcesTab />}
      {tab === 'messages' && <MessagesTab />}
      {tab === 'feedback' && <FeedbackTab />}
    </Shell>
  );
}

function TeacherHome({ user }) {
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
              <button className="btn-sm">{m.pct > 0 ? 'Resume' : 'Start'}</button>
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

function TrainingTab() {
  const modules = [
    { title: 'Understanding Autism', desc: 'Foundations of autism and inclusive education.', pct: 100, status: 'Completed' },
    { title: 'Inclusive Classroom Setup', desc: 'Design a classroom that works for every learner.', pct: 100, status: 'Completed' },
    { title: 'Visual Communication', desc: 'Using visual cues, schedules, and picture cards.', pct: 60, status: 'In Progress' },
    { title: 'Sensory Strategies', desc: 'Managing sensory sensitivities in the classroom.', pct: 0, status: 'Not Started' },
    { title: 'Behavior Support', desc: 'Positive behavior strategies for autistic children.', pct: 0, status: 'Not Started' },
    { title: 'Parent Collaboration', desc: 'Building strong home-school connections.', pct: 0, status: 'Not Started' },
  ];
  return (
    <div className="page">
      <div className="page-head"><h1>Training Modules</h1><p>Complete all 6 modules to earn your inclusive education certificate.</p></div>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="prog-summary"><span>2 of 6 modules completed</span><strong>33%</strong></div>
        <ProgressBar value={33} />
      </div>
      {modules.map((m, i) => (
        <div className="module-row" key={i}>
          <div className="mod-num">{i + 1}</div>
          <div className="mod-body">
            <div className="mod-title">{m.title}</div>
            <div className="mod-desc">{m.desc}</div>
            {m.pct > 0 && <ProgressBar value={m.pct} />}
          </div>
          <div className="mod-right">
            <Badge label={m.status} type={m.status === 'Completed' ? 'green' : m.status === 'In Progress' ? 'blue' : 'gray'} />
            <button className="btn-sm">{m.status === 'Completed' ? 'Review' : m.status === 'In Progress' ? 'Resume' : 'Start'}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function StudentsTab() {
  const students = [
    { name: 'Amani Kagabo', age: 8, activities: 12, attendance: '90%', status: 'On Track' },
    { name: 'Blaise Mugisha', age: 7, activities: 7, attendance: '70%', status: 'Needs Support' },
    { name: 'Clarisse Nziza', age: 9, activities: 15, attendance: '95%', status: 'On Track' },
    { name: 'Dieudonne Habu', age: 8, activities: 9, attendance: '80%', status: 'On Track' },
  ];
  return (
    <div className="page">
      <div className="page-head"><h1>Students</h1><p>Monitor each child's development and participation.</p></div>
      <div className="table-card">
        <div className="t-head"><span>Student</span><span>Age</span><span>Activities</span><span>Attendance</span><span>Status</span><span>Action</span></div>
        {students.map((s, i) => (
          <div className="t-row" key={i}>
            <span className="t-name"><div className="t-av">{s.name.charAt(0)}</div>{s.name}</span>
            <span>{s.age}</span><span>{s.activities}</span><span>{s.attendance}</span>
            <span><Badge label={s.status} type={s.status === 'On Track' ? 'green' : 'amber'} /></span>
            <span><button className="btn-sm">View</button></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesTab() {
  const list = [
    { type: 'PDF', title: 'Visual Schedule Templates', cat: 'Classroom', desc: 'Printable daily schedule cards for autistic learners.' },
    { type: 'Video', title: 'Communication Strategies', cat: 'Training', desc: 'Step-by-step video on using AAC devices in class.' },
    { type: 'PDF', title: 'Sensory Checklist', cat: 'Assessment', desc: 'Identify sensory sensitivities in your students.' },
    { type: 'PDF', title: 'Inclusive Lesson Plan', cat: 'Classroom', desc: 'Lesson plan template for mixed-ability classrooms.' },
    { type: 'Video', title: 'Positive Behavior Support', cat: 'Training', desc: 'Practical strategies for managing behavior.' },
    { type: 'PDF', title: 'Parent Communication Guide', cat: 'Communication', desc: 'Tips for effective home-school collaboration.' },
  ];
  return (
    <div className="page">
      <div className="page-head"><h1>Resources</h1><p>Visual aids, lesson plans, and guides for your teaching.</p></div>
      <div className="res-grid">
        {list.map((r, i) => (
          <div className="res-card" key={i}>
            <div className="res-top"><Badge label={r.type} type={r.type === 'Video' ? 'blue' : 'gray'} /><span className="res-cat">{r.cat}</span></div>
            <div className="res-title">{r.title}</div>
            <div className="res-desc">{r.desc}</div>
            <button className="btn-sm"><Icon name={r.type === 'Video' ? 'play' : 'download'} size={13} /> {r.type === 'Video' ? 'Watch' : 'Download'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab() {
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([
    { from: 'Ms. Uwase', text: 'Amani had a great session — engaged well with the visual schedule.', time: '9:15 AM', mine: false },
    { from: 'Parent', text: 'Thank you! Could you share what visuals you used?', time: '6:30 PM', mine: true },
    { from: 'Ms. Uwase', text: "Of course! I'll send over the picture cards. He loved the colour-coded routine board.", time: '7:02 PM', mine: false },
  ]);
  const send = () => {
    if (!msg.trim()) return;
    setMsgs(p => [...p, { from: 'You', text: msg, time: 'Now', mine: true }]);
    setMsg('');
  };
  return (
    <div className="page">
      <div className="page-head"><h1>Messages</h1><p>Communicate securely with parents and teachers.</p></div>
      <div className="chat-shell">
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
  const nav = [
    { id: 'home', label: 'Overview', icon: 'home' },
    { id: 'activities', label: 'Activities', icon: 'calendar' },
    { id: 'progress', label: 'Child Progress', icon: 'chart' },
    { id: 'resources', label: 'Resources', icon: 'book' },
    { id: 'messages', label: 'Messages', icon: 'message' },
    { id: 'feedback', label: 'Feedback', icon: 'star' },
  ];
  return (
    <Shell user={user} onLogout={onLogout} {...notifProps} navItems={nav} activeTab={tab} setActiveTab={setTab}>
      {tab === 'home' && <ParentHome user={user} />}
      {tab === 'activities' && <ActivitiesTab />}
      {tab === 'progress' && <ProgressTab />}
      {tab === 'resources' && <ResourcesTab />}
      {tab === 'messages' && <MessagesTab />}
      {tab === 'feedback' && <FeedbackTab />}
    </Shell>
  );
}

function ParentHome({ user }) {
  return (
    <div className="page">
      <div className="page-head">
        <h1>Hello, {user?.name?.split(' ')[0]}</h1>
        <p>Here is your child's latest update.</p>
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
              {!a.done && <button className="btn-sm">Start</button>}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Latest from Teacher</div>
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

function ActivitiesTab() {
  const list = [
    { title: 'Matching Colors Game', cat: 'Cognitive', time: '10 min', diff: 'Easy', desc: 'Match colored objects to their corresponding color cards.' },
    { title: 'Story Time with Pictures', cat: 'Language', time: '15 min', diff: 'Easy', desc: 'Read illustrated stories and discuss the pictures together.' },
    { title: 'Emotions Card Exercise', cat: 'Social', time: '10 min', diff: 'Easy', desc: 'Use emotion cards to identify and name feelings.' },
    { title: 'Daily Routine Practice', cat: 'Life Skills', time: '20 min', diff: 'Medium', desc: 'Practice routines using visual step-by-step guides.' },
    { title: 'Counting with Objects', cat: 'Math', time: '15 min', diff: 'Easy', desc: 'Use everyday objects to practice counting and basic math.' },
    { title: 'Sensory Play', cat: 'Sensory', time: '20 min', diff: 'Easy', desc: 'Safe sensory activities using sand, water, or playdough.' },
  ];
  return (
    <div className="page">
      <div className="page-head"><h1>Home Activities</h1><p>Fun, inclusive activities for your child to do at home.</p></div>
      <div className="res-grid">
        {list.map((a, i) => (
          <div className="res-card" key={i}>
            <div className="res-top"><Badge label={a.cat} type="blue" /><span className="res-cat">{a.time} · {a.diff}</span></div>
            <div className="res-title">{a.title}</div>
            <div className="res-desc">{a.desc}</div>
            <button className="btn-sm">View Activity</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressTab() {
  const areas = [
    { area: 'Communication', pct: 72, note: 'Using more words this month' },
    { area: 'Social Skills', pct: 55, note: 'Engaging better with peers' },
    { area: 'Learning Activities', pct: 85, note: 'Excellent completion rate' },
    { area: 'Emotional Regulation', pct: 60, note: 'Improving with visual aids' },
  ];
  return (
    <div className="page">
      <div className="page-head"><h1>Child Progress</h1><p>Track your child's development across key areas.</p></div>
      <div className="prog-grid">
        {areas.map((p, i) => (
          <div className="prog-card" key={i}>
            <div className="pc-head"><h3>{p.area}</h3><span className="pc-pct">{p.pct}%</span></div>
            <ProgressBar value={p.pct} />
            <p className="pc-note">{p.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CHILD DASHBOARD
───────────────────────────────────────── */
function ChildDashboard({ user, onLogout }) {
  const [tab, setTab] = useState('play');
  const [done, setDone] = useState([]);
  const activities = [
    { id: 1, title: 'Color Match', desc: 'Match the colors!', icon: 'puzzle', color: '#fef9c3' },
    { id: 2, title: 'How Do I Feel?', desc: 'Name your feelings', icon: 'smile', color: '#dcfce7' },
    { id: 3, title: 'Count with Me', desc: 'Count fun objects', icon: 'star', color: '#dbeafe' },
    { id: 4, title: 'My Daily Routine', desc: "What's your routine?", icon: 'calendar', color: '#fce7f3' },
    { id: 5, title: 'Story Time', desc: 'Read a picture story', icon: 'book', color: '#ede9fe' },
    { id: 6, title: 'Move Your Body', desc: 'Fun exercises!', icon: 'activity', color: '#ffedd5' },
  ];
  const pts = done.length * 10;
  const complete = (id) => { if (!done.includes(id)) setDone(p => [...p, id]); };

  return (
    <div className="child-app">
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
        {['play', 'progress', 'awards'].map(t => (
          <button key={t} className={`child-nav-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {tab === 'play' && (
        <div className="child-grid">
          {activities.map(a => (
            <div key={a.id} className={`child-card ${done.includes(a.id) ? 'child-done' : ''}`} style={{ background: a.color }}>
              <div className="cc-icon"><Icon name={a.icon} size={36} /></div>
              <div className="cc-title">{a.title}</div>
              <div className="cc-desc">{a.desc}</div>
              {done.includes(a.id)
                ? <div className="cc-done-label"><Icon name="check" size={14} /> Done!</div>
                : <button className="cc-btn" onClick={() => complete(a.id)}>Let's Go!</button>}
            </div>
          ))}
        </div>
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
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  return (
    <Shell user={user} onLogout={onLogout} {...notifProps} navItems={nav} activeTab={tab} setActiveTab={setTab}>
      {tab === 'overview' && <AdminOverview />}
      {tab === 'users' && <UsersTab users={users} setUsers={setUsers} />}
      {tab === 'reports' && <ReportsTab />}
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
  const toggle = (id) => setUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  return (
    <div className="page">
      <div className="page-head"><h1>User Management</h1><p>Manage all accounts on the platform.</p></div>
      <div className="table-card">
        <div className="t-head" style={{ gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr' }}>
          <span>Name</span><span>Role</span><span>Email</span><span>Status</span><span>Action</span>
        </div>
        {users.map(u => (
          <div className="t-row" key={u.id} style={{ gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr' }}>
            <span className="t-name"><div className="t-av">{u.name.charAt(0)}</div>{u.name}</span>
            <span><Badge label={u.role} type={u.role === 'teacher' ? 'blue' : u.role === 'parent' ? 'green' : u.role === 'child' ? 'amber' : 'gray'} /></span>
            <span className="t-email">{u.email}</span>
            <span><Badge label={u.status || 'Active'} type={(u.status || 'Active') === 'Active' ? 'green' : 'gray'} /></span>
            <span><button className="btn-sm" onClick={() => toggle(u.id)}>{(u.status || 'Active') === 'Active' ? 'Deactivate' : 'Activate'}</button></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="page">
      <div className="page-head"><h1>Reports</h1><p>Generate and download platform usage reports.</p></div>
      <div className="res-grid">
        {['Training Completion Report', 'Student Progress Report', 'Parent Engagement Report', 'Platform Usage Report'].map((r, i) => (
          <div className="res-card" key={i}>
            <div className="res-top"><Badge label="Report" type="gray" /></div>
            <div className="res-title">{r}</div>
            <div className="res-desc">Download the latest data as PDF or CSV.</div>
            <button className="btn-sm"><Icon name="download" size={13} /> Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="page">
      <div className="page-head"><h1>Settings</h1><p>Manage platform configuration.</p></div>
      <div className="card">
        {[
          { l: 'Platform Name', v: 'InkluKids' },
          { l: 'School', v: 'Rwanda Inclusive School Network' },
          { l: 'Language', v: 'English' },
          { l: 'Notifications', v: 'Enabled' },
        ].map((s, i) => (
          <div className="list-item" key={i}>
            <div className="li-body">
              <div className="li-title">{s.l}</div>
              <div className="li-sub">{s.v}</div>
            </div>
            <button className="btn-sm"><Icon name="edit" size={13} /> Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;