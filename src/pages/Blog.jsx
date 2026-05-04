import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';
import api from '../lib/api';

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

      {/* Header */}
      <section style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center', background: 'var(--bg)' }}>
        <div className="max-w-text mx-auto px-6">
          <div className="f-section-label" style={{ justifyContent: 'center', marginBottom: 24 }}>
            <span>The Ledger</span>
          </div>
          <h1 className="f-display" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--ink)', marginBottom: 24 }}>
            Insights on <span className="f-display-italic">Engineering.</span>
          </h1>
          <p className="f-body text-lg" style={{ color: 'var(--ink-mid)', maxWidth: 500, margin: '0 auto', fontSize: '1.1rem' }}>
            Industry news, technical deep-dives, and thought leadership from the masters of precision machining.
          </p>
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
