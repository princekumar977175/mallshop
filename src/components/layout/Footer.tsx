import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Clock, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800 pt-16 pb-20 lg:pb-12">
      {/* Trust Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-neutral-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-300">
          <div className="flex items-start space-x-3.5">
            <Truck className="w-6 h-6 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Live Hyperlocal Tracking
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1">
                Real-time GPS partner tracking right to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <RotateCcw className="w-6 h-6 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                15-Day Easy Returns
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1">
                Complimentary doorstep pickup & instant refunds.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <ShieldCheck className="w-6 h-6 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                100% Authentic Originals
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1">
                Sourced directly from verified brands and artisan studios.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <Clock className="w-6 h-6 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Concierge Support
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1">
                Toll-free 1800-200-MALL available 7 days a week.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Intro & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-black text-2xl tracking-widest text-white">MALL</span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              MALL is an elevated fashion e-commerce marketplace delivering modern silhouettes,
              artisan craft, and live real-time delivery tracking across India.
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Join The MALL Edit
              </p>
              <p className="text-[11px] text-neutral-400 mb-3">
                Receive curated runway lookbooks, seasonal drop alerts, and exclusive preview access.
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 rounded-l focus:outline-none focus:border-neutral-400 flex-1"
                />
                <button
                  type="submit"
                  className="bg-white text-black hover:bg-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-r flex items-center transition-colors"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-600" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-1.5">
                  Welcome to MALL. You have been added to our private list.
                </p>
              )}
            </div>
          </div>

          {/* SHOP Column */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-widest">Shop</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/men" className="hover:text-white transition-colors">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-white transition-colors">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link to="/footwear" className="hover:text-white transition-colors">
                  Artisan Footwear
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-white transition-colors">
                  Bags & Watches
                </Link>
              </li>
              <li>
                <Link to="/beauty" className="hover:text-white transition-colors">
                  Fragrance & Skincare
                </Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-white transition-colors">
                  Kids Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP Column */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-widest">Help & Care</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  Order Status
                </Link>
              </li>
              <li>
                <Link to="/track-order/MALL10245" className="hover:text-emerald-400 font-medium transition-colors">
                  Live Delivery Map
                </Link>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">
                  Shipping & Timelines
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">
                  Doorstep Returns Policy
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="mailto:support@mall.internal" className="hover:text-white transition-colors">
                  support@mall.internal
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY & LEGAL */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-widest">Company</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About MALL
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-white transition-colors">
                  Sustainable Materials
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">
                  Careers & Studio
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer with Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-[11px] gap-4">
        <div>
          © 2026 MALL Technologies Private Limited. All rights reserved. Designed for client presentation.
        </div>
        <div className="flex items-center space-x-3 text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
            UPI / GPay
          </span>
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
            Visa
          </span>
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
            Mastercard
          </span>
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
            RuPay
          </span>
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
            COD
          </span>
        </div>
      </div>
    </footer>
  );
};
