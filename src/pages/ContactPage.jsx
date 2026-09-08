import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Bot,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';

export default function ContactPage({ onTriggerChatbot }) {
  const [activeCategory, setActiveCategory] = useState('Fabric, 240 GSM & Fit');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    orderId: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const currentFaqCategory = FAQ_DATA.find((c) => c.category === activeCategory) || FAQ_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-20">
      
      {/* Top Hero / Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">WE ARE HERE TO HELP</span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#111111]">
          CONTACT & CLIENT CARE
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
          Questions regarding your Shiprocket tracking, 240 GSM sizing guidance, or custom orders? Reach out via WhatsApp, phone, or our automated AI assistant.
        </p>
      </div>

      {/* 4 Contact Channels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* WhatsApp */}
        <a
          href="https://wa.me/919840029367?text=Hi%20AXDORO%20Team!%20I%20have%20a%20question%20regarding%20my%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E2DED6] hover:border-[#25D366] transition-all group shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm text-[#111111]">WhatsApp Support</h3>
            <p className="text-xs text-[#5F6368] leading-relaxed">
              Fastest response time. Chat directly with our customer care reps in Chennai.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DED6] text-xs font-bold text-[#25D366] flex items-center justify-between">
            <span>+91 98400 AXDOR</span>
            <span className="text-[10px] bg-[#25D366]/20 px-2 py-0.5 rounded">&lt; 15 mins</span>
          </div>
        </a>

        {/* Email */}
        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E2DED6] shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C9A96E] flex items-center justify-center">
              <Mail size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm text-[#111111]">Email Concierge</h3>
            <p className="text-xs text-[#5F6368] leading-relaxed">
              For detailed order disputes, B2B queries, and invoice requests.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DED6] text-xs font-semibold text-[#111111]">
            <span>care@axdoro.com</span>
          </div>
        </div>

        {/* Studio Address */}
        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E2DED6] shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C9A96E] flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm text-[#111111]">Studio & Hub</h3>
            <p className="text-xs text-[#5F6368] leading-relaxed">
              AXDORO Studios, 42 Khader Nawaz Khan Rd, Nungambakkam, Chennai, Tamil Nadu 600006.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DED6] text-xs font-semibold text-[#5F6368]">
            Mon - Sat: 9:30 AM - 7:00 PM
          </div>
        </div>

        {/* AI Assistant Card */}
        <div
          onClick={onTriggerChatbot}
          className="bg-[#111111] text-[#F7F5F0] p-6 rounded-2xl border border-[#2B2B2B] hover:border-[#C9A96E] transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#C9A96E] text-[#111111] flex items-center justify-center">
              <Bot size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm text-white">AI Stylist & Sizing</h3>
            <p className="text-xs text-[#D8C7B5] leading-relaxed">
              Instant responses 24/7 on 240 GSM specs, custom sizing, and order tracking.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#2B2B2B] text-xs font-bold text-[#C9A96E] flex items-center justify-between">
            <span>Launch Assistant</span>
            <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
          </div>
        </div>

      </div>

      {/* Support Ticket Form & Operating Timings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Support Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E2DED6] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <CheckCircle2 size={40} className="text-[#2E7D32] mx-auto" />
              <h3 className="font-heading font-bold text-xl text-[#111111]">
                Support Ticket Raised!
              </h3>
              <p className="text-xs text-[#5F6368] max-w-sm mx-auto">
                We have received your message, {formState.name}. A customer support representative will review and reply to {formState.email} within 2 hours during active business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 bg-[#111111] text-[#F7F5F0] text-xs font-bold rounded"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="border-b border-[#E2DED6] pb-3 mb-4">
                <h3 className="font-heading font-bold text-lg text-[#111111]">
                  SEND US A DIRECT MESSAGE
                </h3>
                <p className="text-xs text-[#5F6368]">
                  Fill out the details below and we'll route your ticket to the correct department.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Subject Category *</label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111] cursor-pointer"
                  >
                    <option>Order Status / Shiprocket Tracking</option>
                    <option>7-Day Size Exchange Request</option>
                    <option>240 GSM Fabric & Sizing Guidance</option>
                    <option>Payment / Razorpay Transaction Issue</option>
                    <option>General Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#111111] block mb-1">Order ID (if applicable)</label>
                  <input
                    type="text"
                    placeholder="e.g. AXD-74921"
                    value={formState.orderId}
                    onChange={(e) => setFormState({ ...formState, orderId: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111] uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#111111] block mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you today?"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white border border-[#E2DED6] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#111111]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-[#F7F5F0] py-3.5 rounded-lg font-heading font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send size={15} />
                <span>SUBMIT SUPPORT TICKET</span>
              </button>
            </form>
          )}
        </div>

        {/* Support Timings & FAQ Navigation (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111111] text-[#F7F5F0] p-6 rounded-2xl border border-[#2B2B2B] space-y-4">
            <h3 className="font-heading font-bold text-base text-[#C9A96E]">
              OPERATING TIMINGS & RESPONSE SLA
            </h3>
            <div className="space-y-2.5 text-xs text-[#D8C7B5]">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#C9A96E]" />
                <span><strong>WhatsApp Desk:</strong> Monday – Saturday, 9:00 AM – 9:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#C9A96E]" />
                <span><strong>Chennai Hub Dispatch:</strong> Monday – Friday, 10:00 AM – 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#C9A96E]" />
                <span><strong>Sunday:</strong> Automated AI Support & WhatsApp Emergencies</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Comprehensive Interactive FAQ Accordion */}
      <div className="space-y-6 pt-10 border-t border-[#E2DED6]">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">KNOWLEDGE BASE</span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111111] mt-1">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {FAQ_DATA.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCategory(cat.category);
                setOpenFaqIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.category
                  ? 'bg-[#111111] text-[#F7F5F0]'
                  : 'bg-white text-[#5F6368] hover:text-[#111111] border border-[#E2DED6]'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3">
          {currentFaqCategory.items.map((item, idx) => (
            <div
              key={item.q}
              className="bg-white border border-[#E2DED6] rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                className="w-full p-4 text-left font-heading font-semibold text-xs sm:text-sm text-[#111111] flex items-center justify-between hover:bg-[#FAF8F5] transition-colors"
              >
                <span>{item.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp size={16} className="text-[#C9A96E] flex-shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-[#5F6368] flex-shrink-0" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="p-4 pt-1 text-xs text-[#5F6368] leading-relaxed border-t border-[#E2DED6]/50 bg-[#FAF8F5]/40 animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
