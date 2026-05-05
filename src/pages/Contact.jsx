import React, { useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane, FaCheckCircle, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import api from '../lib/api';

// ── 3D Visual Component (Digital Twin Scan) ─────────────────────
function DigitalTwin() {
  const group = useRef();
  const scanner = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
    group.current.rotation.z = Math.sin(t / 2) * 0.1;
    
    // Scanning plane motion
    scanner.current.position.y = Math.sin(t) * 2;
  });

  return (
    <group ref={group}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Wireframe Core Part */}
        <mesh>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshStandardMaterial 
            color="#3B6B95" 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </mesh>
        
        {/* Solid highlights */}
        <mesh>
          <torusKnotGeometry args={[1.49, 0.39, 128, 32]} />
          <meshStandardMaterial 
            color="#C9A84C" 
            emissive="#C9A84C"
            emissiveIntensity={0.5}
            transparent 
            opacity={0.1}
          />
        </mesh>

        {/* Scanning Plane */}
        <mesh ref={scanner}>
          <boxGeometry args={[4, 0.05, 4]} />
          <meshStandardMaterial 
            color="#3B6B95" 
            emissive="#3B6B95"
            emissiveIntensity={2}
            transparent 
            opacity={0.6}
          />
        </mesh>

        {/* Grid Floor */}
        <gridHelper args={[10, 20, "#3B6B95", "#E5E7EB"]} position={[0, -2.5, 0]} rotation={[0, 0, 0]} />
      </Float>
    </group>
  );
}

// ── Form Component ────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/enquiries', form);
      setSuccess(true);
    } catch (err) {
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '40px' }}
      >
        <div style={{ color: 'var(--brand-blue)', fontSize: '4rem', marginBottom: '24px' }}><FaCheckCircle /></div>
        <h3 className="f-display" style={{ marginBottom: '16px' }}>Message Received</h3>
        <p className="f-body">Our precision engineering team will contact you shortly.</p>
        <button onClick={() => setSuccess(false)} className="btn-pill btn-pill-outline" style={{ marginTop: '32px' }}>Send Another</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="input-group">
          <label className="f-label" style={{ fontSize: '0.7rem', color: 'var(--ink-light)' }}>Name</label>
          <input 
            className="f-input" required value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})}
            placeholder="Rajesh Kumar"
            style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none' }}
          />
        </div>
        <div className="input-group">
          <label className="f-label" style={{ fontSize: '0.7rem', color: 'var(--ink-light)' }}>Email</label>
          <input 
            type="email" className="f-input" required value={form.email} 
            onChange={e => setForm({...form, email: e.target.value})}
            placeholder="rajesh@company.com"
            style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none' }}
          />
        </div>
      </div>
      <div className="input-group">
        <label className="f-label" style={{ fontSize: '0.7rem', color: 'var(--ink-light)' }}>Subject</label>
        <input 
          className="f-input" required value={form.subject} 
          onChange={e => setForm({...form, subject: e.target.value})}
          placeholder="Product Enquiry"
          style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none' }}
        />
      </div>
      <div className="input-group">
        <label className="f-label" style={{ fontSize: '0.7rem', color: 'var(--ink-light)' }}>Message</label>
        <textarea 
          className="f-input" required rows={4} value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})}
          placeholder="How can we help your production?"
          style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'transparent', outline: 'none', resize: 'none' }}
        />
      </div>
      <button type="submit" disabled={loading} className="btn-pill" style={{ background: 'var(--brand-blue)', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '30px', cursor: 'pointer', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {loading ? 'Processing...' : <><FaPaperPlane /> Send Message</>}
      </button>
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function Contact() {
  return (
    <div style={{ background: 'var(--bg-white)', minHeight: '100vh', pt: '64px' }}>
      
      {/* ── Hero Section with 3D ─────────────────────────── */}
      <section style={{ minHeight: '70vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <DigitalTwin />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-wide" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '700px' }}
          >
            <div className="f-section-label" style={{ color: 'var(--brand-blue)', marginBottom: '24px' }}>
              <span>Precision Partnership</span>
            </div>
            <h1 className="f-display" style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)', lineHeight: 0.9, color: 'var(--ink)', marginBottom: '32px' }}>
              Engineering <br />
              <span className="f-display-italic" style={{ color: 'var(--brand-blue)' }}>Connections</span>
            </h1>
            <p className="f-body" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--ink-mid)', maxWidth: '500px', opacity: 0.8 }}>
              From initial consultation to lifelong support, we are committed to your manufacturing excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Layout ───────────────────────────────── */}
      <section style={{ paddingBottom: '8rem' }}>
        <div className="max-w-wide">
          <div className="grid-2" style={{ gap: '4rem 8rem' }}>
            
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="f-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '40px' }}>Direct <span className="f-display-italic">Reach</span></h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59,107,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-blue)', flexShrink: 0 }}>
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <div className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', marginBottom: '4px' }}>Telephone</div>
                    <div className="f-body" style={{ fontSize: '1.1rem', fontWeight: 600 }}>+91 98765 43210</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59,107,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-blue)', flexShrink: 0 }}>
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <div className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', marginBottom: '4px' }}>Electronic Mail</div>
                    <div className="f-body" style={{ fontSize: '1.1rem', fontWeight: 600 }}>contact@smgmachines.com</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59,107,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-blue)', flexShrink: 0 }}>
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <div className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', marginBottom: '4px' }}>Headquarters</div>
                    <div className="f-body" style={{ fontSize: '1.1rem', fontWeight: 600 }}>Plot 123, MIDC Industrial Area, Pune, India</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '56px', display: 'flex', gap: '20px' }}>
                {[FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp].map((Icon, i) => (
                  <motion.a 
                    key={i} href="#" 
                    whileHover={{ y: -5, color: 'var(--brand-blue)' }}
                    style={{ fontSize: '1.4rem', color: 'var(--ink-mid)', transition: 'color 0.2s' }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: '#fff', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '32px', boxShadow: '0 40px 100px rgba(26,26,24,0.08)' }}
            >
              <h3 className="f-display" style={{ fontSize: '1.8rem', marginBottom: '40px' }}>Start a <span className="f-display-italic">Conversation</span></h3>
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Footer Link ──────────────────────────────────── */}
      <section style={{ padding: '6rem 0', textAlign: 'center', background: 'var(--brand-blue)' }}>
        <div className="max-w-wide">
          <h2 className="f-display" style={{ color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '20px' }}>Join Our Engineering Network</h2>
          <p className="f-body" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: 600, margin: '0 auto 32px' }}>Stay updated with the latest in CNC and VMC technology through our monthly newsletter.</p>
          <button className="btn-pill btn-pill-white">Subscribe to The Ledger</button>
        </div>
      </section>
    </div>
  );
}

