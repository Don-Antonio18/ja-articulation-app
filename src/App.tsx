import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import SpinPage from './pages/SpinPage';
import TimerPage from './pages/TimerPage';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link nav-link--active' : 'nav-link';

export default function App() {
  return (
    <div className="app-shell">
      <header className="top-nav" aria-label="Primary">
        <nav className="nav-links">
          <NavLink to="/spin" className={navLinkClass} end>
            Spin
          </NavLink>
          <NavLink to="/timer" className={navLinkClass}>
            Timer
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/spin" replace />} />
          <Route path="/spin" element={<SpinPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="*" element={<Navigate to="/spin" replace />} />
        </Routes>
      </main>
    </div>
  );
}
