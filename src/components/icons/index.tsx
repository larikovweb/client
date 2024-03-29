import { FC } from 'react';

interface GradientProps {
  startColor?: string;
  stopColor?: string;
  id?: string;
}

export const IconClose: FC<GradientProps> = ({ startColor = '#fff', stopColor = '#fff', id }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.6451 4.36708C19.1718 3.89382 18.4073 3.89382 17.934 4.36708L12 10.289L6.06598 4.35495C5.59272 3.88168 4.82821 3.88168 4.35495 4.35495C3.88168 4.82821 3.88168 5.59272 4.35495 6.06598L10.289 12L4.35495 17.934C3.88168 18.4073 3.88168 19.1718 4.35495 19.6451C4.82821 20.1183 5.59272 20.1183 6.06598 19.6451L12 13.711L17.934 19.6451C18.4073 20.1183 19.1718 20.1183 19.6451 19.6451C20.1183 19.1718 20.1183 18.4073 19.6451 17.934L13.711 12L19.6451 6.06598C20.1062 5.60485 20.1062 4.82821 19.6451 4.36708Z"
      fill={`url(#paint0_linear_4993_1935${id})`}
      stroke="none"
    />
    <defs>
      <linearGradient
        id={`paint0_linear_4993_1935${id}`}
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        gradientUnits="userSpaceOnUse">
        <stop stopColor={startColor} />
        <stop offset="1" stopColor={stopColor} />
      </linearGradient>
    </defs>
  </svg>
);
