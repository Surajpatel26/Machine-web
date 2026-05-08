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
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--ink)', color: '#fff', padding: '6rem 0 3rem', position: 'relative' }}>
      
      <div className="max-w-wide">
        
        {/* ── Top CTA ── */}
        <div style={{ marginBottom: '5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
              <div>
                <div className="f-section-label" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
                  <span>Partner With Us</span>
                </div>
                <h2 className="f-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1, color: '#fff' }}>
                  Let’s build the <span className="f-display-italic" style={{ color: 'var(--gold)' }}>future together.</span>
                </h2>
              </div>
              <div className="footer-cta-wrapper">
                <Link to="/contact" className="btn-pill btn-pill-gold" style={{ height: 56, padding: '0 3rem' }}>
                  Start a Conversation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid-4" style={{ gap: '3rem 2rem', marginBottom: '6rem' }}>
          
          {/* Brand Column */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '24px' }}>
              <img src={logo} alt="SMG Machines" style={{ height: 36, filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="f-body" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: 300 }}>
              Pioneering precision engineering solutions for the world's most demanding industries since 1998.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[FaLinkedin, FaInstagram, FaYoutube].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -3, color: 'var(--gold)' }}
                  href="#" 
                  style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.05)', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', 
                    color: 'rgba(255,255,255,0.5)', transition: 'all 0.3s' 
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="f-label" style={{ color: '#fff', marginBottom: '24px', fontSize: '0.75rem', letterSpacing: '0.15em', opacity: 0.8 }}>{category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.to} className="f-body" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s' }} 
                      onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 className="f-label" style={{ color: '#fff', marginBottom: '24px', fontSize: '0.75rem', letterSpacing: '0.15em', opacity: 0.8 }}>CONTACT US</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <FaMapMarkerAlt style={{ color: 'var(--gold)', marginTop: '4px', flexShrink: 0 }} />
                <span className="f-body" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  A-57, Phase - II, Mayapuri Industrial Area, New Delhi - 110064
                </span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <FaPhone style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span className="f-body" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                  +91 98104 12158 / 98100 60006
                </span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <FaEnvelope style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span className="f-body" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                  smgmachines@gmail.com
                </span>
              </li>
            </ul>
          </div>


          
        </div>

        {/* ── Bottom Bar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '3rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
              <p className="f-label" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem' }}>
                © {new Date().getFullYear()} SMG MACHINES PVT. LTD.
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                {['PRIVACY', 'TERMS', 'COOKIES'].map((item) => (
                  <a key={item} href="#" className="f-label" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', textDecoration: 'none' }}>
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
              <span style={{ fontSize: '0.65rem' }}>BACK TO TOP</span>
              <FaArrowUp fontSize="10px" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

