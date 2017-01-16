import styled from 'styled-components';
import { fade } from 'material-ui/utils/colorManipulator';

import { BG } from 'styles/colors';

import { color, lineWidth } from './style';

export default styled.div`
  & {
    padding-top: 4em;
    padding: 4em 2em 0;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: ${lineWidth};
    background-color: ${color};
    left: 1em;
    top: 0;
    bottom: 0;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: ${lineWidth};
    background: linear-gradient(${fade(BG, 1)} 30%, ${fade(BG, 0)} 100%);
    left: 1em;
    top: 0;
    height: 6em;
  }
`;
