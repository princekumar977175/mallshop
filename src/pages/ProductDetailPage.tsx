import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Zap,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ChevronRight,
  MapPin,
  Star
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { RatingStars } from '../components/common/RatingStars';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find(p => p.id === id);

  // Fallback to first product if id not found
  const activeProduct: Product = product || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    activeProduct.colors[0] || { name: 'Standard', hex: '#000000' }
  );
  const [selectedSize, setSelectedSize] = useState<string>(activeProduct.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Delivery Pincode Checker
  const [pincode, setPincode] = useState('560038');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Active accordion tab
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'care' | 'delivery'>('desc');

  // Sync state when product id changes
  useEffect(() => {
    setActiveImageIndex(0);
    if (activeProduct.colors.length > 0) setSelectedColor(activeProduct.colors[0]);
    if (activeProduct.sizes.length > 0) setSelectedSize(activeProduct.sizes[0]);
    setSizeError(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, activeProduct]);

  const isFavorited = isInWishlist(activeProduct.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(activeProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(activeProduct, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setPincodeChecked(true);
    }
  };

  const similarProducts = PRODUCTS.filter(
    p => p.category === activeProduct.category && p.id !== activeProduct.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs Navigation */}
      <div className="border-b border-neutral-200 bg-neutral-50/50 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-1.5 text-xs text-neutral-500">
          <Link to="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link
            to={`/${activeProduct.category}`}
            className="hover:text-neutral-900 uppercase transition-colors"
          >
            {activeProduct.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-400 uppercase">{activeProduct.subcategory}</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 hidden sm:inline" />
          <span className="font-semibold text-neutral-900 truncate max-w-xs hidden sm:inline">
            {activeProduct.name}
          </span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Product Image Gallery (Col 7) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[640px] shrink-0 no-scrollbar">
              {activeProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-neutral-950 ring-1 ring-neutral-950'
                      : 'border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="flex-1 relative aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200 max-h-[680px]">
              <img
                src={activeProduct.images[activeImageIndex] || activeProduct.images[0]}
                alt={activeProduct.name}
                className="w-full h-full object-cover object-top"
              />

              {/* Wishlist Heart on PDP */}
              <button
                onClick={() => toggleWishlist(activeProduct)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isFavorited
                    ? 'bg-red-50 text-red-600'
                    : 'bg-white/90 text-neutral-700 hover:text-red-500 hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Information & CTAs (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Brand & Title */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                {activeProduct.brand}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-1 leading-snug">
                {activeProduct.name}
              </h1>

              {/* Rating & Review Count */}
              <div className="flex items-center space-x-3 mt-2.5">
                <RatingStars
                  rating={activeProduct.rating}
                  count={activeProduct.reviewsCount}
                  size="md"
                />
                <span className="text-xs text-neutral-400">|</span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  In Stock & Verified
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 bg-neutral-50 rounded-sm border border-neutral-200/80 space-y-1">
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                  ₹{activeProduct.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-neutral-400 line-through">
                  ₹{activeProduct.mrp.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  {activeProduct.discount}% OFF
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Inclusive of all taxes • Instant 10% discount available with coupon <span className="font-semibold text-neutral-900">MALL10</span>
              </p>
            </div>

            {/* Color Selector */}
            {activeProduct.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-neutral-800">
                    Selected Color:
                  </span>
                  <span className="text-neutral-600 font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {activeProduct.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`w-7 h-7 rounded-full border-2 transition-all relative ${
                        selectedColor.name === col.name
                          ? 'border-neutral-950 ring-2 ring-neutral-400 scale-110'
                          : 'border-neutral-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-neutral-800">
                  Select Size
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-neutral-600 hover:text-neutral-950 font-medium underline inline-flex items-center space-x-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeProduct.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`min-w-[48px] h-10 px-3 text-xs font-bold uppercase rounded-none border transition-all ${
                      selectedSize === size
                        ? 'bg-neutral-950 text-white border-neutral-950'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {sizeError && (
                <p className="text-xs text-red-600 font-medium animate-shake">
                  Please select a size to proceed
                </p>
              )}
            </div>

            {/* Action Buttons: ADD TO BAG, BUY NOW, WISHLIST */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-4 bg-white border-2 border-neutral-950 text-neutral-950 hover:bg-neutral-900 hover:text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Buy Now</span>
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(activeProduct)}
                className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-none border transition-colors flex items-center justify-center space-x-2 ${
                  isFavorited
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
                <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Pincode & Delivery Availability Checker */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                <MapPin className="w-4 h-4 text-neutral-600" />
                <span>Delivery Options</span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-l focus:outline-none focus:border-neutral-950"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase rounded-r hover:bg-black transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeChecked && (
                <div className="space-y-2 text-xs text-neutral-600 pt-1">
                  <div className="flex items-center space-x-2 text-emerald-800 font-medium">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Express Delivery by Tomorrow, 5:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-700">
                    <ShieldCheck className="w-4 h-4 text-neutral-500" />
                    <span>Cash on Delivery available on this item</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-700">
                    <RotateCcw className="w-4 h-4 text-neutral-500" />
                    <span>15-day complimentary doorstep return & exchange</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Specifications, Material & Care, Delivery */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <div className="flex border-b border-neutral-200 space-x-8 overflow-x-auto no-scrollbar">
            {[
              { id: 'desc', label: 'Product Details' },
              { id: 'specs', label: 'Specifications' },
              { id: 'care', label: 'Material & Care' },
              { id: 'delivery', label: 'Shipping & Returns' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-neutral-950 text-neutral-950'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 max-w-3xl text-xs sm:text-sm text-neutral-700 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>{activeProduct.description}</p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
                    <span className="font-semibold text-neutral-900 block mb-0.5">Primary Fabric</span>
                    <span className="text-neutral-600">{activeProduct.material}</span>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
                    <span className="font-semibold text-neutral-900 block mb-0.5">Style Code</span>
                    <span className="text-neutral-600 font-mono">{activeProduct.id.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="border border-neutral-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-neutral-200">
                    {Object.entries(activeProduct.specifications).map(([key, val]) => (
                      <tr key={key}>
                        <td className="py-2.5 px-4 font-semibold text-neutral-900 bg-neutral-50 w-1/3">
                          {key}
                        </td>
                        <td className="py-2.5 px-4 text-neutral-700">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <p className="font-semibold text-neutral-900">Recommended Garment Care:</p>
                <ul className="list-disc list-inside space-y-1.5 text-neutral-600">
                  {activeProduct.careInstructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3">
                <p className="font-semibold text-neutral-900">Complimentary Express Shipping</p>
                <p className="text-neutral-600">
                  Standard orders ship within 24 hours of confirmation. Live real-time delivery tracking is provided through the MALL logistics map as soon as Rahul Kumar receives the package at the Indiranagar hub.
                </p>
                <p className="font-semibold text-neutral-900 pt-2">Hassle-Free Returns</p>
                <p className="text-neutral-600">
                  Try it on at home. If you are not completely satisfied, schedule an exchange or return within 15 days of delivery for a 100% refund to your original payment method.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products Recommendation Carousel */}
        {similarProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900 mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={activeProduct.category}
      />
    </div>
  );
};
