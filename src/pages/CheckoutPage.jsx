import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, ArrowRight, Lock, CheckCircle, Truck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import RazorpayModal from '../components/checkout/RazorpayModal';

const INDIAN_STATES = [
  'Tamil Nadu',
  'Karnataka',
  'Maharashtra',
  'Delhi',
  'Telangana',
  'Kerala',
  'Andhra Pradesh',
  'Gujarat',
  'West Bengal',
  'Rajasthan',
  'Uttar Pradesh',
  'Punjab',
  'Haryana',
  'Other State / UT'
];

export default function CheckoutPage({ onNavigate, onOrderCompleted }) {
  const {
    cart,
    subtotal,
    discount,
    appliedPromo,
    shippingFee,
    grandTotal,
    clearCart
  } = useCart();
  const { placeOrder } = useOrders();

  const [contact, setContact] = useState({
    email: 'alex.streetwear@example.com',
    phone: '9840123456',
    createAccount: true
  });

  const [address, setAddress] = useState({
    fullName: 'Alex Sundaram',
    street: '18 Wallace Garden 3rd Street, Nungambakkam',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600006'
  });

  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-[#111111]">Your bag is empty</h2>
        <p className="text-xs text-[#5F6368]">
          Add your favorite 240 GSM streetwear drop before heading to checkout.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 bg-[#111111] text-[#F7F5F0] text-xs font-bold rounded"
        >
          BROWSE SHOP
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errors = {};
    if (!contact.email.includes('@')) errors.email = 'Valid email is required';
    if (!contact.phone || contact.phone.length < 10) errors.phone = '10-digit mobile number required';
    if (!address.fullName.trim()) errors.fullName = 'Recipient name required';
    if (!address.street.trim()) errors.street = 'Street address required';
    if (!address.city.trim()) errors.city = 'City required';
    if (!address.pincode || address.pincode.length !== 6) errors.pincode = '6-digit Indian PIN code required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsRazorpayOpen(true);
    }
  };

  const handlePaymentSuccess = (paymentId, method) => {
    setIsRazorpayOpen(false);
    const order = placeOrder({
      items: cart,
      shippingAddress: address,
      totalAmount: grandTotal,
      paymentMethod: `Razorpay (${method.toUpperCase()})`,
      paymentId
    });
    clearCart();
    onOrderCompleted(order.orderId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      
      {/* Checkout Header */}
      <div className="border-b border-[#E2DED6] pb-4 mb-8 flex items-center justify-between">
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#5F6368] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>RETURN TO STORE</span>
        </button>
        <div className="flex items-center gap-1.5 text-xs text-[#5F6368]">
          <Lock size={14} className="text-[#2E7D32]" />
          <span>100% Encrypted Razorpay Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Customer Info & Shipping Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleProceedToPayment} className="space-y-6 text-xs">
            
            {/* 1. Contact Information */}
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E2DED6] space-y-4">
              <h3 className="font-heading font-bold text-sm text-[#111111] uppercase tracking-wider flex items-center justify-between">
                <span>1. Contact Information</span>
                <span className="text-[11px] text-[#5F6368] font-normal">For Shiprocket SMS tracking</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#111111] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded text-xs focus:outline-none focus:border-[#111111]"
                  />
                  {formErrors.email && <span className="text-[#B3261E] text-[10px] mt-0.5">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="font-semibold text-[#111111] block mb-1">Mobile Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded text-xs focus:outline-none focus:border-[#111111]"
                  />
                  {formErrors.phone && <span className="text-[#B3261E] text-[10px] mt-0.5">{formErrors.phone}</span>}
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E2DED6] space-y-4">
              <h3 className="font-heading font-bold text-sm text-[#111111] uppercase tracking-wider">
                2. Shipping Address (India)
              </h3>

              <div>
                <label className="font-semibold text-[#111111] block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded text-xs focus:outline-none focus:border-[#111111]"
                />
                {formErrors.fullName && <span className="text-[#B3261E] text-[10px] mt-0.5">{formErrors.fullName}</span>}
              </div>

              <div>
                <label className="font-semibold text-[#111111] block mb-1">Flat, Suite, Street Address *</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded text-xs focus:outline-none focus:border-[#111111]"
                />
                {formErrors.street && <span className="text-[#B3261E] text-[10px] mt-0.5">{formErrors.street}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#111111] block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded text-xs focus:outline-none focus:border-[#111111]"
                  />
                  {formErrors.city && <span className="text-[#B3261E] text-[10px] mt-0.5">{formErrors.city}</span>}
                </div>

                <div>
                  <label className="font-semibold text-[#111111] block mb-1">State *</label>
                  <select
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded text-xs focus:outline-none focus:border-[#111111]"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#111111] block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded text-xs font-mono focus:outline-none focus:border-[#111111]"
                  />
                  {formErrors.pincode && <span className="text-[#B3261E] text-[10px] mt-0.5">{formErrors.pincode}</span>}
                </div>
              </div>
            </div>

            {/* 3. Shipping Method */}
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E2DED6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-[#C9A96E]" />
                <div>
                  <h4 className="font-heading font-bold text-xs text-[#111111]">Shiprocket Air Express</h4>
                  <p className="text-[11px] text-[#5F6368]">24-48 hrs in Tamil Nadu • 3-5 days Pan-India</p>
                </div>
              </div>
              <span className="font-bold text-xs text-[#2E7D32]">
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
              </span>
            </div>

            {/* Proceed to Payment Button */}
            <button
              type="submit"
              className="w-full bg-[#111111] hover:bg-[#C9A96E] hover:text-[#111111] text-[#F7F5F0] py-4 rounded-lg font-heading font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Lock size={16} />
              <span>PROCEED TO RAZORPAY PAYMENT (₹{grandTotal.toLocaleString('en-IN')})</span>
            </button>
          </form>
        </div>

        {/* Right: Order Summary Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-xl border border-[#E2DED6] self-start space-y-5">
          <h3 className="font-heading font-bold text-sm text-[#111111] pb-3 border-b border-[#E2DED6]">
            ORDER SUMMARY ({cart.reduce((a, b) => a + b.quantity, 0)} ITEMS)
          </h3>

          {/* Items mini list */}
          <div className="divide-y divide-[#E2DED6] max-h-72 overflow-y-auto space-y-2 pr-1">
            {cart.map((item) => (
              <div key={item.key} className="pt-2 flex items-center gap-3 text-xs">
                <div className="relative w-14 h-16 rounded overflow-hidden bg-[#EAE7E0] flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-heading font-semibold text-xs text-[#111111] truncate">{item.product.name}</h5>
                  <p className="text-[11px] text-[#5F6368]">
                    {item.selectedSize} • {item.selectedColor.name} • {item.product.gsm}
                  </p>
                </div>
                <span className="font-bold text-xs text-[#111111]">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 pt-3 border-t border-[#E2DED6] text-xs text-[#5F6368]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#111111] font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#2E7D32] font-semibold">
                <span>Coupon ({appliedPromo})</span>
                <span>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>{shippingFee === 0 ? <strong className="text-[#2E7D32]">FREE</strong> : `₹${shippingFee}`}</span>
            </div>
            <div className="pt-2 border-t border-[#E2DED6] flex justify-between text-base font-heading font-black text-[#111111]">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E2DED6] rounded-lg text-[11px] text-[#5F6368] space-y-1">
            <div className="flex items-center gap-1.5 text-[#2E7D32] font-semibold">
              <ShieldCheck size={14} />
              <span>7-Day Return & Size Exchange Available</span>
            </div>
            <p>Doorstep reverse pickup arranged across Tamil Nadu & Pan-India.</p>
          </div>
        </div>

      </div>

      {/* Razorpay Gateway Simulation Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        totalAmount={grandTotal}
        customerInfo={contact}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentFailure={(err) => console.log('Payment failed', err)}
      />

    </div>
  );
}
