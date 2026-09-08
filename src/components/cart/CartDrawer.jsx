import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ onProceedToCheckout, onContinueShopping }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    appliedPromo,
    applyPromo,
    removePromo,
    shippingFee,
    grandTotal,
    amountNeededForFreeShipping,
    freeShippingProgress,
    FREE_SHIPPING_THRESHOLD,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#E2DED6] flex flex-col">
          
          {/* Cart Header */}
          <div className="px-6 py-5 bg-[#111111] text-[#F7F5F0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={20} className="text-[#C9A96E]" />
              <h2 className="font-heading font-bold text-base tracking-wide">
                YOUR SHOPPING BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#F7F5F0] hover:text-[#C9A96E] transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3.5 bg-[#F7F5F0] border-b border-[#E2DED6]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-[#2E7D32] flex items-center gap-1 font-bold">
                  <Sparkles size={14} />
                  <span>YOU UNLOCKED FREE PAN-INDIA EXPRESS SHIPPING!</span>
                </span>
              ) : (
                <span className="text-[#5F6368]">
                  Add <strong className="text-[#111111]">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
                </span>
              )}
              <span className="text-[#111111] font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E2DED6] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#111111] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E2DED6]/50 mx-auto flex items-center justify-center text-[#5F6368]">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#111111]">
                    Your bag is currently empty
                  </h3>
                  <p className="text-xs text-[#5F6368] mt-1 max-w-xs mx-auto">
                    Explore our 240 GSM signature streetwear collection and elevate your everyday wardrobe.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onContinueShopping();
                  }}
                  className="inline-flex items-center gap-2 bg-[#111111] text-[#F7F5F0] px-5 py-2.5 rounded text-xs font-bold hover:bg-[#C9A96E] hover:text-[#111111] transition-colors"
                >
                  <span>BROWSE 200+ PRODUCTS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 p-3 bg-white border border-[#E2DED6] rounded-lg shadow-sm"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded bg-[#EAE7E0] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-semibold text-xs text-[#111111] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-[#5F6368] hover:text-[#B3261E] transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-[#5F6368] mt-1">
                        <span>Size: <strong className="text-[#111111]">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-[#111111]">{item.selectedColor.name}</span>
                        </div>
                      </div>

                      <span className="inline-block mt-1 text-[10px] bg-[#FAF8F5] border border-[#E2DED6] text-[#5F6368] px-1.5 py-0.5 rounded font-mono">
                        {item.product.gsm}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E2DED6]/50">
                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-[#E2DED6] rounded bg-[#FAF8F5] text-xs">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#5F6368] hover:text-black"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#5F6368] hover:text-black"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-heading font-bold text-xs text-[#111111]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E2DED6] space-y-4">
              
              {/* Promo Code Box */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#C9A96E]/50 px-3 py-2 rounded text-xs">
                    <div className="flex items-center gap-1.5 text-[#111111]">
                      <Tag size={13} className="text-[#C9A96E]" />
                      <span>Applied: <strong className="text-[#C9A96E] font-mono">{appliedPromo}</strong></span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-[11px] text-[#B3261E] hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. AXDORO10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#FAF8F5] border border-[#E2DED6] px-3 py-2 rounded text-xs focus:outline-none focus:border-[#111111] uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-[#F7F5F0] px-4 py-2 rounded text-xs font-bold transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-[11px] mt-1.5 font-medium ${promoMessage.success ? 'text-[#2E7D32]' : 'text-[#B3261E]'}`}>
                    {promoMessage.message}
                  </p>
                )}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5F6368]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-[#111111] font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32] font-semibold">
                    <span>Promo Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-[#2E7D32]">FREE</strong>
                    ) : (
                      <span className="text-[#111111]">₹{shippingFee}</span>
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E2DED6] flex justify-between text-sm font-heading font-bold text-[#111111]">
                  <span>Total Amount</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full bg-[#111111] hover:bg-[#C9A96E] hover:text-[#111111] text-[#F7F5F0] py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#5F6368]">
                <ShieldCheck size={14} className="text-[#2E7D32]" />
                <span>Prepaid Checkout Protected by Razorpay 256-Bit SSL</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
