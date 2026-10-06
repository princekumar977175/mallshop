import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Toast } from './components/common/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { SearchPage } from './pages/SearchPage';

// Scroll to Top on page change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// App Content with Toast notification listener
const AppContent: React.FC = () => {
  const { toastMessage } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      <ScrollToTop />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/men" element={<ProductListingPage categorySlug="men" />} />
          <Route path="/women" element={<ProductListingPage categorySlug="women" />} />
          <Route path="/kids" element={<ProductListingPage categorySlug="kids" />} />
          <Route path="/beauty" element={<ProductListingPage categorySlug="beauty" />} />
          <Route path="/footwear" element={<ProductListingPage categorySlug="footwear" />} />
          <Route path="/accessories" element={<ProductListingPage categorySlug="accessories" />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/track-order/:id" element={<TrackOrderPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />
      <Toast message={toastMessage} />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <AppContent />
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
