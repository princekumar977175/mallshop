import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X, ChevronRight, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES_CONFIG } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { CategorySlug, Product } from '../types';

interface ProductListingPageProps {
  categorySlug?: CategorySlug;
}

export const ProductListingPage: React.FC<ProductListingPageProps> = ({ categorySlug }) => {
  const location = useLocation();

  // If categorySlug not passed directly, infer from pathname (e.g. /men -> 'men')
  const activeCategory: CategorySlug = useMemo(() => {
    if (categorySlug) return categorySlug;
    const pathPart = location.pathname.replace(/^\//, '').toLowerCase();
    const match = ['men', 'women', 'kids', 'beauty', 'footwear', 'accessories'].find(
      c => c === pathPart
    );
    return (match as CategorySlug) || 'men';
  }, [categorySlug, location.pathname]);

  const categoryMeta = useMemo(() => {
    return (
      CATEGORIES_CONFIG.find(c => c.slug === activeCategory) || {
        slug: activeCategory,
        name: activeCategory.toUpperCase(),
        title: `${activeCategory.toUpperCase()} Collection`,
        tagline: 'Curated fashion and timeless essentials'
      }
    );
  }, [activeCategory]);

  // Read URL query params for initial subcategory or sort
  const searchParams = new URLSearchParams(location.search);
  const initialSubcategory = searchParams.get('sub');

  // Filter States
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    initialSubcategory ? [initialSubcategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync when URL query changes
  useEffect(() => {
    const sub = searchParams.get('sub');
    if (sub) {
      setSelectedSubcategories([sub]);
    }
  }, [location.search]);

  // Extract available filter values for current category
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const availableSubcategories = useMemo(() => {
    return Array.from(new Set(categoryProducts.map(p => p.subcategory)));
  }, [categoryProducts]);

  const availableBrands = useMemo(() => {
    return Array.from(new Set(categoryProducts.map(p => p.brand)));
  }, [categoryProducts]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    categoryProducts.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes);
  }, [categoryProducts]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter(p => {
        if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(p.subcategory)) {
          return false;
        }
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }
        if (p.price > maxPrice) {
          return false;
        }
        if (minDiscount > 0 && p.discount < minDiscount) {
          return false;
        }
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        if (selectedSizes.length > 0 && !p.sizes.some(s => selectedSizes.includes(s))) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'discount') return b.discount - a.discount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // recommended
      });
  }, [categoryProducts, selectedSubcategories, selectedBrands, maxPrice, minDiscount, minRating, selectedSizes, sortBy]);

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleSize = (sz: string) => {
    setSelectedSizes(prev =>
      prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]
    );
  };

  const clearAllFilters = () => {
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setMaxPrice(10000);
    setMinDiscount(0);
    setMinRating(0);
    setSelectedSizes([]);
  };

  const activeFiltersCount =
    selectedSubcategories.length +
    selectedBrands.length +
    (maxPrice < 10000 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedSizes.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Category Banner / Breadcrumbs Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-1.5 text-xs text-neutral-500 mb-2">
            <Link to="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-neutral-900 uppercase">{activeCategory}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900">
                {categoryMeta.title}
              </h1>
              <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                {categoryMeta.tagline}
              </p>
            </div>
            <div className="text-xs text-neutral-500 font-medium">
              Showing <span className="font-bold text-neutral-900">{filteredProducts.length}</span> of {categoryProducts.length} products
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Control Bar for Mobile & Desktop Sort */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 border border-neutral-300 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-2 text-neutral-900 hover:bg-neutral-50"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Active Filter Chips */}
          <div className="hidden lg:flex flex-wrap items-center gap-2 flex-1 mr-4">
            {selectedSubcategories.map(s => (
              <span
                key={s}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded text-xs"
              >
                <span>{s}</span>
                <button onClick={() => toggleSubcategory(s)}>
                  <X className="w-3 h-3 text-neutral-500 hover:text-neutral-900" />
                </button>
              </span>
            ))}
            {selectedBrands.map(b => (
              <span
                key={b}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded text-xs"
              >
                <span>{b}</span>
                <button onClick={() => toggleBrand(b)}>
                  <X className="w-3 h-3 text-neutral-500 hover:text-neutral-900" />
                </button>
              </span>
            ))}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-neutral-500 hover:text-neutral-900 font-semibold underline ml-2"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-xs text-neutral-500 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-900"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 pr-4 border-r border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Filters
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-neutral-500 hover:text-neutral-900 font-semibold uppercase"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Subcategories */}
            {availableSubcategories.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                  Subcategory
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {availableSubcategories.map(sub => (
                    <label
                      key={sub}
                      className="flex items-center space-x-2 text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(sub)}
                        onChange={() => toggleSubcategory(sub)}
                        className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
                      />
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            {availableBrands.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                  Brand Atelier
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {availableBrands.map(brand => (
                    <label
                      key={brand}
                      className="flex items-center space-x-2 text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div className="space-y-2 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between text-xs">
                <h4 className="font-semibold uppercase tracking-wider text-neutral-800">
                  Max Price
                </h4>
                <span className="font-bold text-neutral-900">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-neutral-900"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>₹500</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Minimum Discount */}
            <div className="space-y-2 pt-4 border-t border-neutral-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                Discount
              </h4>
              <div className="space-y-1.5">
                {[
                  { label: 'All Discounts', value: 0 },
                  { label: '30% or more', value: 30 },
                  { label: '40% or more', value: 40 },
                  { label: '45% or more', value: 45 }
                ].map(opt => (
                  <label
                    key={opt.value}
                    className="flex items-center space-x-2 text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="discount"
                      checked={minDiscount === opt.value}
                      onChange={() => setMinDiscount(opt.value)}
                      className="border-neutral-300 text-neutral-900 focus:ring-0"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                  Sizes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {availableSizes.map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSize(sz)}
                      className={`px-2.5 py-1 text-xs border rounded-sm transition-colors ${
                        selectedSizes.includes(sz)
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-neutral-50 rounded border border-neutral-200 p-8">
                <p className="text-base font-bold text-neutral-800">
                  No products matched your active filters
                </p>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  Try broadening your price range or resetting the subcategory filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-5 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-none hover:bg-black transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Filter Products
              </h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
              {/* Subcategories */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-neutral-800 mb-2">
                  Subcategory
                </h4>
                <div className="space-y-2">
                  {availableSubcategories.map(sub => (
                    <label key={sub} className="flex items-center space-x-2 text-neutral-700">
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(sub)}
                        onChange={() => toggleSubcategory(sub)}
                        className="rounded border-neutral-300 text-neutral-900"
                      />
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="pt-3 border-t border-neutral-200">
                <h4 className="font-bold uppercase tracking-wider text-neutral-800 mb-2">
                  Brand
                </h4>
                <div className="space-y-2">
                  {availableBrands.map(brand => (
                    <label key={brand} className="flex items-center space-x-2 text-neutral-700">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-neutral-300 text-neutral-900"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div className="pt-3 border-t border-neutral-200">
                <div className="flex justify-between font-bold mb-1">
                  <span>Max Price:</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-neutral-900"
                />
              </div>
            </div>

            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex space-x-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider border border-neutral-300 rounded text-neutral-800 hover:bg-neutral-100"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white rounded hover:bg-black"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
