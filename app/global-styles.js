import { injectGlobal } from 'styled-components';

import { sansSerif } from './styles/fonts';
import { BG } from './styles/colors';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: ${sansSerif};
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: ${BG};
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${sansSerif};
  }
`;
