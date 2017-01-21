import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';

import { appBar } from 'styles/units';

export default styled(AppBar)`
  & {
    position: fixed !important;
    height: ${appBar};
    top: 0;
  }
`;
