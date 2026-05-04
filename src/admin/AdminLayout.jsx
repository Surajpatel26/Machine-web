import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaEnvelope, FaQuoteLeft, FaBoxOpen,
  FaBlog, FaSignOutAlt, FaChevronRight, FaBars, FaTimes,
  FaGlobe
} from 'react-icons/fa';
import './admin.css';
import logo from '../assets/logo.webp';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt, exact: true },
  { name: 'Enquiries', path: '/admin/enquiries', icon: FaEnvelope },
  { name: 'Testimonials', path: '/admin/testimonials', icon: FaQuoteLeft },
  { name: 'Products', path: '/admin/products', icon: FaBoxOpen },
  { name: 'Blogs', path: '/admin/blogs', icon: FaBlog },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('smg_token');
    if (!token) navigate('/admin/login');
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('smg_token');
    navigate('/admin/login');
  };

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  const currentPage = navItems.find(i => isActive(i));
  const pageTitle = currentPage?.name || 'Admin';

  return (
    <div className="admin-root" style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8F9FB' }}>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 30 }}
          className="lg-hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar" style={{
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        position: window.innerWidth < 1024 ? 'fixed' : 'static',
        zIndex: 40,
        height: '100vh',
      }}>
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <img src={logo} alt="SMG Machines" style={{ height: 34, width: 'auto', filter: 'brightness(1.2)' }} />
          <div className="admin-sidebar-brand">SMG Machines</div>
          <div className="admin-sidebar-sub">Admin Console</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          <div className="admin-nav-section-label">Navigation</div>
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`admin-nav-item${active ? ' active' : ''}`}
              >
                <span className="nav-icon"><item.icon size={14} /></span>
                <span style={{ flex: 1 }}>{item.name}</span>
                {active && <FaChevronRight size={9} style={{ opacity: 0.5 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-sidebar-footer-btn">
            <FaGlobe size={13} /> Visit Website
          </Link>
          <button onClick={handleLogout} className="admin-sidebar-footer-btn danger">
            <FaSignOutAlt size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: window.innerWidth >= 1024 ? 'none' : 'flex',
              width: 34, height: 34, alignItems: 'center', justifyContent: 'center',
              border: '1px solid #E5E7EB', borderRadius: 7, background: 'white',
              cursor: 'pointer', color: '#6B7280', flexShrink: 0
            }}
          >
            {sidebarOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
          </button>

          <div style={{ flex: 1 }}>
            <div className="admin-topbar-title">{pageTitle}</div>
            <div className="admin-topbar-sub">SMG Machines · Management Console</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', background: '#F9FAFB', border: '1px solid #E5E7EB',
              borderRadius: 8
            }}>
              <div className="admin-avatar">A</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>Admin</div>
                <div style={{ fontSize: 11, color: '#9CA3AF' }}>Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
