import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../../data/products';

export const CategoryBanners: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-neutral-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Departments
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
            Shop By Category
          </h2>
        </div>
        <p className="text-xs text-neutral-500 mt-1 sm:mt-0 max-w-md">
          Explore curated collections across tailored menswear, contemporary womenswear, artisan shoes, and fine beauty.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES_CONFIG.map(cat => (
          <Link
            key={cat.slug}
            to={`/${cat.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100 border border-neutral-200"
          >
            {/* Category Image */}
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />

            {/* Content Bottom */}
            <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col justify-end text-white">
              <span className="text-[10px] text-neutral-300 tracking-wider">
                {cat.itemCount}
              </span>
              <div className="flex items-center justify-between mt-0.5">
                <h3 className="text-sm font-bold tracking-wider uppercase text-white group-hover:underline">
                  {cat.name}
                </h3>
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
