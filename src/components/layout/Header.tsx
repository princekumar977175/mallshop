import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  PhoneCall,
  Package,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { MegaMenu } from './MegaMenu';
import { SearchBar } from '../common/SearchBar';

export const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
  }, [location]);

  const navCategories = [
    { label: 'MEN', path: '/men', hasMega: true },
    { label: 'WOMEN', path: '/women', hasMega: true },
    { label: 'KIDS', path: '/kids', hasMega: true },
    { label: 'BEAUTY', path: '/beauty', hasMega: true },
    { label: 'FOOTWEAR', path: '/footwear', hasMega: true },
    { label: 'ACCESSORIES', path: '/accessories', hasMega: true },
    { label: 'NEW ARRIVALS', path: '/men?sort=newest', hasMega: false }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white transition-shadow duration-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span>
              Express Delivery Across India • Use Code{' '}
              <span className="font-semibold text-white bg-neutral-800 px-1.5 py-0.5 rounded tracking-wide">
                MALL10
              </span>{' '}
              for 10% Off
            </span>
            <span className="text-neutral-500">|</span>
            <Link
              to="/track-order/MALL10245"
              className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center space-x-1"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Delivery Tracking Available</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 text-neutral-400">
            <Link to="/orders" className="hover:text-white transition-colors flex items-center space-x-1">
              <Package className="w-3 h-3" />
              <span>Track Orders</span>
            </Link>
            <span>•</span>
            <a href="tel:18002006255" className="hover:text-white transition-colors flex items-center space-x-1">
              <PhoneCall className="w-3 h-3" />
              <span>Customer Care: 1800-200-MALL</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`border-b border-neutral-200 bg-white/95 backdrop-blur-md transition-all ${
          isScrolled ? 'shadow-subtle py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Menu Button + Brand Wordmark */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-neutral-700 hover:text-neutral-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* MALL Wordmark Logo */}
            <Link to="/" className="flex flex-col group focus:outline-none">
              <span className="font-black text-2xl sm:text-3xl tracking-widest text-neutral-950 font-sans group-hover:opacity-90 transition-opacity">
                MALL
              </span>
              <span className="text-[8px] font-semibold tracking-widestx uppercase text-neutral-500 -mt-1 hidden sm:block">
                Fashion • Lifestyle • Delivered
              </span>
            </Link>
          </div>

          {/* Desktop Center Category Links */}
          <nav className="hidden lg:flex items-center space-x-7 h-full">
            {navCategories.map(cat => (
              <div
                key={cat.label}
                className="relative py-2"
                onMouseEnter={() => cat.hasMega && setActiveMegaMenu(cat.label)}
              >
                <NavLink
                  to={cat.path}
                  className={({ isActive }) =>
                    `text-xs font-bold tracking-widest text-neutral-800 hover:text-neutral-950 transition-colors py-2 flex items-center space-x-1 ${
                      isActive ? 'text-black border-b-2 border-black' : ''
                    }`
                  }
                >
                  <span>{cat.label}</span>
                  {cat.hasMega && <ChevronDown className="w-3 h-3 text-neutral-400" />}
                </NavLink>
              </div>
            ))}
          </nav>

          {/* Right Actions: Search + User + Wishlist + Bag */}
          <div className="flex items-center space-x-3 sm:space-x-5 flex-1 justify-end max-w-md lg:max-w-none">
            {/* Search Bar */}
            <div className="w-48 sm:w-64 lg:w-72">
              <SearchBar />
            </div>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors flex items-center space-x-1"
                aria-label="Account Menu"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline text-xs font-semibold">Account</span>
              </button>

              {accountMenuOpen && (
                <div
                  onMouseLeave={() => setAccountMenuOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 shadow-xl rounded-sm py-2 z-50 animate-in fade-in duration-150 text-xs"
                >
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="font-bold text-neutral-900">Welcome to MALL</p>
                    <p className="text-[11px] text-neutral-500">Aditya Sharma</p>
                  </div>
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 font-medium"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 font-medium"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/track-order/MALL10245"
                    className="block px-4 py-2 hover:bg-neutral-50 text-emerald-700 font-medium flex items-center justify-between"
                  >
                    <span>Track Live Order</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 font-medium"
                  >
                    Wishlist ({wishlistCount})
                  </Link>
                  <div className="border-t border-neutral-100 my-1"></div>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  >
                    Saved Addresses & Cards
                  </Link>
                  <button
                    onClick={() => setAccountMenuOpen(false)}
                    className="w-full text-left px-4 py-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Bag / Cart */}
            <Link
              to="/cart"
              className="relative p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors flex items-center space-x-1"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="hidden xl:inline text-xs font-semibold">Bag</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {activeMegaMenu && (
        <MegaMenu category={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navCategories.map(cat => (
              <NavLink
                key={cat.label}
                to={cat.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-100 rounded"
              >
                {cat.label}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-neutral-100 pt-3 space-y-2 text-xs">
            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 py-2 px-3 text-neutral-700 hover:bg-neutral-50 rounded"
            >
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </Link>
            <Link
              to="/track-order/MALL10245"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 py-2 px-3 text-emerald-700 font-semibold bg-emerald-50 rounded"
            >
              <MapPin className="w-4 h-4" />
              <span>Track Live Delivery (#MALL10245)</span>
            </Link>
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 py-2 px-3 text-neutral-700 hover:bg-neutral-50 rounded"
            >
              <User className="w-4 h-4" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
