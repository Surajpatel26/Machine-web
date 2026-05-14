import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, MeshDistortMaterial, Points, PointMaterial, PresentationControls } from '@react-three/drei';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaCheckCircle, FaGlobeAmericas } from 'react-icons/fa';
import api from '../lib/api';

// ── 3D Technical Background (High Fidelity) ──────────────────────
function TechBackground() {
  const points = useRef();
  const sphere = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = t * 0.05;
    }
    if (sphere.current) {
      sphere.current.rotation.y = t * 0.1;
      sphere.current.distort = 0.4 + Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Distorted Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={sphere} position={[2, 0, -2]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#3b82f6"
            speed={2}
            distort={0.4}
            radius={1}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* Orbiting Particles */}
      <Points ref={points}>
        <PointMaterial
          transparent
          color="#a78bfa"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
        {/* Random point generation */}
        {(() => {
          const count = 1000;
          const pos = new Float32Array(count * 3);
          for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
          }
          return (
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
            </bufferGeometry>
          );
        })()}
      </Points>
    </group>
  );
}

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await api.post('/enquiries', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <div ref={containerRef} className="contact-premium-root">
      
      {/* ── High-Fidelity 3D Background Layer ───────────── */}
      <div className="bg-canvas-container">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
          <Suspense fallback={null}>
            <Environment preset="night" />
            <TechBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Floating Overlay Elements ───────────────────── */}
      <div className="noise-overlay" />
      
      <div className="main-content-scroll">
        <div className="max-w-wide" style={{ margin: '0 auto', padding: '120px 1.5rem' }}>
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ textAlign: 'center', marginBottom: '6rem' }}
          >
            <div className="f-section-label" style={{ color: '#60a5fa', marginBottom: '1.5rem', justifyContent: 'center' }}>
              <FaGlobeAmericas /> <span>Available Worldwide</span>
            </div>
            <h1 className="f-display hero-text">
              Engineering <span className="italic-text">Partnerships</span>
            </h1>
            <p className="f-body hero-sub">
              Bridging the gap between conceptual design and high-precision manufacturing. 
              Let's build something exceptional together.
            </p>
          </motion.div>

          <div className="grid-2-contact">
            
            {/* Left Column: Information */}
            <div className="info-column">
              {[
                { icon: FaPhone, title: 'Direct Line', val: '+91 98104 12158', sub: '+91 98100 60006', color: '#3b82f6' },
                { icon: FaEnvelope, title: 'Email Office', val: 'smgmachines@gmail.com', sub: 'Technical & Sales Enquiries', color: '#10b981' },
                { icon: FaMapMarkerAlt, title: 'Headquarters', val: 'Mayapuri Phase - II', sub: 'New Delhi - 110064, India', color: '#f59e0b' }
              ].map((item, idx) => (

                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="interactive-card"
                >
                  <div className="card-inner">
                    <div className="icon-wrapper" style={{ '--accent': item.color }}>
                      <item.icon />
                    </div>
                    <div className="card-content">
                      <span className="card-label">{item.title}</span>
                      <h3 className="card-value">{item.val}</h3>
                      <p className="card-sub">{item.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social Networking */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="social-strip"
              >
                {[FaLinkedin, FaInstagram, FaTwitter, FaFacebook].map((Icon, i) => (
                  <a key={i} href="#" className="social-link-icon">
                    <Icon />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Dynamic Form / Success Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="premium-form-container"
            >
              <AnimatePresence mode="wait">
                {formStatus !== 'success' ? (
                  <motion.div 
                    key="contact-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="form-glass"
                  >
                    <h2 className="f-display form-title">Start a <span className="italic-text">Project</span></h2>
                    
                    <form onSubmit={handleSubmit} className="form-stack">
                      <div className="input-field">
                        <input
                          type="text" name="name" required
                          value={formData.name} onChange={handleInputChange}
                          placeholder="Full Name"
                        />
                        <div className="field-border" />
                      </div>

                      <div className="input-field">
                        <input
                          type="email" name="email" required
                          value={formData.email} onChange={handleInputChange}
                          placeholder="Email Address"
                        />
                        <div className="field-border" />
                      </div>

                      <div className="input-field">
                        <input
                          type="text" name="subject" required
                          value={formData.subject} onChange={handleInputChange}
                          placeholder="Subject"
                        />
                        <div className="field-border" />
                      </div>

                      <div className="input-field">
                        <textarea
                          name="message" required rows={4}
                          value={formData.message} onChange={handleInputChange}
                          placeholder="How can we assist your production?"
                        />
                        <div className="field-border" />
                      </div>

                      <button type="submit" disabled={formStatus === 'sending'} className="magical-button">
                        <span className="btn-text">
                          {formStatus === 'sending' ? 'Transmitting...' : 'Transmit Message'}
                        </span>
                        {formStatus === 'idle' && <FaPaperPlane className="btn-icon" />}
                        {formStatus === 'sending' && <div className="spinner-small" />}
                      </button>
                    </form>

                    <div className="form-footer">
                      <FaClock className="pulse-icon" />
                      <span>Available Mon-Fri, 09:00 - 18:00 IST</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="form-glass success-card-glass"
                    style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '500px' }}
                  >
                    <div className="success-icon-wrapper">
                      <FaCheckCircle className="big-check" />
                    </div>
                    <h2 className="f-display" style={{ fontSize: '3rem', marginTop: '2rem', marginBottom: '1rem' }}>
                      Thank <span className="italic-text">You</span>
                    </h2>
                    <p className="f-body" style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '350px', lineHeight: 1.6 }}>
                      Your technical query has been transmitted successfully. Our engineering team will review it and get back to you shortly.
                    </p>
                    <div style={{ marginTop: '3rem' }}>
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="btn-pill"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 30px' }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .spinner-small {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(0,0,0,0.1);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .success-icon-wrapper {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 0 50px -10px rgba(16, 185, 129, 0.5);
        }

        .big-check {
          font-size: 3.5rem;
          color: #10b981;
          animation: scale-up 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes scale-up {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .contact-premium-root {
          background: #020617;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: #fff;
        }

        .bg-canvas-container {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          z-index: 1;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.15;
          pointer-events: none;
        }

        .main-content-scroll {
          position: relative;
          z-index: 10;
        }

        .hero-text {
          font-size: clamp(3.5rem, 10vw, 6.5rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
          background: linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .italic-text {
          font-style: italic;
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-sub {
          max-width: 600px;
          margin: 2rem auto 0;
          font-size: 1.25rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        .grid-2-contact {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 6rem;
          align-items: center;
          margin-top: 4rem;
        }

        .info-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .interactive-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2rem;
          padding: 2rem;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        .interactive-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(96, 165, 250, 0.3);
          transform: translateX(10px);
        }

        .card-inner {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .icon-wrapper {
          width: 4.5rem;
          height: 4.5rem;
          border-radius: 1.25rem;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 0 30px -5px var(--accent);
          opacity: 0.9;
        }

        .card-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          font-weight: 700;
        }

        .card-value {
          font-size: 1.5rem;
          margin: 0.25rem 0;
          font-weight: 600;
        }

        .card-sub {
          font-size: 0.875rem;
          color: #475569;
        }

        .social-strip {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .social-link-icon {
          font-size: 1.5rem;
          color: #475569;
          transition: all 0.3s ease;
        }

        .social-link-icon:hover {
          color: #fff;
          transform: translateY(-5px);
        }

        .premium-form-container {
          position: relative;
        }

        .form-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 3rem;
          padding: 4rem;
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
        }

        .form-title {
          font-size: 2.5rem;
          margin-bottom: 3rem;
        }

        .form-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .input-field {
          position: relative;
        }

        .input-field input, .input-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 0;
          color: #fff;
          font-size: 1.1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .field-border {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          transition: width 0.4s ease;
        }

        .input-field input:focus ~ .field-border,
        .input-field textarea:focus ~ .field-border {
          width: 100%;
        }

        .magical-button {
          margin-top: 2rem;
          background: #fff;
          color: #000;
          border: none;
          padding: 1.5rem 3rem;
          border-radius: 100px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .magical-button:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px -10px rgba(255,255,255,0.3);
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .magical-button:hover .btn-icon {
          transform: translate(5px, -5px);
        }

        .form-footer {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #475569;
          font-size: 0.875rem;
        }

        .pulse-icon {
          color: #60a5fa;
          animation: pulse-glow 2s infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px #60a5fa); }
          50% { opacity: 0.5; filter: drop-shadow(0 0 10px #60a5fa); }
        }

        @media (max-width: 1024px) {
          .grid-2-contact {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .form-glass {
            padding: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .max-w-wide {
            padding: 80px 1.25rem !important;
          }
          .hero-text {
            font-size: 3.5rem;
            margin-top: 2rem;
          }
          .hero-sub {
            font-size: 1.1rem;
            margin-top: 1.5rem;
          }
          .form-glass {
            padding: 2rem 1.5rem;
            border-radius: 2rem;
          }
          .interactive-card {
            padding: 1.5rem;
            border-radius: 1.5rem;
          }
          .icon-wrapper {
            width: 3.5rem;
            height: 3.5rem;
            font-size: 1.2rem;
          }
          .card-value {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;


