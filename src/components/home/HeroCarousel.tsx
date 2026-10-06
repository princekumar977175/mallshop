import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  tagline: string;
  headline: string;
  description: string;
  image: string;
  menLink: string;
  womenLink: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    tagline: 'AUTUMN / WINTER 2026',
    headline: 'THE NEW SEASON IS HERE',
    description: 'Crisp French linens, structured double-faced wool coats, and contemporary silhouettes crafted for effortless modern living.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85',
    menLink: '/men',
    womenLink: '/women'
  },
  {
    id: 2,
    tagline: 'TIMELESS LUXURY ESSENTIALS',
    headline: 'REFRESH YOUR STYLE',
    description: 'Elevated Supima cottons, hand-finished Italian leather footwear, and architectural tailoring built to endure trends.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=85',
    menLink: '/men',
    womenLink: '/women'
  },
  {
    id: 3,
    tagline: 'RESPONSIBLE LUXURY',
    headline: 'EVERYDAY FASHION, BETTER',
    description: 'Uncompromising craftsmanship meets sustainable natural fabrics. Discover pure European flax, mulberry silk, and raw selvedge denim.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=85',
    menLink: '/men',
    womenLink: '/women'
  }
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full overflow-hidden bg-neutral-900 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] w-full">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              {/* Background Image with Dark Vignette Gradient */}
              <img
                src={slide.image}
                alt={slide.headline}
                className="w-full h-full object-cover object-center sm:object-top transform scale-100 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent sm:from-black/75 sm:via-black/35" />

              {/* Text & CTAs */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
                  <div className="max-w-xl space-y-4 sm:space-y-6">
                    <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widestx text-neutral-300 border-b border-neutral-400 pb-1">
                      {slide.tagline}
                    </span>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
                      {slide.headline}
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-lg">
                      {slide.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                      <Link
                        to={slide.menLink}
                        className="px-6 sm:px-8 py-3.5 bg-white text-neutral-950 hover:bg-neutral-200 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md inline-flex items-center space-x-2"
                      >
                        <span>Shop Men</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to={slide.womenLink}
                        className="px-6 sm:px-8 py-3.5 bg-neutral-900/80 hover:bg-neutral-900 border border-white/60 hover:border-white text-white text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-sm transition-all duration-200 inline-flex items-center space-x-2"
                      >
                        <span>Shop Women</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/10 transition-colors hidden sm:flex items-center justify-center"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/10 transition-colors hidden sm:flex items-center justify-center"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              current === i ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
