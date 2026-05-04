import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../lib/api';
import './admin.css';
import logo from '../assets/logo.webp';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('smg_token', res.data.token);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: 'linear-gradient(135deg, #0B1120 0%, #162040 50%, #0B1120 100%)',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Left — Branding Panel */}
      <div style={{
        flex: 1, display: 'none', flexDirection: 'column', justifyContent: 'space-between',
        padding: '48px 56px', position: 'relative', overflow: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
        className="login-left-panel"
      >
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src={logo} alt="SMG" style={{ height: 40, filter: 'brightness(1.3)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 16 }}>
            Precision · Heritage · Excellence
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 16, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Engineering<br />
            <span style={{ color: '#C9A84C' }}>Excellence</span><br />
            Since 1999
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, maxWidth: 340 }}>
            Secure access to the SMG Machines management console. Restricted to authorized personnel only.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 36 }}>
          {[['2500+', 'Machines'], ['25+', 'Years'], ['15+', 'Countries']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#C9A84C', fontFamily: 'Plus Jakarta Sans' }}>{val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Login Form */}
      <div style={{
        width: '100%', maxWidth: 480, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32,
      }}>
        <div style={{
          width: '100%', maxWidth: 380,
          background: 'white', borderRadius: 20,
          padding: '36px 36px 32px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <img src={logo} alt="SMG" style={{ height: 36, width: 'auto' }} />
          </div>

          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 6 }}>
              Admin Portal
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.2 }}>
              Sign in to Console
            </h1>
            <p style={{ fontSize: 13, color: '#6B7280', marginTop: 6 }}>
              Enter your administrator credentials
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="admin@smgmachines.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF',
                    display: 'flex', alignItems: 'center', padding: 0,
                  }}
                >
                  {showPass ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: 4, padding: '12px 20px', justifyContent: 'center', fontSize: 14, borderRadius: 10 }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite',
                  }} />
                  Authenticating…
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #F3F4F6', textAlign: 'center' }}>
            <a href="/" style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'none', fontWeight: 500 }}>
              ← Return to SMG Machines website
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .login-left-panel { display: flex !important; }
        }
        .form-input { width: 100%; }
      `}</style>
    </div>
  );
}
