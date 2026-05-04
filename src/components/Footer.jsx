import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaYoutube, FaInstagram, FaArrowUp } from 'react-icons/fa';
import logo from '../assets/logo.webp';

const footerLinks = {
  Solutions: [
    { label: 'VMC Machines',         to: '/products?category=vmc-machines' },
    { label: 'CNC Turning Centers',  to: '/products?category=cnc-machines' },
    { label: 'HMC Machines',         to: '/products?category=hmc-machines' },
    { label: 'Special Purpose',      to: '/products?category=special-purpose-machines' },
    { label: 'Grinding Solutions',    to: '/products?category=grinding-machines' },
  ],
  Enterprise: [
    { label: 'Our Story',        to: '/about' },
    { label: 'Infrastructure',  to: '/infrastructure' },
    { label: 'The Ledger',      to: '/blog' },
    { label: 'Quality Standards',  to: '/about#quality' },
    { label: 'Careers',         to: '/contact' },
  ],
  Support: [
    { label: 'Technical Center',  to: '/contact' },
    { label: 'Inquiry Portal',     to: '/contact' },
    { label: 'Service Request', to: '/contact' },
    { label: 'Global Network',     to: '/contact' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--ink)', color: '#fff', padding: '80px 0 40px', position: 'relative' }}>
      
      <div className="max-w-wide" style={{ padding: '0 2rem' }}>
        
        {/* ── Top CTA ── */}
        <div style={{ marginBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '32px' }}>
            <div>
              <div className="f-section-label" style={{ color: 'var(--brand-gold)', marginBottom: '16px' }}>
                <span>Partner With Us</span>
              </div>
              <h2 className="f-display" style={{ fontSize: '3.5rem', lineHeight: 1.1, color: '#fff', margin: 0 }}>
                Let’s build the <span className="f-display-italic" style={{ color: 'var(--brand-gold)' }}>future together.</span>
              </h2>
            </div>
            <Link to="/contact" className="btn-pill btn-pill-gold">
              Start a Conversation
            </Link>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '40px', marginBottom: '80px' }}>
          
          {/* Brand Column */}
          <div style={{ paddingRight: '40px' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '24px' }}>
              <img src={logo} alt="SMG Machines" style={{ height: 36, filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="f-body" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
              Pioneering precision engineering solutions for the world's most demanding industries since 1998.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[FaLinkedin, FaInstagram, FaYoutube].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -3, color: 'var(--brand-gold)' }}
                  href="#" 
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="f-label" style={{ color: '#fff', marginBottom: '24px', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.to} className="f-body" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.3s' }} 
                      onMouseEnter={(e) => e.target.style.color = 'var(--brand-gold)'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>

        {/* ── Bottom Bar ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <p className="f-label" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>
              © {new Date().getFullYear()} SMG MACHINES PVT. LTD.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['PRIVACY', 'TERMS', 'COOKIES'].map((item) => (
                <a key={item} href="#" className="f-label" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', textDecoration: 'none' }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '0' }}
            className="f-label hover-text-gold"
          >
            <span style={{ fontSize: '0.7rem' }}>BACK TO TOP</span>
            <FaArrowUp fontSize="10px" />
          </button>
        </div>

      </div>
    </footer>
  );
}
