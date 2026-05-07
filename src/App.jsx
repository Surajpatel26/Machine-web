import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Infrastructure = lazy(() => import('./pages/Infrastructure'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));

// Admin Pages (Lazy)
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminEnquiries = lazy(() => import('./admin/AdminEnquiries'));
const AdminTestimonials = lazy(() => import('./admin/AdminTestimonials'));
const AdminProducts = lazy(() => import('./admin/AdminProducts'));
const AdminBlogs = lazy(() => import('./admin/AdminBlogs'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageLoader = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-white)' }}>
    <div className="f-loader-bar"><div className="f-loader-bar-fill" /></div>
  </div>
);

const GlobalInitialLoader = () => {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg)', gap: '1.5rem'
          }}
        >
          <div className="f-loader-bar">
            <div className="f-loader-bar-fill" style={{ animationDuration: '2s' }} />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="f-label"
            style={{ color: 'var(--ink-light)', fontSize: '0.65rem' }}
          >
            SMG MACHINES — PRECISION ENGINEERING
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <GlobalInitialLoader />
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FDF9F1',
            color: '#1C1C17',
            border: '1px solid rgba(201,168,76,0.3)',
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: '0.9rem',
            boxShadow: '0 8px 32px rgba(0,9,36,0.12)',
            borderRadius: 2,
          },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main Website Layout */}
          <Route element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Outlet />
              </main>
              <Footer />
            </div>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="*" element={
              <div style={{ minHeight: '60vh', background: '#FDF9F1', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1.5rem' }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '6rem', color: '#C9A84C', lineHeight: 1, marginBottom: '1rem' }}>404</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#000924', marginBottom: '1rem' }}>Page Not Found</h2>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: '#75777F', marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
                  <Link to="/" className="btn-primary">Return Home</Link>
                </div>
              </div>
            } />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Panel Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
