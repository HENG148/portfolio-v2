"use client";

import { useCallback, useEffect, useState } from "react";
import { Slide } from "../features/about/type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function ImageCarousel({slides}: { slides: Slide[]}) {
  const [current, setCurrent] = useState(0);
  const [isTansitioning, setIsTransitioning] = useState<boolean>(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isTansitioning) return;
      setIsTransitioning(true);
      setCurrent((idx + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTansitioning, slides.length]
  )

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className={`relative w-full overflow-hidden bg-zinc-900 aspect-4/3 group`}>
      {slides.map((slide, idx) => (
        <div
          className={["absolute inset-0 transition-opacity duration-500 ease-in-out", idx === current ? "opacity-100" : "opacity-0"].join(" ")}
          key={idx}
        >
          <div className="absolute inset-0 bg-linear-to-br from-zinc-700 to-zinc-900" />
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            draggable={false}
            priority={idx === 0}
          />
          <div className=" absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ))}

      <button 
        className=" absolute left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        onClick={prev}
        aria-label="Previous image"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={["rounded-full transition-all duration-300",
              i === current
                ? "w-5 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70",
            ].join("")}
          />
        ))}
      </div>
    </div>
  )
}