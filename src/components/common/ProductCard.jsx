import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({
  product,
  onProductClick,
  onQuickView,
  onOpenSizeGuide
}) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Black', hex: '#111111' });
  const [selectedSize, setSelectedSize] = useState('L');
  const [isHovered, setIsHovered] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100);
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e, size) => {
    e.stopPropagation();
    addToCart(product, size || selectedSize, selectedColor, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      onClick={() => onProductClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#FAF8F5] rounded-lg border border-[#E2DED6] hover:border-[#C9A96E]/60 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer shadow-sm hover:shadow-premium"
    >
      {/* Image Canvas */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE7E0]">
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          <span className="bg-[#111111] text-[#F7F5F0] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            {product.gsm}
          </span>
          {product.isBestSeller && (
            <span className="bg-[#C9A96E] text-[#111111] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              Best Seller
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="bg-[#FAF8F5] text-[#111111] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider border border-[#E2DED6] uppercase">
              New Drop
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="bg-[#B3261E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute bottom-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-[#111111] text-[#C9A96E]'
              : 'bg-white/90 text-[#111111] hover:bg-white hover:text-[#C9A96E] shadow'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart size={16} fill={inWishlist ? '#C9A96E' : 'none'} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-2.5 left-2.5 z-20 w-8 h-8 rounded-full bg-white/90 text-[#111111] hover:bg-white hover:text-[#C9A96E] shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Quick View"
          title="Quick View"
        >
          <Eye size={16} />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-[#111111]/90 backdrop-blur-sm p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:flex flex-col items-center gap-1.5 z-10">
          <div className="text-[11px] font-semibold text-[#F7F5F0] tracking-wider uppercase">
            Quick Add Size
          </div>
          <div className="flex gap-1">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => handleQuickAdd(e, size)}
                className="w-7 h-7 rounded bg-[#2B2B2B] hover:bg-[#C9A96E] text-[#F7F5F0] hover:text-[#111111] text-[10px] font-bold transition-colors flex items-center justify-center"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Add Success Toast */}
        {addedToast && (
          <div className="absolute inset-0 bg-[#111111]/85 backdrop-blur-sm z-30 flex items-center justify-center text-white text-xs font-bold gap-1.5 animate-fade-in">
            <Check size={16} className="text-[#C9A96E]" />
            <span>ADDED TO CART</span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#5F6368] mb-1">
            <span className="uppercase tracking-wider font-medium">{product.fit} Cut</span>
            <div className="flex items-center gap-0.5 text-[#111111]">
              <Star size={11} fill="#C9A96E" stroke="#C9A96E" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-[#5F6368]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-semibold text-xs sm:text-sm text-[#111111] line-clamp-2 leading-snug group-hover:text-[#C9A96E] transition-colors">
            {product.name}
          </h3>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'border-[#111111] scale-125 ring-1 ring-[#C9A96E]'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-[#5F6368] ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="mt-3 pt-2.5 border-t border-[#E2DED6]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading font-bold text-sm sm:text-base text-[#111111]">
              ₹{product.salePrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#5F6368] line-through">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Mobile Instant Add */}
          <button
            onClick={(e) => handleQuickAdd(e, selectedSize)}
            className="md:hidden p-2 rounded-full bg-[#111111] text-[#F7F5F0] active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
