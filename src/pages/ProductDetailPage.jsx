import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Truck,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  Share2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage({
  product,
  allProducts,
  onProductClick,
  onQuickView,
  onOpenSizeGuide,
  onNavigate
}) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Black', hex: '#111111' });
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Accordion open states
  const [fabricOpen, setFabricOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [returnsOpen, setReturnsOpen] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5F6368]">
        <button onClick={() => onNavigate('home')} className="hover:text-[#111111]">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop')} className="hover:text-[#111111]">Shop</button>
        <span>/</span>
        <span className="hover:text-[#111111]">{product.category}</span>
        <span>/</span>
        <span className="text-[#111111] font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Presentation (Gallery + Buy Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Product Images Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-16 sm:w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-[#EAE7E0] ${
                  selectedImageIndex === idx ? 'border-[#111111] ring-2 ring-[#C9A96E]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Featured High-Res Canvas */}
          <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#EAE7E0] relative border border-[#E2DED6] shadow-sm">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="bg-[#111111] text-[#F7F5F0] text-xs font-bold px-3 py-1 rounded">
                {product.gsm}
              </span>
              <span className="bg-[#C9A96E] text-[#111111] text-xs font-bold px-3 py-1 rounded">
                {product.fit} Cut
              </span>
            </div>
            {discountPercent > 0 && (
              <div className="absolute top-4 right-4">
                <span className="bg-[#B3261E] text-white text-xs font-bold px-2.5 py-1 rounded">
                  SAVE {discountPercent}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Buy Box & Product Attributes (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#5F6368] mb-1">
              <span className="font-mono uppercase tracking-wider font-semibold">SKU: {product.sku}</span>
              <div className="flex items-center gap-1 text-[#111111]">
                <Star size={14} fill="#C9A96E" stroke="#C9A96E" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#5F6368]">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111111] leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-3 border-b border-[#E2DED6]">
            <span className="font-heading font-black text-3xl text-[#111111]">
              ₹{product.salePrice.toLocaleString('en-IN')}
            </span>
            <span className="text-base text-[#5F6368] line-through">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#2E7D32] font-bold">
              Inclusive of all taxes
            </span>
          </div>

          {/* Short value proposition */}
          <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#111111]">
                Color: <span className="font-normal text-[#5F6368]">{selectedColor.name}</span>
              </span>
            </div>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center relative ${
                    selectedColor.name === c.name
                      ? 'border-[#111111] ring-2 ring-[#C9A96E] scale-110'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor.name === c.name && (
                    <Check size={16} className={c.hex === '#F7F5F0' ? 'text-black' : 'text-white'} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#111111]">Select Size</span>
              <button
                onClick={() => onOpenSizeGuide(product.categorySlug)}
                className="text-[#C9A96E] hover:underline font-bold flex items-center gap-1 uppercase"
              >
                <Ruler size={14} />
                <span>Size Chart & Fit Guide</span>
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs font-bold rounded-lg border transition-all ${
                    selectedSize === size
                      ? 'bg-[#111111] text-[#F7F5F0] border-[#111111] shadow'
                      : 'bg-white text-[#111111] border-[#E2DED6] hover:border-[#111111]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#5F6368]">
              Model is 6'1" wearing size <strong className="text-[#111111]">L</strong> for signature drop shoulder drape.
            </p>
          </div>

          {/* Quantity & CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity counter */}
              <div className="flex items-center border border-[#E2DED6] rounded-lg bg-white px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-sm font-bold text-[#5F6368] hover:text-black"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-[#111111]">{quantity}</span>
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
                className="flex-1 bg-[#111111] hover:bg-[#C9A96E] hover:text-[#111111] text-[#F7F5F0] py-4 rounded-lg font-heading font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                <span>{addedToast ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`px-4 rounded-lg border border-[#E2DED6] transition-colors ${
                  inWishlist ? 'bg-[#111111] text-[#C9A96E]' : 'bg-white text-[#111111] hover:text-[#C9A96E]'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={inWishlist ? '#C9A96E' : 'none'} />
              </button>
            </div>

            {/* Free Shipping Callout */}
            <div className="bg-[#FAF8F5] border border-[#E2DED6] p-3 rounded-lg flex items-center gap-2.5 text-xs text-[#5F6368]">
              <Truck size={16} className="text-[#C9A96E] flex-shrink-0" />
              <span>
                Free express shipping on this order. Dispatches within 24h via Shiprocket.
              </span>
            </div>
          </div>

          {/* Collapsible Technical Specs Accordions */}
          <div className="border-t border-[#E2DED6] pt-4 space-y-3 text-xs">
            
            {/* Fabric & Specs */}
            <div className="border border-[#E2DED6] rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setFabricOpen(!fabricOpen)}
                className="w-full p-3.5 text-left font-heading font-bold text-xs flex items-center justify-between text-[#111111] hover:bg-[#FAF8F5]"
              >
                <span>FABRIC & TECHNICAL SPECIFICATIONS ({product.gsm})</span>
                {fabricOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {fabricOpen && (
                <div className="p-4 pt-1 text-[#5F6368] space-y-1.5 border-t border-[#E2DED6]/50 bg-[#FAF8F5]/30">
                  {product.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#C9A96E] font-bold">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping & Fulfilment */}
            <div className="border border-[#E2DED6] rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setShippingOpen(!shippingOpen)}
                className="w-full p-3.5 text-left font-heading font-bold text-xs flex items-center justify-between text-[#111111] hover:bg-[#FAF8F5]"
              >
                <span>EXPRESS SHIPPING & FULFILMENT</span>
                {shippingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {shippingOpen && (
                <div className="p-4 pt-1 text-[#5F6368] space-y-2 border-t border-[#E2DED6]/50 bg-[#FAF8F5]/30 leading-relaxed">
                  <p>• <strong>Tamil Nadu:</strong> Delivered in 24 to 48 hours.</p>
                  <p>• <strong>Pan-India Metros:</strong> 2 to 4 business days.</p>
                  <p>• <strong>Shiprocket Tracking:</strong> Live SMS and WhatsApp updates dispatched upon pickup.</p>
                </div>
              )}
            </div>

            {/* 7-Day Size Exchanges */}
            <div className="border border-[#E2DED6] rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setReturnsOpen(!returnsOpen)}
                className="w-full p-3.5 text-left font-heading font-bold text-xs flex items-center justify-between text-[#111111] hover:bg-[#FAF8F5]"
              >
                <span>7-DAY DOORSTEP SIZE EXCHANGES</span>
                {returnsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {returnsOpen && (
                <div className="p-4 pt-1 text-[#5F6368] space-y-2 border-t border-[#E2DED6]/50 bg-[#FAF8F5]/30 leading-relaxed">
                  <p>Not happy with the drape? We provide doorstep pickup and dispatch your replacement size within 48 hours. Items must be unwashed with tags intact.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add-to-Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E2DED6] p-3 z-30 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#5F6368] block">Selected: {selectedSize} • {selectedColor.name}</span>
          <span className="font-heading font-bold text-base text-[#111111]">
            ₹{product.salePrice.toLocaleString('en-IN')}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#111111] text-[#F7F5F0] py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:bg-[#C9A96E] active:text-black"
        >
          <ShoppingBag size={16} />
          <span>{addedToast ? 'ADDED' : 'ADD TO BAG'}</span>
        </button>
      </div>

      {/* Related Products / Complete the Look */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E2DED6] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111111]">
              COMPLETE THE LOOK
            </h2>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold text-[#111111] hover:text-[#C9A96E] flex items-center gap-1 uppercase"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onProductClick={onProductClick}
                onQuickView={onQuickView}
                onOpenSizeGuide={onOpenSizeGuide}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
