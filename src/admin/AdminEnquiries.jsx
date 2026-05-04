import React, { useState, useEffect } from 'react';
import { FaEye, FaCheckCircle, FaTrash, FaEnvelope, FaPhone, FaBuilding, FaInbox } from 'react-icons/fa';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchEnquiries(); }, []);

  const fetchEnquiries = async () => {
    try { const { data } = await api.get('/enquiries'); setEnquiries(data); }
    catch { toast.error('Failed to load enquiries'); }
    finally { setLoading(false); }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.patch(`/enquiries/${id}/read`);
      toast.success('Marked as read');
      fetchEnquiries();
      if (selected?.id === id) setSelected(prev => ({ ...prev, is_read: true }));
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      toast.success('Deleted');
      if (selected?.id === id) setSelected(null);
      fetchEnquiries();
    } catch { toast.error('Failed to delete'); }
  };

  const unread = enquiries.filter(e => !e.is_read).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manage Enquiries</div>
          <div className="admin-page-subtitle">
            {unread > 0 ? <><span style={{ color: '#F59E0B', fontWeight: 700 }}>{unread} unread</span> · </> : ''}
            {enquiries.length} total enquiries
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

        {/* Table */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="admin-loading">Loading enquiries…</td></tr>
                ) : enquiries.length === 0 ? (
                  <tr><td colSpan="5">
                    <div className="admin-empty">
                      <div className="admin-empty-icon"><FaInbox size={22} /></div>
                      <div className="admin-empty-title">No enquiries found</div>
                      <div className="admin-empty-text">Customer enquiries will appear here</div>
                    </div>
                  </td></tr>
                ) : enquiries.map(enq => (
                  <tr
                    key={enq.id}
                    onClick={() => setSelected(enq)}
                    style={{
                      cursor: 'pointer',
                      background: selected?.id === enq.id
                        ? '#F5F3FF'
                        : !enq.is_read ? '#FFFBF0' : undefined,
                    }}
                  >
                    <td>
                      <div className="admin-table-name" style={{ fontWeight: enq.is_read ? 500 : 700 }}>{enq.name}</div>
                      {enq.company && <div className="admin-table-sub">{enq.company}</div>}
                    </td>
                    <td>
                      <a href={`mailto:${enq.email}`} onClick={e => e.stopPropagation()} style={{ color: '#6366F1', fontSize: 13 }}>{enq.email}</a>
                      {enq.phone && <div className="admin-table-sub">{enq.phone}</div>}
                    </td>
                    <td style={{ maxWidth: 200 }}>
                      <div style={{ fontSize: 13, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {enq.subject || '—'}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${enq.is_read ? 'badge-gray' : 'badge-gold'}`}>
                        {!enq.is_read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B45309', display: 'inline-block' }} />}
                        {enq.is_read ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="icon-btn-group">
                        <button className="icon-btn view" onClick={() => setSelected(enq)} title="View"><FaEye size={12} /></button>
                        {!enq.is_read && (
                          <button className="icon-btn check" onClick={() => handleMarkRead(enq.id)} title="Mark read"><FaCheckCircle size={12} /></button>
                        )}
                        <button className="icon-btn delete" onClick={() => handleDelete(enq.id)} title="Delete"><FaTrash size={11} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="detail-panel">
            <div className="detail-panel-header">
              <span className="admin-card-title">Enquiry Detail</span>
              <button className="icon-btn" onClick={() => setSelected(null)} style={{ width: 26, height: 26, fontSize: 14 }}>×</button>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div className="detail-field-label">From</div>
                <div className="detail-field-value">{selected.name}</div>
                {selected.designation && <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{selected.designation}</div>}
              </div>
              {selected.company && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                  <FaBuilding size={12} style={{ color: '#C9A84C', flexShrink: 0 }} />
                  {selected.company}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <FaEnvelope size={12} style={{ color: '#6366F1', flexShrink: 0 }} />
                <a href={`mailto:${selected.email}`} style={{ color: '#6366F1', wordBreak: 'break-all' }}>{selected.email}</a>
              </div>
              {selected.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                  <FaPhone size={12} style={{ color: '#10B981', flexShrink: 0 }} />
                  {selected.phone}
                </div>
              )}
              {selected.subject && (
                <div>
                  <div className="detail-field-label">Subject</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{selected.subject}</div>
                </div>
              )}
              <div>
                <div className="detail-field-label">Message</div>
                <div style={{
                  fontSize: 13, color: '#374151', lineHeight: 1.65,
                  background: '#F9FAFB', border: '1px solid #E5E7EB',
                  borderRadius: 8, padding: '10px 12px', marginTop: 4
                }}>
                  {selected.message}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: '1px solid #F3F4F6' }}>
                {!selected.is_read && (
                  <button
                    onClick={() => handleMarkRead(selected.id)}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: 12, padding: '8px 12px' }}
                  >
                    <FaCheckCircle size={11} /> Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selected.id)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '8px 12px', fontSize: 12, fontWeight: 600, borderRadius: 7,
                    border: '1px solid #FECACA', color: '#DC2626', background: 'white', cursor: 'pointer'
                  }}
                >
                  <FaTrash size={10} /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
