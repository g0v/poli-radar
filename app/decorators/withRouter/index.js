import React from 'react';
import { connect } from 'react-redux';

import { push, replace, goBack } from 'react-router-redux';

export default function withRouter(Component) {
  class InnerComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  // InnerComponent.propTypes = {
  //   changeRoute: React.PropTypes.func,
  //   replaceRoute: React.PropTypes.func,
  //   goBackRoute: React.PropTypes.func,
  // };

  function mapDispatchToProps(dispatch) {
    return {
      changeRoute: (route) => dispatch(push(route)),
      replaceRoute: (route) => dispatch(replace(route)),
      goBackRoute: () => dispatch(goBack()),
    };
  }

  return connect(null, mapDispatchToProps)(InnerComponent);
}
