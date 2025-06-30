import { useEffect, useRef } from 'react';
import { preloadImages, isImageCached } from '../lib/image-cache';

interface UseImagePreloaderOptions {
  images: string[];
  preloadCount?: number;
  enabled?: boolean;
}

export const useImagePreloader = ({ 
  images, 
  preloadCount = 20, 
  enabled = true 
}: UseImagePreloaderOptions) => {
  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled || !images.length) return;

    // Only preload images that haven't been preloaded yet
    const imagesToPreload = images
      .slice(0, preloadCount)
      .filter(img => !preloadedRef.current.has(img) && !isImageCached(img));

    if (imagesToPreload.length > 0) {
      // Mark these images as being preloaded
      imagesToPreload.forEach(img => preloadedRef.current.add(img));
      
      // Preload them
      preloadImages(imagesToPreload);
    }
  }, [images, preloadCount, enabled]);

  return {
    isPreloaded: (imageUrl: string) => isImageCached(imageUrl) || preloadedRef.current.has(imageUrl),
  };
}; 