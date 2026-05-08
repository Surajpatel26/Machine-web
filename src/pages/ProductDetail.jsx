import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft, FaPhone, FaEnvelope, FaPaperPlane,
  FaCheckCircle, FaChevronRight, FaIndustry
} from 'react-icons/fa';
import api, { getImageUrl } from '../lib/api';

import vmcImg   from '../assets/hero_vmc.png';
import cncImg   from '../assets/cnc_lathe.png';
import hmcImg   from '../assets/hmc_machine.png';
import spmImg   from '../assets/spm_machine.png';
import grindImg from '../assets/grinding_machine.png';

const T = {
  navy: 'var(--ink)',
  navyMid: 'var(--ink-mid)',
  gold: 'var(--brand-gold)',
  goldLt: '#E6C364',
  ivory: 'var(--bg-white)',
  ivoryDk: '#F7F3EB',
  slate: 'var(--ink-mid)',
  steel: 'var(--ink-light)',
  playfair: "'Playfair Display', Georgia, serif",
  cinzel: "'Cinzel', serif",
  body: "'Source Sans 3', sans-serif",
};

const catImgs = {
  'vmc-machines': vmcImg, 'cnc-machines': cncImg,
  'hmc-machines': hmcImg, 'special-purpose-machines': spmImg,
  'grinding-machines': grindImg,
};

/* ── Enquiry Mini-Form ───────────────────────────────────── */
function EnquiryForm({ productName }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/enquiries', { ...form, subject: `Product Enquiry: ${productName}` });
      setSuccess(true);
    } catch (err) {
      alert('Error sending enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
      >
        <div style={{ color: 'var(--brand-blue)', fontSize: '3rem', marginBottom: '20px' }}><FaCheckCircle /></div>
        <h3 className="f-display" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Enquiry Sent</h3>
        <p className="f-body">We'll get back to you with the technical details shortly.</p>
        <button onClick={() => setSuccess(false)} className="btn-pill btn-pill-outline" style={{ marginTop: '24px' }}>Send Another</button>
      </motion.div>
    );
  }

  return (
    <div style={{ background: '#fff', padding: '48px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.06)' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div className="input-group">
            <label className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', marginBottom: '4px', display: 'block' }}>Full Name</label>
            <input 
              className="f-input" required value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})}
              placeholder="Your Name"
              style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none', transition: 'all 0.3s' }}
            />
          </div>
          <div className="input-group">
            <label className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', marginBottom: '4px', display: 'block' }}>Email Address</label>
            <input 
              type="email" className="f-input" required value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="email@company.com"
              style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none', transition: 'all 0.3s' }}
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div className="input-group">
            <label className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', marginBottom: '4px', display: 'block' }}>Phone Number</label>
            <input 
              className="f-input" value={form.phone} 
              onChange={e => setForm({...form, phone: e.target.value})}
              placeholder="+91..."
              style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none', transition: 'all 0.3s' }}
            />
          </div>
          <div className="input-group">
            <label className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', marginBottom: '4px', display: 'block' }}>Company Name</label>
            <input 
              className="f-input" value={form.company} 
              onChange={e => setForm({...form, company: e.target.value})}
              placeholder="Industries Pvt Ltd"
              style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none', transition: 'all 0.3s' }}
            />
          </div>
        </div>
        <div className="input-group">
          <label className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', marginBottom: '4px', display: 'block' }}>Message</label>
          <textarea 
            className="f-input" required rows={3} value={form.message} 
            onChange={e => setForm({...form, message: e.target.value})}
            placeholder="Technical requirements, quantity, or specific queries..."
            style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none', resize: 'none', transition: 'all 0.3s' }}
          />
        </div>
        <button type="submit" disabled={loading} className="btn-pill" style={{ background: 'var(--brand-blue)', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '30px', cursor: 'pointer', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600 }}>
          {loading ? 'Processing...' : <><FaPaperPlane style={{ fontSize: '0.8rem' }} /> Request Quote</>}
        </button>
      </form>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────── */
export default function ProductDetail() {
  const { slug }  = useParams();
  const [product,   setProduct]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${slug}`)
      .then(r => setProduct(r.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [slug]);

  /* Loading spinner */
  if (loading) return (
    <div style={{ minHeight:'70vh', background:T.ivory, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
      <div style={{ width:48, height:48, border:`3px solid rgba(201,168,76,0.2)`, borderTopColor:T.gold, borderRadius:'50%', animation:'spin 0.9s linear infinite' }} />
      <span style={{ fontFamily:T.cinzel, fontSize:'0.68rem', letterSpacing:'0.16em', color:T.steel, textTransform:'uppercase' }}>Loading…</span>
    </div>
  );

  /* Not found */
  if (!product) return (
    <div style={{ minHeight:'70vh', background:T.ivory, display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'3rem' }}>
      <div>
        <div style={{ width:72, height:72, borderRadius:2, border:'1px solid rgba(201,168,76,0.25)', background:'rgba(201,168,76,0.06)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <FaIndustry style={{ color:T.gold, fontSize:28 }} />
        </div>
        <h2 style={{ fontFamily:T.playfair, fontWeight:700, fontSize:'1.6rem', color:T.navy, marginBottom:12 }}>Product Not Found</h2>
        <p style={{ fontFamily:T.body, color:T.slate, marginBottom:28 }}>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">← Back to Products</Link>
      </div>
    </div>
  );

  const specs      = typeof product.specifications === 'string' ? JSON.parse(product.specifications) : (product.specifications || {});
  const productImg = product.main_image ? getImageUrl(product.main_image) : (catImgs[product.category_slug] || vmcImg);
  const tabs       = ['overview', 'specifications', 'enquiry'];


  return (
    <div style={{ background:T.ivory }}>

      {/* ── Breadcrumb ────────────────────────────────────── */}
      <div style={{ background:T.ivoryDk, borderBottom:'1px solid rgba(201,168,76,0.12)', padding:'12px 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12" style={{ display:'flex', alignItems:'center', gap:8, fontFamily:T.body, fontSize:'0.78rem', color:T.steel, flexWrap:'wrap' }}>
          <Link to="/" style={{ color:T.steel, textDecoration:'none', transition:'color 0.2s' }} className="hover:!text-[#C9A84C]">Home</Link>
          <FaChevronRight style={{ fontSize:8, opacity:0.5 }} />
          <Link to="/products" style={{ color:T.steel, textDecoration:'none', transition:'color 0.2s' }} className="hover:!text-[#C9A84C]">Products</Link>
          <FaChevronRight style={{ fontSize:8, opacity:0.5 }} />
          <span style={{ color:T.navy, fontWeight:600 }}>{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12" style={{ paddingTop:40, paddingBottom:80 }}>

        {/* Back link */}
        <Link
          to="/products"
          style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:T.body, fontSize:'0.84rem', color:T.slate, textDecoration:'none', marginBottom:36, transition:'color 0.2s' }}
          className="hover:!text-[#C9A84C]"
        >
          <FaArrowLeft style={{ fontSize:11 }} /> Back to Products
        </Link>

        {/* ── Product Hero ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14" style={{ marginBottom:52, alignItems:'start' }}>

          {/* Image panel */}
          <motion.div
            initial={{ opacity:0, x:-30 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.65 }}
            style={{ position:'sticky', top:100 }}
          >
            <div style={{ borderRadius:2, overflow:'hidden', height:420, position:'relative', boxShadow:'0 8px 40px rgba(0,9,36,0.12)' }}>
              <img
                src={productImg}
                alt={product.name}
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,9,36,0.55) 0%, rgba(0,9,36,0.1) 50%, transparent 100%)' }} />
              <div style={{ position:'absolute', bottom:18, left:18 }}>
                <span style={{
                  fontFamily:T.cinzel, fontSize:'0.6rem', letterSpacing:'0.18em',
                  color:T.goldLt, textTransform:'uppercase',
                  background:'rgba(0,9,36,0.65)', padding:'4px 12px', borderRadius:1,
                }}>
                  {product.category_name}
                </span>
              </div>
              {product.is_featured && (
                <div style={{
                  position:'absolute', top:14, right:14,
                  fontFamily:T.cinzel, fontSize:'0.58rem', letterSpacing:'0.14em',
                  background:T.gold, color:T.navy, padding:'4px 10px',
                  borderRadius:1, textTransform:'uppercase', fontWeight:600,
                }}>
                  Featured
                </div>
              )}
            </div>

            {/* Quick contact strip */}
            <div style={{
              marginTop:16, display:'flex', gap:12,
              background:'#fff', borderRadius:2, padding:'1.25rem 1.5rem',
              boxShadow:'0 2px 16px rgba(28,28,23,0.07)',
              alignItems:'center', justifyContent:'space-between',
            }}>
              <div style={{ fontFamily:T.cinzel, fontSize:'0.62rem', letterSpacing:'0.12em', color:T.steel, textTransform:'uppercase' }}>
                Need Help? Contact us:
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <a href="tel:+919810412158"
                  style={{ display:'flex', alignItems:'center', gap:6, fontFamily:T.body, fontWeight:600, fontSize:'0.84rem', color:T.navy, textDecoration:'none', transition:'color 0.2s' }}
                  className="hover:!text-[#C9A84C]"
                >
                  <FaPhone style={{ fontSize:11, color:T.gold }} /> Call
                </a>
                <span style={{ color:'#D1D5DB' }}>|</span>
                <a href="mailto:smgmachines@gmail.com"

                  style={{ display:'flex', alignItems:'center', gap:6, fontFamily:T.body, fontWeight:600, fontSize:'0.84rem', color:T.navy, textDecoration:'none', transition:'color 0.2s' }}
                  className="hover:!text-[#C9A84C]"
                >
                  <FaEnvelope style={{ fontSize:11, color:T.gold }} /> Email
                </a>
              </div>
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity:0, x:30 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.65 }}
          >
            <div style={{ fontFamily:T.cinzel, fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', color:T.gold, marginBottom:10 }}>
              {product.category_name}
            </div>
            <h1 style={{
              fontFamily:T.playfair, fontWeight:700,
              fontSize:'clamp(1.8rem, 3.5vw, 2.75rem)',
              color:T.navy, letterSpacing:'-0.02em',
              lineHeight:1.2, marginBottom:16,
            }}>
              {product.name}
            </h1>
            <div style={{ width:56, height:2, background:`linear-gradient(90deg, ${T.gold}, ${T.goldLt})`, marginBottom:22 }} />
            <p style={{ fontFamily:T.body, fontSize:'0.95rem', color:T.slate, lineHeight:1.8, marginBottom:28 }}>
              {product.short_description}
            </p>

            {/* Key features preview */}
            {product.features?.length > 0 && (
              <div style={{ marginBottom:32 }}>
                <div style={{
                  fontFamily:T.cinzel, fontSize:'0.65rem', letterSpacing:'0.14em',
                  textTransform:'uppercase', color:T.navy, marginBottom:14,
                  borderBottom:'1px solid #E6E2DA', paddingBottom:8,
                }}>
                  Key Features
                </div>
                <ul style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {product.features.slice(0, 5).map((f, i) => (
                    <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                      <div style={{
                        width:18, height:18, borderRadius:'50%',
                        border:'1px solid rgba(201,168,76,0.35)',
                        background:'rgba(201,168,76,0.06)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        flexShrink:0, marginTop:2,
                      }}>
                        <div style={{ width:5, height:5, borderRadius:'50%', background:T.gold }} />
                      </div>
                      <span style={{ fontFamily:T.body, fontSize:'0.875rem', color:T.slate, lineHeight:1.65 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA buttons */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:0 }}>
              <button
                onClick={() => setActiveTab('enquiry')}
                className="btn-primary"
                style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer' }}
              >
                <FaEnvelope style={{ fontSize:12 }} /> Send Enquiry
              </button>
              <a href="tel:+919810412158" className="btn-gold" style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
                <FaPhone style={{ fontSize:11 }} /> Call Expert
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────── */}
        <div style={{ marginBottom: 48, borderBottom: '1px solid rgba(26,26,24,0.08)' }}>
          <div style={{ display: 'flex', gap: '32px', overflowX: 'auto', paddingBottom: '1px' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '16px 0',
                  fontFamily: 'var(--sans)', 
                  fontSize: '0.85rem', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  background: 'transparent', 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'relative',
                  color: activeTab === tab ? 'var(--ink)' : 'var(--ink-fade)',
                  transition: 'all 0.3s var(--transition)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabLine"
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--gold)' }} 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Overview */}
            {activeTab === 'overview' && (
              <div style={{ maxWidth: '1000px' }}>
                <div className="grid-2" style={{ gap: '4rem', alignItems: 'start' }}>
                  <div>
                    <h3 className="f-display" style={{ fontSize: '1.75rem', marginBottom: 24, color: 'var(--ink)' }}>Product <span className="f-display-italic">Narrative</span></h3>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: '1.05rem', color: 'var(--ink-mid)', lineHeight: 1.8, marginBottom: 32 }}>
                      {product.description}
                    </p>
                  </div>
                  
                  {product.features?.length > 0 && (
                    <div style={{ background: 'var(--bg)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(26,26,24,0.05)' }}>
                      <span className="f-label" style={{ color: 'var(--brand-blue)', marginBottom: 20, display: 'block' }}>Technical Highlights</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {product.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', marginTop: 8, flexShrink: 0 }} />
                            <span style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Specifications */}
            {activeTab === 'specifications' && (
              <div style={{ maxWidth: '900px' }}>
                <div style={{ marginBottom: 40 }}>
                  <h3 className="f-display" style={{ fontSize: '1.75rem', marginBottom: 12, color: 'var(--ink)' }}>Technical <span className="f-display-italic">Matrix</span></h3>
                  <p className="f-body" style={{ color: 'var(--ink-mid)' }}>Standard configuration and engineering tolerances for the {product.name} series.</p>
                </div>
                
                {Object.keys(specs).length > 0 ? (
                  <div style={{ borderTop: '1px solid var(--ink)', paddingTop: 16 }}>
                    {Object.entries(specs).map(([key, val], i) => (
                      <div 
                        key={i} 
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                          padding: '24px 0',
                          borderBottom: '1px solid rgba(26,26,24,0.08)',
                          gap: '2rem'
                        }}
                      >
                        <div className="f-label" style={{ color: 'var(--ink-fade)', fontSize: '0.7rem' }}>{key}</div>
                        <div className="f-body" style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '1rem' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ background: '#fff', borderRadius: '24px', padding: '4rem', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.04)' }}>
                    <p style={{ fontFamily: 'var(--sans)', color: 'var(--ink-mid)', marginBottom: 24 }}>Detailed engineering data is available upon formal request.</p>
                    <button onClick={() => setActiveTab('enquiry')} className="btn-pill" style={{ background: 'var(--ink)', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '30px' }}>
                      Download Datasheet
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Enquiry */}
            {activeTab === 'enquiry' && (
              <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ marginBottom: 48 }}>
                  <div className="f-section-label" style={{ marginBottom: 24, justifyContent: 'center' }}>
                    <span>Get a Precision Quote</span>
                  </div>
                  <h3 className="f-display" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
                    Enquire About <br />
                    <span className="f-display-italic" style={{ color: 'var(--brand-blue)' }}>{product.name}</span>
                  </h3>
                  <p className="f-body" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    Our engineering experts are ready to provide technical guidance and competitive pricing tailored to your production needs.
                  </p>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <EnquiryForm productName={product.name} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
