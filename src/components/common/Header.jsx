import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Header({ currentRoute, setCurrentRoute, onSearchOpen }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', route: 'home' },
    { label: 'SHOP', route: 'shop' },
    { label: 'ABOUT AXDORO', route: 'about' },
    { label: 'CUSTOM & BULK ORDERS', route: 'bulk' },
    { label: 'CONTACT & SUPPORT', route: 'contact' },
  ];

  const handleNavClick = (route) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#111111] text-[#F7F5F0] text-xs py-2 px-4 text-center font-medium tracking-wider flex items-center justify-center gap-2 border-b border-[#2B2B2B]">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse"></span>
        <span>FREE PAN-INDIA EXPRESS SHIPPING ON ORDERS ABOVE ₹1,499 | 240 GSM STREETWEAR DROP</span>
        <span className="hidden md:inline-block text-[#C9A96E] font-semibold ml-2">CODE: AXDORO10</span>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E2DED6] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:text-[#C9A96E] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left"
            >
              <span className="font-heading font-black text-2xl sm:text-3xl tracking-tighter text-[#111111] group-hover:text-[#C9A96E] transition-colors">
                AXDORO
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-[#5F6368] font-medium -mt-1">
                Heavyweight 240 GSM
              </span>
            </button>
          </div>

          {/* Desktop Primary Navigation (5 Primary Pages) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`text-sm font-semibold tracking-wide transition-all relative py-1 ${
                    isActive
                      ? 'text-[#111111]'
                      : 'text-[#5F6368] hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A96E] rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={onSearchOpen}
              className="p-2 text-[#111111] hover:text-[#C9A96E] transition-colors relative"
              aria-label="Search Catalogue"
              title="Search 200+ Products"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('account')}
              className="p-2 text-[#111111] hover:text-[#C9A96E] transition-colors relative hidden sm:block"
              aria-label="Wishlist"
              title="Saved Items"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#111111] text-[#F7F5F0] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account / Admin */}
            <button
              onClick={() => handleNavClick('account')}
              className="p-2 text-[#111111] hover:text-[#C9A96E] transition-colors relative"
              aria-label="My Account"
              title="Customer Account & Orders"
            >
              <User size={20} />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#111111] hover:bg-[#2B2B2B] text-[#F7F5F0] px-3.5 py-2 rounded-full transition-all text-xs font-semibold"
              aria-label="Open Cart"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">CART</span>
              <span className="bg-[#C9A96E] text-[#111111] font-bold w-5 h-5 rounded-full flex items-center justify-center text-[11px]">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E2DED6] px-6 py-6 space-y-4 animate-fade-in shadow-xl">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`block w-full text-left py-2.5 text-base font-semibold border-b border-[#E2DED6]/60 ${
                    currentRoute === link.route
                      ? 'text-[#C9A96E]'
                      : 'text-[#111111] hover:text-[#C9A96E]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E2DED6] flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('account')}
                className="flex items-center justify-between text-sm font-medium text-[#5F6368] py-2"
              >
                <span>My Account & Orders</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-between text-xs font-medium text-[#C9A96E] py-2"
              >
                <span>Admin Operations & WooCommerce CSV Export</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
