import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, MessageSquare, Heart, Lock } from 'lucide-react';

export default function Footer({ setCurrentRoute }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#F7F5F0] pt-16 pb-12 border-t border-[#2B2B2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#2B2B2B] text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#F7F5F0]">240 GSM Heavy Cotton</h4>
              <p className="text-xs text-[#5F6368] mt-1">Dense, bio-washed combed yarns with zero clinging.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#F7F5F0]">Shiprocket Express</h4>
              <p className="text-xs text-[#5F6368] mt-1">24-48h dispatch in Tamil Nadu; 3-5 days Pan-India.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#F7F5F0]">7-Day Size Exchange</h4>
              <p className="text-xs text-[#5F6368] mt-1">Hassle-free doorstep exchanges for the perfect fit.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
              <Lock size={22} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#F7F5F0]">Razorpay Verified</h4>
              <p className="text-xs text-[#5F6368] mt-1">100% encrypted UPI, Cards, and NetBanking checkout.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-[#2B2B2B]">
          
          {/* Col 1: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-heading font-black text-2xl tracking-tighter text-[#F7F5F0]">
              AXDORO
            </div>
            <p className="text-sm text-[#D8C7B5] leading-relaxed max-w-sm">
              Architectural clothing crafted for the discerning streetwear generation. Engineered with 240 GSM heavy combed cotton for superior silhouette retention and drop-shoulder drape.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded bg-[#1A1A1A] border border-[#C9A96E]/40 text-[#C9A96E] text-xs font-semibold tracking-wider">
                DESIGNED & CRAFTED IN TAMIL NADU, INDIA
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#C9A96E] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('home')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Shop All (200+ Products)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  About AXDORO
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('bulk')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Custom & Bulk Orders (B2B)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#C9A96E] mb-4">
              Help & Policies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('contact')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Shipping Policy & Rates
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Returns & Size Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="text-[#D8C7B5] hover:text-[#FFFFFF] transition-colors">
                  Track Shiprocket Order
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Drops */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#C9A96E] mb-4">
              VIP Drop Access
            </h4>
            <p className="text-xs text-[#D8C7B5] mb-3 leading-relaxed">
              Subscribe for secret drop alerts and unlock 10% off your first 240 GSM piece.
            </p>
            {subscribed ? (
              <div className="bg-[#1A1A1A] border border-[#2E7D32] text-[#2E7D32] p-3 rounded text-xs font-semibold">
                ✓ You're on the VIP drop list! Use code <span className="text-[#C9A96E]">AXDORO10</span> at checkout.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3C] text-[#F7F5F0] text-xs px-3 py-2.5 rounded focus:outline-none focus:border-[#C9A96E]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#C9A96E] hover:bg-[#D8C7B5] text-[#111111] font-semibold text-xs py-2.5 rounded transition-all flex items-center justify-center gap-1.5"
                >
                  <span>JOIN THE DROP LIST</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-[#2B2B2B]">
              <button
                onClick={() => navigateTo('admin')}
                className="text-[11px] text-[#5F6368] hover:text-[#C9A96E] transition-colors flex items-center gap-1"
              >
                <span>AXDORO Admin Panel & CSV Export</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5F6368]">
          <div>
            © {new Date().getFullYear()} AXDORO Clothing Co. All rights reserved. Prepared by PeoplePoint Consultants.
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-[#1A1A1A] rounded border border-[#2B2B2B] text-[10px] text-[#D8C7B5]">RAZORPAY PREPAID</span>
            <span className="px-2 py-1 bg-[#1A1A1A] rounded border border-[#2B2B2B] text-[10px] text-[#D8C7B5]">UPI / GPAY / PHONEPE</span>
            <span className="px-2 py-1 bg-[#1A1A1A] rounded border border-[#2B2B2B] text-[10px] text-[#D8C7B5]">SHIPROCKET READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
