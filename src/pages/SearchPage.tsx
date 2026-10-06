import React, { useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { Product, CategorySlug } from '../types';

export const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const matchingProducts: Product[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;

    return PRODUCTS.filter((p: Product) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchSubcategory = p.subcategory.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchMaterial = p.material.toLowerCase().includes(q);

      // Support common search terms like "shoes", "shirt", "boots"
      const matchSynonyms =
        (q.includes('shoe') && (p.category === 'footwear' || p.subcategory === 'Sneakers' || p.subcategory === 'Boots' || p.subcategory === 'Loafers')) ||
        (q.includes('shirt') && p.subcategory === 'Shirts') ||
        (q.includes('pant') && p.subcategory === 'Trousers') ||
        (q.includes('perfume') && p.subcategory === 'Fragrances') ||
        (q.includes('dress') && p.subcategory === 'Dresses');

      return matchName || matchBrand || matchCategory || matchSubcategory || matchDesc || matchMaterial || matchSynonyms;
    });
  }, [query]);

  const filteredProducts: Product[] = useMemo(() => {
    return matchingProducts
      .filter((p: Product) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        return true;
      })
      .sort((a: Product, b: Product) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [matchingProducts, selectedCategory, sortBy]);

  const categoriesAvailable: CategorySlug[] = Array.from(new Set(matchingProducts.map((p: Product) => p.category)));

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header Banner */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-1.5 text-xs text-neutral-500 mb-3">
            <Link to="/" className="hover:text-neutral-900">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-neutral-900">Search Results</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-tight">
                {query ? `Results for "${query}"` : 'All Products'}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Found {filteredProducts.length} matching styles across departments
              </p>
            </div>

            {/* In-page Searchbar */}
            <div className="w-full sm:w-80">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Results & Filter Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter / Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-neutral-200">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-neutral-700 mr-1 uppercase text-[11px]">Filter Category:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase ${
                selectedCategory === 'all'
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All ({matchingProducts.length})
            </button>
            {categoriesAvailable.map((cat: CategorySlug) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-semibold uppercase ${
                  selectedCategory === cat
                    ? 'bg-neutral-950 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-neutral-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-900"
            >
              <option value="featured">Best Matches</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-neutral-50 rounded border border-neutral-200 p-8">
            <Search className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900 uppercase">
              No matching products found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              We couldn't find any products matching "{query}". Try checking the spelling or searching for popular terms like "shoes", "shirts", "blazer", or "perfume".
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Linen Shirt', 'Chelsea Boots', 'Wool Coat', 'Sneakers', 'Silk Dress'].map(term => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold rounded hover:bg-neutral-100"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
