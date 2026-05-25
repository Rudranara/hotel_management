"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  roomName: string;
}

export function ImageLightbox({ images, roomName }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  if (images.length === 0) return null;

  const mainImage = images[0];
  const thumbs = images.slice(1, 4);

  return (
    <>
      {/* Gallery grid */}
      <div className="grid gap-2">
        {/* Main image */}
        <button
          onClick={() => { setCurrent(0); setOpen(true); }}
          className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl"
          aria-label={`View ${roomName} gallery`}
        >
          <Image
            src={mainImage}
            alt={roomName}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100">
            <span className="rounded-xl bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-900">
              View all {images.length} photos
            </span>
          </div>
        </button>

        {/* Thumbnails */}
        {thumbs.length > 0 && (
          <div className={`grid gap-2 ${thumbs.length === 1 ? "grid-cols-1" : thumbs.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {thumbs.map((src, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i + 1); setOpen(true); }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                aria-label={`View photo ${i + 2}`}
              >
                <Image
                  src={src}
                  alt={`${roomName} ${i + 2}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {/* "+N more" overlay on last thumb if more images exist */}
                {i === thumbs.length - 1 && images.length > 4 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-xl font-semibold text-white">+{images.length - 4}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox overlay */}
      {open && (
        <div
          role="dialog"
          aria-label="Image lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <p className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {current + 1} / {images.length}
          </p>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`${roomName} ${current + 1}`}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  className={`relative h-12 w-16 overflow-hidden rounded-lg border-2 transition ${i === current ? "border-[#22C7C7]" : "border-transparent opacity-60 hover:opacity-90"}`}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
