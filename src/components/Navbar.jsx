import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.webp';

const navLinks = [
  { label: 'Home',           to: '/' },
  { label: 'About',          to: '/about' },
  {
    label: 'Products', to: '/products',
    children: [
      { label: 'VMC Machines',             to: '/products?category=vmc-machines',             desc: 'High-speed vertical machining centers' },
      { label: 'CNC Turning Lathes',       to: '/products?category=cnc-machines',             desc: 'Precision 2-axis turning centers' },
      { label: 'HMC Machines',             to: '/products?category=hmc-machines',             desc: 'Horizontal machining with pallet changers' },
      { label: 'Special Purpose Machines', to: '/products?category=special-purpose-machines', desc: 'Custom-engineered production solutions' },
      { label: 'Grinding Machines',        to: '/products?category=grinding-machines',        desc: 'Surface & cylindrical precision grinding' },
    ],
  },
  { label: 'Infrastructure', to: '/infrastructure' },
  { label: 'Blog',           to: '/blog' },
  { label: 'Contact',        to: '/contact' },
];

export default function Navbar() {
  const [isOpen,       setIsOpen]       = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [dropOpen,     setDropOpen]     = useState(false);
  const [mobileExpand, setMobileExpand] = useState(false);
  const location   = useLocation();
  const dropRef    = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false); setDropOpen(false); setMobileExpand(false);
  }, [location]);

  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = to => location.pathname === to || (to !== '/' && location.pathname.startsWith(to.split('?')[0]));
  const handleMouseEnter = () => { clearTimeout(leaveTimer.current); setDropOpen(true); };
  const handleMouseLeave = () => { leaveTimer.current = setTimeout(() => setDropOpen(false), 150); };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="f-nav"
        style={{
          background: scrolled ? 'rgba(245,243,238,0.95)' : 'rgba(245,243,238,0.82)',
          boxShadow: scrolled ? '0 2px 24px rgba(26,26,24,0.08)' : 'none',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <img src={logo} alt="SMG Machines" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* Centre pill nav */}
        <ul className="f-nav-links" style={{ display: 'none' }} id="f-desktop-nav">
          {navLinks.map(link =>
            link.children ? (
              <li key={link.label} ref={dropRef} style={{ position: 'relative' }}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button
                  onClick={() => setDropOpen(p => !p)}
                  className={`f-nav-link ${isActive(link.to) ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  {link.label}
                  <FaChevronDown style={{
                    fontSize: 9, transition: 'transform 0.2s',
                    transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }} />
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                        transform: 'translateX(-50%)', width: 280,
                        background: '#EDEBE6', borderRadius: 20,
                        boxShadow: '0 16px 60px rgba(26,26,24,0.14)',
                        border: '1px solid rgba(26,26,24,0.08)',
                        overflow: 'hidden', zIndex: 200,
                      }}
                    >
                      <Link to="/products"
                        style={{
                          display: 'block', padding: '12px 18px 10px',
                          fontFamily: 'var(--sans)', fontSize: '0.75rem',
                          fontWeight: 600, letterSpacing: '0.06em',
                          textTransform: 'uppercase', color: 'var(--ink-light)',
                          textDecoration: 'none', borderBottom: '1px solid rgba(26,26,24,0.07)',
                        }}
                      >
                        Browse Full Catalogue →
                      </Link>
                      {link.children.map((child, ci) => (
                        <Link key={child.label} to={child.to}
                          style={{
                            display: 'block', padding: '11px 18px',
                            textDecoration: 'none',
                            borderBottom: ci < link.children.length - 1 ? '1px solid rgba(26,26,24,0.05)' : 'none',
                            transition: 'background 0.18s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,26,24,0.04)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: 2 }}>
                            {child.label}
                          </div>
                          <div style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'var(--ink-light)' }}>
                            {child.desc}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link to={link.to} className={`f-nav-link ${isActive(link.to) ? 'active' : ''}`}>
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <a href="/contact" className="f-nav-cta">
            Get a Quote
          </a>
          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(p => !p)}
            style={{
              display: 'none',
              background: 'rgba(26,26,24,0.08)', border: 'none', cursor: 'pointer',
              color: 'var(--ink)', padding: '8px', borderRadius: '50%',
              width: 36, height: 36, alignItems: 'center', justifyContent: 'center',
            }}
            id="f-mobile-toggle"
          >
            {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Inline style to show/hide based on screen width */}
      <style>{`
        @media (min-width: 768px) { #f-desktop-nav { display: flex !important; } }
        @media (max-width: 767px) { #f-mobile-toggle { display: flex !important; } }
      `}</style>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0,
              background: 'rgba(245,243,238,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(26,26,24,0.1)',
              zIndex: 999, padding: '1rem 1.5rem 1.5rem',
            }}
          >
            {navLinks.map(link => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setMobileExpand(p => !p)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', padding: '12px 0', background: 'transparent', border: 'none',
                        cursor: 'pointer', fontFamily: 'var(--sans)', fontWeight: 600,
                        fontSize: '1rem', color: 'var(--ink)',
                        borderBottom: '1px solid rgba(26,26,24,0.07)',
                      }}
                    >
                      {link.label}
                      <FaChevronDown style={{ fontSize: 11, transition: 'transform 0.2s', transform: mobileExpand ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    <AnimatePresence>
                      {mobileExpand && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '8px 0 0 16px' }}>
                            {link.children.map(c => (
                              <Link key={c.label} to={c.to}
                                style={{
                                  display: 'block', padding: '10px 0',
                                  fontFamily: 'var(--sans)', fontSize: '0.9rem',
                                  color: 'var(--ink-mid)', textDecoration: 'none',
                                  borderBottom: '1px solid rgba(26,26,24,0.05)',
                                }}
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={link.to}
                    style={{
                      display: 'block', padding: '12px 0',
                      fontFamily: 'var(--sans)', fontWeight: isActive(link.to) ? 600 : 400,
                      fontSize: '1rem',
                      color: isActive(link.to) ? 'var(--ink)' : 'var(--ink-mid)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(26,26,24,0.07)',
                    }}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/contact" className="btn-pill btn-pill-dark" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
              Get a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
