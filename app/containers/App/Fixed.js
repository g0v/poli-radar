import styled from 'styled-components';
import zIndex from 'material-ui/styles/zIndex';

const Fixed = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: ${zIndex.appBar};
`;

export default Fixed;
