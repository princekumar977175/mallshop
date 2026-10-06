import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product: Product) => {
    const defaultSize = product.sizes[0] || 'Regular';
    const defaultColor = product.colors[0] || { name: 'Standard', hex: '#000000' };
    addToCart(product, defaultSize, defaultColor, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-tight text-neutral-900">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm">
          Save items you love by tapping the heart icon on any product card or details page.
        </p>
        <Link
          to="/"
          className="mt-6 px-8 py-3 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider rounded-none hover:bg-black transition-colors shadow-sm inline-flex items-center space-x-2"
        >
          <span>Discover Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/40 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="pb-6 mb-6 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
              My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Saved items are stored in your session and ready to move to your bag anytime.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col shadow-subtle hover:border-neutral-300 transition-all"
            >
              <Link to={`/product/${product.id}`} className="aspect-[3/4] relative block bg-neutral-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
                <button
                  onClick={e => {
                    e.preventDefault();
                    removeFromWishlist(product.id);
                  }}
                  className="absolute top-2.5 right-2.5 p-2 bg-white/90 text-neutral-500 hover:text-red-600 rounded-full shadow-sm transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </Link>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                    {product.brand}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs font-semibold text-neutral-900 hover:underline line-clamp-1 mt-0.5"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-sm font-bold text-neutral-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-neutral-400 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      {product.discount}% OFF
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-neutral-100 flex flex-col gap-2">
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="w-full py-2.5 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-[11px] text-neutral-500 hover:text-neutral-900 font-medium text-center py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
