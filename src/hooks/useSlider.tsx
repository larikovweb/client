import { useState, useCallback } from 'react';

export const useSlider = (slidesLength: number, initialIndex: number = 0) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPreviousSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, slidesLength - 1));
  }, [slidesLength]);

  return {
    currentIndex,
    setCurrentIndex,
    goToSlide,
    goToPreviousSlide,
    goToNextSlide,
  };
};
