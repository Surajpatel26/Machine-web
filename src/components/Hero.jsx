import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, PresentationControls, Instances, Instance, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

// Optimized Gear component using Instances for teeth
function Gear({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], speed = 1, color = "#1A202C", metalness = 0.8 }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.z += delta * speed;
    }
  });

  const teethCount = 12; // Slightly reduced for performance
  const radius = 1.4;

  return (
    <group ref={group} position={position} scale={scale} rotation={rotation}>
      {/* Main body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.4, 24]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={0.3} />
      </mesh>

      {/* Inner hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
        <cylinderGeometry args={[0.7, 0.7, 0.42, 16]} />
        <meshStandardMaterial color="#0F141E" metalness={0.9} roughness={0.5} />
      </mesh>

      {/* Instanced Teeth for maximum performance */}
      <Instances range={teethCount}>
        <boxGeometry args={[0.3, 0.4, 0.5]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={0.3} />
        {Array.from({ length: teethCount }).map((_, i) => {
          const angle = (i / teethCount) * Math.PI * 2;
          return (
            <Instance
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
              rotation={[0, 0, angle]}
            />
          );
        })}
      </Instances>
    </group>
  );
}

// 3D Machinery Assembly
function AbstractMachinedPart() {
  const assembly = useRef();

  useFrame((state, delta) => {
    if (assembly.current) {
      // Slow majestic rotation of the entire assembly
      assembly.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      assembly.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={1}>
      <group ref={assembly} rotation={[0.3, 0, 0]} scale={0.55} position={[2.5, 0, 0]}>



        {/* Heritage Gold Gear */}
        <Gear position={[0, 0, 0]} scale={1.2} speed={0.4} color="#C9A84C" metalness={1} />

        {/* Dark Metal Interlocking Gear Right */}
        <Gear position={[2.6, 1.2, 0.1]} scale={0.8} speed={-0.6} color="#1A202C" />

        {/* Brand Blue Gear Left */}
        <Gear position={[-2.7, -1.0, -0.2]} scale={0.9} speed={-0.53} color="#4A86B8" metalness={0.8} />

        {/* Small fast gear top left */}
        <Gear position={[-1.2, 2.0, 0.1]} scale={0.5} speed={-0.96} color="#75777F" />
      </group>
    </Float>
  );
}

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '800px', overflow: 'hidden', background: 'var(--bg-white)' }}>

      {/* 3D WebGL Background */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
          <color attach="background" args={['#F5F3EE']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

          <Suspense fallback={null}>
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <AbstractMachinedPart />
            </PresentationControls>
            <Environment preset="city" />
            <ContactShadows position={[2.5, -2.5, 0]} opacity={0.3} scale={15} blur={2.5} far={4} color="#000" />

          </Suspense>
        </Canvas>
      </div>

      {/* Foreground Typography */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', pointerEvents: 'none'
      }}>
        <motion.div
          style={{ textAlign: 'left', paddingLeft: '8%', maxWidth: '1200px', width: '100%' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        >
          <div className="f-section-label" style={{ justifyContent: 'flex-start', marginBottom: 24, pointerEvents: 'auto', color: 'var(--brand-blue-lt)' }}>

            <span>Precision Engineering</span>
          </div>

          <h1 className="f-display" style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            color: 'var(--ink)',
            lineHeight: 1.1,
            textShadow: '0 0 30px rgba(245,243,238,0.9), 0 0 10px rgba(245,243,238,1)',
            marginBottom: 40
          }}>
            Engineered to <br />
            <span className="f-display-italic" style={{ color: 'var(--brand-blue)' }}>perform.</span>
          </h1>

          <div style={{ display: 'flex', justifyContent: 'flex-start', pointerEvents: 'auto' }}>
            <Link to="/products" className="btn-pill btn-pill-dark" style={{ padding: '1rem 3.5rem', fontSize: '1rem', background: 'var(--brand-blue)', color: '#fff' }}>
              Explore Collections
            </Link>
          </div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="f-label" style={{ color: 'var(--ink-light)' }}>Scroll to explore</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(26,26,24,0.3), transparent)' }} />
        </motion.div>
      </div>

    </section>
  );
}
