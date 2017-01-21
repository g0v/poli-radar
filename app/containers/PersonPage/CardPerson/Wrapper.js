import styled from 'styled-components';
import { utils } from 'hedron';
const { media } = utils;

export default styled.div`
  & {
    width: 90%;
    margin: 0 auto;
  }
  ${media.lg`
    width: 80%;
    max-width: 960px;
  `}
`;
