import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';

function PartyChip(props) {
  const style = {
    ...props.style,
    display: 'inline-block',
    marginLeft: '0.75em',
  };
  const labelStyle = {
    ...props.labelStyle,
    fontSize: '0.75em',
    lineHeight: '2em',
    padding: '0 1em',
  };
  const newProps = {
    ...props,
    labelStyle,
    style,
  };
  return <Chip {...newProps} />;
}

PartyChip.propTypes = {
  labelStyle: PropTypes.object,
  style: PropTypes.object,
};

export default PartyChip;
