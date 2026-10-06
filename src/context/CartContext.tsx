import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductColor } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedSize: string, selectedColor: ProductColor, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  appliedCoupon: string | null;
  couponDiscountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  totalMrp: number;
  totalSavings: number;
  deliveryFee: number;
  finalTotal: number;
  itemCount: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'mall_cart_items';
const COUPON_KEY = 'mall_applied_coupon';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem(COUPON_KEY) || null;
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_KEY, appliedCoupon);
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, selectedSize: string, selectedColor: ProductColor, quantity = 1) => {
    const itemId = `${product.id}-${selectedSize}-${selectedColor.name.replace(/\s+/g, '')}`;

    setItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, productId: product.id, product, selectedSize, selectedColor, quantity }];
    });

    showToast(`Added ${product.name} (${selectedSize}) to Bag`);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev => prev.map(item => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from Bag');
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MALL10') {
      setAppliedCoupon('MALL10');
      showToast('Coupon MALL10 applied: 10% Instant Discount!');
      return { success: true, message: '10% Instant Discount applied successfully!' };
    }
    if (cleanCode === 'MALL20' || cleanCode === 'FIRSTBUY') {
      setAppliedCoupon('MALL20');
      showToast('Coupon MALL20 applied: 20% Instant Discount!');
      return { success: true, message: '20% Special Discount applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code. Try MALL10 or FIRSTBUY' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Calculations
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalMrp = items.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const mrpSavings = totalMrp - subtotal;

  let couponDiscountAmount = 0;
  if (appliedCoupon === 'MALL10') {
    couponDiscountAmount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'MALL20') {
    couponDiscountAmount = Math.round(subtotal * 0.2);
  }

  // Free delivery threshold: ₹999
  const deliveryFee = subtotal > 0 && subtotal >= 999 ? 0 : subtotal > 0 ? 99 : 0;
  const finalTotal = Math.max(0, subtotal - couponDiscountAmount + deliveryFee);
  const totalSavings = mrpSavings + couponDiscountAmount;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        couponDiscountAmount,
        applyCoupon,
        removeCoupon,
        totalMrp,
        totalSavings,
        deliveryFee,
        finalTotal,
        itemCount,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
