import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaStar, FaRegStar, FaPlus, FaTimes, FaQuoteLeft, FaUserCircle } from 'react-icons/fa';
import api, { getImageUrl } from '../lib/api';
import toast from 'react-hot-toast';
import ImageUpload from './ImageUpload';

const EMPTY = { client_name: '', company: '', designation: '', message: '', rating: 5, avatar_url: '', is_active: true };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const { data } = await api.get('/testimonials/all'); setTestimonials(data); }
    catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editId) { await api.put(`/testimonials/${editId}`, form); toast.success('Updated'); }
      else { await api.post('/testimonials', form); toast.success('Created'); }
      reset(); fetch();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleEdit = (t) => { setForm(t); setEditId(t.id); setShowForm(true); };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try { await api.delete(`/testimonials/${id}`); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed to delete'); }
  };

  const reset = () => { setShowForm(false); setEditId(null); setForm(EMPTY); };
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const toggle = (k) => () => setForm(p => ({ ...p, [k]: !p[k] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manage Testimonials</div>
          <div className="admin-page-subtitle">{testimonials.length} total · {testimonials.filter(t => t.is_active).length} active</div>
        </div>
        <button className="btn-primary" onClick={() => { reset(); setShowForm(true); }}>
          <FaPlus size={10} /> Add Testimonial
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && reset()}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <div className="modal-title">{editId ? 'Edit Testimonial' : 'New Testimonial'}</div>
                <div className="modal-subtitle">Fill in the client's details and review</div>
              </div>
              <button className="modal-close" onClick={reset}><FaTimes size={13} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Client Name *</label>
                    <input className="form-input" placeholder="e.g. Rajesh Kumar" value={form.client_name} onChange={set('client_name')} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input className="form-input" placeholder="e.g. AutoParts Industries" value={form.company} onChange={set('company')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <input className="form-input" placeholder="e.g. Production Manager" value={form.designation} onChange={set('designation')} />
                  </div>
                  <div className="form-group">
                    <ImageUpload 
                      label="Client Avatar"
                      value={form.avatar_url} 
                      onChange={(url) => setForm(p => ({ ...p, avatar_url: url }))} 
                      hint="Client photo"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rating</label>
                    <div className="star-rating" style={{ marginTop: 4 }}>
                      {[1,2,3,4,5].map(n => (
                        <button key={n} type="button" className="star-btn" onClick={() => setForm(p => ({ ...p, rating: n }))}>
                          {n <= form.rating
                            ? <FaStar size={22} style={{ color: '#F59E0B' }} />
                            : <FaRegStar size={22} style={{ color: '#D1D5DB' }} />}
                        </button>
                      ))}
                      <span style={{ fontSize: 12, color: '#6B7280', marginLeft: 6 }}>{form.rating}/5</span>
                    </div>
                  </div>
                  <div className="form-group form-grid-full">
                    <label className="form-label">Message *</label>
                    <textarea className="form-textarea" placeholder="Their review about your products/services…" value={form.message} onChange={set('message')} required style={{ minHeight: 100 }} />
                  </div>
                  <div className="form-group form-grid-full">
                    <div className="toggle-wrapper" onClick={toggle('is_active')}>
                      <div className={`toggle-track ${form.is_active ? 'on' : 'off'}`}>
                        <div className="toggle-thumb" />
                      </div>
                      <span className="toggle-label">Visible on website</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" disabled={saving} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {saving ? 'Saving…' : editId ? 'Save Changes' : 'Create Testimonial'}
                </button>
                <button type="button" onClick={reset} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}></th>
              <th>Client</th>
              <th>Company</th>
              <th>Rating</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="admin-loading">Loading…</td></tr>
            ) : testimonials.length === 0 ? (
              <tr><td colSpan="6">
                <div className="admin-empty">
                  <div className="admin-empty-icon"><FaQuoteLeft size={20} /></div>
                  <div className="admin-empty-title">No testimonials yet</div>
                  <div className="admin-empty-text">Add your first client testimonial</div>
                </div>
              </td></tr>
            ) : testimonials.map(t => (
              <tr key={t.id}>
                <td>
                  {t.avatar_url ? (
                    <img src={getImageUrl(t.avatar_url)} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
                      <FaUserCircle size={20} />
                    </div>
                  )}
                </td>
                <td>
                  <div className="admin-table-name">{t.client_name}</div>
                  {t.designation && <div className="admin-table-sub">{t.designation}</div>}
                </td>
                <td style={{ fontSize: 13, color: '#374151' }}>{t.company || '—'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(n =>
                      n <= t.rating
                        ? <FaStar key={n} size={13} style={{ color: '#F59E0B' }} />
                        : <FaRegStar key={n} size={13} style={{ color: '#E5E7EB' }} />
                    )}
                  </div>
                </td>
                <td>
                  <span className={`badge ${t.is_active ? 'badge-green' : 'badge-gray'}`}>
                    {t.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td>
                  <div className="icon-btn-group">
                    <button className="icon-btn edit" onClick={() => handleEdit(t)} title="Edit"><FaEdit size={12} /></button>
                    <button className="icon-btn delete" onClick={() => handleDelete(t.id)} title="Delete"><FaTrash size={11} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
