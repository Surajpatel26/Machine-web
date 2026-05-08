import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import { FaPhone } from 'react-icons/fa';
import factoryImg from '../assets/factory_floor.png';


const infraStats = [
  { title: 'Manufacturing Area', value: '50k sq.ft.' },
  { title: 'Production Bays',   value: '12 Bays' },
  { title: 'Annual Capacity',   value: '500+ Units' },
  { title: 'Quality Standard',  value: 'ISO 9001' },
];

export default function Home() {
  return (
    <div style={{ background: 'var(--bg-white)' }}>
      <Hero />
      <ProductCategories />

      {/* ── Stats Strip ──────────────────────────────────── */}
      <div className="max-w-wide" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <div className="f-stats-strip">
          <div className="f-stat-item">
            <h4 className="f-display" style={{ color: 'var(--gold)', fontSize: '2.5rem' }}>2,500+</h4>
            <span className="f-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Machines Installed</span>
          </div>
          <div className="f-stat-item">
            <h4 className="f-display" style={{ color: 'var(--gold)', fontSize: '2.5rem' }}>25+</h4>
            <span className="f-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Years of Excellence</span>
          </div>
          <div className="f-stat-item">
            <h4 className="f-display" style={{ color: 'var(--gold)', fontSize: '2.5rem' }}>15+</h4>
            <span className="f-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Countries Served</span>
          </div>
          <div className="f-stat-item">
            <h4 className="f-display" style={{ color: 'var(--gold)', fontSize: '2.5rem' }}>500+</h4>
            <span className="f-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Satisfied Clients</span>
          </div>
        </div>
      </div>

      <FeaturedProducts />

      <Testimonials />

      {/* ── Infrastructure Preview ───────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', background: 'var(--bg)', overflow: 'hidden' }}>
        <div className="max-w-wide">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'clamp(2rem, 5vw, 5rem)' }}>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="f-section-label" style={{ color: 'var(--gold)', marginBottom: 20 }}>
                <span style={{ width: 40, height: 1, background: 'var(--gold)', display: 'inline-block', verticalAlign: 'middle', marginRight: 12 }}></span>
                Precision Facility
              </div>
              <h2 className="f-display" style={{ marginBottom: 28, lineHeight: 1.1 }}>
                World-Class <span className="f-display-italic">Infrastructure</span>
              </h2>
              <p className="f-body" style={{ color: 'var(--ink-mid)', marginBottom: 40, maxWidth: 540, opacity: 0.9 }}>
                Our 50,000 sq. ft. state-of-the-art manufacturing facility in Rajkot represents the pinnacle of engineering excellence. We combine advanced CNC production with aerospace-grade inspection protocols.
              </p>

              <div className="grid-2" style={{ gap: '2rem', marginBottom: 48 }}>
                {infraStats.map((stat, i) => (
                  <motion.div 
                    key={stat.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ borderLeft: '1px solid rgba(26,26,24,0.1)', paddingLeft: 20 }}
                  >
                    <div className="f-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: 4 }}>{stat.value}</div>
                    <div className="f-label" style={{ color: 'var(--ink-light)', fontSize: '0.65rem' }}>{stat.title}</div>
                  </motion.div>
                ))}
              </div>

              <Link to="/infrastructure" className="btn-pill btn-pill-dark">
                Explore Our Facility
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginLeft: 4 }}>
                  <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.75 4.5L14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
              style={{ width: '100%' }}
            >
              <div style={{ 
                borderRadius: '32px', 
                overflow: 'hidden', 
                aspectRatio: '16/10',
                boxShadow: '0 40px 100px rgba(26,26,24,0.15)',
                position: 'relative',
                zIndex: 2
              }}>
                <img src={factoryImg} alt="SMG Machines Manufacturing Facility" className="w-full h-full object-cover" />
                <div style={{ 
                  position: 'absolute', inset: 0, 
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(26,26,24,0.4))' 
                }} />
              </div>
              
              {/* Decorative elements */}
              <div style={{ 
                position: 'absolute', bottom: -20, right: -20, 
                width: '50%', height: '50%', border: '2px solid var(--gold)', 
                borderRadius: '32px', opacity: 0.15, zIndex: 1 
              }} />
              
              <div style={{ 
                position: 'absolute', top: 20, right: 20, 
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
                padding: '12px 20px', borderRadius: '16px', zIndex: 3,
                boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', gap: 10
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
                <span className="f-label" style={{ color: 'var(--ink)', fontSize: '0.65rem' }}>Certified Production</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── CTA Banner ──────────────────────────────────── */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-white)' }}>
        <div className="mx-auto" style={{ maxWidth: '1000px', padding: '0 2rem' }}>
          <div style={{ background: 'var(--ink)', borderRadius: 32, padding: '3rem 2rem', textAlign: 'center', color: '#fff' }}>
            <span className="f-label" style={{ color: 'var(--gold)', marginBottom: 20, display: 'block' }}>Ready to Upgrade?</span>
            <h2 className="f-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: 24, maxWidth: 700, margin: '0 auto 24px' }}>
              Upgrade Your Manufacturing <span className="f-display-italic">Capabilities</span>
            </h2>
            <p className="f-body" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 40px', fontSize: '1.1rem' }}>
              Get a customised quote for your exact machine requirements. Our engineers design the perfect solution for your production needs — on time, within budget.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <Link to="/contact" className="btn-pill btn-pill-gold">
                Get Free Quote
              </Link>
              <a href="tel:+919810412158" className="btn-pill btn-pill-white">
                <FaPhone size={14} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
