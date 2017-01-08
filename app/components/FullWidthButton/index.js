import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

function FullWidthButton(props) {
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
  const newProps = {
    ...props,
    buttonStyle,
    icon,
    fullWidth: true,
  };
  return <RaisedButton {...newProps} />;
}

FullWidthButton.propTypes = {
  buttonStyle: PropTypes.object,
  icon: PropTypes.node,
};

export default FullWidthButton;
