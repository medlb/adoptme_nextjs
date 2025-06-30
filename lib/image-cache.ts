// Global image cache to prevent multiple loads of the same images
const imageCache = new Map<string, HTMLImageElement>();
const loadingPromises = new Map<string, Promise<HTMLImageElement>>();

/**
 * Preload a single image and cache it
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  // If already cached, return immediately
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }

  // If already loading, return the existing promise
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }

  // Create new loading promise
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      imageCache.set(src, img);
      loadingPromises.delete(src);
      resolve(img);
    };
    
    img.onerror = () => {
      loadingPromises.delete(src);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });

  loadingPromises.set(src, promise);
  return promise;
};

/**
 * Preload multiple images in parallel
 */
export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  const uniqueUrls = [...new Set(imageUrls)]; // Remove duplicates
  const promises = uniqueUrls.map(url => preloadImage(url).catch(() => null));
  await Promise.all(promises);
};

/**
 * Check if an image is already cached
 */
export const isImageCached = (src: string): boolean => {
  return imageCache.has(src);
};

/**
 * Get cached image if available
 */
export const getCachedImage = (src: string): HTMLImageElement | null => {
  return imageCache.get(src) || null;
};

/**
 * Clear the image cache (useful for memory management)
 */
export const clearImageCache = (): void => {
  imageCache.clear();
  loadingPromises.clear();
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  return {
    cachedImages: imageCache.size,
    loadingImages: loadingPromises.size,
  };
}; 