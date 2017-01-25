import styled from 'styled-components';
import { Blue } from 'styles/colors';

export default styled.div`
  & {
    width: 1em;
    height: 1em;
    margin: 0.2em;
    display: inline-block;
    border-radius: 0.2em;
    background: ${(props) => props.color || Blue}
  }
`;
