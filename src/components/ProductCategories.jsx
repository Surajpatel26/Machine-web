import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import vmcImg      from '../assets/hero_vmc.png';
import cncImg      from '../assets/cnc_lathe.png';
import hmcImg      from '../assets/hmc_machine.png';
import spmImg      from '../assets/spm_machine.png';
import grindImg    from '../assets/grinding_machine.png';

const categories = [
  { id: 'vmc', title: 'VMC Machines', image: vmcImg, slug: 'vmc-machines' },
  { id: 'cnc', title: 'CNC Turning', image: cncImg, slug: 'cnc-machines' },
  { id: 'hmc', title: 'HMC Machines', image: hmcImg, slug: 'hmc-machines' },
  { id: 'spm', title: 'Special Purpose', image: spmImg, slug: 'special-purpose-machines' },
];

export default function ProductCategories() {
  const [filter, setFilter] = useState('all');

  return (
    <section className="py-24" style={{ background: 'var(--bg-white)', borderRadius: '0 0 32px 32px', position: 'relative', zIndex: 2 }}>
      <div className="max-w-wide">
        
        <div className="text-center mb-16 max-w-text mx-auto">
          <h2 className="f-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Explore our collections,<br />
            designed and produced with <span className="f-display-italic">precision</span>.
          </h2>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: '3rem' }}>
          <span className="f-label" style={{ opacity: 0.6 }}>Filter by Category:</span>
          <button 
            className={`f-chip ${filter === 'all' ? 'f-chip-active' : 'f-chip-default'}`}
            onClick={() => setFilter('all')}
          >
            All Machines
          </button>
          {categories.map(c => (
            <button 
              key={c.id}
              className={`f-chip ${filter === c.id ? 'f-chip-active' : 'f-chip-default'}`}
              onClick={() => setFilter(c.id)}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
          <AnimatePresence>
            {categories.filter(c => filter === 'all' || filter === c.id).map((cat) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={cat.id}
              >
                <Link to={`/products?category=${cat.slug}`} className="f-card">
                  <div className="f-card-image" style={{ height: 260 }}>
                    <img src={cat.image} alt={cat.title} />
                  </div>
                  <div className="f-card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="f-label">{cat.title}</span>
                    <span style={{ fontSize: '1.2rem' }}>→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
