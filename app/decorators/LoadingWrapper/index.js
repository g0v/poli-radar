import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function (WrappedComponent) {
  return class extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
      loading: PropTypes.bool,
    }

    render() {
      const { loading } = this.props;
      if (loading) return <CircularProgress />;
      return <WrappedComponent {...this.props} />;
    }
  };
}
