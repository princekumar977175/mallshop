import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Percent } from 'lucide-react';

export const OfferBanners: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <div className="relative overflow-hidden rounded-sm bg-neutral-900 text-white p-8 sm:p-10 flex flex-col justify-between min-h-[260px] border border-neutral-800">
          <div className="relative z-10 max-w-md space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded text-[11px] font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Client Offer</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              Flat 10% Instant Discount
            </h3>
            <p className="text-xs text-neutral-300 font-light">
              Apply code <span className="font-bold text-white uppercase bg-neutral-800 px-1.5 py-0.5 rounded">MALL10</span> at checkout for instant savings across all collections.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <Link
              to="/men"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 border-b border-white pb-1 transition-colors"
            >
              <span>Explore Qualifying Styles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Background decorative typography */}
          <div className="absolute right-0 bottom-0 text-[110px] font-black text-neutral-800/40 select-none pointer-events-none leading-none -mr-4 -mb-4">
            10%
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative overflow-hidden rounded-sm bg-neutral-100 text-neutral-900 p-8 sm:p-10 flex flex-col justify-between min-h-[260px] border border-neutral-200">
          <div className="relative z-10 max-w-md space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-neutral-900 text-white rounded text-[11px] font-bold uppercase tracking-wider">
              <Percent className="w-3.5 h-3.5" />
              <span>Curated Clearance</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              Up To 48% Off Designer Edits
            </h3>
            <p className="text-xs text-neutral-600 font-light">
              End-of-season markdown on Italian footwear, mulberry silk dresses, and French linen shirts.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <Link
              to="/women"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 border-b border-neutral-900 pb-1 transition-colors"
            >
              <span>Shop Discounted Edits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Background decorative typography */}
          <div className="absolute right-0 bottom-0 text-[110px] font-black text-neutral-200 select-none pointer-events-none leading-none -mr-4 -mb-4">
            48%
          </div>
        </div>
      </div>
    </section>
  );
};
