import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaSearch, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


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
  const [isMobile,     setIsMobile]     = useState(window.innerWidth < 768);
  const location   = useLocation();
  const dropRef    = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {/* Top Running Strip with Official Contact Info */}
      <div style={{ 
        background: '#111110', color: 'rgba(255,255,255,0.7)', 
        padding: '10px 0', fontSize: '0.75rem', fontFamily: 'var(--sans)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
        overflow: 'hidden', whiteSpace: 'nowrap'
      }}>
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: 'inline-flex', gap: '60px', paddingRight: '60px' }}
        >
          {/* Main Strip Item */}
          {[1, 2, 3, 4, 5].map((i) => (
            <React.Fragment key={i}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaPhone style={{ fontSize: '11px', color: 'var(--gold)' }} /> 
                <span style={{ fontWeight: 600, color: '#fff' }}>CALL US:</span> +91 98104 12158 / +91 98100 60006
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaEnvelope style={{ fontSize: '11px', color: 'var(--gold)' }} /> 
                <span style={{ fontWeight: 600, color: '#fff' }}>EMAIL:</span> smgmachines@gmail.com
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaMapMarkerAlt style={{ fontSize: '11px', color: 'var(--gold)' }} /> 
                <span style={{ fontWeight: 600, color: '#fff' }}>VISIT:</span> A-57, Phase - II, Mayapuri Industrial Area, New Delhi
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                ISO 9001:2015 CERTIFIED PRECISION ENGINEERING
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>


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
          <img src={logo} alt="SMG Machines" style={{ height: isMobile ? 32 : 40, width: 'auto', objectFit: 'contain' }} />
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
          <Link to="/contact" className="f-nav-cta">
            Get a Quote
          </Link>
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: '36px', bottom: 0, right: 0, left: 0,
              background: 'rgba(245,243,238,0.98)', backdropFilter: 'blur(30px)',
              zIndex: 999, display: 'flex', flexDirection: 'column',
              padding: '40px 1.5rem 4rem',
            }}
          >
            {/* Mobile Header (Search or Close is handled by toggle button but let's add search) */}
            <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-fade)', fontSize: 13 }} />
              <input 
                type="text" placeholder="Search machines..." 
                style={{ width: '100%', background: 'rgba(26,26,24,0.05)', border: 'none', padding: '14px 14px 14px 44px', borderRadius: 12, outline: 'none' }}
              />
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
              {navLinks.map((link, idx) => (
                <div key={link.label}>
                  {link.children ? (
                    <div style={{ borderBottom: '1px solid rgba(26,26,24,0.06)' }}>
                      <button
                        onClick={() => setMobileExpand(p => !p)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', padding: '1.25rem 0', background: 'transparent', border: 'none',
                          cursor: 'pointer', fontFamily: 'var(--display)',
                          fontSize: '1.5rem', color: 'var(--ink)',
                        }}
                      >
                        {link.label}
                        <FaChevronDown style={{ fontSize: 14, transition: 'transform 0.3s', transform: mobileExpand ? 'rotate(180deg)' : 'rotate(0)' }} />
                      </button>
                      <AnimatePresence>
                        {mobileExpand && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{ padding: '0 0 1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
                              {link.children.map(c => (
                                <Link key={c.label} to={c.to}
                                  style={{
                                    display: 'block', padding: '4px 0',
                                    fontFamily: 'var(--sans)', fontSize: '1rem',
                                    color: 'var(--ink-mid)', textDecoration: 'none',
                                  }}
                                >
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link to={link.to}
                      style={{
                        display: 'block', padding: '1.25rem 0',
                        fontFamily: 'var(--display)',
                        fontSize: '1.5rem',
                        color: isActive(link.to) ? 'var(--brand-blue)' : 'var(--ink)',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(26,26,24,0.06)',
                      }}
                    >
                      {link.label}
                      {isActive(link.to) && <span style={{ marginLeft: 12, fontSize: '0.8rem', verticalAlign: 'middle' }}>●</span>}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <Link to="/contact" className="btn-pill btn-pill-dark" style={{ width: '100%', justifyContent: 'center', height: 56 }}>
                Request Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
