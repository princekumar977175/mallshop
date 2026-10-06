import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  category: string;
  onClose: () => void;
}

const MENU_DATA: Record<
  string,
  {
    sections: { title: string; items: { label: string; href: string }[] }[];
    featured: { title: string; subtitle: string; image: string; href: string };
  }
> = {
  MEN: {
    sections: [
      {
        title: 'Topwear',
        items: [
          { label: 'Linen & Casual Shirts', href: '/men?sub=Shirts' },
          { label: 'Supima T-Shirts & Polos', href: '/men?sub=T-Shirts' },
          { label: 'Tailored Blazers & Coats', href: '/men?sub=Jackets' },
          { label: 'Sweaters & Knitwear', href: '/men?sub=Shirts' }
        ]
      },
      {
        title: 'Bottomwear',
        items: [
          { label: 'Pleated Trousers', href: '/men?sub=Trousers' },
          { label: 'Raw Selvedge Denim', href: '/men?sub=Trousers' },
          { label: 'Tailored Chinos', href: '/men?sub=Trousers' },
          { label: 'Relaxed Joggers', href: '/men?sub=Trousers' }
        ]
      },
      {
        title: 'Footwear & Accs',
        items: [
          { label: 'Italian Leather Boots', href: '/footwear?sub=Boots' },
          { label: 'Minimalist Trainers', href: '/footwear?sub=Sneakers' },
          { label: 'Full Grain Duffel Bags', href: '/accessories?sub=Bags' },
          { label: 'Ceramic Watches', href: '/accessories?sub=Watches' }
        ]
      }
    ],
    featured: {
      title: 'The Contemporary Wardrobe',
      subtitle: 'Effortless linen & unstructured tailoring',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      href: '/men'
    }
  },
  WOMEN: {
    sections: [
      {
        title: 'Western Wear',
        items: [
          { label: 'Pleated Silk Midi Dresses', href: '/women?sub=Dresses' },
          { label: 'Boyfriend Poplin Shirts', href: '/women?sub=Shirts' },
          { label: 'Tailored Wool Coats', href: '/women?sub=Jackets' },
          { label: 'Cashmere-Touch Knits', href: '/women?sub=Jackets' }
        ]
      },
      {
        title: 'Bottomwear',
        items: [
          { label: 'High-Waist Wide Leg Pants', href: '/women?sub=Trousers' },
          { label: 'Vintage Slim Jeans', href: '/women?sub=Trousers' },
          { label: 'Linen Wrap Midi Skirts', href: '/women?sub=Dresses' }
        ]
      },
      {
        title: 'Footwear & Accs',
        items: [
          { label: 'Architectural Mule Loafers', href: '/footwear?sub=Loafers' },
          { label: 'Structured Saddle Bags', href: '/accessories?sub=Bags' },
          { label: 'Polarized Acetate Eyewear', href: '/accessories?sub=Eyewear' }
        ]
      }
    ],
    featured: {
      title: 'Monochrome Elegance',
      subtitle: 'Pure mulberry silk & fluid cuts',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
      href: '/women'
    }
  },
  FOOTWEAR: {
    sections: [
      {
        title: "Men's Footwear",
        items: [
          { label: 'Calf Leather Chelsea Boots', href: '/footwear?sub=Boots' },
          { label: 'Minimal Leather Sneakers', href: '/footwear?sub=Sneakers' },
          { label: 'Blake Stitched Loafers', href: '/footwear?sub=Loafers' }
        ]
      },
      {
        title: "Women's Footwear",
        items: [
          { label: 'Pointed Mule Loafers', href: '/footwear?sub=Loafers' },
          { label: 'Anatomical Suede Slides', href: '/footwear?sub=Sandals' },
          { label: 'Featherlight Carbon Runners', href: '/footwear?sub=Sneakers' }
        ]
      },
      {
        title: 'Care & Accessories',
        items: [
          { label: 'Organic Beeswax Balm', href: '/footwear' },
          { label: 'Cedar Shoe Trees', href: '/footwear' },
          { label: 'Waterproof Protector', href: '/footwear' }
        ]
      }
    ],
    featured: {
      title: 'Artisan Sole Studio',
      subtitle: 'Hand-sewn Margom & Goodyear craftsmanship',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
      href: '/footwear'
    }
  },
  BEAUTY: {
    sections: [
      {
        title: 'Fragrances',
        items: [
          { label: 'Santal & Smoked Amber EDP', href: '/beauty?sub=Fragrances' },
          { label: 'Bergamot & Citrus Mist', href: '/beauty?sub=Fragrances' },
          { label: 'French Extrait Perfumes', href: '/beauty?sub=Fragrances' }
        ]
      },
      {
        title: 'Skincare',
        items: [
          { label: 'Cold-Pressed Renewal Elixir', href: '/beauty?sub=Skincare' },
          { label: 'Bakuchiol Smoothing Oil', href: '/beauty?sub=Skincare' },
          { label: 'Botanical Body Cleanser', href: '/beauty?sub=Bath+%26+Body' }
        ]
      },
      {
        title: 'Color Cosmetics',
        items: [
          { label: 'Velvet Matte Lip Elixirs', href: '/beauty?sub=Makeup' },
          { label: 'Hydrating Tinted Balms', href: '/beauty?sub=Makeup' }
        ]
      }
    ],
    featured: {
      title: 'Aura Botanicals',
      subtitle: 'Pure plant-derived actives & niche perfumery',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
      href: '/beauty'
    }
  },
  KIDS: {
    sections: [
      {
        title: 'Boys & Girls',
        items: [
          { label: 'Organic Breton Stripe Tees', href: '/kids?sub=T-Shirts' },
          { label: 'Corduroy Sherpa Jackets', href: '/kids?sub=Jackets' },
          { label: 'Stretch Chino Joggers', href: '/kids?sub=Trousers' },
          { label: 'Daisy Embroidered Sundresses', href: '/kids?sub=Dresses' }
        ]
      },
      {
        title: 'Ages',
        items: [
          { label: 'Toddlers (2-4 Years)', href: '/kids' },
          { label: 'Juniors (5-8 Years)', href: '/kids' },
          { label: 'Pre-Teens (9-13 Years)', href: '/kids' }
        ]
      },
      {
        title: 'Essentials',
        items: [
          { label: 'Playground Essentials', href: '/kids' },
          { label: 'Organic Cotton Sets', href: '/kids' }
        ]
      }
    ],
    featured: {
      title: 'Pure Organic Kids',
      subtitle: 'Soft on skin, certified durable fabrics',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
      href: '/kids'
    }
  },
  ACCESSORIES: {
    sections: [
      {
        title: 'Leather Goods',
        items: [
          { label: 'Pebble Leather Weekender Duffles', href: '/accessories?sub=Bags' },
          { label: 'Structured Saddle Bags', href: '/accessories?sub=Bags' },
          { label: 'Italian Reversible Belts', href: '/accessories?sub=Belts' }
        ]
      },
      {
        title: 'Horology & Eyewear',
        items: [
          { label: 'Automatic Ceramic Watches', href: '/accessories?sub=Watches' },
          { label: 'Polarized Acetate Sunglasses', href: '/accessories?sub=Eyewear' }
        ]
      },
      {
        title: 'Small Essentials',
        items: [
          { label: 'Bifold Card Wallets', href: '/accessories' },
          { label: 'Silk Pocket Squares', href: '/accessories' }
        ]
      }
    ],
    featured: {
      title: 'Artisan Accessories',
      subtitle: 'Built for longevity and modern travel',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
      href: '/accessories'
    }
  }
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const data = MENU_DATA[category];
  if (!data) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-t border-b border-neutral-200 shadow-xl py-8 px-8 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Navigation Columns */}
        <div className="col-span-8 grid grid-cols-3 gap-6">
          {data.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase border-b border-neutral-100 pb-2">
                {sec.title}
              </h4>
              <ul className="space-y-2">
                {sec.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="text-xs text-neutral-600 hover:text-neutral-950 hover:font-medium transition-colors block py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Card */}
        <div className="col-span-4 border-l border-neutral-100 pl-8">
          <Link
            to={data.featured.href}
            onClick={onClose}
            className="group block relative overflow-hidden rounded-sm bg-neutral-100"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={data.featured.image}
                alt={data.featured.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 bg-neutral-50 border-t border-neutral-200">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">
                Curated Collection
              </span>
              <h5 className="text-sm font-semibold text-neutral-900 mt-0.5 group-hover:underline">
                {data.featured.title}
              </h5>
              <p className="text-xs text-neutral-600 mt-1 line-clamp-1">{data.featured.subtitle}</p>
              <div className="inline-flex items-center text-xs font-medium text-neutral-900 mt-2">
                Explore Edit <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
