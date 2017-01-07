import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

function LoadError(props) {
  const {
    action,
    msg,
  } = props;

  return (
    <div>
      {msg}
      {action && <RaisedButton onTouchTap={action} />}
    </div>
  );
}

LoadError.propTypes = {
  action: PropTypes.func,
  msg: PropTypes.string,
};

LoadError.defaultProps = {
  msg: '好像出錯了',
};

export default LoadError;
