import React, { useEffect } from 'react';
import { CheckCircle2, Truck, Package, ShieldCheck, ArrowRight, Download, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrders } from '../context/OrderContext';

export default function OrderSuccessPage({ orderId, onNavigate }) {
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A96E', '#111111', '#D8C7B5', '#2E7D32']
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-[#111111]">Order Not Found</h2>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-[#111111] text-[#F7F5F0] text-xs font-bold rounded"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      
      {/* Success Badge & Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] mx-auto flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#C9A96E]">
          PAYMENT VERIFIED & ORDER CONFIRMED
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#111111]">
          THANK YOU FOR YOUR ORDER!
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6368] max-w-lg mx-auto">
          We have sent your invoice and live tracking link to your email and WhatsApp. Your 240 GSM garments are now in the packing queue.
        </p>
      </div>

      {/* Order Meta Ribbon */}
      <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E2DED6] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div>
          <span className="text-[#5F6368] block">Order Number</span>
          <span className="font-heading font-bold text-sm text-[#111111]">{order.orderId}</span>
        </div>
        <div>
          <span className="text-[#5F6368] block">Date</span>
          <span className="font-semibold text-[#111111]">{order.date}</span>
        </div>
        <div>
          <span className="text-[#5F6368] block">Payment Gateway</span>
          <span className="font-semibold text-[#111111]">{order.paymentMethod}</span>
        </div>
        <div>
          <span className="text-[#5F6368] block">Shiprocket AWB</span>
          <span className="font-mono font-bold text-[#C9A96E]">{order.shiprocketAwb}</span>
        </div>
        <div>
          <span className="text-[#5F6368] block">Amount Paid</span>
          <span className="font-heading font-bold text-sm text-[#111111]">
            ₹{order.totalAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Shiprocket Fulfilment Timeline */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2DED6] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2DED6] pb-4">
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-[#C9A96E]" />
            <h3 className="font-heading font-bold text-sm text-[#111111] uppercase tracking-wider">
              Shiprocket Live Fulfilment Status
            </h3>
          </div>
          <span className="text-xs bg-[#2E7D32]/10 text-[#2E7D32] font-bold px-2.5 py-1 rounded-full">
            {order.status}
          </span>
        </div>

        {/* Stepper */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2DED6]">
          {order.timeline.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4 text-xs">
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                  step.done
                    ? 'bg-[#111111] border-[#111111] text-white'
                    : 'bg-white border-[#E2DED6] text-[#5F6368]'
                }`}
              >
                {step.done ? '✓' : idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-heading font-bold text-xs ${step.done ? 'text-[#111111]' : 'text-[#5F6368]'}`}>
                    {step.status}
                  </h4>
                  <span className="text-[11px] text-[#5F6368] font-mono">{step.time}</span>
                </div>
                <p className="text-[11px] text-[#5F6368] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items & Shipping Address Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        
        {/* Purchased Items */}
        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E2DED6] space-y-3">
          <h4 className="font-heading font-bold text-xs text-[#111111] uppercase tracking-wider">
            Items in this Package
          </h4>
          <div className="divide-y divide-[#E2DED6] space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="pt-2 flex items-center gap-3">
                <img
                  src={item.image || item.product?.images[0]}
                  alt="Item"
                  className="w-12 h-14 object-cover rounded bg-[#EAE7E0]"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-heading font-semibold text-xs text-[#111111] truncate">{item.name || item.product?.name}</h5>
                  <p className="text-[10px] text-[#5F6368]">
                    Qty: {item.quantity} • Size: {item.selectedSize} • {item.selectedColor?.name}
                  </p>
                </div>
                <span className="font-bold text-xs">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E2DED6] space-y-3">
          <h4 className="font-heading font-bold text-xs text-[#111111] uppercase tracking-wider">
            Delivery Destination
          </h4>
          <div className="text-xs text-[#5F6368] space-y-1">
            <p className="font-bold text-[#111111]">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p className="font-semibold text-[#111111] pt-1">Phone: {order.shippingAddress.phone || '+91 98401 23456'}</p>
          </div>
          <div className="pt-2 border-t border-[#E2DED6] text-[11px] text-[#2E7D32] font-semibold">
            ✓ Priority Air Delivery • Estimated in 24-48 hours
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
        <button
          onClick={() => onNavigate('account')}
          className="w-full sm:w-auto px-6 py-3.5 bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-[#F7F5F0] font-heading font-bold text-xs uppercase tracking-widest rounded-lg transition-all"
        >
          VIEW IN MY ACCOUNT
        </button>
        <button
          onClick={() => onNavigate('shop')}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#111111] border border-[#E2DED6] font-heading font-bold text-xs uppercase tracking-widest rounded-lg transition-all"
        >
          CONTINUE SHOPPING
        </button>
      </div>

    </div>
  );
}
