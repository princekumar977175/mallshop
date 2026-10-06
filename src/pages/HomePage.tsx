import React from 'react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { PromoStrip } from '../components/home/PromoStrip';
import { CategoryBanners } from '../components/home/CategoryBanners';
import { TrendingSection } from '../components/home/TrendingSection';
import { TopBrands } from '../components/home/TopBrands';
import { NewArrivals } from '../components/home/NewArrivals';
import { OfferBanners } from '../components/home/OfferBanners';
import { CuratedEdits } from '../components/home/CuratedEdits';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO CAROUSEL */}
      <HeroCarousel />

      {/* 2. PROMOTIONAL STRIP */}
      <PromoStrip />

      {/* 3. SHOP BY CATEGORY */}
      <CategoryBanners />

      {/* 4. TRENDING NOW */}
      <TrendingSection />

      {/* 5. TOP BRANDS */}
      <TopBrands />

      {/* 6. NEW ARRIVALS */}
      <NewArrivals />

      {/* 7. FASHION OFFERS */}
      <OfferBanners />

      {/* 8. PRODUCT COLLECTIONS */}
      <CuratedEdits />
    </div>
  );
};
