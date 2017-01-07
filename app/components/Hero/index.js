import React, { PropTypes } from 'react';

import VerticalCenter from '../VerticalCenter';
import BgWrapper from './BgWrapper';

function Hero(props) {
  const {
    align,
    children,
    image,
  } = props;

  return (
    <BgWrapper src={image}>
      <VerticalCenter align={align}>
        {children}
      </VerticalCenter>
    </BgWrapper>
  );
}

Hero.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.string,
};

Hero.defaultProps = {
  align: 'center',
  image: 'http://lorempixel.com/output/people-q-g-1000-250-4.jpg',
};

export default Hero;
