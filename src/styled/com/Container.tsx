// global styled
import styled from '@emotion/styled';
import { $phoneWidth } from '../helpers';

export const Container = styled.div`
  width: 100%;
  max-width: 98rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  @media screen and (max-width: ${$phoneWidth}) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
