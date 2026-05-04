import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaStar, FaBoxOpen } from 'react-icons/fa';
import api from '../lib/api';
import toast from 'react-hot-toast';

const EMPTY = { category_id: '', name: '', slug: '', short_description: '', is_active: true, is_featured: false };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([api.get('/products?limit=100'), api.get('/categories')]);
      setProducts(prodRes.data.data || []);
      setCategories(catRes.data || []);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editId) { await api.put(`/products/${editId}`, form); toast.success('Product updated'); }
      else { await api.post('/products', form); toast.success('Product created'); }
      reset(); fetchData();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleEdit = (p) => { setForm(p); setEditId(p.id); setShowForm(true); };
  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this product?')) return;
    try { await api.delete(`/products/${id}`); toast.success('Deactivated'); fetchData(); }
    catch { toast.error('Failed'); }
  };

  const reset = () => { setShowForm(false); setEditId(null); setForm(EMPTY); };
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const toggle = (k) => () => setForm(p => ({ ...p, [k]: !p[k] }));

  const activeCount = products.filter(p => p.is_active).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manage Products</div>
          <div className="admin-page-subtitle">{products.length} total · {activeCount} active · {products.filter(p => p.is_featured).length} featured</div>
        </div>
        <button className="btn-primary" onClick={() => { reset(); setShowForm(true); }}>
          <FaPlus size={10} /> Add Product
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && reset()}>
          <div className="modal-box" style={{ maxWidth: 620 }}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{editId ? 'Edit Product' : 'New Product'}</div>
                <div className="modal-subtitle">Fill in the machine details below</div>
              </div>
              <button className="modal-close" onClick={reset}><FaTimes size={13} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Product Name *</label>
                    <input className="form-input" placeholder="e.g. VMC 850 Machining Center" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">URL Slug *</label>
                    <input className="form-input" placeholder="e.g. vmc-850-machining-center" value={form.slug} onChange={set('slug')} required />
                    <span className="form-hint">Used in the product page URL</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select className="form-select" value={form.category_id} onChange={set('category_id')} required>
                      <option value="">Select a category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short Description</label>
                    <input className="form-input" placeholder="Brief summary for listings…" value={form.short_description} onChange={set('short_description')} />
                  </div>
                  <div className="form-group form-grid-full" style={{ flexDirection: 'row', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="toggle-wrapper" onClick={toggle('is_active')}>
                      <div className={`toggle-track ${form.is_active ? 'on' : 'off'}`}>
                        <div className="toggle-thumb" />
                      </div>
                      <span className="toggle-label">Active (visible on site)</span>
                    </div>
                    <div className="toggle-wrapper" onClick={toggle('is_featured')}>
                      <div className={`toggle-track gold ${form.is_featured ? 'on' : 'off'}`}>
                        <div className="toggle-thumb" />
                      </div>
                      <span className="toggle-label">Featured on homepage</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" disabled={saving} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {saving ? 'Saving…' : editId ? 'Save Changes' : 'Create Product'}
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
              <th>Product</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="admin-loading">Loading…</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="5">
                <div className="admin-empty">
                  <div className="admin-empty-icon"><FaBoxOpen size={20} /></div>
                  <div className="admin-empty-title">No products yet</div>
                  <div className="admin-empty-text">Add your first machine product</div>
                </div>
              </td></tr>
            ) : products.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="admin-table-name">{p.name}</div>
                  {p.short_description && <div className="admin-table-sub" style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.short_description}</div>}
                </td>
                <td>
                  <span style={{ fontSize: 12, padding: '3px 8px', background: '#F3F4F6', borderRadius: 5, color: '#374151', fontWeight: 500 }}>
                    {p.category_name}
                  </span>
                </td>
                <td>
                  <span className={`badge ${p.is_active ? 'badge-green' : 'badge-gray'}`}>
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  {p.is_featured
                    ? <FaStar size={15} style={{ color: '#F59E0B' }} />
                    : <span style={{ color: '#E5E7EB', fontSize: 13 }}>—</span>}
                </td>
                <td>
                  <div className="icon-btn-group">
                    <button className="icon-btn edit" onClick={() => handleEdit(p)} title="Edit"><FaEdit size={12} /></button>
                    <button className="icon-btn delete" onClick={() => handleDelete(p.id)} title="Deactivate"><FaTrash size={11} /></button>
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
