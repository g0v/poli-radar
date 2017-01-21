import React, { PropTypes } from 'react';
import styled from 'styled-components';

import RaisedButton from 'material-ui/RaisedButton';

const ResizedButton = styled(RaisedButton)`
  font-size: 75%;
`;

function FullWidthButton(props) {
  const style = {
    ...props.style,
    boxShadow: 'none',
  };
  const buttonStyle = {
    ...props.buttonStyle,
    borderRadius: 0,
  };
  const icon = props.icon && Object.assign({}, props.icon, {
    props: {
      style: {
        width: '1em',
        height: '1em',
      },
    },
  });
  const labelStyle = {
    ...props.labelStyle,
    fontSize: '1em',
    verticalAlign: 'middle',
  };
  const newProps = {
    ...props,
    style,
    buttonStyle,
    icon,
    labelStyle,
    fullWidth: true,
  };
  return <ResizedButton {...newProps} />;
}

FullWidthButton.propTypes = {
  buttonStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  style: PropTypes.object,
  icon: PropTypes.node,
};

export default FullWidthButton;
