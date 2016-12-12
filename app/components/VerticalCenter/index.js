import styled from 'styled-components';

/* eslint-disable no-confusing-arrow */

const VerticalCenter = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => props.align === 'center' ? '50%' : null};
  right: ${(props) => props.align === 'right' ? '0' : null};
  transform: ${(props) => props.align === 'center' ? 'translate(-50% ,-50%)' : 'translateY(-50%)'};
`;

export default VerticalCenter;
