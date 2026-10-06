import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { RatingStars } from './RatingStars';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const hasSecondaryImage = product.images.length > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Use first available size and color
    const defaultSize = product.sizes[0] || 'Regular';
    const defaultColor = product.colors[0] || { name: 'Standard', hex: '#000000' };
    addToCart(product, defaultSize, defaultColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white border border-neutral-200/80 hover:border-neutral-300 transition-all duration-200 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container (Aspect Ratio 3:4) */}
      <Link to={`/product/${product.id}`} className="relative block aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <img
          src={isHovered && hasSecondaryImage ? product.images[1] : product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Save to Wishlist"
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorited
              ? 'bg-red-50 text-red-600 shadow-sm'
              : 'bg-white/85 text-neutral-600 hover:text-red-500 hover:bg-white shadow-subtle'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neutral-900 text-white rounded-none">
              New
            </span>
          )}
          {product.discount >= 45 && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white rounded-none">
              Deal
            </span>
          )}
        </div>

        {/* Desktop Quick Add To Bag overlay on hover */}
        <div className="hidden sm:block absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-none text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md transition-all ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Details Section */}
      <div className="p-3.5 flex flex-col flex-1 bg-white">
        {/* Brand & Rating Row */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 truncate max-w-[65%]">
            {product.brand}
          </span>
          <RatingStars rating={product.rating} count={product.reviewsCount} size="sm" />
        </div>

        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          className="text-xs font-medium text-neutral-900 hover:text-neutral-600 transition-colors line-clamp-1 mb-2"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Pricing */}
        <div className="mt-auto pt-1 flex items-baseline space-x-2">
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

        {/* Mobile Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className={`sm:hidden mt-3 w-full py-2 text-xs font-semibold uppercase tracking-wider border rounded-none flex items-center justify-center space-x-1 transition-colors ${
            justAdded
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3 h-3" />
          <span>{justAdded ? 'Added' : 'Add to Bag'}</span>
        </button>
      </div>
    </div>
  );
};
