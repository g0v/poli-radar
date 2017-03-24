import React from 'react';
import { CardTitle } from 'material-ui/Card';

function MyCardTitle(props) {
  return (
    <CardTitle {...props} titleStyle={{ paddingRight: '2.5em', display: 'inline-block' }} />
  );
}

export default MyCardTitle;
