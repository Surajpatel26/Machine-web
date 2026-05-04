import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaGlobe, FaEyeSlash, FaBlog } from 'react-icons/fa';
import api from '../lib/api';
import toast from 'react-hot-toast';

const EMPTY = { title: '', slug: '', excerpt: '', content: '', image_url: '', author: '', is_published: false };

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try { const { data } = await api.get('/blogs'); setBlogs(data); }
    catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editId) { await api.put(`/blogs/${editId}`, form); toast.success('Blog updated'); }
      else { await api.post('/blogs', form); toast.success('Blog created'); }
      reset(); fetchBlogs();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleEdit = (b) => { setForm(b); setEditId(b.id); setShowForm(true); };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post permanently?')) return;
    try { await api.delete(`/blogs/${id}`); toast.success('Deleted'); fetchBlogs(); }
    catch { toast.error('Failed to delete'); }
  };

  const reset = () => { setShowForm(false); setEditId(null); setForm(EMPTY); };
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const toggle = (k) => () => setForm(p => ({ ...p, [k]: !p[k] }));

  const publishedCount = blogs.filter(b => b.is_published).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manage Blogs</div>
          <div className="admin-page-subtitle">
            {blogs.length} total · {publishedCount} published · {blogs.length - publishedCount} drafts
          </div>
        </div>
        <button className="btn-primary" onClick={() => { reset(); setShowForm(true); }}>
          <FaPlus size={10} /> New Post
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && reset()}>
          <div className="modal-box" style={{ maxWidth: 700 }}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{editId ? 'Edit Blog Post' : 'New Blog Post'}</div>
                <div className="modal-subtitle">Write and configure your article</div>
              </div>
              <button className="modal-close" onClick={reset}><FaTimes size={13} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input className="form-input" placeholder="e.g. The Future of CNC Machining" value={form.title} onChange={set('title')} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">URL Slug *</label>
                    <input className="form-input" placeholder="e.g. future-of-cnc-machining" value={form.slug} onChange={set('slug')} required />
                    <span className="form-hint">Used in the blog page URL</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Author</label>
                    <input className="form-input" placeholder="e.g. Chief Engineering Officer" value={form.author} onChange={set('author')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cover Image URL</label>
                    <input className="form-input" type="url" placeholder="https://images.unsplash.com/…" value={form.image_url} onChange={set('image_url')} />
                    <span className="form-hint">External URL to a high-quality image</span>
                  </div>
                  <div className="form-group form-grid-full">
                    <label className="form-label">Excerpt</label>
                    <textarea className="form-textarea" placeholder="A brief engaging summary shown on the blog listing page…" value={form.excerpt} onChange={set('excerpt')} style={{ minHeight: 72 }} />
                  </div>
                  <div className="form-group form-grid-full">
                    <label className="form-label">Content (HTML) *</label>
                    <textarea className="form-textarea" placeholder="<p>Write your article content here…</p>" value={form.content} onChange={set('content')} required style={{ minHeight: 180, fontFamily: 'monospace', fontSize: 12 }} />
                    <span className="form-hint">You can use HTML tags for formatting (p, h2, h3, ul, li, strong, em)</span>
                  </div>
                  <div className="form-group form-grid-full">
                    <div
                      className="toggle-wrapper"
                      onClick={toggle('is_published')}
                      style={{
                        padding: '12px 14px',
                        background: form.is_published ? '#F0FDF4' : '#FAFAFA',
                        border: `1px solid ${form.is_published ? '#BBF7D0' : '#E5E7EB'}`,
                        borderRadius: 9,
                      }}
                    >
                      <div className={`toggle-track ${form.is_published ? 'on' : 'off'}`} style={{ background: form.is_published ? '#10B981' : '#D1D5DB' }}>
                        <div className="toggle-thumb" />
                      </div>
                      <div>
                        <div className="toggle-label" style={{ color: form.is_published ? '#15803D' : '#374151', fontWeight: 600 }}>
                          {form.is_published ? 'Published — Live on website' : 'Draft — Not published yet'}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#9CA3AF', marginTop: 1 }}>
                          Toggle to {form.is_published ? 'save as draft' : 'make it live'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" disabled={saving} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {saving ? 'Saving…' : editId ? 'Save Changes' : form.is_published ? 'Publish Post' : 'Save as Draft'}
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
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="admin-loading">Loading…</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan="5">
                <div className="admin-empty">
                  <div className="admin-empty-icon"><FaBlog size={20} /></div>
                  <div className="admin-empty-title">No blog posts yet</div>
                  <div className="admin-empty-text">Create your first engineering article</div>
                </div>
              </td></tr>
            ) : blogs.map(b => (
              <tr key={b.id}>
                <td style={{ maxWidth: 360 }}>
                  <div className="admin-table-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                  {b.excerpt && <div className="admin-table-sub" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 320 }}>{b.excerpt}</div>}
                </td>
                <td style={{ fontSize: 13, color: '#374151' }}>{b.author || '—'}</td>
                <td style={{ fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                  {b.created_at ? new Date(b.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                </td>
                <td>
                  <span className={`badge ${b.is_published ? 'badge-green' : 'badge-gold'}`}>
                    {b.is_published ? <FaGlobe size={9} /> : <FaEyeSlash size={9} />}
                    {b.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div className="icon-btn-group">
                    <button className="icon-btn edit" onClick={() => handleEdit(b)} title="Edit"><FaEdit size={12} /></button>
                    <button className="icon-btn delete" onClick={() => handleDelete(b.id)} title="Delete"><FaTrash size={11} /></button>
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
