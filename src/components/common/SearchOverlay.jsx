import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, Star } from 'lucide-react';
import { PRODUCTS } from '../../data/productsData';

export default function SearchOverlay({ isOpen, onClose, onSelectProduct, onNavigateShopWithCategory }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.gsm.toLowerCase().includes(q) ||
          p.fit.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
        );
      }).slice(0, 8)
    : [];

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const trendingTags = ['240 GSM', 'Oversized', 'Acid Wash', 'Black Tee', 'Hoodies', 'Cargos'];

  return (
    <div
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-md animate-fade-in"
    >
      {/* Top Search Bar */}
      <div className="bg-[#FAF8F5] border-b border-[#E2DED6] px-4 py-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Search size={22} className="text-[#111111] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 200+ products by title, SKU, fit, color, or 240 GSM..."
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-[#111111] placeholder:text-[#5F6368] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#5F6368] hover:text-black font-semibold uppercase px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E2DED6] text-[#111111] transition-colors"
            aria-label="Close search"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Results Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto w-full">
        {query.trim() === '' ? (
          <div className="space-y-6 pt-4 text-center sm:text-left">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#5F6368] font-bold mb-3">
                Trending Streetwear Searches
              </h4>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="flex items-center gap-1.5 bg-[#FAF8F5] hover:bg-[#111111] hover:text-[#F7F5F0] text-[#111111] border border-[#E2DED6] px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  >
                    <Tag size={12} className="text-[#C9A96E]" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-white">
              <h4 className="text-xs uppercase tracking-widest text-[#D8C7B5] font-bold mb-3">
                Featured Categories
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Oversized T-Shirts (240 GSM)', slug: 'oversized-tees' },
                  { name: 'Graphic Streetwear Drops', slug: 'graphic-drops' },
                  { name: 'Acid Washed & Vintage', slug: 'acid-wash' },
                  { name: 'Minimal Basics (240 GSM)', slug: 'minimal-basics' },
                  { name: 'Heavyweight Hoodies', slug: 'hoodies' },
                  { name: 'Cargos & Utility Pants', slug: 'cargos-bottoms' },
                ].map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      onClose();
                      onNavigateShopWithCategory(cat.name);
                    }}
                    className="p-3 text-left rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold transition-all flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight size={14} className="text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-[#F7F5F0]">
            <p className="text-base font-semibold">No products found for "{query}"</p>
            <p className="text-xs text-[#D8C7B5] mt-1">
              Try searching for "240 GSM", "Acid Wash", "Black", or browse all 200+ products in the shop.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs text-[#D8C7B5] font-semibold flex justify-between items-center">
              <span>Showing {filtered.length} instant matches for "{query}"</span>
              <span className="text-[#C9A96E]">Instant Live Catalogue</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF8F5] hover:bg-white border border-[#E2DED6] hover:border-[#111111] transition-all cursor-pointer group shadow-sm"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded bg-[#EAE7E0]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#5F6368] mb-0.5">
                      <span className="font-mono bg-[#E2DED6]/60 px-1 py-0.2 rounded text-[#111111] font-semibold">{item.sku}</span>
                      <span>•</span>
                      <span>{item.gsm}</span>
                    </div>
                    <h5 className="font-heading font-semibold text-xs text-[#111111] group-hover:text-[#C9A96E] line-clamp-1 transition-colors">
                      {item.name}
                    </h5>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-[#111111]">₹{item.salePrice}</span>
                        <span className="text-[10px] text-[#5F6368] line-through">₹{item.price}</span>
                      </div>
                      <span className="text-[10px] text-[#2E7D32] font-semibold">In Stock ({item.stock})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
