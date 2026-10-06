import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    appliedCoupon,
    couponDiscountAmount,
    applyCoupon,
    removeCoupon,
    totalMrp,
    totalSavings,
    deliveryFee,
    finalTotal
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    if (!isInWishlist(item.product.id)) {
      toggleWishlist(item.product);
    }
    removeFromCart(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-tight text-neutral-900">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm">
          Discover new season designer pieces, refined tailoring, and modern essentials.
        </p>
        <Link
          to="/"
          className="mt-6 px-8 py-3 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider rounded-none hover:bg-black transition-colors shadow-sm inline-flex items-center space-x-2"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/40 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="pb-6 mb-6 border-b border-neutral-200">
          <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
            Shopping Bag ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Items List (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white border border-neutral-200 rounded-sm p-4 sm:p-5 flex gap-4 transition-all"
              >
                {/* Product Thumbnail */}
                <Link
                  to={`/product/${item.productId}`}
                  className="w-20 h-28 sm:w-24 sm:h-32 bg-neutral-100 rounded-sm overflow-hidden shrink-0 border border-neutral-200"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </Link>

                {/* Item Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          {item.product.brand}
                        </span>
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-xs sm:text-sm font-semibold text-neutral-900 hover:underline line-clamp-1 block"
                        >
                          {item.product.name}
                        </Link>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Size and Color tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-neutral-600">
                      <span className="bg-neutral-100 px-2 py-0.5 rounded font-medium">
                        Size: <strong className="text-neutral-900">{item.selectedSize}</strong>
                      </span>
                      <span className="bg-neutral-100 px-2 py-0.5 rounded font-medium flex items-center space-x-1">
                        <span>Color:</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-neutral-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-neutral-900 font-medium">
                          {item.selectedColor.name}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Pricing Bottom Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-neutral-100 mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border border-neutral-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-neutral-900 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="text-xs text-neutral-500 hover:text-neutral-900 underline font-medium ml-2"
                      >
                        Move to Wishlist
                      </button>
                    </div>

                    {/* Pricing */}
                    <div className="text-right">
                      <div className="text-sm font-bold text-neutral-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-neutral-400 line-through">
                        ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Price Summary & Coupons (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Coupon Box */}
            <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-subtle">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                <Tag className="w-4 h-4 text-neutral-700" />
                <span>Apply Promotional Coupon</span>
              </div>

              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                      '{appliedCoupon}' Applied
                    </span>
                    <p className="text-[11px] text-emerald-600">
                      Savings of ₹{couponDiscountAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-emerald-700 hover:text-red-600 transition-colors"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter code (e.g. MALL10)"
                      value={couponInput}
                      onChange={e => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError(null);
                      }}
                      className="flex-1 px-3 py-2 text-xs uppercase font-mono tracking-wider border border-neutral-300 rounded-l focus:outline-none focus:border-neutral-950"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase rounded-r transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-xs text-red-600 font-medium">{couponError}</p>
                  )}

                  {/* Suggestion pill */}
                  <div className="flex items-center space-x-1 text-[11px] text-neutral-500 pt-1">
                    <span>Try code:</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon('MALL10')}
                      className="font-bold text-neutral-900 underline hover:text-emerald-700"
                    >
                      MALL10
                    </button>
                    <span>(10% off) or</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon('MALL20')}
                      className="font-bold text-neutral-900 underline hover:text-emerald-700"
                    >
                      MALL20
                    </button>
                    <span>(20% off)</span>
                  </div>
                </form>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-subtle space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                Order Price Breakdown
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Total MRP</span>
                  <span className="font-mono">₹{totalMrp.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount on MRP</span>
                  <span className="font-mono">
                    -₹{(totalMrp - (finalTotal + couponDiscountAmount - deliveryFee)).toLocaleString('en-IN')}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span className="font-mono">-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Charges</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase">Free</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline text-sm font-bold text-neutral-950">
                  <span>Total Amount</span>
                  <span className="text-base font-black font-mono">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Savings Alert */}
              {totalSavings > 0 && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 text-[11px] font-semibold rounded text-center">
                  You are saving ₹{totalSavings.toLocaleString('en-IN')} on this order!
                </div>
              )}

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Checkout with 256-Bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
