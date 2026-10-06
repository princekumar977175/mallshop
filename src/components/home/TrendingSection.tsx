import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const TrendingSection: React.FC = () => {
  const trendingProducts = PRODUCTS.filter(p => p.isTrending).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center space-x-1.5 text-amber-600">
            <Flame className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              High Demand
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
            Trending Now
          </h2>
        </div>

        <Link
          to="/men?sort=rating"
          className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 mt-2 sm:mt-0 transition-colors"
        >
          <span>View All Trending</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {trendingProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
