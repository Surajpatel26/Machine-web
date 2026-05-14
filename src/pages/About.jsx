import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { FaAward, FaUsers, FaLightbulb, FaHandshake, FaArrowRight, FaGlobe, FaCogs, FaTools } from 'react-icons/fa';
import aboutPrecisionImg from '../assets/about_precision.png';
import aboutTeamImg from '../assets/about_team.png';
import { Link } from 'react-router-dom';

// ── 3D Visual Component (The Neural Grid — Heritage Edition) ────────
function PrecisionNetwork() {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.1;
    group.current.rotation.x = Math.sin(t / 4) * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshStandardMaterial 
            color="#3B6B95" 
            wireframe 
            transparent 
            opacity={0.12} 
          />
        </mesh>
        <Sphere args={[0.7, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#C9A84C"
            speed={2}
            distort={0.4}
            radius={1}
            emissive="#C9A84C"
            emissiveIntensity={0.8}
          />
        </Sphere>
      </Float>
      {/* Heritage Floor Grid */}
      <gridHelper args={[30, 60, "#C9A84C", "rgba(26,26,24,0.03)"]} position={[0, -3.5, 0]} rotation={[0, 0, 0]} />
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
    <div style={{ background: 'var(--bg-white)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ── Progress Bar ── */}
      <motion.div style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--brand-blue)', zIndex: 1000, originX: 0 }} />

      {/* ── Hero Section ── */}
      <section style={{ minHeight: '90vh', position: 'relative', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.7 }}>
          <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <PrecisionNetwork />
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

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}
            >
              <img src={aboutPrecisionImg} alt="Precision Engineering" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </motion.div>
          </div>

          <div className="grid-4" style={{ gap: '20px', marginTop: '6rem' }}>
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
                style={{ padding: '2.5rem', background: '#fff', borderRadius: '24px', border: '1px solid rgba(26,26,24,0.05)', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}
              >
                <div className="f-display" style={{ fontSize: '2.5rem', color: 'var(--brand-blue)', marginBottom: '8px' }}>{stat.value}</div>
                <div className="f-label" style={{ fontSize: '0.65rem', color: 'var(--ink-light)', textTransform: 'uppercase' }}>{stat.label}</div>
              </motion.div>
            ))}
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
      <section style={{ padding: '10rem 0', background: '#fff' }}>
        <div className="max-w-wide">
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <div className="f-section-label" style={{ color: 'var(--brand-blue)', marginBottom: '16px', justifyContent: 'center' }}>
              <span>Our Legacy</span>
            </div>
            <h2 className="f-display" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>Our <span className="f-display-italic">Evolution</span></h2>
          </div>

          <div className="timeline-container" style={{ position: 'relative' }}>
            {/* Center Vertical Line */}
            <div className="timeline-center-line" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`timeline-row ${i % 2 === 0 ? 'row-left' : 'row-right'}`}
                >
                  {/* The Content Card */}
                  <div className="timeline-card">
                    <div className="timeline-year">{item.year}</div>
                    <h4 className="timeline-title">{item.title}</h4>
                    <p className="f-body timeline-desc">{item.desc}</p>
                  </div>

                  {/* The Dot */}
                  <div className="timeline-dot" />
                  
                  {/* Empty space for zig-zag */}
                  <div className="timeline-spacer" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .timeline-container {
            padding: 40px 0;
          }
          .timeline-center-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 1px;
            background: rgba(26,26,24,0.1);
            transform: translateX(-50%);
          }
          .timeline-row {
            display: flex;
            align-items: center;
            width: 100%;
            position: relative;
          }
          .timeline-card {
            width: 45%;
            padding: 3rem;
            background: #fff;
            border-radius: 2rem;
            border: 1px solid rgba(26,26,24,0.05);
            box-shadow: 0 20px 40px rgba(0,0,0,0.02);
            transition: all 0.4s ease;
            position: relative;
            z-index: 2;
          }
          .timeline-card:hover {
            border-color: var(--gold);
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(0,0,0,0.05);
          }
          .row-left {
            flex-direction: row;
            text-align: right;
          }
          .row-right {
            flex-direction: row-reverse;
            text-align: left;
          }
          .timeline-dot {
            width: 14px;
            height: 14px;
            background: var(--brand-blue);
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            box-shadow: 0 0 0 6px rgba(59,107,149,0.1);
          }
          .timeline-spacer {
            width: 45%;
          }
          .timeline-year {
            font-family: var(--display);
            font-size: 2.5rem;
            color: var(--gold);
            margin-bottom: 0.5rem;
          }
          .timeline-title {
            font-family: var(--sans);
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: var(--ink);
            margin-bottom: 1rem;
          }
          .timeline-desc {
            color: var(--ink-mid);
            font-size: 1.1rem;
            line-height: 1.6;
          }

          @media (max-width: 768px) {
            .timeline-center-line {
              left: 20px;
              transform: none;
            }
            .timeline-row {
              flex-direction: column !important;
              align-items: flex-start !important;
              text-align: left !important;
              padding-left: 50px;
            }
            .timeline-card {
              width: 100%;
              padding: 2rem;
            }
            .timeline-dot {
              left: 20px;
              transform: translateX(-50%);
              top: 40px;
            }
            .timeline-spacer {
              display: none;
            }
          }
        `}</style>
      </section>


      {/* ── Closing CTA ── */}
      <section style={{ padding: '10rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={aboutTeamImg} alt="Our Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(59,107,149,0.92)' }} />
        </div>
        
        <div className="max-w-text" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="f-display" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '24px' }}>
            Join Our <span className="f-display-italic">Future</span>
          </h2>
          <p className="f-body" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '48px' }}>
            Be part of the next chapter in precision engineering excellence.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'inline-block' }}
          >
            <Link
              to="/contact"
              className="btn-pill btn-pill-white"
            >
              Contact Our Experts
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

