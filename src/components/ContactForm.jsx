import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import api from '../lib/api';

export default function ContactForm({ compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/enquiries', form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-4xl" />
        </div>
        <h3 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: 'Rajdhani' }}>
          Enquiry Sent Successfully!
        </h3>
        <p className="text-[#94a3b8] mb-6 max-w-md">
          Thank you for contacting SMG Machines. Our team will get back to you within 24 hours.
        </p>
        <button onClick={() => setSuccess(false)} className="btn-outline">
          Send Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-[#94a3b8] mb-2 font-medium">Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Smith"
            className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#f97316] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[#94a3b8] mb-2 font-medium">Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@company.com"
            className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#f97316] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[#94a3b8] mb-2 font-medium">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98104 12158"

            className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#f97316] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[#94a3b8] mb-2 font-medium">Company Name</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your Company Ltd."
            className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#f97316] transition-colors text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#94a3b8] mb-2 font-medium">Subject</label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f97316] transition-colors text-sm"
        >
          <option value="">Select a subject</option>
          <option value="Product Enquiry">Product Enquiry</option>
          <option value="Custom Machine Quote">Custom Machine Quote</option>
          <option value="After Sales Service">After Sales Service</option>
          <option value="Spare Parts">Spare Parts</option>
          <option value="General Enquiry">General Enquiry</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-[#94a3b8] mb-2 font-medium">Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={compact ? 4 : 6}
          placeholder="Tell us about your requirements, machine specifications, or any questions..."
          className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#f97316] transition-colors text-sm resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <FaPaperPlane className="text-sm" />
            Send Enquiry
          </>
        )}
      </button>
    </form>
  );
}
