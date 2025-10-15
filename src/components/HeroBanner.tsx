import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

interface HeroBannerProps {
  banners: Banner[];
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[280px] w-full rounded-[8px] overflow-hidden group">
      {/* Banner Images */}
      <div className="relative h-full w-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0' 
                : index < currentIndex 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-[#121221]">
              <img 
                alt={banner.title} 
                className="size-full object-cover" 
                src={banner.image} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="max-w-2xl">
                <h2 className="font-['Space_Grotesk:Bold',_sans-serif] font-bold text-[36px] leading-[44px] text-white mb-2">
                  {banner.title}
                </h2>
                <p className="font-['Space_Grotesk:Regular',_sans-serif] font-normal text-[18px] leading-[26px] text-white/90 mb-4">
                  {banner.subtitle}
                </p>
                <button className="bg-[#1414b8] hover:bg-[#1a1ad0] px-6 py-3 rounded-[8px] font-['Space_Grotesk:Bold',_sans-serif] font-bold text-white text-[14px] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  {banner.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Banner anterior"
      >
        <ChevronLeft className="size-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Próximo banner"
      >
        <ChevronRight className="size-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
