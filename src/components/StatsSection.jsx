import React from 'react';
import { motion } from 'framer-motion';
import factoryImg from '../assets/factory_floor.png';

const stats = [
  { value: '2,500+', label: 'Machines Installed',   detail: 'Across industries worldwide' },
  { value: '25+',    label: 'Years of Excellence',   detail: 'Established 1998' },
  { value: '15+',    label: 'Countries Served',       detail: 'Global footprint' },
  { value: '500+',   label: 'Satisfied Clients',     detail: 'Long-term partnerships' },
];

const milestones = [
  { year: '1998', event: 'Founded in Pune, India' },
  { year: '2005', event: 'Launched first VMC product line' },
  { year: '2012', event: 'Expanded to 50,000 sq. ft. facility' },
  { year: '2018', event: 'Achieved ISO 9001:2015 certification' },
  { year: '2023', event: 'Crossed 2,500 machines milestone' },
];

export default function StatsSection() {
  return (
    <>
      {/* ── Dark Stats Banner ──────────────────────────── */}
      <section
        style={{ position: 'relative', overflow: 'hidden', background: '#000924' }}
      >
        {/* faint factory bg */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          <img src={factoryImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* gold grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: '#C9A84C',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Our Track Record
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#FDF9F1',
              letterSpacing: '-0.02em',
            }}>
              Numbers That Tell{' '}
              <em style={{ color: '#E6C364', fontStyle: 'italic' }}>Our Story</em>
            </h2>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4"
            style={{ borderRadius:2, overflow:'hidden', border:'1px solid rgba(201,168,76,0.1)' }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="text-center py-10 px-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                style={{
                  borderRight: i < 3 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(201,168,76,0.1)' : undefined,
                }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                  color: '#E6C364',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: 10,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  color: '#FDF9F1',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: '0.75rem',
                  color: 'rgba(253,249,241,0.38)',
                }}>
                  {s.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Thin gold divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)', marginTop: 48, marginBottom: 48 }} />

          {/* Timeline milestones */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Desktop: horizontal scroll */}
            <div className="hidden sm:flex" style={{ alignItems:'flex-start', gap:0, overflowX:'auto', paddingBottom:8 }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', flex:1, minWidth:140 }}>
                  <div style={{ textAlign:'center', flex:'0 0 auto', padding:'0 16px' }}>
                    <div style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:'1.25rem', color:'#C9A84C', marginBottom:10 }}>{m.year}</div>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:'#C9A84C', margin:'0 auto 10px', boxShadow:'0 0 14px rgba(201,168,76,0.5)' }} />
                    <div style={{ fontFamily:"'Source Sans 3', sans-serif", fontSize:'0.75rem', color:'rgba(253,249,241,0.6)', lineHeight:1.5, maxWidth:110 }}>{m.event}</div>
                  </div>
                  {i < milestones.length - 1 && (
                    <div style={{ flex:1, height:1, background:'linear-gradient(90deg, rgba(201,168,76,0.4), rgba(201,168,76,0.1))', marginTop:20, minWidth:20 }} />
                  )}
                </div>
              ))}
            </div>
            {/* Mobile: vertical */}
            <div className="flex sm:hidden" style={{ flexDirection:'column', gap:0 }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:16, paddingBottom: i < milestones.length-1 ? 20:0 }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:'#C9A84C', boxShadow:'0 0 10px rgba(201,168,76,0.5)', marginTop:3 }} />
                    {i < milestones.length-1 && <div style={{ width:1, flex:1, background:'rgba(201,168,76,0.25)', minHeight:40, marginTop:4 }} />}
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:'1rem', color:'#C9A84C', marginBottom:4 }}>{m.year}</div>
                    <div style={{ fontFamily:"'Source Sans 3', sans-serif", fontSize:'0.78rem', color:'rgba(253,249,241,0.6)', lineHeight:1.55 }}>{m.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
