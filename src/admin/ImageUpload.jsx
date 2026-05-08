import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaTimes, FaSpinner } from 'react-icons/fa';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function ImageUpload({ value, onChange, label = 'Image', hint = 'PNG, JPG up to 5MB' }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large (max 5MB)');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onChange(data.url);
      toast.success('Uploaded successfully');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    onChange('');
  };

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl.replace(/\/api$/, '')}${path}`;
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      
      {value ? (
        <div className="image-preview-wrapper" style={{ 
          position: 'relative', 
          width: '100%', 
          height: '160px', 
          borderRadius: '8px', 
          overflow: 'hidden',
          border: '1px solid #E5E7EB',
          background: '#F9FAFB'
        }}>
          <img 
            src={getFullUrl(value)} 
            alt="Preview" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          <button 
            type="button" 
            onClick={removeImage}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <FaTimes size={12} />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            border: '2px dashed #D1D5DB',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center',
            cursor: uploading ? 'not-allowed' : 'pointer',
            background: '#F9FAFB',
            transition: 'all 0.2s ease',
            opacity: uploading ? 0.7 : 1
          }}
          onMouseOver={(e) => !uploading && (e.currentTarget.style.borderColor = '#6366F1')}
          onMouseOut={(e) => !uploading && (e.currentTarget.style.borderColor = '#D1D5DB')}
        >
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <FaSpinner className="animate-spin" size={24} style={{ color: '#6366F1' }} />
              <span style={{ fontSize: '13px', color: '#6B7280' }}>Uploading...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <FaCloudUploadAlt size={28} style={{ color: '#9CA3AF' }} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#4F46E5' }}>Click to upload</span>
                <span style={{ fontSize: '14px', color: '#6B7280' }}> or drag and drop</span>
              </div>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{hint}</span>
            </div>
          )}
        </div>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />
    </div>
  );
}
