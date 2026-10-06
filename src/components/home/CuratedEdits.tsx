import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const CuratedEdits: React.FC = () => {
  const collections = [
    {
      title: 'The Minimalist Capsule',
      subtitle: 'Neutral tones, architectural silhouettes & 100% natural fibers',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      link: '/men?sub=Shirts'
    },
    {
      title: 'Monochrome Modernism',
      subtitle: 'High-contrast black & chalk white tailored styling',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      link: '/women?sub=Trousers'
    },
    {
      title: 'The Weekend Transit',
      subtitle: 'Relaxed linen, full-grain duffles & slip-on loafers',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      link: '/accessories?sub=Bags'
    }
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Editorial Lookbooks
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
            Product Collections
          </h2>
        </div>
        <p className="text-xs text-neutral-500 mt-1 sm:mt-0">
          Hand-curated capsule wardrobes for effortless daily dressing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col, idx) => (
          <Link
            key={idx}
            to={col.link}
            className="group relative block overflow-hidden rounded-sm bg-neutral-100 border border-neutral-200"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={col.image}
                alt={col.title}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 bg-white border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900 group-hover:underline">
                  {col.title}
                </h3>
                <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-1.5 line-clamp-2">
                {col.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
