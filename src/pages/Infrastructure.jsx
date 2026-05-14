import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import factoryImg  from '../assets/factory_floor.png';
import cmmImg      from '../assets/cmm_room.png';
import assemblyImg from '../assets/assembly_bay.png';

const T = {
  navy:'#000924', navyMid:'#0F2044', gold:'#C9A84C', goldLt:'#E6C364',
  ivory:'#FDF9F1', ivoryDk:'#F7F3EB', slate:'#45464E', steel:'#75777F',
  playfair:"'Playfair Display', Georgia, serif",
  cinzel:"'Cinzel', serif",
  body:"'Source Sans 3', sans-serif",
};

const facilities = [
  { title:'Manufacturing Shop Floor', img: factoryImg,  desc:'50,000 sq. ft. main production area with CNC machining centers, assembly bays, and quality zones.' },
  { title:'CMM Inspection Room',       img: cmmImg,      desc:'Temperature-controlled CMM room with Renishaw and Zeiss equipment for micron-level accuracy.' },
  { title:'Assembly & Testing Bay',    img: assemblyImg, desc:'Dedicated final assembly and acceptance testing area where each machine undergoes rigorous run-off.' },
  { title:'R&D Center',                img: '/machine3.png', desc:'Dedicated research and development center for new product development and continuous improvement.' },
];

const machines = [
  { name:'CNC Machining Centers',  count:'12 Units', purpose:'Precision component manufacturing' },
  { name:'VMC Production Machines',count:'8 Units',  purpose:'Structural & body parts' },
  { name:'Precision Grinding',     count:'6 Units',  purpose:'Surface & cylindrical grinding' },
  { name:'Jig Boring Machines',    count:'4 Units',  purpose:'High-precision boring operations' },
  { name:'Wire EDM',               count:'3 Units',  purpose:'Die & mould components' },
  { name:'Coordinate Measuring',   count:'4 Units',  purpose:'Quality inspection' },
];

const keyStats = [
  { value:'50,000', label:'Sq. Ft. Plant Area' },
  { value:'200+',   label:'Skilled Employees' },
  { value:'500+',   label:'Units / Year Capacity' },
  { value:'40+',    label:'Production Machines' },
];

const certs = [
  { cert:'ISO 9001:2015', desc:'Quality Management System', year:'2022' },
  { cert:'CE Certified',  desc:'European Conformity',       year:'2021' },
  { cert:'MSME Registered',desc:'Govt. of India',           year:'2010' },
  { cert:'Export House',  desc:'DGFT Recognized',           year:'2018' },
];

export default function Infrastructure() {
  return (
    <div style={{ background:T.ivory }}>

      <style>{`
        @media (max-width: 768px) {
          .machine-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .hero-content {
            padding: 0 1.5rem !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .facility-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* HERO */}
      <div style={{ position:'relative', height: window.innerWidth < 768 ? 420 : 340, overflow:'hidden' }}>
        <img src={factoryImg} alt="SMG Facility" style={{ width:'100%', height:'100%', objectFit:'cover' }} className="hero-image-pan" />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,9,36,0.9) 0%, rgba(0,9,36,0.58) 60%, rgba(0,9,36,0.18) 100%)' }} />
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
          className="hero-content"
          style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 3rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12, fontFamily:T.cinzel, fontSize:'0.7rem', letterSpacing:'0.2em', color:T.gold, textTransform:'uppercase' }}>
            <div style={{ width:32, height:1, background:T.gold }} /> Our Facility
          </div>
          <h1 style={{ fontFamily:T.playfair, fontWeight:700, fontSize:'clamp(2.2rem,5vw,3.5rem)', color:T.ivory, letterSpacing:'-0.02em', marginBottom:14, lineHeight: 1.1 }}>
            World-Class <br /><em style={{ fontStyle:'italic', color:T.goldLt }}>Infrastructure</em>
          </h1>
          <p style={{ fontFamily:T.body, fontSize:'0.95rem', color:'rgba(253,249,241,0.72)', maxWidth:520, lineHeight:1.7 }}>
            State-of-the-art manufacturing facility spanning 50,000 sq. ft., equipped with the latest production and quality assurance equipment.
          </p>
        </motion.div>
      </div>

      <div style={{ height:1, background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)' }} />

      {/* KEY STATS */}
      <section style={{ background:T.navyMid, padding:'clamp(40px, 8vw, 80px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(201,168,76,0.12)' }}>
            {keyStats.map((s,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ 
                  textAlign:'center', 
                  padding:'clamp(1.5rem, 4vw, 2.5rem) 1rem', 
                  borderRight: '1px solid rgba(201,168,76,0.12)', 
                  borderBottom: '1px solid rgba(201,168,76,0.12)' 
                }}>
                <div style={{ fontFamily:T.playfair, fontWeight:700, fontSize:'clamp(1.75rem,4vw,3rem)', color:T.goldLt, letterSpacing:'-0.02em', marginBottom:8, lineHeight:1 }}>{s.value}</div>
                <div style={{ fontFamily:T.cinzel, fontSize:'0.6rem', letterSpacing:'0.15em', color:'rgba(253,249,241,0.55)', textTransform:'uppercase' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY GALLERY */}
      <section style={{ background:T.ivory, padding:'clamp(60px, 10vw, 120px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:52 }}>
            <div style={{ fontFamily:T.cinzel, fontSize:'0.7rem', letterSpacing:'0.2em', color:T.gold, textTransform:'uppercase', marginBottom:12, display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:32, height:1, background:T.gold }} /> Our Facilities
            </div>
            <h2 style={{ fontFamily:T.playfair, fontWeight:700, fontSize:'clamp(1.8rem,4vw,3rem)', color:T.navy, letterSpacing:'-0.02em' }}>
              Built for <em style={{ fontStyle:'italic', color:T.gold }}>Excellence</em>
            </h2>
          </motion.div>

          <div className="facility-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {facilities.map((f,i) => (
              <motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.6 }}
                style={{ background:'#fff', borderRadius:2, overflow:'hidden', boxShadow:'0 2px 16px rgba(28,28,23,0.07)', transition:'all 0.35s' }}
                className="group hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(28,28,23,0.12)]">
                <div style={{ height:230, overflow:'hidden', position:'relative' }}>
                  <img src={f.img} alt={f.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }} className="group-hover:scale-105" />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,9,36,0.65) 0%, transparent 50%)' }} />
                  <div style={{ position:'absolute', bottom:14, left:18 }}>
                    <span style={{ fontFamily:T.cinzel, fontSize:'0.6rem', letterSpacing:'0.16em', color:T.goldLt, textTransform:'uppercase' }}>{f.title}</span>
                  </div>
                </div>
                <div style={{ padding:'1.5rem' }}>
                  <h3 style={{ fontFamily:T.playfair, fontWeight:700, fontSize:'1.1rem', color:T.navy, marginBottom:8, letterSpacing:'-0.01em' }}>{f.title}</h3>
                  <p style={{ fontFamily:T.body, fontSize:'0.875rem', color:T.slate, lineHeight:1.7 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTION EQUIPMENT */}
      <section style={{ background:T.ivoryDk, padding:'clamp(60px, 8vw, 100px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:12 }}>
              <div style={{ width:40, height:1, background:`linear-gradient(90deg, transparent, ${T.gold})` }} />
              <span style={{ fontFamily:T.cinzel, fontSize:'0.7rem', letterSpacing:'0.2em', color:T.gold, textTransform:'uppercase' }}>In-House Equipment</span>
              <div style={{ width:40, height:1, background:`linear-gradient(90deg, ${T.gold}, transparent)` }} />
            </div>
            <h2 style={{ fontFamily:T.playfair, fontWeight:700, fontSize:'clamp(1.8rem,4vw,3rem)', color:T.navy, letterSpacing:'-0.02em' }}>
              Production <em style={{ fontStyle:'italic', color:T.gold }}>Equipment</em>
            </h2>
            <p style={{ fontFamily:T.body, fontSize:'0.95rem', color:T.slate, marginTop:8 }}>Our in-house machines ensure precision from raw material to finished product.</p>
          </motion.div>

          <div style={{ background:'#fff', borderRadius:2, overflow:'hidden', boxShadow:'0 2px 20px rgba(28,28,23,0.08)' }}>
            {machines.map((m,i) => (
              <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 24px', borderBottom:i<machines.length-1?`1px solid ${T.ivoryDk}`:'none', background:i%2===0?'transparent':T.ivoryDk, transition:'all 0.2s' }}
                className="hover:bg-[#F1EDE6] machine-row">
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:T.gold, flexShrink:0 }} />
                  <div>
                    <div style={{ fontFamily:T.playfair, fontWeight:600, fontSize:'0.95rem', color:T.navy }}>{m.name}</div>
                    <div style={{ fontFamily:T.body, fontSize:'0.8rem', color:T.steel }}>{m.purpose}</div>
                  </div>
                </div>
                <div style={{ fontFamily:T.cinzel, fontSize:'0.72rem', letterSpacing:'0.12em', color:T.gold, textTransform:'uppercase', fontWeight:600 }}>{m.count}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* QUALITY & CERTS */}
      <section style={{ background: T.ivory, padding: '96px 0' }} id="quality">
        <div className="max-w-7xl mx-auto px-6 md:px-12" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} style={{ flex: '1 1 400px' }}>
            <div style={{ fontFamily:T.cinzel, fontSize:'0.7rem', letterSpacing:'0.2em', color:T.gold, textTransform:'uppercase', marginBottom:12, display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:32, height:1, background:T.gold }} /> Quality Assurance
            </div>
            <h2 style={{ fontFamily:T.playfair, fontWeight:700, fontSize:'clamp(1.8rem,3.5vw,2.8rem)', color:T.navy, letterSpacing:'-0.02em', lineHeight:1.2, marginBottom:16 }}>
              Zero Defect,<br/><em style={{ fontStyle:'italic', color:T.gold }}>100% Quality</em>
            </h2>
            <div style={{ width:56, height:2, background:`linear-gradient(90deg,${T.gold},${T.goldLt})`, marginBottom:20 }} />
            <p style={{ fontFamily:T.body, fontSize:'0.95rem', color:T.slate, lineHeight:1.75, marginBottom:24 }}>
              Quality is not just a department at SMG Machines — it is embedded in every process, every component, and every person. Our ISO 9001:2015 certified quality management system covers the entire production lifecycle.
            </p>
            <ul style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
              {['Incoming material inspection','In-process dimensional verification','CMM final inspection','Machine run-off and performance testing','Customer acceptance trials'].map((item,i) => (
                <li key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:16, height:16, borderRadius:'50%', border:`1px solid rgba(201,168,76,0.4)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:T.gold }} />
                  </div>
                  <span style={{ fontFamily:T.body, fontSize:'0.875rem', color:T.slate }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Request Quality Docs <FaArrowRight style={{ fontSize:10 }} /></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {certs.map((c,i) => (
              <div key={i} style={{ background:'#fff', borderRadius:2, padding:'1.5rem', boxShadow:'0 2px 16px rgba(28,28,23,0.07)', textAlign:'center', transition:'all 0.3s' }}
                className="hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(28,28,23,0.12)]">
                <div style={{ fontFamily:T.playfair, fontWeight:700, fontSize:'1.05rem', color:T.navy, marginBottom:6 }}>{c.cert}</div>
                <div style={{ width:28, height:1.5, background:T.gold, margin:'0 auto 8px' }} />
                <div style={{ fontFamily:T.body, fontSize:'0.8rem', color:T.slate, marginBottom:4 }}>{c.desc}</div>
                <div style={{ fontFamily:T.cinzel, fontSize:'0.62rem', letterSpacing:'0.12em', color:T.gold, textTransform:'uppercase' }}>Since {c.year}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
