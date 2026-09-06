import React, { useState, useEffect } from 'react';
import { SliderItem, PageId } from '../types';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface TopBannerSliderProps {
  onNavigate: (page: PageId) => void;
}

export const TopBannerSlider: React.FC<TopBannerSliderProps> = ({ onNavigate }) => {
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    // Fetch live sliders from server
    fetch('/api/sliders')
      .then((res) => res.json())
      .then((data) => {
        if (data.sliders && Array.isArray(data.sliders) && data.sliders.length > 0) {
          setSlides(data.sliders);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch sliders, using default', err);
      });
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 bg-slate-950 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Container with fixed 16:7 or 16:8 aspect ratio so images never cut weirdly */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] min-h-[220px] sm:min-h-[280px] md:min-h-[340px] flex items-center justify-center overflow-hidden">
        {/* Background Image with smooth fade */}
        <img
          src={currentSlide.url}
          alt={currentSlide.title}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] transition-all duration-700 transform group-hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay for high readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/60 pointer-events-none" />

        {/* Slide Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>IOIS विशेष अपडेट &bull; स्लाइड {currentIndex + 1} / {slides.length}</span>
          </div>

          <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-md tracking-tight">
            {currentSlide.title}
          </h2>

          {currentSlide.subtitle && (
            <p className="text-xs sm:text-base text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
              {currentSlide.subtitle}
            </p>
          )}

          {currentSlide.targetPage && (
            <div className="pt-1 sm:pt-2">
              <button
                onClick={() => onNavigate(currentSlide.targetPage!)}
                className="btn-gold-gradient text-xs sm:text-sm px-6 py-2 sm:py-2.5 font-black uppercase tracking-wider shadow-lg flex items-center gap-2 mx-auto cursor-pointer"
              >
                <span>अभी देखें / एक्सप्लोर करें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 border border-amber-400/40 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center transition shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 border border-amber-400/40 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center transition shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5 sm:gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-8 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
