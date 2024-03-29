import { useState } from 'react';

import { SCREEN_SM } from '../utils';
import useEventListener from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface WindowSize {
  windowWidth: number;
  windowHeight: number;
  isMobile: boolean;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: 0,
    windowHeight: 0,
    isMobile: false,
  });

  const handleSize = () => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      isMobile: window.innerWidth <= SCREEN_SM,
    });
  };

  useEventListener('resize', handleSize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []);

  return windowSize;
}

//usage
//const { windowWidth, windowHeight } = useWindowSize()
