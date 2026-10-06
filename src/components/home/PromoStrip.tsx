import React from 'react';
import { Tag, Truck, Sparkles, RefreshCw } from 'lucide-react';

export const PromoStrip: React.FC = () => {
  const promos = [
    {
      icon: Tag,
      title: '10% INSTANT DISCOUNT',
      subtitle: 'Use promo code MALL10 at checkout'
    },
    {
      icon: Truck,
      title: 'FREE EXPRESS SHIPPING',
      subtitle: 'On all orders above ₹999 across India'
    },
    {
      icon: Sparkles,
      title: 'EXTRA 20% OFF',
      subtitle: 'On your very first order with MALL20'
    },
    {
      icon: RefreshCw,
      title: '15-DAY EASY RETURNS',
      subtitle: 'Doorstep exchange & instant account refunds'
    }
  ];

  return (
    <section className="bg-neutral-100 border-b border-neutral-200 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          {promos.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 ${
                  idx > 0 ? 'pt-3 md:pt-0 md:pl-6' : ''
                }`}
              >
                <div className="p-2 bg-white rounded-sm border border-neutral-200 text-neutral-800 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 tracking-wider uppercase truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
