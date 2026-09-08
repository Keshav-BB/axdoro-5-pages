import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Layers, Zap, Star, CheckCircle, Flame, MessageCircle } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { CATEGORIES, COLOR_SWATCHES } from '../data/categoriesData';

export default function HomePage({
  products,
  onProductClick,
  onQuickView,
  onOpenSizeGuide,
  onNavigate
}) {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  const reviews = [
    {
      id: 1,
      author: 'Karthik R.',
      city: 'Chennai',
      verified: true,
      rating: 5,
      product: 'AXDORO Signature Oversized Heavy Tee',
      text: 'The 240 GSM fabric weight is insane. It holds its boxy structure throughout the day and the collar doesn\'t wrinkle after 5 washes. Worth every rupee.'
    },
    {
      id: 2,
      author: 'Aditya Verma',
      city: 'Bengaluru',
      verified: true,
      rating: 5,
      product: 'Aetherial Spectrum Backprint Graphic Tee',
      text: 'Super high density screen print. Usually oversized tees from other Indian brands feel cheap and thin, but AXDORO\'s cotton density is top tier.'
    },
    {
      id: 3,
      author: 'Sneha Mohan',
      city: 'Coimbatore',
      verified: true,
      rating: 5,
      product: 'Acid Washed Charcoal Heavy Oversized Tee',
      text: 'The mineral wash texture has an artisanal vintage look. Delivery within Tamil Nadu took barely 24 hours. Ordered two more colors!'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] bg-[#111111] text-[#F7F5F0] flex items-center justify-center overflow-hidden border-b border-[#2B2B2B]">
        {/* Background Image with dark luxury gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1920&q=85"
            alt="AXDORO Streetwear Hero"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-[#C9A96E]/50 text-[#C9A96E] text-xs font-semibold tracking-widest uppercase animate-fade-in">
            <Sparkles size={14} />
            <span>THE 240 GSM HEAVYWEIGHT DROP IS LIVE</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter uppercase leading-[1.05] text-[#F7F5F0]">
            SUBSTANCE OVER HYPE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7F5F0] via-[#D8C7B5] to-[#C9A96E]">
              ARCHITECTURAL DRAPE.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#D8C7B5] font-normal leading-relaxed">
            Engineered with 240 GSM super combed cotton, dropped shoulders, and non-collapsing collars. Designed in Tamil Nadu for the discerning Pan-India streetwear generation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto px-8 py-4 bg-[#C9A96E] hover:bg-[#D8C7B5] text-[#111111] font-heading font-bold text-xs uppercase tracking-widest rounded transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>SHOP THE COLLECTION (200+ DROPS)</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('bulk')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-[#F7F5F0] border border-white/30 font-heading font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2"
            >
              <span>CUSTOM & BULK ORDERS</span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#D8C7B5]">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#C9A96E]" /> 240 GSM 100% Cotton
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#C9A96E]" /> Bio-Washed & Pre-Shrunk
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#C9A96E]" /> Free Pan-India Delivery &gt; ₹1,499
            </span>
          </div>
        </div>
      </section>

      {/* 2. Shop by Fit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#E2DED6] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">Silhouettes</span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111111] mt-1">
              SHOP BY SIGNATURE FIT
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#111111] hover:text-[#C9A96E] transition-colors flex items-center gap-1 mt-2 md:mt-0 uppercase tracking-wider"
          >
            <span>View All Fits</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Oversized Fit (240 GSM)',
              desc: 'Intentional dropped shoulders with generous torso volume.',
              tag: 'MOST POPULAR',
              image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
              filter: 'Oversized'
            },
            {
              title: 'Boxy Drop Fit',
              desc: 'Wider chest with a slightly cropped modern waistline.',
              tag: 'STREET CUT',
              image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
              filter: 'Boxy'
            },
            {
              title: 'Heavyweight Hoodies',
              desc: '380 GSM French Terry with double-lined structure.',
              tag: 'WINTER DROP',
              image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
              filter: 'Heavyweight Hoodies'
            },
            {
              title: 'Tactical Bottoms',
              desc: 'Heavyweight utility twill with modular pocketing.',
              tag: 'FUNCTIONAL',
              image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
              filter: 'Cargos & Utility Pants'
            }
          ].map((item) => (
            <div
              key={item.title}
              onClick={() => onNavigate('shop')}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-[#111111] cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="bg-[#C9A96E] text-[#111111] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-heading font-bold text-base text-white group-hover:text-[#C9A96E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#D8C7B5] mt-1 line-clamp-2">
                  {item.desc}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#C9A96E]">
                  <span>Explore Cut</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">Catalogue</span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111111] mt-1">
            FEATURED COLLECTIONS
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-2">
            Over 200 distinct heavyweight garments across cuts, mineral washes, and screen prints.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop')}
              className="group relative bg-[#FAF8F5] rounded-xl border border-[#E2DED6] hover:border-[#111111] overflow-hidden cursor-pointer shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#EAE7E0] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 right-3 bg-[#111111] text-[#F7F5F0] text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                  {cat.count}+ STYLES
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#111111] group-hover:text-[#C9A96E] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#5F6368] mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#111111] border-t border-[#E2DED6] mt-4">
                  <span>SHOP DROP</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#C9A96E]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. New Arrivals (8 products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#E2DED6] pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#C9A96E]">
              <Sparkles size={14} />
              <span>FRESH FROM PRODUCTION</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111111] mt-1">
              NEW ARRIVALS (SEPTEMBER DROP)
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#111111] hover:text-[#C9A96E] transition-colors flex items-center gap-1 mt-2 md:mt-0 uppercase tracking-wider"
          >
            <span>Explore All 200+ Products</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onQuickView={onQuickView}
              onOpenSizeGuide={onOpenSizeGuide}
            />
          ))}
        </div>
      </section>

      {/* 5. Why AXDORO (240 GSM Philosophy) */}
      <section className="bg-[#111111] text-[#F7F5F0] py-20 border-y border-[#2B2B2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E] flex items-center gap-1.5">
                <ShieldCheck size={16} />
                <span>THE ENGINEERING STANDARD</span>
              </span>

              <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#F7F5F0] leading-tight">
                WHY 240 GSM IS THE ONLY WAY TO WEAR STREETWEAR.
              </h2>

              <p className="text-sm text-[#D8C7B5] leading-relaxed">
                Most commercial clothing brands cut corners with 160-180 GSM yarn. The result? Shirts that cling to your body, lose their collar shape after two washes, and drape like pajamas.
              </p>

              <p className="text-sm text-[#D8C7B5] leading-relaxed">
                AXDORO started with one singular obsession: crafting heavyweight streetwear tailored for Indian weather that looks like luxury architectural fashion.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#1A1A1A] border border-[#2B2B2B] rounded-lg">
                  <div className="font-heading font-black text-2xl text-[#C9A96E]">240 GSM</div>
                  <div className="text-xs font-bold text-[#F7F5F0] mt-1">Super Combed Cotton</div>
                  <p className="text-[11px] text-[#5F6368] mt-1">Heavy, substantial drape that never clings.</p>
                </div>

                <div className="p-4 bg-[#1A1A1A] border border-[#2B2B2B] rounded-lg">
                  <div className="font-heading font-black text-2xl text-[#C9A96E]">1.25 INCH</div>
                  <div className="text-xs font-bold text-[#F7F5F0] mt-1">Lycra-Ribbed Collar</div>
                  <p className="text-[11px] text-[#5F6368] mt-1">Stays tight around the neck without stretching.</p>
                </div>

                <div className="p-4 bg-[#1A1A1A] border border-[#2B2B2B] rounded-lg">
                  <div className="font-heading font-black text-2xl text-[#C9A96E]">BIO-WASH</div>
                  <div className="text-xs font-bold text-[#F7F5F0] mt-1">Silicone Enriched</div>
                  <p className="text-[11px] text-[#5F6368] mt-1">Zero pilling and ultra-velvety touch.</p>
                </div>

                <div className="p-4 bg-[#1A1A1A] border border-[#2B2B2B] rounded-lg">
                  <div className="font-heading font-black text-2xl text-[#C9A96E]">PRE-SHRUNK</div>
                  <div className="text-xs font-bold text-[#F7F5F0] mt-1">Zero Post-Wash Shrinkage</div>
                  <p className="text-[11px] text-[#5F6368] mt-1">The size you buy is the size it remains.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 bg-[#FAF8F5] hover:bg-[#C9A96E] text-[#111111] font-heading font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
                >
                  <span>READ OUR FULL BRAND STORY</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Visual comparison graphic */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#2B2B2B] bg-[#1A1A1A]">
                <img
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
                  alt="240 GSM Fabric Texture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#C9A96E] text-[#111111] p-6 rounded-xl shadow-2xl max-w-xs hidden sm:block">
                <div className="font-heading font-black text-xl">100% HEAVY COTTON</div>
                <p className="text-xs font-medium mt-1 leading-snug">
                  Woven from extra-long staple fibers sourced ethically and produced in Tamil Nadu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers Grid (8 products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#E2DED6] pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#C9A96E]">
              <Flame size={14} className="text-[#C9A96E]" />
              <span>COMMUNITY FAVORITES</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111111] mt-1">
              BEST SELLING SILHOUETTES
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#111111] hover:text-[#C9A96E] transition-colors flex items-center gap-1 mt-2 md:mt-0 uppercase tracking-wider"
          >
            <span>View All Bestsellers</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onQuickView={onQuickView}
              onOpenSizeGuide={onOpenSizeGuide}
            />
          ))}
        </div>
      </section>

      {/* 7. Shop by Color Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-[#FAF8F5] border border-[#E2DED6] rounded-2xl">
          <div className="text-center max-w-lg mx-auto mb-6">
            <h3 className="font-heading font-bold text-lg text-[#111111]">
              EXPLORE OUR PALETTE
            </h3>
            <p className="text-xs text-[#5F6368] mt-1">
              Artisanal earth tones, stealth blacks, and vintage mineral washes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {COLOR_SWATCHES.map((color) => (
              <button
                key={color.name}
                onClick={() => onNavigate('shop')}
                className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E2DED6] hover:border-[#111111] rounded-full text-xs font-semibold text-[#111111] transition-all shadow-sm group"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Custom & Bulk Orders B2B Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-[#F7F5F0] rounded-2xl overflow-hidden border border-[#2B2B2B] p-8 sm:p-12 relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl z-10">
            <span className="bg-[#C9A96E] text-[#111111] text-[10px] font-bold px-2.5 py-0.5 rounded tracking-widest uppercase">
              B2B & INSTITUTIONAL MERCHANDISE
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
              CUSTOM STREETWEAR & BULK ORDERS (MOQ 30 PCS)
            </h2>
            <p className="text-xs sm:text-sm text-[#D8C7B5] leading-relaxed">
              We manufacture customized 240 GSM heavy cotton drops for corporate teams, college fests, fitness clubs, and private-label brands. Complete with high-density puff printing, embroidery, and custom neck labels.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 z-10 w-full md:w-auto">
            <button
              onClick={() => onNavigate('bulk')}
              className="px-6 py-3.5 bg-[#C9A96E] hover:bg-[#D8C7B5] text-[#111111] font-heading font-bold text-xs uppercase tracking-widest rounded transition-all text-center"
            >
              REQUEST CUSTOM QUOTE
            </button>
            <a
              href="https://wa.me/919840029367?text=Hi%20AXDORO!%20I%20am%20interested%20in%20custom%20bulk%20orders."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              <span>WHATSAPP US</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. Verified Reviews & Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">Social Proof</span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111111] mt-1">
            WHAT THE STREETWEAR COMMUNITY IS SAYING
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E2DED6] flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C9A96E] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#C9A96E" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#111111] italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2DED6]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-xs text-[#111111]">{rev.author}</h4>
                    <span className="text-[11px] text-[#5F6368]">{rev.city}</span>
                  </div>
                  <span className="text-[10px] bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30 px-2 py-0.5 rounded font-semibold">
                    ✓ Verified Buyer
                  </span>
                </div>
                <div className="text-[10px] text-[#5F6368] mt-1 truncate">
                  Purchased: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Instagram Community Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-[#5F6368]">
            TAG @AXDORO.OFFICIAL ON INSTAGRAM TO BE FEATURED
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
          ].map((img, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-[#EAE7E0] group relative cursor-pointer">
              <img
                src={img}
                alt="AXDORO Community Streetwear"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                #AXDORO
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
