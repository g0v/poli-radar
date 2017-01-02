import React from 'react';
import { connect } from 'react-redux';

import { push, replace, goBack } from 'react-router-redux';

export default function (Component) {
  class InnerComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      changeRoute: (route) => dispatch(push(route)),
      replaceRoute: (route) => dispatch(replace(route)),
      goBackRoute: () => dispatch(goBack()),
    };
  }

  return connect(null, mapDispatchToProps)(InnerComponent);
}
