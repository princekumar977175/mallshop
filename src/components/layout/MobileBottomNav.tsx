import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Bag', path: '/cart', icon: ShoppingBag, badge: itemCount },
    { label: 'Account', path: '/account', icon: User }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-2 py-2">
      <div className="grid grid-cols-5 items-center">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 relative text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-black font-bold' : 'text-neutral-500 hover:text-neutral-800'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-0.5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-neutral-900 text-white text-[9px] font-bold rounded-full h-3.5 min-w-[14px] px-1 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
