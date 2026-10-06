import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { CategorySlug } from '../../types';

export const NewArrivals: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | CategorySlug>('all');

  const tabs: { label: string; value: 'all' | CategorySlug }[] = [
    { label: 'ALL DEPARTMENTS', value: 'all' },
    { label: 'MEN', value: 'men' },
    { label: 'WOMEN', value: 'women' },
    { label: 'FOOTWEAR', value: 'footwear' },
    { label: 'BEAUTY', value: 'beauty' }
  ];

  const filtered = PRODUCTS.filter(p => {
    if (selectedTab === 'all') return p.isNewArrival || p.discount >= 40;
    return p.category === selectedTab;
  }).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Just In This Week
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
            New Arrivals
          </h2>
        </div>

        {/* Tab Switchers */}
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                selectedTab === tab.value
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
