import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaQuoteLeft, FaBoxOpen, FaBlog, FaChevronRight, FaCheckCircle, FaTrash, FaArrowRight } from 'react-icons/fa';
import api from '../lib/api';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ enquiries: 0, products: 0, blogs: 0, testimonials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [enqRes, prodRes, blogRes, testRes] = await Promise.all([
        api.get('/enquiries'),
        api.get('/products?limit=100'),
        api.get('/blogs'),
        api.get('/testimonials/all'),
      ]);
      const enqData = enqRes.data || [];
      setEnquiries(enqData.slice(0, 5));
      setStats({
        enquiries: enqData.length,
        products: (prodRes.data.data || []).filter(p => p.is_active).length,
        blogs: (blogRes.data || []).filter(b => b.is_published).length,
        testimonials: (testRes.data || []).length,
      });
    } catch (_) {}
    finally { setLoading(false); }
  };

  const handleMarkRead = async (id, e) => {
    e.stopPropagation();
    try { await api.patch(`/enquiries/${id}/read`); fetchData(); } catch (_) {}
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this enquiry?')) return;
    try { await api.delete(`/enquiries/${id}`); fetchData(); } catch (_) {}
  };

  const statCards = [
    { label: 'Total Enquiries', value: stats.enquiries, icon: FaEnvelope, color: '#6366F1', bg: '#EEF2FF', path: '/admin/enquiries' },
    { label: 'Active Products', value: stats.products, icon: FaBoxOpen, color: '#0EA5E9', bg: '#E0F2FE', path: '/admin/products' },
    { label: 'Published Blogs', value: stats.blogs, icon: FaBlog, color: '#10B981', bg: '#D1FAE5', path: '/admin/blogs' },
    { label: 'Testimonials', value: stats.testimonials, icon: FaQuoteLeft, color: '#F59E0B', bg: '#FEF3C7', path: '/admin/testimonials' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Dashboard Overview</div>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
            Welcome back, Admin ·{' '}
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {statCards.map((card, i) => (
          <Link key={i} to={card.path} className="admin-stat-card" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="admin-stat-card-icon" style={{ background: card.bg }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <FaChevronRight size={11} style={{ color: '#D1D5DB' }} />
            </div>
            <div>
              <div className="admin-stat-card-value">{loading ? '—' : card.value}</div>
              <div className="admin-stat-card-label">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            <span className="admin-card-title">Recent Enquiries</span>
          </div>
          <Link to="/admin/enquiries" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#C9A84C', textDecoration: 'none' }}>
            View all <FaArrowRight size={10} />
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="admin-loading">Loading…</td></tr>
            ) : enquiries.length === 0 ? (
              <tr><td colSpan="5">
                <div className="admin-empty">
                  <div className="admin-empty-icon"><FaEnvelope size={20} /></div>
                  <div className="admin-empty-title">No enquiries yet</div>
                  <div className="admin-empty-text">They'll appear here when customers reach out</div>
                </div>
              </td></tr>
            ) : enquiries.map(enq => (
              <tr key={enq.id}>
                <td>
                  <div className="admin-table-name">{enq.name}</div>
                  {enq.company && <div className="admin-table-sub">{enq.company}</div>}
                </td>
                <td>
                  <a href={`mailto:${enq.email}`} style={{ color: '#6366F1', fontSize: 13, textDecoration: 'none' }}>{enq.email}</a>
                </td>
                <td style={{ maxWidth: 180 }}>
                  <span style={{ fontSize: 13, color: '#374151', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {enq.subject || '—'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${enq.is_read ? 'badge-gray' : 'badge-gold'}`}>
                    {!enq.is_read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B45309', display: 'inline-block' }} />}
                    {enq.is_read ? 'Read' : 'New'}
                  </span>
                </td>
                <td>
                  <div className="icon-btn-group">
                    {!enq.is_read && (
                      <button className="icon-btn check" onClick={(e) => handleMarkRead(enq.id, e)} title="Mark as read">
                        <FaCheckCircle size={12} />
                      </button>
                    )}
                    <button className="icon-btn delete" onClick={(e) => handleDelete(enq.id, e)} title="Delete">
                      <FaTrash size={11} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, letterSpacing: '0.02em', textTransform: 'uppercase', fontSize: 11 }}>
          Quick Actions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Add New Product', to: '/admin/products', icon: FaBoxOpen, color: '#0EA5E9', bg: '#E0F2FE' },
            { label: 'Write Blog Post', to: '/admin/blogs', icon: FaBlog, color: '#10B981', bg: '#D1FAE5' },
            { label: 'Add Testimonial', to: '/admin/testimonials', icon: FaQuoteLeft, color: '#F59E0B', bg: '#FEF3C7' },
          ].map((item, i) => (
            <Link key={i} to={item.to} className="quick-link-card">
              <div className="quick-link-icon">
                <item.icon size={15} style={{ color: item.color }} />
              </div>
              <span className="quick-link-label">{item.label}</span>
              <FaChevronRight size={10} style={{ color: '#D1D5DB', flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
