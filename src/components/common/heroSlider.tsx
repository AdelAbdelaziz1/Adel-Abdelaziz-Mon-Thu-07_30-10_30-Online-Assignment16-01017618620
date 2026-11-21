"use client"
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import heroSliderImage from "@/assets/images/heroSliderImage.png";

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string | StaticImageData;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const DEFAULT_SLIDES: HeroSlide[] = [1, 2, 3].map((n) => ({
  id: n,
  title: "Fresh Products Delivered to your Door",
  subtitle: "Get 20% off your first order",
  image: heroSliderImage,
  primaryCta: { label: "Shop Now", href: "/products" },
  secondaryCta: { label: "View Deals", href: "/deals" },
}));

interface HeroSliderProps {
  slides?: HeroSlide[];
  autoPlayMs?: number;
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function HeroSlider({
  slides = DEFAULT_SLIDES,
  autoPlayMs = 5000,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(next, autoPlayMs);
    return () => clearInterval(t);
  }, [paused, next, autoPlayMs, count]);

  return (
    <section
      className="relative h-[230px] w-full overflow-hidden rounded-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promotions"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />

          {/* green overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00c853]/90 via-[#00c853]/75 to-[#00c853]/60" />

          <div className="relative z-10 flex h-full flex-col justify-center px-[68px] sm:px-20 lg:px-[120px]">
            <h2 className="max-w-[210px] text-[22px] font-semibold leading-tight text-white sm:max-w-[240px] sm:text-2xl lg:max-w-[260px]">
              {slide.title}
            </h2>
            <p className="mt-3 text-xs text-white">{slide.subtitle}</p>
            <div className="mt-4 flex items-center gap-3">
              <Link
                href={slide.primaryCta.href}
                className="rounded-md bg-white px-4 py-2 text-xs font-medium text-gray-900 transition hover:bg-gray-100"
              >
                {slide.primaryCta.label}
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="rounded-md border border-white/70 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
              >
                {slide.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition hover:bg-white sm:flex"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition hover:bg-white sm:flex"
      >
        <ChevronRight />
      </button>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            className={`h-1.5 rounded-full bg-white transition-all ${
              i === current ? "w-5" : "w-1.5 opacity-60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}