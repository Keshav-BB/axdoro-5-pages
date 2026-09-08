import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Ruler, Check, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onViewFullDetail,
  onOpenSizeGuide
}) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || { name: 'Black', hex: '#111111' });
      setSelectedSize('L');
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF8F5] text-[#111111] w-full max-w-3xl rounded-xl shadow-2xl border border-[#E2DED6] overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/80 hover:bg-[#111111] hover:text-white text-[#111111] transition-all shadow"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Product Image Gallery Canvas */}
        <div className="md:w-1/2 bg-[#EAE7E0] relative flex flex-col justify-between">
          <div className="aspect-[3/4] w-full overflow-hidden">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail strip */}
          <div className="p-3 flex gap-2 justify-center bg-[#FAF8F5] border-t border-[#E2DED6]">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-12 h-14 rounded overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#111111] scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info & Purchase Options */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* GSM & Fit Badges */}
            <div className="flex items-center gap-2">
              <span className="bg-[#111111] text-[#F7F5F0] text-xs font-bold px-2.5 py-0.5 rounded">
                {product.gsm}
              </span>
              <span className="bg-[#C9A96E]/20 text-[#111111] border border-[#C9A96E] text-xs font-bold px-2 py-0.5 rounded">
                {product.fit} Cut
              </span>
            </div>

            {/* Title & Rating */}
            <h2 className="font-heading font-bold text-lg sm:text-xl text-[#111111] leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-[#C9A96E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#C9A96E" />
                ))}
              </div>
              <span className="font-bold text-[#111111]">{product.rating}</span>
              <span className="text-[#5F6368]">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-2 py-1">
              <span className="font-heading font-extrabold text-2xl text-[#111111]">
                ₹{product.salePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-[#5F6368] line-through">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="bg-[#B3261E] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                SAVE {discountPercent}%
              </span>
            </div>

            {/* Color Swatches */}
            <div className="space-y-1.5 pt-2 border-t border-[#E2DED6]">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#111111]">Color: {selectedColor?.name}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor?.name === c.name
                        ? 'border-[#111111] ring-2 ring-[#C9A96E]'
                        : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor?.name === c.name && (
                      <Check size={14} className={c.hex === '#F7F5F0' ? 'text-black' : 'text-white'} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#111111]">Select Size</span>
                <button
                  onClick={() => onOpenSizeGuide(product.categorySlug)}
                  className="text-[#C9A96E] hover:underline font-bold flex items-center gap-1 text-[11px]"
                >
                  <Ruler size={12} />
                  <span>Size Chart</span>
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-bold rounded border transition-all ${
                      selectedSize === s
                        ? 'bg-[#111111] text-[#F7F5F0] border-[#111111]'
                        : 'bg-white text-[#111111] border-[#E2DED6] hover:border-[#111111]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs text-[#5F6368] leading-relaxed pt-1">
              {product.shortDescription}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-3 border-t border-[#E2DED6]">
            <div className="flex gap-2">
              {/* Quantity */}
              <div className="flex items-center border border-[#E2DED6] rounded bg-white px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-sm font-bold text-[#5F6368] hover:text-black"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[#111111]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-2 text-sm font-bold text-[#5F6368] hover:text-black"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#111111] hover:bg-[#2B2B2B] text-[#F7F5F0] py-3 rounded text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag size={16} />
                <span>{addedToast ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded border border-[#E2DED6] transition-colors ${
                  inWishlist ? 'bg-[#111111] text-[#C9A96E]' : 'bg-white text-[#111111] hover:text-[#C9A96E]'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={inWishlist ? '#C9A96E' : 'none'} />
              </button>
            </div>

            {/* View Full Product Details Link */}
            <button
              onClick={() => {
                onClose();
                onViewFullDetail(product);
              }}
              className="w-full text-center text-xs text-[#5F6368] hover:text-[#111111] font-semibold underline underline-offset-4 py-1"
            >
              View Complete Fabric & Technical Specs →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
