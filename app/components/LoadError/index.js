import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

function LoadError(props) {
  return (
    <div>
      好像出錯了，點擊重新載入
      <RaisedButton onTouchTap={props.onTouchTap} />
    </div>
  );
}

LoadError.propTypes = {
  onTouchTap: PropTypes.func,
};

export default LoadError;
