import styled from 'styled-components';

export default styled.div`
  text-align: left;
  font-weight: bold;
  color: ${(props) => props.color || 'black'};
`;

