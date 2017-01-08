import styled from 'styled-components';

export default styled.div`
  & {
    position: absolute;
    width: 100%;
    ${(props) => props.top && `top: ${props.top};`}
    ${(props) => props.bottom && `bottom: ${props.bottom};`}
    ${(props) => props.left && `left: ${props.left};`}
    ${(props) => props.right && `right: ${props.right};`}
  }
`;
