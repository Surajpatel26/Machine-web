import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import api, { getImageUrl } from '../lib/api';


export default function Testimonials() {
  const [list, setList] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/testimonials');
        setList(data);
      } catch (err) {
        console.error('Testimonials load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const prev = () => setIdx(p => (p - 1 + list.length) % list.length);
  const next = () => setIdx(p => (p + 1) % list.length);
  
  if (list.length === 0 && !loading) return null;

  const t = list[idx];

  const TestimonialSkeleton = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="skeleton" style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 40 }} />
      <div className="skeleton" style={{ width: '80%', height: 32, marginBottom: 16, borderRadius: 4 }} />
      <div className="skeleton" style={{ width: '60%', height: 32, marginBottom: 48, borderRadius: 4 }} />
      <div className="skeleton" style={{ width: 150, height: 20, marginBottom: 8, borderRadius: 4 }} />
      <div className="skeleton" style={{ width: 100, height: 16, borderRadius: 4 }} />
      <div style={{ display: 'flex', gap: 10, marginTop: 64 }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton" style={{ width: 10, height: 10, borderRadius: '50%' }} />
        ))}
      </div>
    </div>
  );

  return (
    <section style={{ background: 'var(--bg-white)', padding: '3rem 0 8rem 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Abstract background element */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', opacity: 0.03, color: 'var(--ink)', pointerEvents: 'none' }}>
        <FaQuoteRight size={400} />
      </div>

      <div className="max-w-wide text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="f-section-label" style={{ justifyContent: 'center', marginBottom: 24 }}
        >
          <span>Client Success Stories</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="f-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--ink)', marginBottom: 80 }}
        >
          Voices of <span className="f-display-italic">Precision</span>
        </motion.h2>

        <div className="max-w-text mx-auto relative" style={{ zIndex: 10 }}>
          {loading ? (
            <TestimonialSkeleton />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <div style={{ marginBottom: 40, position: 'relative' }}>
                    {t.avatar_url ? (
                      <img src={getImageUrl(t.avatar_url)} alt={t.client_name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                    ) : (

                      <div style={{
                        width: 100, height: 100, borderRadius: '50%', background: 'var(--brand-blue)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: '2.5rem',
                        boxShadow: '0 10px 30px rgba(59,107,149,0.2)'
                      }}>
                        {t.client_name.charAt(0)}
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--gold)', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FaQuoteRight size={12} />
                    </div>
                  </div>

                  <blockquote className="f-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.4, marginBottom: 48, color: 'var(--ink-mid)', fontWeight: 400, fontStyle: 'italic', textAlign: 'center' }}>
                    "{t.message}"
                  </blockquote>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '1.2rem', marginBottom: 4 }}>{t.client_name}</div>
                    <div className="f-label" style={{ color: 'var(--brand-blue)', fontSize: '0.8rem' }}>{t.designation}{t.company ? ` @ ${t.company}` : ''}</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 64 }}>
                <button 
                  onClick={prev}
                  className="btn-pill btn-pill-outline"
                  style={{ width: 50, height: 50, padding: 0, justifyContent: 'center', borderRadius: '50%' }}
                >
                  <FaChevronLeft size={14} />
                </button>
                <div style={{ display: 'flex', gap: 10 }}>
                  {list.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      style={{
                        width: i === idx ? 32 : 10, height: 10, borderRadius: 5,
                        background: i === idx ? 'var(--brand-blue)' : 'rgba(59,107,149,0.15)',
                        border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.4s var(--transition)'
                      }}
                    />
                  ))}
                </div>
                <button 
                  onClick={next}
                  className="btn-pill btn-pill-outline"
                  style={{ width: 50, height: 50, padding: 0, justifyContent: 'center', borderRadius: '50%' }}
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
