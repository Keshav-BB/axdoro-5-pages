import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Layers, Compass, Scissors, HeartHandshake } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Brand Hero Manifesto */}
      <section className="relative min-h-[60vh] bg-[#111111] text-[#F7F5F0] flex items-center justify-center overflow-hidden border-b border-[#2B2B2B]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1920&q=80"
            alt="AXDORO Studio Craftsmanship"
            className="w-full h-full object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E] inline-block px-3 py-1 bg-[#1A1A1A] border border-[#C9A96E]/30 rounded-full">
            OUR STORY & VISION
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase">
            WE REJECT FAST FASHION.<br />
            <span className="text-[#C9A96E]">WE BUILD WITH WEIGHT.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#D8C7B5] max-w-2xl mx-auto leading-relaxed">
            AXDORO was born in Tamil Nadu with a simple realization: Indian streetwear was flooded with flimsy, polyester-heavy tees masquerading as oversized fashion. We set out to engineer clothing with true heft, drape, and permanence.
          </p>
        </div>
      </section>

      {/* 2. The 240 GSM Standard */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">Fabric Engineering</span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111111]">
              WHY WE OBSESS OVER 240 GSM.
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
              In textile engineering, GSM (grams per square meter) dictates how fabric interacts with gravity. Standard commercial tees sit at 160-180 GSM: they fold unevenly, wrinkle against your chest, and stretch out at the neckline within a month.
            </p>
            <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
              At 240 GSM, combed cotton behaves architecturally. It stands away from the body, creates clean angular folds across the shoulder line, and produces an imposing, confident streetwear silhouette.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#111111] text-[#C9A96E] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  01
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#111111]">100% Super Combed Cotton</h4>
                  <p className="text-xs text-[#5F6368] mt-0.5">Fibers are combed to extract short, scratchy hairs, leaving only long-staple yarns with high tensile strength.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#111111] text-[#C9A96E] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  02
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#111111]">Bio-Washed & Silicone Softened</h4>
                  <p className="text-xs text-[#5F6368] mt-0.5">Enzyme baths smooth the surface micro-fuzz, producing a velvety touch without synthetic blends.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#111111] text-[#C9A96E] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  03
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#111111]">Lycra-Reinforced 1.25" Collars</h4>
                  <p className="text-xs text-[#5F6368] mt-0.5">Custom ribbed neckbands reinforced with 5% lycra thread to guarantee zero neck curling.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#EAE7E0] border border-[#E2DED6] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
                alt="AXDORO Heavyweight Cotton"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#111111] text-[#F7F5F0] p-6 rounded-xl border border-[#2B2B2B] shadow-2xl max-w-xs hidden sm:block">
              <span className="text-[10px] text-[#C9A96E] font-mono uppercase tracking-widest block">ZERO COMPROMISE</span>
              <p className="text-xs font-semibold mt-1 text-[#D8C7B5]">
                Pre-shrunk to retain its precise measurements wash after wash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Fit Philosophy */}
      <section className="bg-[#FAF8F5] py-20 border-y border-[#E2DED6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">Pattern Making</span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111111]">
              ANATOMY OF AN AXDORO CUT
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6368]">
              We don't simply size up standard t-shirt patterns. Every cut is engineered from the ground up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-[#E2DED6] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C9A96E] flex items-center justify-center">
                <Scissors size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#111111]">Engineered Drop Shoulders</h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                The shoulder seam drops exactly 2.5 inches past the acromion bone, creating an effortless, non-rigid streetwear frame.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E2DED6] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C9A96E] flex items-center justify-center">
                <Layers size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#111111]">Boxy Torso Proportion</h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Wider chest width paired with calibrated length prevents the awkward 'nightgown' look common in amateur oversized garments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E2DED6] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C9A96E] flex items-center justify-center">
                <Compass size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#111111]">Elongated Half-Sleeve</h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Sleeves hover right around the elbow with wider bicep circumference for clean movement and layering over long-sleeves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Future Vision */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">THE EXPANSION</span>
        <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111111]">
          BEYOND T-SHIRTS: A COMPLETE STREETWEAR WARDROBE
        </h2>
        <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed max-w-2xl mx-auto">
          AXDORO is expanding rapidly into 380 GSM French Terry hoodies, heavy twill tactical cargos, acid-washed overshirts, and AI-powered virtual try-ons. Our commitment remains unshakeable: zero cheap shortcuts, maximum fabric integrity.
        </p>
        <div className="pt-4">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-4 bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-[#F7F5F0] font-heading font-bold text-xs uppercase tracking-widest rounded-lg transition-all inline-flex items-center gap-2 shadow-xl"
          >
            <span>EXPLORE THE CURRENT DROPS</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

    </div>
  );
}
