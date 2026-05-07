import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaUser, FaSearch } from 'react-icons/fa';
import api from '../lib/api';
import blogHeroImg from '../assets/blog_hero_editorial_1778126494481.png';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs/published');
        setBlogs(data);
      } catch (err) {
        console.error('Failed to load blogs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <div style={{ background: 'var(--bg-white)', minHeight: '100vh' }}>

      {/* ── Unique Static Editorial Hero ── */}
      <section style={{ 
        minHeight: '85vh', position: 'relative', overflow: 'hidden', 
        display: 'flex', alignItems: 'center', background: 'var(--bg)',
        borderBottom: '1px solid rgba(26,26,24,0.08)'
      }}>
        {/* Technical Grid Pattern Background (Static CSS) */}
        <div style={{ 
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4,
          backgroundImage: `linear-gradient(rgba(26,26,24,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,24,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-wide" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
            
            {/* Left Column: Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="f-section-label" style={{ color: 'var(--gold)', marginBottom: 24 }}>
                <span>Archive & Insights</span>
              </div>
              <h1 className="f-display" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.85, color: 'var(--ink)', marginBottom: 40, letterSpacing: '-0.03em' }}>
                The <br />
                <span className="f-display-italic" style={{ color: 'var(--brand-blue)' }}>Ledger.</span>
              </h1>
              <p className="f-body" style={{ fontSize: '1.25rem', color: 'var(--ink-mid)', maxWidth: '450px', marginBottom: 56, lineHeight: 1.5 }}>
                A curated repository of technical mastery, industrial trends, and the future of precision engineering.
              </p>
              
              <div style={{ 
                background: '#fff', padding: '8px 8px 8px 24px', borderRadius: '40px', 
                display: 'flex', alignItems: 'center', gap: 16, maxWidth: 450,
                boxShadow: '0 30px 60px rgba(0,0,0,0.06)', border: '1px solid rgba(26,26,24,0.08)'
              }}>
                <FaSearch style={{ color: 'var(--ink-fade)' }} />
                <input 
                  type="text" 
                  placeholder="Search the ledger..." 
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontFamily: 'var(--sans)', fontSize: '0.95rem' }} 
                />
                <button className="btn-pill" style={{ background: 'var(--brand-blue)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600 }}>
                  Explore
                </button>
              </div>
            </motion.div>

            {/* Right Column: Editorial Visual (Static) */}
            <motion.div 
              style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div style={{ 
                width: '90%', height: '80%', borderRadius: '32px', overflow: 'hidden',
                boxShadow: '0 50px 100px rgba(0,0,0,0.15)', position: 'relative',
                transform: 'rotate(2deg)'
              }}>
                <img src={blogHeroImg} alt="Technical Mastery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.3), transparent)' }} />
              </div>
              
              {/* Overlapping Badge */}
              <div style={{ 
                position: 'absolute', bottom: '15%', left: '0', background: 'var(--ink)', color: '#fff',
                padding: '24px 32px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                transform: 'rotate(-3deg)', maxWidth: '240px'
              }}>
                <div className="f-label" style={{ color: 'var(--gold)', marginBottom: 8 }}>Volume IV</div>
                <div className="f-display" style={{ fontSize: '1.2rem' }}>Precision Intelligence Report</div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-wide mx-auto px-6" style={{ padding: '6rem 0' }}>
        
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="f-card" style={{ height: 400, background: 'var(--bg)' }} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <h3 className="f-display" style={{ fontSize: '2rem', color: 'var(--ink)', marginBottom: 16 }}>No Entries Found</h3>
            <p className="f-body" style={{ color: 'var(--ink-mid)' }}>The engineering ledger is currently empty. Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '6rem' }}>
                <Link to={`/blog/${featured.slug}`} className="f-card hover-bg-gold" style={{ 
                  display: 'flex', flexWrap: 'wrap', overflow: 'hidden', textDecoration: 'none',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}>
                  <div style={{ flex: '1 1 400px', minHeight: 320, position: 'relative', background: 'var(--ink)' }}>
                    {featured.image_url ? (
                      <img src={featured.image_url} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="f-display" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '3rem' }}>SMG</span>
                      </div>
                    )}
                    <div style={{ 
                      position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.9)', 
                      padding: '4px 12px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, 
                      textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)' 
                    }}>Featured</div>
                  </div>
                  
                  <div style={{ flex: '1 1 400px', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fff' }}>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                      <div className="f-label" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FaCalendarAlt size={10} />
                        {new Date(featured.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <h2 className="f-display" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--ink)', marginBottom: 24, lineHeight: 1.2 }}>{featured.title}</h2>
                    <p className="f-body" style={{ color: 'var(--ink-mid)', fontSize: '1rem', marginBottom: 32, lineHeight: 1.6 }}>
                      {featured.excerpt || featured.content?.substring(0, 150) + '...'}
                    </p>
                    <div className="f-label" style={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      Read Article <FaArrowRight size={10} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid Posts */}
            {rest.length > 0 && (
              <>
                <div className="f-section-label" style={{ marginBottom: '3rem' }}>
                  <span>Latest Articles</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                  {rest.map((blog, i) => (
                    <motion.div key={blog.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Link to={`/blog/${blog.slug}`} className="f-card" style={{ 
                        display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                      }}>
                        <div style={{ height: 240, position: 'relative', overflow: 'hidden', flexShrink: 0, background: 'var(--bg)' }}>
                          {blog.image_url ? (
                            <img src={blog.image_url} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span className="f-display" style={{ color: 'var(--ink-light)', fontSize: '2rem', opacity: 0.2 }}>SMG</span>
                            </div>
                          )}
                        </div>
                        
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, background: '#fff' }}>
                          <div className="f-label" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <FaCalendarAlt size={10} />
                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <h3 className="f-display" style={{ fontSize: '1.4rem', color: 'var(--ink)', marginBottom: 16, lineHeight: 1.3 }}>{blog.title}</h3>
                          <p className="f-body" style={{ color: 'var(--ink-mid)', marginBottom: 32, lineHeight: 1.6, flexGrow: 1 }}>
                            {blog.excerpt || blog.content?.substring(0, 100) + '...'}
                          </p>
                          <div className="f-label" style={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            Read Article <FaArrowRight size={10} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

    </div>
  );
}
