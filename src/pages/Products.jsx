import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowRight, FaThLarge, FaList, FaIndustry } from 'react-icons/fa';
import api from '../lib/api';
import vmcImg   from '../assets/hero_vmc.png';
import cncImg   from '../assets/cnc_lathe.png';
import hmcImg   from '../assets/hmc_machine.png';
import spmImg   from '../assets/spm_machine.png';
import grindImg from '../assets/grinding_machine.png';
import factoryImg from '../assets/factory_floor.png';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [total,      setTotal]      = useState(0);
  const [search,     setSearch]     = useState('');
  const [view,       setView]       = useState('grid');
  const [inputFocus, setInputFocus] = useState(false);
  const activeCategory = searchParams.get('category') || '';

  useEffect(() => {
    api.get('/categories').then(r => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory) params.set('category', activeCategory);
    if (search) params.set('search', search);
    params.set('limit', '24');
    api.get(`/products?${params.toString()}`)
      .then(r => { setProducts(r.data.data || []); setTotal(r.data.total || 0); })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory, search]);

  const setCategory = slug => slug ? setSearchParams({ category: slug }) : setSearchParams({});

  return (
    <div style={{ background: 'var(--bg-white)', pt: '64px' }}>

      {/* ── Hero Banner ─────────────────────────────────── */}
      <div style={{ position: 'relative', height: '40vh', minHeight: 300, overflow: 'hidden' }}>
        <img src={factoryImg} alt="Products" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,26,24,0.95) 0%, rgba(26,26,24,0.6) 60%, transparent 100%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2rem' }}
          className="max-w-wide"
        >
          <div className="f-section-label" style={{ color: 'var(--gold)', marginBottom: 12 }}>
            Catalogue
          </div>
          <h1 className="f-display" style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            color: '#fff', marginBottom: 16 
          }}>
            Precision <span className="f-display-italic" style={{ color: 'var(--gold)' }}>Engineering</span>
          </h1>
          <p className="f-body" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, fontSize: '1.1rem' }}>
            Explore our curated collections of vertical and horizontal machining centers.
          </p>
        </motion.div>
      </div>

      {/* ── Content ─────────────────────────────── */}
      <div className="max-w-wide" style={{ padding: '4rem 2rem 8rem' }}>

        {/* Controls Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search */}
          <div style={{ flex: '1 1 400px', position: 'relative', maxWidth: 600 }}>
            <FaSearch style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-fade)', fontSize: 14 }} />
            <input
              type="text" placeholder="Search by machine model or series..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="f-body"
              style={{
                width: '100%', background: 'transparent',
                border: 'none', borderBottom: `2px solid ${inputFocus ? 'var(--ink)' : 'rgba(26,26,24,0.1)'}`,
                padding: '16px 16px 16px 48px',
                fontSize: '1rem', color: 'var(--ink)', outline: 'none', transition: 'all 0.3s',
              }}
              onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {!loading && (
              <span className="f-label" style={{ color: 'var(--ink-light)', opacity: 0.6 }}>{total} Results</span>
            )}
            
            <div style={{ display: 'flex', background: 'rgba(26,26,24,0.05)', padding: 4, borderRadius: 30 }}>
              {[['grid', FaThLarge], ['list', FaList]].map(([v, Icon]) => (
                <button key={v} onClick={() => setView(v)}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', border: 'none',
                    background: view === v ? 'var(--ink)' : 'transparent',
                    color: view === v ? '#fff' : 'var(--ink-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.25s',
                  }}>
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '4rem' }}>
          <button
            onClick={() => setCategory('')}
            className={`f-chip ${!activeCategory ? 'f-chip-active' : 'f-chip-default'}`}
          >
            All Collections
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.slug)}
              className={`f-chip ${activeCategory === cat.slug ? 'f-chip-active' : 'f-chip-default'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className={view === 'grid' ? 'grid-3' : 'grid-1'}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 350, borderRadius: 20 }} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '10rem 0', opacity: 0.5 }}
            >
              <h3 className="f-display" style={{ fontSize: '2rem' }}>No results match your search</h3>
              <p className="f-body" style={{ marginTop: 12 }}>Try adjusting your filters or browsing all collections.</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${search}-${view}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={view === 'grid' ? 'grid-3' : 'grid-1'}
              style={{ gap: '3rem 2rem' }}
            >
              {products.map((product, i) => {
                const img = categoryImages[product.category_slug] || vmcImg;
                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className="f-card"
                    style={{ 
                      display: 'flex', 
                      flexDirection: view === 'list' && window.innerWidth > 768 ? 'row' : 'column',
                      height: '100%' 
                    }}
                  >
                    <div className="f-card-image" style={{ height: 280, width: view === 'list' && window.innerWidth > 768 ? '40%' : '100%', flexShrink: 0 }}>
                      <img src={img} alt={product.name} />
                      {product.is_featured && (
                        <div style={{ position: 'absolute', top: 20, right: 20 }} className="f-chip f-chip-active">Featured</div>
                      )}
                    </div>

                    <div className="f-card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div className="f-label" style={{ color: 'var(--gold)', marginBottom: 12 }}>{product.category_name}</div>
                      <h3 className="f-display" style={{ fontSize: '1.6rem', marginBottom: 12 }}>{product.name}</h3>
                      <p className="f-body line-clamp-2" style={{ fontSize: '0.95rem', color: 'var(--ink-mid)', marginBottom: 20, opacity: 0.8 }}>
                        {product.short_description}
                      </p>
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink)', fontWeight: 600, fontSize: '0.9rem' }}>
                        Specification Sheet <FaArrowRight size={10} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

