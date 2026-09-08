import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  Clock,
  Truck,
  ExternalLink,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function AccountPage({ onNavigate, onProductClick, onQuickView }) {
  const { orders } = useOrders();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'addresses' | 'profile'
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);

  const [userProfile, setUserProfile] = useState({
    name: 'Vikram Sundaram',
    email: 'vikram.sundaram@gmail.com',
    phone: '+91 98401 23456',
    memberSince: 'August 2026',
    tier: 'VIP Streetwear Club (Gold)'
  });

  const handleMoveToBag = (product) => {
    addToCart(product, 'L', product.colors[0], 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      
      {/* Account Top Summary Banner */}
      <div className="bg-[#111111] text-[#F7F5F0] rounded-2xl p-6 sm:p-8 border border-[#2B2B2B] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-[#C9A96E] text-[#111111] font-heading font-black text-2xl flex items-center justify-center flex-shrink-0">
            VS
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl sm:text-2xl text-white">
              {userProfile.name}
            </h1>
            <p className="text-xs text-[#D8C7B5]">{userProfile.email} • {userProfile.phone}</p>
            <span className="inline-block mt-1 text-[10px] bg-[#1A1A1A] border border-[#C9A96E]/50 text-[#C9A96E] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              {userProfile.tier}
            </span>
          </div>
        </div>

        <div className="flex gap-6 text-center text-xs">
          <div className="bg-[#1A1A1A] border border-[#2B2B2B] px-4 py-2.5 rounded-xl">
            <span className="text-[#5F6368] block">Total Orders</span>
            <span className="font-heading font-bold text-base text-white">{orders.length}</span>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2B2B2B] px-4 py-2.5 rounded-xl">
            <span className="text-[#5F6368] block">Wishlist</span>
            <span className="font-heading font-bold text-base text-[#C9A96E]">{wishlist.length}</span>
          </div>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-[#E2DED6] gap-6 text-xs font-bold overflow-x-auto pb-1">
        {[
          { id: 'orders', label: `MY ORDERS (${orders.length})`, icon: Package },
          { id: 'wishlist', label: `SAVED WISHLIST (${wishlist.length})`, icon: Heart },
          { id: 'addresses', label: 'SAVED ADDRESSES', icon: MapPin },
          { id: 'profile', label: 'PROFILE SETTINGS', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 border-b-2 transition-all uppercase tracking-wider whitespace-nowrap ${
                isActive
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-[#5F6368] hover:text-[#111111]'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#C9A96E]' : ''} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-[#FAF8F5] p-12 text-center rounded-2xl border border-[#E2DED6] space-y-3">
              <Package size={32} className="text-[#5F6368] mx-auto" />
              <h3 className="font-heading font-bold text-base text-[#111111]">No Orders Placed Yet</h3>
              <p className="text-xs text-[#5F6368]">
                Start your streetwear journey with our signature 240 GSM heavy cotton drops.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-2.5 bg-[#111111] text-[#F7F5F0] text-xs font-bold rounded mt-2"
              >
                BROWSE SHOP
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-[#FAF8F5] rounded-xl border border-[#E2DED6] overflow-hidden shadow-sm text-xs"
                >
                  {/* Order Top Bar */}
                  <div className="bg-white p-4 border-b border-[#E2DED6] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-[#5F6368] block text-[10px]">ORDER ID</span>
                        <span className="font-heading font-bold text-xs text-[#111111]">{order.orderId}</span>
                      </div>
                      <div>
                        <span className="text-[#5F6368] block text-[10px]">DATE</span>
                        <span className="font-semibold text-[#111111]">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-[#5F6368] block text-[10px]">AWB (SHIPROCKET)</span>
                        <span className="font-mono font-bold text-[#C9A96E]">{order.shiprocketAwb}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30 px-2.5 py-1 rounded-full font-bold">
                        {order.status}
                      </span>
                      <button
                        onClick={() => setSelectedOrderForTracking(order)}
                        className="px-3 py-1.5 bg-[#111111] text-white hover:bg-[#C9A96E] hover:text-black rounded font-semibold text-xs transition-colors flex items-center gap-1"
                      >
                        <Truck size={13} />
                        <span>Track</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || item.product?.images[0]}
                            alt="Item"
                            className="w-12 h-14 object-cover rounded bg-[#EAE7E0]"
                          />
                          <div>
                            <h4 className="font-heading font-semibold text-xs text-[#111111]">
                              {item.name || item.product?.name}
                            </h4>
                            <p className="text-[11px] text-[#5F6368]">
                              Size: {item.selectedSize} • Color: {item.selectedColor?.name} • Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-xs">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="bg-[#FAF8F5] px-4 py-3 border-t border-[#E2DED6] flex items-center justify-between text-[#5F6368]">
                    <span>Paid via {order.paymentMethod}</span>
                    <div className="text-right">
                      <span className="text-[10px] text-[#5F6368] block">TOTAL AMOUNT</span>
                      <span className="font-heading font-black text-sm text-[#111111]">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length === 0 ? (
            <div className="bg-[#FAF8F5] p-12 text-center rounded-2xl border border-[#E2DED6] space-y-3">
              <Heart size={32} className="text-[#5F6368] mx-auto" />
              <h3 className="font-heading font-bold text-base text-[#111111]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#5F6368]">
                Tap the heart icon on any product card to save your favorite streetwear drops for later.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-2.5 bg-[#111111] text-[#F7F5F0] text-xs font-bold rounded mt-2"
              >
                EXPLORE DROPS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E2DED6] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="aspect-[3/4] relative bg-[#EAE7E0]">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-black hover:text-white text-black transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="p-3 space-y-2">
                    <h4 className="font-heading font-semibold text-xs text-[#111111] truncate">{item.name}</h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">₹{item.salePrice}</span>
                      <span className="text-[10px] font-mono text-[#5F6368]">{item.gsm}</span>
                    </div>
                    <button
                      onClick={() => handleMoveToBag(item)}
                      className="w-full py-2 bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-[#F7F5F0] rounded text-[11px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 bg-white border-2 border-[#111111] rounded-xl space-y-2 relative">
            <span className="absolute top-4 right-4 bg-[#111111] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
              Default
            </span>
            <h4 className="font-heading font-bold text-sm text-[#111111]">Home / Studio</h4>
            <p className="text-[#5F6368]">Vikram Sundaram</p>
            <p className="text-[#5F6368]">18 Wallace Garden 3rd Street, Nungambakkam</p>
            <p className="text-[#5F6368]">Chennai, Tamil Nadu - 600006</p>
            <p className="font-semibold text-[#111111] pt-1">Phone: +91 98401 23456</p>
          </div>

          <div className="p-5 bg-[#FAF8F5] border border-dashed border-[#E2DED6] rounded-xl flex flex-col items-center justify-center text-center p-6 space-y-2 cursor-pointer hover:border-[#111111] transition-colors">
            <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-black font-bold">
              +
            </div>
            <span className="font-heading font-bold text-xs text-[#111111]">Add New Delivery Address</span>
            <p className="text-[11px] text-[#5F6368]">Save office or secondary address for express checkout</p>
          </div>
        </div>
      )}

      {/* Tab 4: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E2DED6] max-w-xl space-y-4 text-xs">
          <h3 className="font-heading font-bold text-sm text-[#111111]">Account Details</h3>
          <div>
            <label className="font-bold text-[#111111] block mb-1">Full Name</label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
              className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded focus:outline-none focus:border-[#111111]"
            />
          </div>
          <div>
            <label className="font-bold text-[#111111] block mb-1">Email Address</label>
            <input
              type="email"
              value={userProfile.email}
              disabled
              className="w-full bg-gray-100 border border-[#E2DED6] px-3 py-2 rounded text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="font-bold text-[#111111] block mb-1">Mobile Phone Number</label>
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
              className="w-full bg-white border border-[#E2DED6] px-3 py-2 rounded focus:outline-none focus:border-[#111111]"
            />
          </div>
          <button
            onClick={() => alert('Profile updated successfully!')}
            className="px-5 py-2.5 bg-[#111111] text-white font-bold rounded text-xs hover:bg-[#C9A96E] hover:text-black transition-colors"
          >
            SAVE CHANGES
          </button>
        </div>
      )}

      {/* Order Tracking Modal if clicked */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#E2DED6] shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#111111]">
                  Live Shipment: {selectedOrderForTracking.orderId}
                </h3>
                <span className="text-[11px] text-[#C9A96E] font-mono">
                  Shiprocket AWB #{selectedOrderForTracking.shiprocketAwb}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="text-gray-500 hover:text-black font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 pl-4 border-l-2 border-[#111111] text-xs">
              {selectedOrderForTracking.timeline.map((t, idx) => (
                <div key={idx} className="relative">
                  <div className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${t.done ? 'bg-[#2E7D32]' : 'bg-gray-300'}`} />
                  <div className="flex justify-between items-center">
                    <span className={`font-bold ${t.done ? 'text-black' : 'text-gray-400'}`}>{t.status}</span>
                    <span className="text-[10px] text-gray-500">{t.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t text-right">
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
