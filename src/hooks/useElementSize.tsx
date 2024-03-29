import React, { useEffect, useState } from 'react';

import { useWindowSize } from './useWindowSize';

export const useElementSize = (
  ref: React.RefObject<HTMLElement>,
): { width: number | undefined; height: number | undefined } => {
  const [elementSize, setElementSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });
  const { windowWidth, windowHeight } = useWindowSize();

  useEffect(() => {
    const updateElementSize = (): void => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;
        setElementSize({ width, height });
      }
    };

    updateElementSize();
  }, [ref.current?.clientHeight, ref.current?.clientWidth, windowWidth, windowHeight]);

  return elementSize;
};
