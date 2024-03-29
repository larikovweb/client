// mixins
export const calcFluidFontSize = (
  f_min: number,
  f_max: number,
  v_min: number,
  v_max: number,
): string => {
  const k = (f_max - f_min) / (v_max - v_min);
  let b = f_min - k * v_min;

  b = b * 1;

  return `calc(${`${k * 100}vw + ${b}px`})`;
};
