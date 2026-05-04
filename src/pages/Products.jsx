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

const T = {
  navy:'#000924', navyMid:'#0F2044', gold:'#C9A84C', goldLt:'#E6C364',
  ivory:'#FDF9F1', ivoryDk:'#F7F3EB', slate:'#45464E', steel:'#75777F',
  playfair:"'Playfair Display', Georgia, serif",
  cinzel:"'Cinzel', serif",
  body:"'Source Sans 3', sans-serif",
};

const categoryImages = {
  'vmc-machines': vmcImg,
  'cnc-machines': cncImg,
  'hmc-machines': hmcImg,
  'special-purpose-machines': spmImg,
  'grinding-machines': grindImg,
};

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
    <div style={{ background: T.ivory }}>

      {/* ── Hero Banner ─────────────────────────────────── */}
      <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
        <img src={factoryImg} alt="Products" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="hero-image-pan" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,9,36,0.9) 0%, rgba(0,9,36,0.55) 60%, transparent 100%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 3rem' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
            fontFamily: T.cinzel, fontSize: '0.7rem', letterSpacing: '0.2em', color: T.gold, textTransform: 'uppercase',
          }}>
            <div style={{ width: 32, height: 1, background: T.gold }} />
            Our Machines
          </div>
          <h1 style={{
            fontFamily: T.playfair, fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: T.ivory, letterSpacing: '-0.02em', marginBottom: 12,
          }}>
            Product{' '}
            <em style={{ fontStyle: 'italic', color: T.goldLt }}>Catalogue</em>
          </h1>
          <p style={{ fontFamily: T.body, fontSize: '0.95rem', color: 'rgba(253,249,241,0.72)', maxWidth: 480, lineHeight: 1.65 }}>
            Explore our complete range of precision machines designed for modern manufacturing excellence.
          </p>
        </motion.div>
      </div>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)' }} />

      {/* ── Filters + Content ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* Search + View toggle row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24, alignItems: 'center' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.steel, fontSize: 13 }} />
            <input
              type="text" placeholder="Search machines…" value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', background: '#fff',
                border: `1.5px solid ${inputFocus ? T.gold : '#E0DDD5'}`,
                borderRadius: 2, paddingLeft: 40, paddingRight: 16, paddingTop: 11, paddingBottom: 11,
                fontFamily: T.body, fontSize: '0.9rem', color: T.navy, outline: 'none', transition: 'border-color 0.25s',
                boxShadow: inputFocus ? '0 0 0 3px rgba(201,168,76,0.1)' : 'none',
              }}
              onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)}
            />
          </div>

          {/* Result count */}
          {!loading && (
            <div style={{ fontFamily: T.cinzel, fontSize: '0.62rem', letterSpacing: '0.12em', color: T.steel, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              {total} Result{total !== 1 ? 's' : ''}
            </div>
          )}

          {/* View toggle */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[['grid', FaThLarge], ['list', FaList]].map(([v, Icon]) => (
              <button key={v} onClick={() => setView(v)}
                title={v === 'grid' ? 'Grid view' : 'List view'}
                style={{
                  width: 42, height: 42, borderRadius: 2,
                  border: `1.5px solid ${view === v ? T.gold : '#E0DDD5'}`,
                  background: view === v ? T.gold : '#fff',
                  color: view === v ? T.navy : T.steel,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                <Icon style={{ fontSize: 14 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 44 }}>
          <button
            onClick={() => setCategory('')}
            style={{
              padding: '8px 20px', borderRadius: 2,
              border: `1.5px solid ${!activeCategory ? T.gold : '#E0DDD5'}`,
              background: !activeCategory ? T.navy : '#fff',
              fontFamily: T.cinzel, fontSize: '0.63rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: !activeCategory ? T.ivory : T.slate,
              cursor: 'pointer', transition: 'all 0.25s',
            }}
          >
            All ({total})
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.slug)}
              style={{
                padding: '8px 20px', borderRadius: 2,
                border: `1.5px solid ${activeCategory === cat.slug ? T.gold : '#E0DDD5'}`,
                background: activeCategory === cat.slug ? T.navy : '#fff',
                fontFamily: T.cinzel, fontSize: '0.63rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: activeCategory === cat.slug ? T.ivory : T.slate,
                cursor: 'pointer', transition: 'all 0.25s',
              }}
            >
              {cat.name} ({cat.product_count})
            </button>
          ))}
        </div>

        {/* Products grid/list */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  height: 300,
                  background: 'linear-gradient(90deg, #E6E2DA 25%, #ECE8E0 50%, #E6E2DA 75%)',
                  backgroundSize: '200% 100%', borderRadius: 2,
                  animation: 'skeleton-loading 1.5s infinite',
                }} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 2,
                border: '1px solid rgba(201,168,76,0.25)',
                background: 'rgba(201,168,76,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8,
              }}>
                <FaIndustry style={{ color: T.gold, fontSize: 26 }} />
              </div>
              <h3 style={{ fontFamily: T.playfair, fontWeight: 700, fontSize: '1.4rem', color: T.navy }}>No Products Found</h3>
              <p style={{ fontFamily: T.body, color: T.slate, maxWidth: 400 }}>Try adjusting your search or selecting a different category.</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'grid', gap: '24px', gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr' }}
            >
              {products.map((product, i) => {
                const img = categoryImages[product.category_slug] || vmcImg;
                return (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <Link
                      to={`/products/${product.slug}`}
                      style={{
                        textDecoration: 'none', display: 'flex',
                        flexDirection: view === 'list' ? 'row' : 'column',
                        background: '#fff', borderRadius: 2, overflow: 'hidden',
                        boxShadow: '0 2px 14px rgba(28,28,23,0.06)',
                        transition: 'all 0.35s',
                      }}
                      className="group hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(28,28,23,0.13)]"
                    >
                      {/* Image */}
                      {view === 'grid' && (
                        <div style={{ height: 210, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                          <img
                            src={img} alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                            className="group-hover:scale-105"
                          />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,9,36,0.45) 0%, transparent 55%)' }} />
                          <div style={{
                            position: 'absolute', bottom: 12, left: 14,
                            fontFamily: T.cinzel, fontSize: '0.58rem', letterSpacing: '0.14em',
                            textTransform: 'uppercase', color: T.goldLt,
                            background: 'rgba(0,9,36,0.55)', padding: '3px 8px', borderRadius: 1,
                          }}>
                            {product.category_name}
                          </div>
                        </div>
                      )}

                      {/* List-view thumbnail */}
                      {view === 'list' && (
                        <div style={{ width: 140, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                          <img src={img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} className="group-hover:scale-105" />
                        </div>
                      )}

                      {/* Content */}
                      <div style={{
                        padding: view === 'list' ? '1rem 1.5rem' : '1.35rem',
                        display: 'flex', flexDirection: 'column',
                        justifyContent: view === 'list' ? 'center' : 'flex-start',
                        flexGrow: 1,
                      }}>
                        {view === 'grid' && (
                          <div style={{
                            fontFamily: T.cinzel, fontSize: '0.58rem', letterSpacing: '0.14em',
                            textTransform: 'uppercase', color: T.gold, marginBottom: 6,
                          }}>
                            {product.category_name}
                          </div>
                        )}
                        <h3 style={{
                          fontFamily: T.playfair, fontWeight: 700, fontSize: '1.1rem',
                          color: T.navy, marginBottom: 8, letterSpacing: '-0.01em',
                          transition: 'color 0.2s', lineHeight: 1.3,
                        }} className="group-hover:!text-[#9A7A2E]">
                          {product.name}
                        </h3>
                        <p style={{
                          fontFamily: T.body, fontSize: '0.84rem', color: T.slate,
                          lineHeight: 1.65, flexGrow: 1, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                        }}>
                          {product.short_description}
                        </p>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          fontFamily: T.cinzel, fontSize: '0.6rem', letterSpacing: '0.12em',
                          textTransform: 'uppercase', color: T.navy, transition: 'color 0.2s',
                        }} className="group-hover:!text-[#C9A84C]">
                          View Details <FaArrowRight style={{ fontSize: 8 }} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
