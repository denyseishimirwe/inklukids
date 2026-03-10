import { useState } from 'react';
import './App.css';

// ─── ROUTER (simple hash-based) ───────────────────────────────────────────────
function useRoute() {
  const [page, setPage] = useState('home');
  return { page, go: setPage };
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const { page, go } = useRoute();
  const [user, setUser] = useState(null); // { name, role }

  const handleLogin = (userData) => {
    setUser(userData);
    go(userData.role === 'teacher' ? 'teacher-dashboard' : userData.role === 'parent' ? 'parent-dashboard' : 'admin-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    go('home');
  };

  if (page === 'home') return <LandingPage go={go} />;
  if (page === 'login') return <LoginPage go={go} onLogin={handleLogin} />;
  if (page === 'teacher-dashboard') return <TeacherDashboard user={user} onLogout={handleLogout} />;
  if (page === 'parent-dashboard') return <ParentDashboard user={user} onLogout={handleLogout} />;
  if (page === 'admin-dashboard') return <AdminDashboard user={user} onLogout={handleLogout} />;
  return <LandingPage go={go} />;
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ go }) {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">🎓 InkluKids</div>
        <div className="navbar-right">
          <button className="btn-outline" onClick={() => go('login')}>Log In</button>
          <button className="btn-primary" onClick={() => go('login')}>Get Started</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">🌟 Supporting Autism Inclusion in Rwanda</div>
        <h1>Every Child Deserves<br /><span className="hero-accent">to Belong</span></h1>
        <p>InkluKids empowers teachers and parents with the training, tools, and resources to create truly inclusive learning environments for children with autism.</p>
        <div className="hero-actions">
          <button className="btn-primary btn-large" onClick={() => go('login')}>Get Started Free →</button>
          <button className="btn-outline btn-large" onClick={() => go('login')}>Sign In</button>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>500+</strong><span>Teachers Trained</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>1,200+</strong><span>Children Supported</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>80+</strong><span>Schools Enrolled</span></div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-label">WHAT WE OFFER</div>
        <h2>Everything You Need in One Place</h2>
        <p className="section-sub">Powerful tools designed for educators, parents, and schools</p>
        <div className="cards-grid">
          {[
            { icon: '🎓', title: 'Teacher Training', desc: 'Professional development courses and workshops on inclusive education for autistic children.' },
            { icon: '📈', title: 'Child Progress', desc: 'Track and monitor student development, participation, and achievement over time.' },
            { icon: '📅', title: 'Activities', desc: 'Manage and schedule inclusive educational activities tailored for autistic learners.' },
            { icon: '📖', title: 'Parent Guidelines', desc: 'Resources, video tutorials, and tips for supporting your child\'s development at home.' },
            { icon: '💬', title: 'Communication', desc: 'Easy, secure messaging between educators and parents within the platform.' },
            { icon: '🏫', title: 'School Admin', desc: 'Monitor usage, generate reports, and manage all accounts across your school.' },
          ].map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="why-content">
          <div className="section-label light">WHY INKLUKIDS</div>
          <h2>Built for Rwanda's Schools</h2>
          <p>Empowering educators and families to give every autistic child the education they deserve.</p>
          <div className="why-grid">
            {[
              'Easy-to-use dashboard for all stakeholders',
              'Comprehensive tools for tracking child progress',
              'Resources and support for educators and parents',
              'Secure and reliable platform for all schools',
              'Dedicated support and ongoing updates',
              'Inclusive approach designed for Rwandan context',
            ].map((item, i) => (
              <div className="why-item" key={i}>
                <span className="check">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="roles-section">
        <div className="section-label">WHO IT'S FOR</div>
        <h2>One Platform, Three Roles</h2>
        <div className="roles-grid">
          {[
            { icon: '👩‍🏫', role: 'Teachers', color: '#dbeafe', desc: 'Access training modules, track student progress, and get classroom resources.' },
            { icon: '👨‍👩‍👧', role: 'Parents', color: '#dcfce7', desc: 'View home activities, monitor your child\'s growth, and stay connected with teachers.' },
            { icon: '🏫', role: 'Administrators', color: '#fef3c7', desc: 'Oversee platform usage, manage accounts, and generate school-wide reports.' },
          ].map((r, i) => (
            <div className="role-card" key={i} style={{ backgroundColor: r.color }}>
              <div className="role-icon">{r.icon}</div>
              <h3>{r.role}</h3>
              <p>{r.desc}</p>
              <button className="btn-dark" onClick={() => go('login')}>Get Started →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join hundreds of Rwandan educators using InkluKids to support children with autism.</p>
        <button className="btn-primary btn-large" onClick={() => go('login')}>Create Free Account →</button>
      </section>

      <footer className="footer">
        <div className="footer-brand">🎓 InkluKids</div>
        <p>Supporting autism inclusion in Rwandan schools.</p>
        <p className="footer-copy">© 2024 InkluKids. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ go, onLogin }) {
  const [role, setRole] = useState('teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return; }
    // Demo login — replace with real auth
    const names = { teacher: 'Ms. Uwase', parent: 'Mr. Habimana', admin: 'Admin' };
    onLogin({ name: names[role], role, email });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="back-btn" onClick={() => go('home')}>← Back</button>
        <div className="auth-brand">🎓 InkluKids</div>
        <h2>Welcome Back</h2>
        <p className="auth-sub">Sign in to your account</p>

        <div className="role-tabs">
          {['teacher', 'parent', 'admin'].map(r => (
            <button key={r} className={`role-tab ${role === r ? 'active' : ''}`} onClick={() => setRole(r)}>
              {r === 'teacher' ? '👩‍🏫 Teacher' : r === 'parent' ? '👨‍👩‍👧 Parent' : '🏫 Admin'}
            </button>
          ))}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder={role === 'teacher' ? 'yourname@school.rw' : 'your@email.com'} value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button className="btn-primary btn-full" onClick={handleSubmit}>Sign In →</button>
        <p className="auth-note">Don't have an account? <span className="link" onClick={() => go('login')}>Contact your school admin</span></p>
      </div>
    </div>
  );
}

// ─── TEACHER DASHBOARD ────────────────────────────────────────────────────────
function TeacherDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: '🏠 Home' },
    { id: 'training', label: '🎓 Training' },
    { id: 'students', label: '📈 Students' },
    { id: 'resources', label: '📖 Resources' },
    { id: 'messages', label: '💬 Messages' },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">🎓 InkluKids</div>
        <nav className="sidebar-nav">
          {tabs.map(t => (
            <button key={t.id} className={`nav-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">👩‍🏫</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">Teacher</div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>Log Out</button>
        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'home' && <TeacherHome user={user} />}
        {activeTab === 'training' && <TrainingModules />}
        {activeTab === 'students' && <StudentProgress />}
        {activeTab === 'resources' && <ResourceLibrary />}
        {activeTab === 'messages' && <Messages role="teacher" />}
      </main>
    </div>
  );
}

function TeacherHome({ user }) {
  return (
    <div className="dash-content">
      <div className="dash-header">
        <div>
          <h1>Good morning, {user?.name} 👋</h1>
          <p>Here's what's happening with your students today.</p>
        </div>
      </div>
      <div className="stats-row">
        {[
          { label: 'Students', value: '12', icon: '👦', color: '#dbeafe' },
          { label: 'Training Progress', value: '68%', icon: '🎓', color: '#dcfce7' },
          { label: 'Pending Activities', value: '3', icon: '📅', color: '#fef3c7' },
          { label: 'New Messages', value: '2', icon: '💬', color: '#fce7f3' },
        ].map((s, i) => (
          <div className="stat-card" key={i} style={{ backgroundColor: s.color }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="dash-grid">
        <div className="dash-widget">
          <h3>📚 Continue Training</h3>
          <div className="training-item">
            <div>
              <div className="training-title">Module 3: Visual Communication</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '60%' }} /></div>
              <small>60% complete</small>
            </div>
            <button className="btn-small">Resume</button>
          </div>
          <div className="training-item">
            <div>
              <div className="training-title">Module 4: Sensory Strategies</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '10%' }} /></div>
              <small>Not started</small>
            </div>
            <button className="btn-small">Start</button>
          </div>
        </div>
        <div className="dash-widget">
          <h3>👦 Student Highlights</h3>
          {[
            { name: 'Amani K.', progress: 'Great week — completed 4 activities', status: '🟢' },
            { name: 'Blaise M.', progress: 'Needs check-in — missed 2 sessions', status: '🟡' },
            { name: 'Clarisse N.', progress: 'Excellent participation today', status: '🟢' },
          ].map((s, i) => (
            <div className="student-row" key={i}>
              <div className="student-avatar">{s.status}</div>
              <div>
                <div className="student-name">{s.name}</div>
                <div className="student-note">{s.progress}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrainingModules() {
  const modules = [
    { title: 'Module 1: Understanding Autism', desc: 'Foundations of autism spectrum disorder and inclusive education.', progress: 100, status: 'Completed' },
    { title: 'Module 2: Inclusive Classroom Setup', desc: 'How to design a classroom that works for autistic learners.', progress: 100, status: 'Completed' },
    { title: 'Module 3: Visual Communication', desc: 'Using visual cues, schedules, and picture cards effectively.', progress: 60, status: 'In Progress' },
    { title: 'Module 4: Sensory Strategies', desc: 'Managing sensory sensitivities in the classroom environment.', progress: 0, status: 'Not Started' },
    { title: 'Module 5: Behavior Support', desc: 'Positive behavior support strategies for autistic children.', progress: 0, status: 'Not Started' },
    { title: 'Module 6: Parent Collaboration', desc: 'Building strong home-school connections for better outcomes.', progress: 0, status: 'Not Started' },
  ];
  return (
    <div className="dash-content">
      <h1>Training Modules 🎓</h1>
      <p>Complete all modules to earn your inclusive education certificate.</p>
      <div className="progress-overview">
        <div className="progress-bar large"><div className="progress-fill" style={{ width: '33%' }} /></div>
        <span>2 of 6 modules completed</span>
      </div>
      <div className="modules-list">
        {modules.map((m, i) => (
          <div className="module-card" key={i}>
            <div className="module-num">{i + 1}</div>
            <div className="module-info">
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              {m.progress > 0 && <div className="progress-bar"><div className="progress-fill" style={{ width: `${m.progress}%` }} /></div>}
            </div>
            <div className="module-right">
              <span className={`status-badge ${m.status === 'Completed' ? 'green' : m.status === 'In Progress' ? 'blue' : 'gray'}`}>{m.status}</span>
              <button className="btn-small">{m.status === 'Completed' ? 'Review' : m.status === 'In Progress' ? 'Resume' : 'Start'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentProgress() {
  const students = [
    { name: 'Amani Kagabo', age: 8, activities: 12, attendance: '90%', status: 'On Track', note: 'Excelling in visual activities' },
    { name: 'Blaise Mugisha', age: 7, activities: 7, attendance: '70%', status: 'Needs Support', note: 'Struggling with transitions' },
    { name: 'Clarisse Nziza', age: 9, activities: 15, attendance: '95%', status: 'On Track', note: 'Great social engagement' },
    { name: 'Dieudonne Habu', age: 8, activities: 9, attendance: '80%', status: 'On Track', note: 'Improving communication' },
  ];
  return (
    <div className="dash-content">
      <h1>Student Progress 📈</h1>
      <p>Monitor and track each child's development and participation.</p>
      <div className="students-table">
        <div className="table-header">
          <span>Student</span><span>Age</span><span>Activities</span><span>Attendance</span><span>Status</span><span>Notes</span>
        </div>
        {students.map((s, i) => (
          <div className="table-row" key={i}>
            <span className="student-name-cell">👦 {s.name}</span>
            <span>{s.age}</span>
            <span>{s.activities}</span>
            <span>{s.attendance}</span>
            <span><span className={`status-badge ${s.status === 'On Track' ? 'green' : 'yellow'}`}>{s.status}</span></span>
            <span className="note-cell">{s.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourceLibrary() {
  const resources = [
    { type: '📄', title: 'Visual Schedule Templates', category: 'Classroom Tools', desc: 'Printable daily schedule cards for autistic learners.' },
    { type: '🎥', title: 'Communication Strategies Video', category: 'Video', desc: 'Step-by-step video on using AAC devices in class.' },
    { type: '📄', title: 'Sensory Checklist', category: 'Assessment', desc: 'Identify sensory sensitivities in your students.' },
    { type: '📄', title: 'Inclusive Lesson Plan Template', category: 'Classroom Tools', desc: 'Lesson plan structure for mixed-ability classrooms.' },
    { type: '🎥', title: 'Positive Behavior Support', category: 'Video', desc: 'Practical strategies for managing behavior positively.' },
    { type: '📄', title: 'Parent Communication Guide', category: 'Communication', desc: 'Tips for effective home-school collaboration.' },
  ];
  return (
    <div className="dash-content">
      <h1>Resource Library 📖</h1>
      <p>Visual aids, lesson plans, and guides to support your teaching.</p>
      <div className="resources-grid">
        {resources.map((r, i) => (
          <div className="resource-card" key={i}>
            <div className="resource-type">{r.type}</div>
            <div className="resource-info">
              <div className="resource-category">{r.category}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
            <button className="btn-small">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Messages({ role }) {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { from: 'Ms. Uwase', text: "Amani had a great session today! He engaged really well with the visual schedule.", time: '9:15 AM', mine: role === 'teacher' },
    { from: "Amani's Parent", text: "Thank you! He also talked about it at dinner. Could you share what visuals you used?", time: '6:30 PM', mine: role === 'parent' },
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { from: 'You', text: msg, time: 'Now', mine: true }]);
    setMsg('');
  };

  return (
    <div className="dash-content">
      <h1>Messages 💬</h1>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.mine ? 'mine' : 'theirs'}`}>
              <div className="message-from">{m.from}</div>
              <div className="message-bubble">{m.text}</div>
              <div className="message-time">{m.time}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." />
          <button className="btn-primary" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}

// ─── PARENT DASHBOARD ─────────────────────────────────────────────────────────
function ParentDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const tabs = [
    { id: 'home', label: '🏠 Home' },
    { id: 'activities', label: '📅 Activities' },
    { id: 'progress', label: '📈 Progress' },
    { id: 'resources', label: '📖 Resources' },
    { id: 'messages', label: '💬 Messages' },
  ];
  return (
    <div className="dashboard">
      <aside className="sidebar green">
        <div className="sidebar-brand">🎓 InkluKids</div>
        <nav className="sidebar-nav">
          {tabs.map(t => (
            <button key={t.id} className={`nav-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">👨‍👩‍👧</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">Parent</div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>Log Out</button>
        </div>
      </aside>
      <main className="main-content">
        {activeTab === 'home' && <ParentHome user={user} />}
        {activeTab === 'activities' && <HomeActivities />}
        {activeTab === 'progress' && <ChildProgress />}
        {activeTab === 'resources' && <ResourceLibrary />}
        {activeTab === 'messages' && <Messages role="parent" />}
      </main>
    </div>
  );
}

function ParentHome({ user }) {
  return (
    <div className="dash-content">
      <div className="dash-header">
        <div>
          <h1>Hello, {user?.name} 👋</h1>
          <p>Here's an update on your child's progress.</p>
        </div>
      </div>
      <div className="stats-row">
        {[
          { label: "Activities Done", value: '8', icon: '✅', color: '#dcfce7' },
          { label: "This Week", value: '3', icon: '📅', color: '#dbeafe' },
          { label: "School Progress", value: 'Good', icon: '📈', color: '#fef3c7' },
          { label: "New Resources", value: '4', icon: '📖', color: '#fce7f3' },
        ].map((s, i) => (
          <div className="stat-card" key={i} style={{ backgroundColor: s.color }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="dash-grid">
        <div className="dash-widget">
          <h3>📅 Today's Activities</h3>
          {[
            { title: 'Matching Colors Game', time: '10 min', done: true },
            { title: 'Story Time with Pictures', time: '15 min', done: true },
            { title: 'Emotions Card Exercise', time: '10 min', done: false },
          ].map((a, i) => (
            <div className="activity-row" key={i}>
              <span>{a.done ? '✅' : '⏳'}</span>
              <div>
                <div className="activity-title">{a.title}</div>
                <div className="activity-meta">{a.time}</div>
              </div>
              {!a.done && <button className="btn-small">Start</button>}
            </div>
          ))}
        </div>
        <div className="dash-widget">
          <h3>💬 Latest from Teacher</h3>
          <div className="teacher-message">
            <div className="message-avatar">👩‍🏫</div>
            <div>
              <div className="teacher-name">Ms. Uwase</div>
              <p>"Amani had a wonderful week. His engagement with visual activities has improved significantly. Keep up the great work at home!"</p>
              <small>Yesterday at 4:30 PM</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeActivities() {
  const activities = [
    { title: 'Matching Colors Game', category: 'Cognitive', time: '10 min', difficulty: 'Easy', desc: 'Match colored objects to their corresponding color cards.' },
    { title: 'Story Time with Pictures', category: 'Language', time: '15 min', difficulty: 'Easy', desc: 'Read simple illustrated stories and discuss the pictures together.' },
    { title: 'Emotions Card Exercise', category: 'Social', time: '10 min', difficulty: 'Easy', desc: 'Use emotion picture cards to identify and name feelings.' },
    { title: 'Daily Routine Practice', category: 'Life Skills', time: '20 min', difficulty: 'Medium', desc: 'Practice step-by-step morning or evening routines using visual guides.' },
    { title: 'Counting with Objects', category: 'Math', time: '15 min', difficulty: 'Easy', desc: 'Use everyday objects to practice counting and basic math.' },
    { title: 'Sensory Play', category: 'Sensory', time: '20 min', difficulty: 'Easy', desc: 'Safe sensory activities using materials like sand, water, or playdough.' },
  ];
  return (
    <div className="dash-content">
      <h1>Home Activities 📅</h1>
      <p>Fun, inclusive activities for your child to do at home.</p>
      <div className="resources-grid">
        {activities.map((a, i) => (
          <div className="resource-card" key={i}>
            <div className="resource-info">
              <div className="resource-category">{a.category} · {a.time} · {a.difficulty}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
            <button className="btn-small">View Activity</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChildProgress() {
  return (
    <div className="dash-content">
      <h1>Child Progress 📈</h1>
      <p>Track your child's development and participation at school.</p>
      <div className="progress-cards">
        {[
          { area: 'Communication', progress: 72, note: 'Using more words this month' },
          { area: 'Social Skills', progress: 55, note: 'Engaging better with peers' },
          { area: 'Learning Activities', progress: 85, note: 'Excellent completion rate' },
          { area: 'Emotional Regulation', progress: 60, note: 'Improving with visual aids' },
        ].map((p, i) => (
          <div className="progress-area-card" key={i}>
            <div className="progress-area-header">
              <h3>{p.area}</h3>
              <span className="progress-pct">{p.progress}%</span>
            </div>
            <div className="progress-bar large"><div className="progress-fill" style={{ width: `${p.progress}%` }} /></div>
            <p className="progress-note">💡 {p.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const tabs = [
    { id: 'home', label: '🏠 Overview' },
    { id: 'users', label: '👥 Users' },
    { id: 'reports', label: '📊 Reports' },
  ];
  return (
    <div className="dashboard">
      <aside className="sidebar amber">
        <div className="sidebar-brand">🎓 InkluKids</div>
        <nav className="sidebar-nav">
          {tabs.map(t => (
            <button key={t.id} className={`nav-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">🏫</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>Log Out</button>
        </div>
      </aside>
      <main className="main-content">
        {activeTab === 'home' && (
          <div className="dash-content">
            <h1>School Overview 🏫</h1>
            <p>Monitor platform usage across your school.</p>
            <div className="stats-row">
              {[
                { label: 'Total Teachers', value: '24', icon: '👩‍🏫', color: '#dbeafe' },
                { label: 'Total Parents', value: '87', icon: '👨‍👩‍👧', color: '#dcfce7' },
                { label: 'Students Tracked', value: '63', icon: '👦', color: '#fef3c7' },
                { label: 'Active This Week', value: '41', icon: '📊', color: '#fce7f3' },
              ].map((s, i) => (
                <div className="stat-card" key={i} style={{ backgroundColor: s.color }}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="dash-widget" style={{ marginTop: 24 }}>
              <h3>📊 Training Completion by Teacher</h3>
              {[
                { name: 'Ms. Uwase', completed: 6, total: 6 },
                { name: 'Mr. Nkurunziza', completed: 4, total: 6 },
                { name: 'Ms. Mutesi', completed: 3, total: 6 },
                { name: 'Mr. Bizimana', completed: 1, total: 6 },
              ].map((t, i) => (
                <div className="training-item" key={i}>
                  <div style={{ flex: 1 }}>
                    <div className="training-title">{t.name} — {t.completed}/{t.total} modules</div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${(t.completed / t.total) * 100}%` }} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'users' && (
          <div className="dash-content">
            <h1>User Management 👥</h1>
            <p>Manage teacher and parent accounts.</p>
            <div className="students-table">
              <div className="table-header"><span>Name</span><span>Role</span><span>Email</span><span>Status</span><span>Action</span></div>
              {[
                { name: 'Ms. Uwase', role: 'Teacher', email: 'uwase@school.rw', status: 'Active' },
                { name: 'Mr. Habimana', role: 'Parent', email: 'habimana@gmail.com', status: 'Active' },
                { name: 'Ms. Mutesi', role: 'Teacher', email: 'mutesi@school.rw', status: 'Active' },
                { name: 'Mrs. Umubyeyi', role: 'Parent', email: 'umubyeyi@gmail.com', status: 'Inactive' },
              ].map((u, i) => (
                <div className="table-row" key={i}>
                  <span>{u.name}</span>
                  <span>{u.role}</span>
                  <span>{u.email}</span>
                  <span><span className={`status-badge ${u.status === 'Active' ? 'green' : 'gray'}`}>{u.status}</span></span>
                  <span><button className="btn-small">Edit</button></span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'reports' && (
          <div className="dash-content">
            <h1>Reports 📊</h1>
            <p>Generate and download platform usage reports.</p>
            <div className="resources-grid">
              {['Training Completion Report', 'Student Progress Report', 'Parent Engagement Report', 'Platform Usage Report'].map((r, i) => (
                <div className="resource-card" key={i}>
                  <div className="resource-type">📊</div>
                  <div className="resource-info"><h3>{r}</h3><p>Download the latest data as a PDF or CSV.</p></div>
                  <button className="btn-small">Download</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;