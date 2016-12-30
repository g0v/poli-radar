import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectPoliticians,
} from 'containers/App/selectors';

export default function withRouter(Component) {
  class InnerComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  const mapStateToProps = createStructuredSelector({
    politicians: selectPoliticians(),
  });

  return connect(mapStateToProps)(InnerComponent);
}
