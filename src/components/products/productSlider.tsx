"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div id="product-images" className="min-w-0 lg:w-1/4">
      <div className="sticky top-4 rounded-xl bg-white p-4 shadow-sm">
        {/* Main image */}
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#fff",
              "--swiper-navigation-size": "22px",
            } as React.CSSProperties
          }
          spaceBetween={10}
          navigation
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 w-full overflow-hidden rounded-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`main-${index}`}>
              <Image
                alt={`main image ${index + 1}`}
                src={image}
                width={800}
                height={1000}
                className="h-auto w-full object-contain"
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={2}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className="mySwiper mt-2"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={`thumb-${index}`}
              className="cursor-pointer border-[3px] border-transparent transition-colors hover:border-gray-300 md:border-4 [&.swiper-slide-thumb-active]:border-gray-500"
            >
              <Image
                alt={`thumb image ${index + 1}`}
                src={image}
                width={150}
                height={200}
                className="h-auto w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}