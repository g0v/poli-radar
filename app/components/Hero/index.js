import React, { PropTypes } from 'react';

import VerticalCenter from '../VerticalCenter';
import BgWrapper from './BgWrapper';

function Hero(props) {
  const {
    children,
    image,
  } = props;

  return (
    <BgWrapper src={image}>
      <VerticalCenter>
        {children}
      </VerticalCenter>
    </BgWrapper>
  );
}

Hero.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
};

Hero.defaultProps = {
  image: 'http://lorempixel.com/output/people-q-g-1000-250-4.jpg',
};

export default Hero;
