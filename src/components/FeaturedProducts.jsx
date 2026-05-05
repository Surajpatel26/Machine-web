import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../lib/api';

import vmcImg   from '../assets/hero_vmc.png';
import cncImg   from '../assets/cnc_lathe.png';
import hmcImg   from '../assets/hmc_machine.png';
import spmImg   from '../assets/spm_machine.png';

const fallbackProducts = [
  { id: 1, name: 'VMC 850', short_description: 'High-speed vertical machining center.', category_name: 'VMC Machines', slug: 'vmc-850', is_featured: true, img: vmcImg },
  { id: 2, name: 'CNC TC-200', short_description: 'Precision two-axis CNC turning center.', category_name: 'CNC Turning', slug: 'cnc-tc-200', is_featured: true, img: cncImg },
  { id: 3, name: 'HMC 500', short_description: 'Horizontal machining center.', category_name: 'HMC Machines', slug: 'hmc-500', is_featured: true, img: hmcImg },
  { id: 4, name: 'SPM Transfer', short_description: 'Custom multi-spindle transfer machine.', category_name: 'Special Purpose', slug: 'spm-transfer', is_featured: true, img: spmImg },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    api.get('/products?featured=true&limit=4')
      .then(res => { if (res.data?.data?.length) setProducts(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <section style={{ padding: '6rem 0 3rem 0', background: 'var(--bg-white)' }}>
      <div className="max-w-wide">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}
        >
          <div>
            <span className="f-label" style={{ color: 'var(--gold)', marginBottom: 12, display: 'block' }}>Featured Machines</span>
            <h2 className="f-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--ink)' }}>
              Our Flagship <span className="f-display-italic">Products</span>
            </h2>
          </div>
          <Link to="/products" className="btn-pill btn-pill-outline">
            View All Products
          </Link>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {products.slice(0, 4).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/products/${product.slug}`} className="f-card">
                <div className="f-card-image" style={{ height: 280 }}>
                  <img src={product.img || vmcImg} alt={product.name} />
                  {product.is_featured && (
                    <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Featured
                    </div>
                  )}
                </div>
                <div className="f-card-body">
                  <div className="f-label" style={{ color: 'var(--ink-light)', marginBottom: 8 }}>{product.category_name}</div>
                  <h3 className="f-display" style={{ fontSize: '1.4rem', marginBottom: 12 }}>{product.name}</h3>
                  <p className="f-body" style={{ fontSize: '0.9rem', color: 'var(--ink-mid)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.short_description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
