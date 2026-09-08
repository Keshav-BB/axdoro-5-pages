import React, { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import SearchOverlay from './components/common/SearchOverlay';
import QuickViewModal from './components/common/QuickViewModal';
import SizeGuideModal from './components/common/SizeGuideModal';
import AIChatbot from './components/ai/AIChatbot';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import CustomBulkPage from './pages/CustomBulkPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AccountPage from './pages/AccountPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Context Providers & Data
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { PRODUCTS } from './data/productsData';

function StorefrontApp() {
  // Navigation Route
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [lastPlacedOrderId, setLastPlacedOrderId] = useState(null);
  const [shopCategoryFilter, setShopCategoryFilter] = useState('All');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideCategory, setSizeGuideCategory] = useState(null);

  const navigateTo = (route, options = {}) => {
    setCurrentRoute(route);
    if (options.category) {
      setShopCategoryFilter(options.category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleOpenSizeGuide = (catSlug = 'oversized-tees') => {
    setSizeGuideCategory(catSlug);
  };

  const handleOrderCompleted = (orderId) => {
    setLastPlacedOrderId(orderId);
    navigateTo('order-success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#111111]">
      {/* Primary Sticky Header */}
      <Header
        currentRoute={currentRoute}
        setCurrentRoute={navigateTo}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            products={PRODUCTS}
            onProductClick={handleProductClick}
            onQuickView={handleQuickView}
            onOpenSizeGuide={handleOpenSizeGuide}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            initialCategory={shopCategoryFilter}
            onProductClick={handleProductClick}
            onQuickView={handleQuickView}
            onOpenSizeGuide={handleOpenSizeGuide}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            onProductClick={handleProductClick}
            onQuickView={handleQuickView}
            onOpenSizeGuide={handleOpenSizeGuide}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'bulk' && (
          <CustomBulkPage />
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            onTriggerChatbot={() => {
              const botBtn = document.querySelector('button[aria-label="Open AI Fashion Assistant"]');
              if (botBtn) botBtn.click();
            }}
          />
        )}

        {currentRoute === 'checkout' && (
          <CheckoutPage
            onNavigate={navigateTo}
            onOrderCompleted={handleOrderCompleted}
          />
        )}

        {currentRoute === 'order-success' && (
          <OrderSuccessPage
            orderId={lastPlacedOrderId}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'account' && (
          <AccountPage
            onNavigate={navigateTo}
            onProductClick={handleProductClick}
            onQuickView={handleQuickView}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminDashboardPage
            products={PRODUCTS}
          />
        )}
      </main>

      {/* Primary Footer */}
      <Footer setCurrentRoute={navigateTo} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => navigateTo('checkout')}
        onContinueShopping={() => navigateTo('shop')}
      />

      {/* AJAX Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleProductClick}
        onNavigateShopWithCategory={(cat) => navigateTo('shop', { category: cat })}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullDetail={handleProductClick}
        onOpenSizeGuide={handleOpenSizeGuide}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={!!sizeGuideCategory}
        categorySlug={sizeGuideCategory}
        onClose={() => setSizeGuideCategory(null)}
      />

      {/* Floating AI Shopping & Support Assistant */}
      <AIChatbot
        onProductSelect={handleProductClick}
        onNavigate={navigateTo}
      />
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <WishlistProvider>
        <CartProvider>
          <StorefrontApp />
        </CartProvider>
      </WishlistProvider>
    </OrderProvider>
  );
}
