import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <h1 className="logo">ECharts vs Chart.js</h1>
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
              >
                Compare
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className={location.pathname === '/features' ? 'active' : ''}
              >
                ECharts Features
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
