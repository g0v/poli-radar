import styled from 'styled-components';

/* eslint-disable no-confusing-arrow */
const Loading = styled.div`
  display: ${(props) => props.loading ? 'none' : 'block'}
`;

export default Loading;
