import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaArrowLeft } from 'react-icons/fa';
import api, { getImageUrl } from '../lib/api';


const T = {
  navy:'#000924', navyMid:'#0F2044', gold:'#C9A84C', goldLt:'#E6C364',
  ivory:'#FDF9F1', ivoryDk:'#F7F3EB', slate:'#45464E', steel:'#75777F',
  playfair:"'Playfair Display', Georgia, serif",
  cinzel:"'Cinzel', serif",
  body:"'Source Sans 3', sans-serif",
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/slug/${slug}`);
        setBlog(data);
      } catch (err) {
        console.error('Failed to load blog', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: T.ivory, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 40, height: 40, border: `2px solid ${T.gold}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <span style={{ fontFamily: T.cinzel, fontSize: '0.72rem', letterSpacing: '0.16em', color: T.steel, textTransform: 'uppercase' }}>Loading…</span>
      </div>
    </div>
  );

  if (!blog) return (
    <div style={{ minHeight: '100vh', background: T.ivory, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <h2 style={{ fontFamily: T.playfair, fontSize: '2rem', fontWeight: 700, color: T.navy }}>Entry Not Found</h2>
      <Link to="/blog" style={{ fontFamily: T.cinzel, fontSize: '0.72rem', letterSpacing: '0.14em', color: T.gold, textTransform: 'uppercase', textDecoration: 'none' }}>← Back to Ledger</Link>
    </div>
  );

  return (
    <div style={{ background: T.ivory, minHeight: '100vh' }}>

      {/* ── Article Header ────────────────────────────────── */}
      <div style={{ position: 'relative', background: T.navy, overflow: 'hidden' }}>
        {/* grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '72px 24px 80px', textAlign: 'center' }}
        >
          <Link to="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontFamily: T.cinzel, fontSize: '0.65rem', letterSpacing: '0.14em',
            color: 'rgba(253,249,241,0.5)', textDecoration: 'none', textTransform: 'uppercase',
            marginBottom: 32, transition: 'color 0.2s',
          }} className="hover:!text-[#C9A84C]">
            <FaArrowLeft style={{ fontSize: 9 }} /> Back to The Ledger
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.cinzel, fontSize: '0.65rem', letterSpacing: '0.12em', color: T.gold, textTransform: 'uppercase' }}>
              <FaCalendarAlt style={{ fontSize: 9 }} />
              {new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            {blog.author && (
              <>
                <div style={{ width: 1, height: 12, background: 'rgba(253,249,241,0.2)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.cinzel, fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(253,249,241,0.5)', textTransform: 'uppercase' }}>
                  <FaUser style={{ fontSize: 9 }} /> {blog.author}
                </div>
              </>
            )}
          </div>

          <h1 style={{
            fontFamily: T.playfair, fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            color: T.ivory, letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            {blog.title}
          </h1>

          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`, margin: '28px auto 0' }} />
        </motion.div>
      </div>

      {/* ── Hero Image ─────────────────────────────────────── */}
      {blog.image_url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{ maxWidth: 1100, margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}
        >
          <div style={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,9,36,0.22)' }}>
            <img
              src={getImageUrl(blog.image_url)}
              alt={blog.title}

              style={{ width: '100%', aspectRatio: '16/7', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </motion.div>
      )}

      {/* ── Article Body ─────────────────────────────────── */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.65 }}
        style={{ maxWidth: 780, margin: '0 auto', padding: `${blog.image_url ? '64px' : '72px'} 24px 96px` }}
      >
        <div style={{
          fontFamily: T.body,
          fontSize: '1.025rem',
          color: '#1C1C17',
          lineHeight: 1.85,
        }}
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid #E6E2DA', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: T.cinzel, fontSize: '0.68rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: T.navy, textDecoration: 'none',
            transition: 'color 0.2s',
          }} className="hover:!text-[#C9A84C]">
            <FaArrowLeft style={{ fontSize: 9 }} /> Back to The Ledger
          </Link>
          <div style={{ fontFamily: T.cinzel, fontSize: '0.62rem', letterSpacing: '0.12em', color: T.steel, textTransform: 'uppercase' }}>
            SMG Machines
          </div>
        </div>
      </motion.article>

      {/* Inline blog content styles */}
      <style>{`
        .blog-content h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: #000924;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin: 2.5rem 0 1rem;
        }
        .blog-content h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: 1.25rem;
          color: #0F2044;
          margin: 2rem 0 0.75rem;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content a {
          color: #9A7A2E;
          transition: color 0.2s;
        }
        .blog-content a:hover {
          color: #000924;
        }
        .blog-content ul, .blog-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }
        .blog-content blockquote {
          border-left: 3px solid #C9A84C;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          font-family: 'Playfair Display', serif;
          color: #45464E;
          background: #F7F3EB;
        }
        .blog-content strong {
          font-weight: 700;
          color: #000924;
        }
        .blog-content img {
          width: 100%;
          border-radius: 2px;
          margin: 2rem 0;
        }
        .blog-content pre {
          background: #0B1120;
          color: #E6C364;
          padding: 1.25rem 1.5rem;
          border-radius: 2px;
          font-size: 0.875rem;
          overflow-x: auto;
          margin: 2rem 0;
        }
        .blog-content code {
          background: #F1EDE6;
          color: #0F2044;
          padding: 2px 6px;
          border-radius: 2px;
          font-size: 0.875em;
        }
        .blog-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
