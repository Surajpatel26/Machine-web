import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api, { getImageUrl } from '../lib/api';



const categoryImages = {
  'cnc-machines':              '/machine5.png',
  'vmc-machines':              '/machine3.png',
  'hmc-machines':              '/machine8.png',
  'special-purpose-machines':  '/machine1.jpeg',
  'drilling-machines':         '/machine6.png',
  'grinding-machines':         '/machine7.png',
};

const fallbackProducts = [
  { id: 1, name: 'VMC 850', short_description: 'High-speed vertical machining center.', category_name: 'VMC Machines', category_slug: 'vmc-machines', is_featured: true },
  { id: 2, name: 'CNC TC-200', short_description: 'Precision two-axis CNC turning center.', category_name: 'CNC Turning', category_slug: 'cnc-machines', is_featured: true },
  { id: 3, name: 'HMC 500', short_description: 'Horizontal machining center.', category_name: 'HMC Machines', category_slug: 'hmc-machines', is_featured: true },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    api.get('/products?featured=true&limit=3')
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

        <div className="grid-3" style={{ gap: '2rem' }}>
          {products.slice(0, 3).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/products/${product.slug}`} className="f-card">
                <div className="f-card-image" style={{ height: 280 }}>
                  <img src={product.main_image ? getImageUrl(product.main_image) : (categoryImages[product.category_slug] || vmcImg)} alt={product.name} />
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
