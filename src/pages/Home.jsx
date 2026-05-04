import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
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
      <section style={{ padding: '8rem 0', background: 'var(--bg)' }}>
        <div className="max-w-wide">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="f-label" style={{ color: 'var(--gold)', marginBottom: 24, display: 'block' }}>Our Facility</span>
              <h2 className="f-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: 24 }}>
                World-Class <span className="f-display-italic">Infrastructure</span>
              </h2>
              <p className="f-body" style={{ color: 'var(--ink-mid)', fontSize: '1.1rem', marginBottom: 32, maxWidth: 480 }}>
                Our 50,000 sq. ft. state-of-the-art manufacturing facility houses advanced CNC production equipment, CMM inspection rooms, and dedicated assembly bays. Every machine undergoes rigorous quality checks before delivery.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
                {infraStats.map(stat => (
                  <div key={stat.title}>
                    <div className="f-display" style={{ fontSize: '1.5rem', color: 'var(--ink)' }}>{stat.value}</div>
                    <div className="f-label" style={{ color: 'var(--ink-light)', marginTop: 4 }}>{stat.title}</div>
                  </div>
                ))}
              </div>

              <Link to="/infrastructure" className="btn-pill btn-pill-outline">
                View Infrastructure
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ height: '100%' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', height: '100%', minHeight: 500 }}>
                <img src={factoryImg} alt="Factory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-white)' }}>
        <div className="max-w-wide">
          <div style={{ background: 'var(--ink)', borderRadius: 32, padding: '5rem 3rem', textAlign: 'center', color: '#fff' }}>
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
              <a href="tel:+919876543210" className="btn-pill btn-pill-white">
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
