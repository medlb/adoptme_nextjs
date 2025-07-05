import { useEffect, useRef, useState } from 'react';
import { preloadImages, isImageCached } from '../lib/image-cache';

interface UseImagePreloaderOptions {
  images: string[];
  preloadCount?: number;
  enabled?: boolean;
  priority?: boolean;
}

export const useImagePreloader = ({ 
  images, 
  preloadCount = 20, 
  enabled = true,
  priority = false
}: UseImagePreloaderOptions) => {
  const preloadedRef = useRef<Set<string>>(new Set());
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadedCount, setPreloadedCount] = useState(0);

  useEffect(() => {
    if (!enabled || !images.length) return;

    // Only preload images that haven't been preloaded yet
    const imagesToPreload = images
      .slice(0, preloadCount)
      .filter(img => !preloadedRef.current.has(img) && !isImageCached(img));

    if (imagesToPreload.length > 0) {
      setIsPreloading(true);
      
      // Mark these images as being preloaded
      imagesToPreload.forEach(img => preloadedRef.current.add(img));
      
      // Preload them with progress tracking
      const preloadPromises = imagesToPreload.map((img, index) => 
        preloadImages([img]).then(() => {
          setPreloadedCount(prev => prev + 1);
          return img;
        }).catch(() => {
          // Remove from preloaded set if failed
          preloadedRef.current.delete(img);
          return null;
        })
      );

      Promise.all(preloadPromises).then(() => {
        setIsPreloading(false);
      });
    }
  }, [images, preloadCount, enabled, priority]);

  return {
    isPreloaded: (imageUrl: string) => isImageCached(imageUrl) || preloadedRef.current.has(imageUrl),
    isPreloading,
    preloadedCount,
    totalImages: images.length,
    progress: images.length > 0 ? (preloadedCount / Math.min(preloadCount, images.length)) * 100 : 0,
  };
}; 