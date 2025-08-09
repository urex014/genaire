import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel as UIcarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Carousel({ images, className }: { images?: string[]; className?: string }) {
  const slides =
    images && images.length > 0
      ? images
      : [
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
        ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tick = () => {
      if (isPausedRef.current) return;
      const nextBtn = containerRef.current?.querySelector(
        'button[aria-label="Next slide"]'
      ) as HTMLButtonElement | null;
      if (nextBtn) nextBtn.click();
    };

    const intervalId = window.setInterval(tick, 3000);

    const el = containerRef.current;
    const pause = () => (isPausedRef.current = true);
    const resume = () => (isPausedRef.current = false);

    el?.addEventListener("mouseenter", pause);
    el?.addEventListener("mouseleave", resume);
    el?.addEventListener("touchstart", pause);
    el?.addEventListener("touchend", resume);

    return () => {
      window.clearInterval(intervalId);
      el?.removeEventListener("mouseenter", pause);
      el?.removeEventListener("mouseleave", resume);
      el?.removeEventListener("touchstart", pause);
      el?.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className ?? ""}`}
    >
      <div className="max-w-7xl mx-auto px-4"> {/* margin and centered */}
        <UIcarousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {slides.map((src, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="p-0">
                  <Card className="w-full">
                    <CardContent className="p-0">
                      <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-[75vh] object-cover rounded-lg" // taller + rounded
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons */}
          <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black/50 hover:bg-black text-white w-12 h-12 rounded-full flex items-center justify-center" />
          <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black/50 hover:bg-black text-white w-12 h-12 rounded-full flex items-center justify-center" />
        </UIcarousel>
      </div>

      {/* Shop Now Button */}
      <div className="w-full flex items-center justify-center mt-6">
        <button
          onClick={() => navigate("/shop")}
          className="px-12 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Carousel;
