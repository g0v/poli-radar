import styled from 'styled-components';

export default styled.div`
  & {
    font-size: 80%;
    margin-top: 1em;
    padding: 0.5em 1em;
    color: ${(props) => props.color};
    border: 1px solid ${(props) => props.color};
    border-radius: 1.5em;
    display: inline-block;
  }
`;
