import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 1499;
const STANDARD_SHIPPING_FEE = 99;

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('axdoro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('axdoro_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCart((prev) => {
      const itemKey = `${product.id}-${selectedSize}-${selectedColor.name}`;
      const existingIndex = prev.findIndex((item) => item.key === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            key: itemKey,
            id: product.id,
            product,
            selectedSize,
            selectedColor,
            quantity,
            price: product.salePrice || product.price,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.key !== itemKey));
  };

  const updateQuantity = (itemKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const applyPromo = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'AXDORO10') {
      setAppliedPromo('AXDORO10');
      return { success: true, message: 'Coupon applied! 10% off your entire order.' };
    } else if (cleanCode === 'DROP200') {
      setAppliedPromo('DROP200');
      return { success: true, message: '₹200 flat discount applied!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try AXDORO10 for 10% off!' };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let calculatedDiscount = 0;
  if (appliedPromo === 'AXDORO10') {
    calculatedDiscount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'DROP200') {
    calculatedDiscount = Math.min(200, subtotal);
  }

  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = Math.max(0, subtotal - calculatedDiscount + shippingFee);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discount: calculatedDiscount,
        appliedPromo,
        applyPromo,
        removePromo,
        shippingFee,
        grandTotal,
        totalItemsCount,
        FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
