"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxImage = { src: string; alt: string };

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  /** Currently open image index, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const isOpen = index !== null;
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (hasMultiple && e.key === "ArrowLeft") {
        onNavigate((index! - 1 + images.length) % images.length);
      }
      if (hasMultiple && e.key === "ArrowRight") {
        onNavigate((index! + 1) % images.length);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, index, hasMultiple, images.length, onClose, onNavigate]);

  const active = isOpen ? images[index!] : null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-accent hover:text-accent sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index! - 1 + images.length) % images.length);
                }}
                aria-label="Previous screenshot"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-accent hover:text-accent sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index! + 1) % images.length);
                }}
                aria-label="Next screenshot"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-accent hover:text-accent sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <motion.div
            key={active.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-full w-full max-w-5xl"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>

          {hasMultiple && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-muted">
              {index! + 1} / {images.length}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
