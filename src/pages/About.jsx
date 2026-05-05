import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { FaAward, FaUsers, FaLightbulb, FaHandshake, FaArrowRight, FaGlobe, FaCogs, FaTools } from 'react-icons/fa';

// ── 3D Visual Component (Minimalist Precision Sphere) ────────
function PrecisionSphere() {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
    group.current.rotation.x = Math.sin(t / 4) * 0.1;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial 
          color="#3B6B95" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#C9A84C" 
          emissive="#C9A84C" 
          emissiveIntensity={2} 
        />
      </mesh>
      <Environment preset="city" />
    </group>
  );
}

const timeline = [
  { year: '1998', title: 'The Genesis', desc: 'SMG Machines founded in Pune, establishing a foundation of precision.' },
  { year: '2005', title: 'Quality Benchmark', desc: 'Achieved ISO 9001 certification, standardizing our excellence.' },
  { year: '2010', title: 'Global Footprint', desc: 'First international shipment, marking our entry into the global arena.' },
  { year: '2015', title: 'Next-Gen Hub', desc: 'Inaugurated our 50,000 sq. ft. state-of-the-art manufacturing plant.' },
  { year: '2024', title: '25 Years of Legacy', desc: 'Over 2,000+ machines powering industries in 15+ countries.' },
];

const values = [
  { num: '01', title: 'Absolute Quality', desc: 'Precision is not just a goal; it is our standard across every component. We engineer for zero tolerance.' },
  { num: '02', title: 'Human-Centric', desc: 'We build relationships as enduring as our machinery. Our support is as robust as our engineering.' },
  { num: '03', title: 'Deep R&D', desc: 'Constantly pushing the boundaries of what machine tools can achieve through iterative innovation.' },
  { num: '04', title: 'Reliability', desc: 'A quarter-century of trust earned through consistent performance in the most demanding environments.' },
];

export default function About() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div style={{ background: 'var(--bg-white)', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* ── Progress Bar ── */}
      <motion.div style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--brand-blue)', zIndex: 1000, originX: 0 }} />

      {/* ── Hero Section ── */}
      <section style={{ minHeight: '90vh', position: 'relative', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.7 }}>
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <PrecisionSphere />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-wide" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ maxWidth: '800px' }}
          >
            <div className="f-section-label" style={{ color: 'var(--brand-blue)', marginBottom: '24px' }}>
              <span>Established 1998</span>
            </div>
            <h1 className="f-display" style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', lineHeight: 0.85, color: 'var(--ink)', marginBottom: '40px' }}>
              The Legacy of <br />
              <span className="f-display-italic" style={{ color: 'var(--brand-blue)' }}>Precision</span>
            </h1>
            <p className="f-body" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--ink-mid)', maxWidth: '550px', opacity: 0.8 }}>
              For over two decades, SMG Machines has been the silent pulse of the manufacturing world, engineering machines that define the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="max-w-wide">
          <div className="grid-2" style={{ gap: '4rem 6rem', alignItems: 'center' }}>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="f-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '32px', lineHeight: 1.1 }}>
                Engineering <br />
                <span className="f-display-italic">Heritage</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p className="f-body" style={{ fontSize: '1.15rem', color: 'var(--ink-mid)' }}>
                  Founded in the industrial heart of Pune, SMG Machines began with a singular focus: to bridge the gap between Indian manufacturing and global standards.
                </p>
                <p className="f-body" style={{ fontSize: '1.15rem', color: 'var(--ink-mid)' }}>
                  What started as a specialized workshop has evolved into a powerhouse of precision engineering, serving over 500+ global clients.
                </p>
              </div>
            </motion.div>

            <div className="grid-2" style={{ gap: '20px' }}>
              {[
                { label: 'Installed Base', value: '2000+' },
                { label: 'Global Reach', value: '15+ Nations' },
                { label: 'Engineering', value: '25 Years' },
                { label: 'Team Experts', value: '200+' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ padding: '2rem', background: '#fff', borderRadius: '24px', border: '1px solid rgba(26,26,24,0.05)', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}
                >
                  <div className="f-display" style={{ fontSize: '2rem', color: 'var(--brand-blue)', marginBottom: '8px' }}>{stat.value}</div>
                  <div className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', textTransform: 'uppercase' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Editorial Section ── */}
      <section style={{ padding: '8rem 0', background: 'var(--bg)', borderTop: '1px solid rgba(26,26,24,0.05)' }}>
        <div className="max-w-wide">
          
          <div style={{ maxWidth: '700px', marginBottom: '80px' }}>
            <div className="f-section-label" style={{ color: 'var(--gold)', marginBottom: '24px' }}>
              <span>Our Principles</span>
            </div>
            <h2 className="f-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
              The Pillars of Our <br />
              <span className="f-display-italic" style={{ color: 'var(--brand-blue)' }}>Excellence</span>
            </h2>
          </div>

          <div className="grid-2" style={{ gap: '6rem 4rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '24px',
                  paddingTop: i % 2 !== 0 && window.innerWidth > 768 ? '4rem' : '0'
                }}
              >
                <div style={{ 
                  fontFamily: 'var(--serif)', 
                  fontSize: 'clamp(4rem, 8vw, 6rem)', 
                  color: 'rgba(59,107,149,0.06)', 
                  lineHeight: 1,
                  fontWeight: 900,
                  fontStyle: 'italic'
                }}>
                  {v.num}
                </div>
                <div style={{ paddingLeft: '24px', borderLeft: '1px solid var(--gold)' }}>
                  <h3 className="f-display" style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--ink)' }}>{v.title}</h3>
                  <p className="f-body" style={{ color: 'var(--ink-mid)', fontSize: '1.1rem', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline Section ── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="max-w-text">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="f-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>Our <span className="f-display-italic">Evolution</span></h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '1px', background: 'rgba(26,26,24,0.1)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  style={{ position: 'relative', paddingLeft: '60px' }}
                >
                  <div style={{ position: 'absolute', left: '16px', top: '10px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--brand-blue)', boxShadow: '0 0 0 5px rgba(59,107,149,0.1)' }} />
                  <div className="f-display" style={{ fontSize: '1.75rem', color: 'var(--gold)', marginBottom: '8px' }}>{item.year}</div>
                  <h4 className="f-label" style={{ fontSize: '0.75rem', color: 'var(--ink)', marginBottom: '12px', letterSpacing: '0.1em' }}>{item.title}</h4>
                  <p className="f-body" style={{ color: 'var(--ink-mid)', fontSize: '1.05rem' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section style={{ padding: '8rem 0', textAlign: 'center', background: 'var(--brand-blue)' }}>
        <div className="max-w-text">
          <h2 className="f-display" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '24px' }}>
            Join Our <span className="f-display-italic">Future</span>
          </h2>
          <p className="f-body" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '48px' }}>
            Be part of the next chapter in precision engineering excellence.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-pill btn-pill-white"
          >
            Contact Our Experts
          </motion.button>
        </div>
      </section>
    </div>
  );
}

