import React, { useState } from 'react';
import {
  MessageCircle,
  FileText,
  Upload,
  CheckCircle,
  ShieldCheck,
  Building,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export default function CustomBulkPage() {
  const { addBulkEnquiry } = useOrders();

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    productType: 'Oversized T-Shirts (240 GSM)',
    quantity: '50',
    colors: 'Urban Black, Sage Green',
    customization: 'High-Density Screen Print (Front Chest + Back)',
    targetDate: '',
    notes: '',
  });

  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBulkEnquiry({ ...formData, fileName });
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi AXDORO B2B Team! I'd like a custom bulk quote:\n- Name: ${formData.fullName || 'Client'}\n- Product: ${formData.productType}\n- Quantity: ${formData.quantity} pcs\n- Customization: ${formData.customization}`
    );
    window.open(`https://wa.me/919840029367?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-20">
      
      {/* Top Hero Banner */}
      <div className="bg-[#111111] text-[#F7F5F0] rounded-3xl p-8 sm:p-14 border border-[#2B2B2B] relative overflow-hidden">
        <div className="max-w-3xl space-y-4 z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] border border-[#C9A96E]/40 rounded-full text-[#C9A96E] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>INSTITUTIONAL & B2B MERCHANDISE</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase leading-tight">
            CUSTOM 240 GSM BULK MERCHANDISE & UNIFORMS
          </h1>

          <p className="text-xs sm:text-sm text-[#D8C7B5] leading-relaxed">
            From tech startup offsites and college cultural fests to exclusive brand merchandise drops. We produce customized heavyweight streetwear with our signature 240 GSM & 380 GSM textiles, precision screen prints, and luxury puff graphics.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-[#D8C7B5]">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#C9A96E]" /> Low MOQ of 30 Units
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#C9A96E]" /> Custom Pantone Dyeing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#C9A96E]" /> High-Density Screen & Puff Print
            </span>
          </div>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">Who We Serve</span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111111] mt-1">
            CUSTOM DROPS FOR TEAMS, EVENTS & BRANDS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Corporate & Startups',
              desc: 'Premium employee welcome kits, hackathon swag, and founder merchandise that people actually love wearing.',
              icon: Building
            },
            {
              title: 'Colleges & Universities',
              desc: 'Department hoodies, annual festival merchandise, and alumni drops with durable screen printing.',
              icon: GraduationCap
            },
            {
              title: 'Private Label & Resellers',
              desc: 'Unbranded 240 GSM blanks with your custom neck tags, wash care labels, and polybags.',
              icon: Layers
            },
            {
              title: 'Gyms & Esports Clubs',
              desc: 'High-heft oversized gym tees with breathable combed cotton that endures intense workouts and washes.',
              icon: Sparkles
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E2DED6] shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C9A96E] flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#111111]">{item.title}</h3>
                <p className="text-xs text-[#5F6368] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Quote Calculator & Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form Container (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E2DED6] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] mx-auto flex items-center justify-center">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-heading font-black text-2xl text-[#111111]">
                Bulk Inquiry Received!
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6368] max-w-md mx-auto">
                Thank you, {formData.fullName}. Our B2B merchandising specialist will review your request and send a tailored quotation within 4 hours.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-[#111111] text-[#F7F5F0] text-xs font-bold rounded"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded flex items-center gap-1.5"
                >
                  <MessageCircle size={15} />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="border-b border-[#E2DED6] pb-3 mb-4">
                <h3 className="font-heading font-bold text-lg text-[#111111]">
                  REQUEST A BULK QUOTATION
                </h3>
                <p className="text-xs text-[#5F6368] mt-0.5">
                  Fill in your requirements below for an itemized estimate and fabric swatch kit.
                </p>
              </div>

              {/* Name & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Company / College Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech / IIT Madras"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#111111] block mb-1">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98401 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Business Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Product Type & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Product Type *</label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111] cursor-pointer"
                  >
                    <option>Oversized T-Shirts (240 GSM)</option>
                    <option>Regular Fit Streetwear Tees (220 GSM)</option>
                    <option>Heavy French Terry Hoodies (380 GSM)</option>
                    <option>Acid Washed Vintage Drops (240 GSM)</option>
                    <option>Heavy Twill Utility Cargos (280 GSM)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Estimated Quantity (MOQ: 30) *</label>
                  <input
                    type="number"
                    min="30"
                    required
                    placeholder="e.g. 50"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Colors & Customization Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Preferred Fabric Colors</label>
                  <input
                    type="text"
                    placeholder="e.g. Urban Black, Dune Sand, White"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Customization Requirements</label>
                  <input
                    type="text"
                    placeholder="e.g. Puff screen print / Embroidery / Plain blanks"
                    value={formData.customization}
                    onChange={(e) => setFormData({ ...formData, customization: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Artwork / Logo Upload Simulation */}
              <div>
                <label className="font-bold text-[#111111] block mb-1">Attach Logo or Reference Artwork (Optional)</label>
                <div className="border-2 border-dashed border-[#E2DED6] hover:border-[#111111] bg-white rounded-lg p-4 text-center cursor-pointer transition-colors relative">
                  <input
                    type="file"
                    accept=".ai,.psd,.pdf,.png,.jpg"
                    onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload size={20} className="text-[#5F6368] mx-auto mb-1" />
                  <p className="text-xs text-[#111111] font-semibold">
                    {fileName ? `Selected: ${fileName}` : 'Click to upload vector artwork (.AI, .PDF, .PNG)'}
                  </p>
                  <span className="text-[10px] text-[#5F6368]">Max file size 25MB</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="font-bold text-[#111111] block mb-1">Additional Project Details / Delivery Deadline</label>
                <textarea
                  rows={3}
                  placeholder="Mention delivery deadline, size breakdown, or special packaging instructions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-[#F7F5F0] py-3.5 rounded-lg font-heading font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FileText size={16} />
                  <span>SUBMIT BULK INQUIRY</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-5 rounded-lg font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>CHAT ON WHATSAPP</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* B2B Capabilities & Tier Guide (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111111] text-[#F7F5F0] p-6 rounded-2xl border border-[#2B2B2B] space-y-4">
            <span className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-mono font-bold">
              VOLUME PRICING TIERS
            </span>
            <h3 className="font-heading font-bold text-lg text-white">
              ECONOMIES OF SCALE
            </h3>
            <p className="text-xs text-[#D8C7B5] leading-relaxed">
              We operate state-of-the-art automated screen-printing and knitting mills in Tirupur/Chennai, passing direct factory savings to you.
            </p>

            <div className="divide-y divide-[#2B2B2B] text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <span>30 - 99 Pieces</span>
                <strong className="text-[#C9A96E]">Base B2B Rate</strong>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span>100 - 299 Pieces</span>
                <strong className="text-[#C9A96E]">15% Bulk Discount</strong>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span>300 - 999 Pieces</span>
                <strong className="text-[#C9A96E]">25% Bulk Discount + Custom Labels</strong>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span>1000+ Pieces</span>
                <strong className="text-[#C9A96E]">Dedicated Factory Batch + Custom Dyeing</strong>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E2DED6] space-y-3 text-xs text-[#5F6368]">
            <h4 className="font-heading font-bold text-sm text-[#111111] flex items-center gap-2">
              <PhoneCall size={16} className="text-[#C9A96E]" />
              <span>Direct Merchandising Desk</span>
            </h4>
            <p className="leading-relaxed">
              Prefer to speak directly with our production head?
            </p>
            <div className="space-y-1 font-semibold text-[#111111]">
              <p>WhatsApp: +91 98400 29367</p>
              <p>Email: bulk@axdoro.com</p>
              <p>Hours: Mon - Sat, 9:30 AM to 7:00 PM IST</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
