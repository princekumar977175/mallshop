import React from 'react';
import { Link } from 'react-router-dom';
import { BRANDS_LIST } from '../../data/products';
import { Sparkles } from 'lucide-react';

export const TopBrands: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
          Partner Studios
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
          Featured Atelier & Brands
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          Directly partner with world-renowned design houses and independent studios.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {BRANDS_LIST.map((brand, i) => (
          <Link
            key={i}
            to={`/search?q=${encodeURIComponent(brand.name)}`}
            className="group p-5 bg-neutral-50 hover:bg-white border border-neutral-200 rounded-sm text-center transition-all duration-200 hover:shadow-subtle hover:border-neutral-400 flex flex-col items-center justify-center min-h-[110px]"
          >
            <h4 className="text-sm font-black tracking-widest text-neutral-900 uppercase group-hover:text-black">
              {brand.name}
            </h4>
            <span className="text-[10px] font-semibold tracking-wider text-neutral-400 mt-1 uppercase">
              {brand.origin}
            </span>
            <span className="text-[11px] text-neutral-500 mt-1">
              {brand.tag}
            </span>
          </Link>
        ))}

        <div className="p-5 bg-neutral-900 text-white rounded-sm text-center flex flex-col items-center justify-center min-h-[110px]">
          <Sparkles className="w-4 h-4 text-amber-400 mb-1" />
          <h4 className="text-xs font-bold uppercase tracking-wider">
            100% Certified
          </h4>
          <span className="text-[10px] text-neutral-400 mt-0.5">
            Verified Authenticity
          </span>
        </div>
      </div>
    </section>
  );
};
