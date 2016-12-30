import styled from 'styled-components';

import BackgroundImage from 'components/BackgroundImage';

const Hero = styled(BackgroundImage)`
  width: 100%;
  padding-top: 25%;
  filter: blur(1px);
  @media (min-width: 640px) {
    min-height: 244px;
  }
`;

export default Hero;
