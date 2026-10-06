import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowUpRight, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface SearchBarProps {
  onSelect?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelect, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();

  // Filter products by name, brand, category, subcategory
  const filteredProducts = trimmed
    ? PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.subcategory.toLowerCase().includes(trimmed)
      ).slice(0, 5)
    : [];

  const popularSearches = [
    'Linen shirts',
    'Chelsea boots',
    'Wool blazers',
    'Silk dresses',
    'Supima cotton tee',
    'Minimal sneakers'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    setIsOpen(false);
    if (onSelect) onSelect();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectProduct = (product: Product) => {
    setIsOpen(false);
    setQuery('');
    if (onSelect) onSelect();
    navigate(`/product/${product.id}`);
  };

  const handleSelectPopular = (term: string) => {
    setQuery(term);
    setIsOpen(false);
    if (onSelect) onSelect();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-neutral-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for products, brands and more"
          className="w-full pl-10 pr-9 py-2 text-xs bg-neutral-100 hover:bg-neutral-150 focus:bg-white text-neutral-900 placeholder:text-neutral-500 rounded-sm border border-transparent focus:border-neutral-300 focus:outline-none transition-all duration-150"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 p-0.5 text-neutral-400 hover:text-neutral-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-sm shadow-xl z-50 overflow-hidden animate-in fade-in duration-150">
          {trimmed.length === 0 ? (
            <div className="p-3">
              <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectPopular(term)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full transition-colors flex items-center space-x-1"
                  >
                    <span>{term}</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="divide-y divide-neutral-100">
              <div className="p-2 bg-neutral-50 flex items-center justify-between text-[11px] text-neutral-500 px-3">
                <span>Matching Products</span>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-neutral-900 font-semibold hover:underline"
                >
                  View all for "{query}"
                </button>
              </div>

              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="p-2.5 px-3 hover:bg-neutral-50 cursor-pointer flex items-center space-x-3 transition-colors"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-12 object-cover object-top rounded-sm shrink-0 border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      {product.brand}
                    </p>
                    <p className="text-xs font-medium text-neutral-900 truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-xs font-bold text-neutral-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-neutral-400 line-through">
                        ₹{product.mrp.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-neutral-500">
              <p>No products found for "<span className="font-semibold text-neutral-800">{query}</span>"</p>
              <p className="mt-1 text-[11px]">Try checking spelling or search for "shirt", "boots", "dress"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
