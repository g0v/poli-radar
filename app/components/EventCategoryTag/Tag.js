import styled from 'styled-components';

export default styled.div`
  & {
    position: absolute;
    right: -1em;
    top: 1em;
    padding: 0.5em 1em;
    color: white;
    font-size: 80%;
    background: ${(props) => props.color};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -1em;
    border-style: solid;
    border-width: 1em 1em 0 0;
    border-color: ${(props) => props.color} transparent transparent transparent;
  }
`;
