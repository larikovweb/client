import styled from '@emotion/styled';
import { $primaryStartColor } from '../helpers';

export const Avatar = styled.div`
  min-width: 4rem;
  max-width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  border: 0.0625rem solid ${$primaryStartColor};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  > svg {
    width: 80%;
    height: 80%;
    fill: #fff;
    stroke: #fff;
    opacity: 0.5;
  }
`;
